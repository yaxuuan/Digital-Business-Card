// Pack rules from the v2 doc. Run: node --test tests/
const test = require('node:test');
const assert = require('node:assert');
const { cardOdds, pickCard, packsLeft, rollPack, PACK_MAX, PACK_REFILL_MS, FIRST_EDITION, SHINY_CHANCE, TREATS, CRAFT_COST, drawCard, craftCard } = require('../rules.js');

const set = [
  { id: 'a', rarity: 'common' }, { id: 'b', rarity: 'common' },
  { id: 'r', rarity: 'rare' }, { id: 'l', rarity: 'legendary' },
];

test('tier weight is split between its cards, and empty tiers drop out (doc example: 40/40/16/4)', () => {
  const o = cardOdds(set);
  for (const [id, p] of [['a', .4], ['b', .4], ['r', .16], ['l', .04]]) assert.ok(Math.abs(o[id] - p) < 1e-9, id);
  assert.ok(Math.abs(Object.values(o).reduce((s, p) => s + p, 0) - 1) < 1e-9);
});

test('after three duplicates in a row, the pack only draws cards the collector is missing', () => {
  for (const r of [0, .5, .999]) assert.equal(pickCard(set, ['a', 'b', 'r'], 3, r).id, 'l');
  assert.equal(pickCard(set, ['a', 'b', 'r'], 2, 0).id, 'a');           // not yet: normal odds
  assert.ok(pickCard(set, ['a', 'b', 'r', 'l'], 5, .5));                 // owns everything: still returns a card
});

const fresh = () => ({ pulls: [], serials: {}, dupStreak: 0 });
const open = (s, now, r = 0) => rollPack(s, set, now, r);

test('a visitor holds 3 packs, then waits an hour for each refill, never more than 3', () => {
  let s = fresh();
  for (let i = 0; i < PACK_MAX; i++) { const out = open(s, 1000); assert.ok(out.pull, 'pack ' + i); s = out.state; }
  assert.equal(open(s, 1000).wait, PACK_REFILL_MS);
  assert.ok(open(s, 1000 + PACK_REFILL_MS - 1).wait > 0);
  assert.equal(packsLeft(s, 1000 + PACK_REFILL_MS).n, 1);
  assert.equal(packsLeft(s, 1000 + PACK_REFILL_MS * 2.5).n, 2);
  assert.equal(packsLeft(s, 1000 + PACK_REFILL_MS * 99).n, PACK_MAX);
  const again = open(s, 1000 + PACK_REFILL_MS);                         // spend the refilled pack: empty again
  assert.ok(again.pull); assert.ok(open(again.state, 1000 + PACK_REFILL_MS).wait > 0);
});

test('state saved before packs were limited starts with a full set', () => {
  assert.equal(packsLeft({ pulls: [{ id: 'a', t: 5 }], serials: {}, dupStreak: 0 }, 9e9).n, PACK_MAX);
});

test('a lucky pack is spent first, never gives a Common, and costs no ordinary pack', () => {
  const s = { ...fresh(), bonus: 1 };
  for (const r of [0, .3, .7, .999]) assert.notEqual(open(s, 1000, r).pull.rarity, 'common');
  for (const r of [0, .5, .999]) assert.ok(['r', 'l'].includes(open(s, 1000, r).pull.id));
  const out = open(s, 1000);
  assert.ok(out.pull.lucky); assert.equal(out.state.bonus, 0); assert.equal(packsLeft(out.state, 1000).n, PACK_MAX);
  let empty = fresh(); for (let i = 0; i < PACK_MAX; i++) empty = open(empty, 1000).state;
  assert.ok(open({ ...empty, bonus: 1 }, 1000).pull, 'lucky pack opens even with no ordinary packs');
  assert.equal(pickCard([{ id: 'a', rarity: 'common' }], [], 0, .5, true).id, 'a');   // only Commons exist: still a card
});

test('serials count up per card, First Edition ends at the limit, duplicates raise the streak', () => {
  const s0 = { pulls: [], serials: { a: FIRST_EDITION - 1 }, dupStreak: 0 };
  const one = rollPack(s0, set, 0, 0);
  assert.equal(one.pull.serial, FIRST_EDITION); assert.ok(one.pull.first);
  const two = rollPack(one.state, set, 1, 0);
  assert.equal(two.pull.serial, FIRST_EDITION + 1); assert.ok(!two.pull.first);
  assert.ok(!two.pull.isNew); assert.equal(two.state.dupStreak, 1);
});

test('a pull is shiny only when the shiny roll lands under the 1% chance', () => {
  assert.equal(SHINY_CHANCE, .01);
  assert.equal(rollPack(fresh(), set, 0, 0).pull.shiny, false);                  // no roll given: never shiny
  assert.equal(rollPack(fresh(), set, 0, 0, SHINY_CHANCE - .0001).pull.shiny, true);
  assert.equal(rollPack(fresh(), set, 0, 0, SHINY_CHANCE).pull.shiny, false);
  let n = 0; for (let i = 0; i < 1000; i++) if (rollPack(fresh(), set, 0, 0, i / 1000).pull.shiny) n++;
  assert.equal(n, 10);                                                            // 10 in 1000
});

test('extra cards in a pack cost no pack, and duplicates pay out treats by rarity', () => {
  const first = rollPack(fresh(), set, 0, 0);                                     // card a, new
  const second = drawCard(first.state, set, 0, 0);                                // card a again: duplicate
  assert.equal(packsLeft(second.state, 0).n, PACK_MAX - 1);                       // still only one pack spent
  assert.equal(second.pull.treats, TREATS.common); assert.equal(second.state.treats, TREATS.common);
  assert.equal(first.pull.treats, 0);
  const s = { ...fresh(), pulls: [{ id: 'l' }], dupStreak: 0 };
  assert.equal(drawCard(s, set, 0, .999).state.treats, TREATS.legendary);
});

test('crafting needs enough treats, spends them, and only works for a missing card', () => {
  const card = set[3], cost = CRAFT_COST.legendary;                                // the legendary
  assert.deepEqual(craftCard({ ...fresh(), treats: cost - 3 }, card, 0), { short: 3 });
  const out = craftCard({ ...fresh(), treats: cost + 2 }, card, 5);
  assert.equal(out.pull.id, 'l'); assert.ok(out.pull.crafted && out.pull.isNew); assert.equal(out.state.treats, 2);
  assert.deepEqual(craftCard(out.state, card, 6), { owned: true });
});
