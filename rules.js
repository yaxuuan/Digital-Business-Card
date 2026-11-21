/* Pack rules from the v2 doc. Pure functions, no page access, so the same code can move into the server's pack function. */
const TIERS = {
  common:    { label:'Common',    weight:60, sym:'●' },
  uncommon:  { label:'Uncommon',  weight:25, sym:'◆' },
  rare:      { label:'Rare',      weight:12, sym:'✦' },
  legendary: { label:'Legendary', weight:3,  sym:'✸' },
};
const PACK_MAX = 3, PACK_REFILL_MS = 3600 * 1000;      // a visitor holds up to 3 packs; one refills every hour
const CATS_PER_LUCKY = 10;                              // catching this many cats earns a lucky pack (no Commons inside)
const PITY_AFTER = 3, FIRST_EDITION = 50;
const SHINY_CHANCE = .01;                               // any pull has a 1 in 100 chance of being a shiny holo copy

// Each tier's weight is split evenly between its cards; tiers with no cards drop out and the rest fill 100%.
function cardOdds(cards) {
  const count = {};
  cards.forEach(c => { count[c.rarity] = (count[c.rarity] || 0) + 1; });
  const total = Object.keys(count).reduce((s, t) => s + TIERS[t].weight, 0);
  const odds = {};
  cards.forEach(c => { odds[c.id] = TIERS[c.rarity].weight / total / count[c.rarity]; });
  return odds;
}

// After PITY_AFTER duplicates in a row, the pack draws only from cards the collector does not have yet.
// A lucky pack leaves out Commons, as long as something else is left to draw.
function pickCard(cards, ownedIds, dupStreak, r, lucky = false) {
  let pool = cards;
  if (dupStreak >= PITY_AFTER) {
    const missing = cards.filter(c => !ownedIds.includes(c.id));
    if (missing.length) pool = missing;
  }
  if (lucky) {
    const better = pool.filter(c => c.rarity !== 'common');
    if (better.length) pool = better;
  }
  const odds = cardOdds(pool);
  let acc = 0;
  for (const c of pool) { acc += odds[c.id]; if (r < acc) return c; }
  return pool[pool.length - 1];
}

// How many ordinary packs the collector holds right now, and how long until the next refill.
function packsLeft(state, now) {
  const ch = state.charge || { n: PACK_MAX, t: now };
  const gained = Math.max(0, Math.floor((now - ch.t) / PACK_REFILL_MS));
  const n = Math.min(PACK_MAX, ch.n + gained);
  const t = n >= PACK_MAX ? now : ch.t + gained * PACK_REFILL_MS;
  return { n, t, nextIn: n >= PACK_MAX ? 0 : t + PACK_REFILL_MS - now };
}

const PACK_SIZE = 3;                                     // cards in a pack
const TREATS = { common: 1, uncommon: 2, rare: 4, legendary: 10 };       // treats a duplicate turns into
const CRAFT_COST = { common: 5, uncommon: 10, rare: 20, legendary: 40 }; // treats to get a chosen missing card

// Draws one card and numbers the copy. A duplicate also pays out treats. Does not spend a pack: rollPack does that.
function drawCard(state, cards, now, r, shinyRoll = 1, lucky = false) {
  const owned = [...new Set(state.pulls.map(p => p.id))];
  const card = pickCard(cards, owned, state.dupStreak, r, lucky);
  const isNew = !owned.includes(card.id), treats = isNew ? 0 : TREATS[card.rarity];
  const serial = (state.serials[card.id] || 0) + 1;
  const pull = { id: card.id, serial, t: now, isNew, first: serial <= FIRST_EDITION, lucky, shiny: shinyRoll < SHINY_CHANCE, treats };
  return { pull, state: { ...state, pulls: [...state.pulls, pull], serials: { ...state.serials, [card.id]: serial },
    dupStreak: isNew ? 0 : state.dupStreak + 1, treats: (state.treats || 0) + treats } };
}

// Opens a pack: spends a lucky pack if there is one, otherwise an ordinary pack, and draws its first card.
// The rest of the pack's cards come from drawCard with the same `lucky` flag. `shinyRoll` is a second random number in [0, 1).
// Returns { wait } when no pack is available, or { pull, state }.
function rollPack(state, cards, now, r, shinyRoll = 1) {
  const bonus = state.bonus || 0, left = packsLeft(state, now), lucky = bonus > 0;
  if (!lucky && left.n < 1) return { wait: left.nextIn };
  const spent = { ...state, bonus: lucky ? bonus - 1 : bonus, charge: { n: lucky ? left.n : left.n - 1, t: left.t } };
  return drawCard(spent, cards, now, r, shinyRoll, lucky);
}

// Spends treats on one specific missing card. Returns { owned }, { short: treatsMissing } or { pull, state }.
function craftCard(state, card, now) {
  if (state.pulls.some(p => p.id === card.id)) return { owned: true };
  const cost = CRAFT_COST[card.rarity], have = state.treats || 0;
  if (have < cost) return { short: cost - have };
  const serial = (state.serials[card.id] || 0) + 1;
  const pull = { id: card.id, serial, t: now, isNew: true, first: serial <= FIRST_EDITION, lucky: false, shiny: false, treats: 0, crafted: true };
  return { pull, state: { ...state, pulls: [...state.pulls, pull], serials: { ...state.serials, [card.id]: serial }, treats: have - cost } };
}

if (typeof module !== 'undefined') module.exports = { TIERS, PACK_MAX, PACK_REFILL_MS, CATS_PER_LUCKY, PITY_AFTER, FIRST_EDITION, SHINY_CHANCE, PACK_SIZE, TREATS, CRAFT_COST,
  cardOdds, pickCard, packsLeft, drawCard, rollPack, craftCard };   // for the node tests
