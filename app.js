/* ================= EDIT ME: the card owner ================= */
// Leave a field '' to hide its icon.
const CONFIG = {
  name: 'Your Name',
  title: 'Your Title',
  org: 'Your Organisation',
  bio: 'A line or two about you. What you make, what you are into, what you are open to.',
  photo: '',                                   // blank shows initials
  background: '',                              // e.g. 'bg.jpg' turns that photo into the pixel background; blank shows the time-of-day scenes
  timeZone: 'Etc/UTC', place: 'Your City',   // the sky follows the owner's local time
  email: 'you@example.com',
  phone: '',                      // goes into the saved contact
  telegram: '',  // username without @
  instagram: '',  // username without @
  linkedin: '',   // full profile URL
  github: '',                         // username without @; blank hides the icon
  // Optional list of things you've built: { name, blurb, url }. Left empty, the Projects section is one link to your GitHub.
  projects: [],
  url: '',                                   // the address on your NFC card and QR; blank = this page
};
// Palettes for the two cats in the meme cards: FP = the fluffy orange cat, BP = the orange-and-white cat.
const FP = { F:'#eeb060', f:'#f6cf90', s:'#cf8a3c', A:'#e8a41c', K:'#2a1d14', P:'#e58f8f', p:'#f4b6a6', w:'#f8dcae', W:'#ffffff', R:'#d93a34', Y:'#f5c842', T:'#f08aa0', L:'#efe6d6', D:'#4a4f5c' };
const BP = { O:'#e8a868', o:'#c98a50', W:'#fbf3ea', w:'#e6d8c8', L:'#b97e48', E:'#9aa878', K:'#2a1d14', P:'#d8907a', p:'#f0b0a0', G:'#e6f6ff', g:'#a9d4ea', m:'#8a6a58', S:'#ffffff' };
// Packs a visitor can choose between. Every card belongs to one (cards with no `set` go in the cat pack).
const RAYS = 'repeating-conic-gradient(rgba(255,255,255,.22) 0 10deg, transparent 10deg 20deg)';
const SETS = {
  dev:  { name: 'Dev pack', title: 'Dev Series', reward: 'Echo put on a scarf',
          art: pixelArt(['..XX.......XX..', '.X...........X.', '.X...........X.', '.X...........X.', 'X....X.X.X....X', '.X...........X.', '.X...........X.', '.X...........X.', '..XX.......XX..'],
                        { X: '#ffffff' }, RAYS + ', linear-gradient(160deg,#2a1f86,#120c40)') },
  cats: { name: 'Cat pack', title: 'Cat Memes', reward: 'Echo was crowned',
          art: pixelArt(['F.....F.O.....O', 'FFFFFFF.OOOWOOO', 'FAFFFAF.OEOWOEO', 'FFFPFFF.OOWPWOO', '.FyyyF...WWWWW.', '.FFFFF...OWWWO.', 'FFFFFFF.OOWWWOO'],
                        { ...BP, F: '#e89a48', A: '#7a4a10', y: '#f8dcae' }, RAYS + ', radial-gradient(circle,#fff6dc,#ffd9a0 70%)') },
};
// The owner's collectible set. Art is drawn with CSS; swap `art` for url('card.jpg') center/cover to use an image.
const CARDS = [
  { set:'dev', id:'hello',   name:'Hello World', rarity:'common',    glyph:'{ }', art:'linear-gradient(160deg,#dfe6f1,#8da0c2)', ink:'#1d2540', flavour:'First commit, first coffee, first card.' },
  { set:'dev', id:'night',   name:'Night Shift', rarity:'common',    glyph:'☾',   art:'radial-gradient(circle at 70% 30%,#4a4f9e,#151640 70%)', ink:'#f5e9b8', flavour:'Ships best between 11 pm and 2 am.' },
  { set:'dev', id:'board',   name:'Whiteboard',  rarity:'uncommon',  glyph:'⇄',   art:'linear-gradient(160deg,#eef8f1,#86cfa8)', ink:'#123a28', flavour:'Every good plan starts as boxes and arrows.' },
  { set:'dev', id:'hack',    name:'Hackathon',   rarity:'rare',      glyph:'48h', gs:'22cqw', art:'linear-gradient(150deg,#0f2d6b,#2b7fe0 55%,#8fd0ff)', ink:'#ffffff', flavour:'Three pivots and one demo that worked.' },
  { set:'dev', id:'keynote', name:'Keynote',     rarity:'legendary', glyph:'★',   art:'radial-gradient(circle at 50% 35%,#fff1bd,#e0a21b 45%,#5a3300 100%)', ink:'#3a2200', flavour:'The rarest pull in the set: on stage, mid-demo.' },
  // Cat cards: pixel art drawn from the grids below ('.' is see-through).
  { id:'loaf', name:'Loaf', rarity:'common', glyph:'', ink:'#3a2410', flavour:'Has achieved perfect loaf. Do not disturb.',
    art: pixelArt(['..O........O..', '..OO......OO..', '..OOODOODOOO..', '.OOOOOOOOOOOO.', '.OOKOOOOOOKOO.', '.OOKOOOOOOKOO.', '.OOOOOPPOOOOO.', '..OOOOOOOOOO..',
                   '.OOOOOOOOOOOO.', 'ODOOODOOODOOOO', 'OOOOOOOOOOOOOO', '.OOOOOOOOOOOO.'],
                  { O:'#f0a040', D:'#c8742a', K:'#2a1d14', P:'#f08aa0' }, 'linear-gradient(160deg,#fff4e0,#ffd29a)') },
  { id:'keys', name:'Keyboard Cat', rarity:'common', glyph:'', ink:'#1d2030', flavour:'Sat on the keyboard. Pushed straight to main.',
    art: pixelArt(['..G........G..', '..GG......GG..', '..GGGGGGGGGG..', '.GGGGGGGGGGGG.', '.GGEKGGGGEKGG.', '.GGGGGGGGGGGG.', '.GGGGGPPGGGGG.', '..GGGGGGGGGG..',
                   '...GGGGGGGG...', 'BBBBBBBBBBBBBB', 'BkBkBkBkBkBkBB', 'BBkBkBkBkBkBkB', 'BBBBBBBBBBBBBB'],
                  { G:'#9aa0b4', E:'#7ad070', K:'#1d2030', P:'#f08aa0', B:'#2d3142', k:'#e8e8f0' }, 'linear-gradient(160deg,#e6ecf8,#a9b6d6)') },
  { id:'prowl', name:'Night Prowler', rarity:'uncommon', glyph:'', ink:'#f5e9b8', flavour:'Zoomies scheduled for 3 am.',
    art: pixelArt(['..N........N..', '..NN......NN..', '..NNNNNNNNNN..', '.NNNNNNNNNNNN.', '.NYKYNNNNYKYN.', '.NNNNNNNNNNNN.', '.NNNNNPPNNNNN.', '..NNNNNNNNNN..', '...NNNNNNNN...'],
                  { N:'#14121f', Y:'#ffd84a', K:'#000000', P:'#b0607a' }, 'radial-gradient(circle at 78% 18%,#fff6c8 0 6%,transparent 7%),radial-gradient(circle at 50% 40%,#4a3f8a,#191536 75%)') },
  { id:'box', name:'Box Inspector', rarity:'rare', glyph:'', ink:'#ffffff', flavour:'If it fits, it ships.',
    art: pixelArt(['..C........C..', '..CC......CC..', '..CCCCCCCCCC..', '.CCCCCCCCCCCC.', '.CCKCCCCCCKCC.', '.CCCCCPPCCCCC.', 'TTTTTTTTTTTTTT', 'TttTTTTTTTTttT',
                   '.TTTTTTTTTTTT.', '.TTTttTTttTTT.', '.TTTTTTTTTTTT.', '.TTTTTTTTTTTT.'],
                  { C:'#f3e3c3', K:'#2a1d14', P:'#f08aa0', T:'#c8935a', t:'#a06e3c' }, 'linear-gradient(150deg,#0f2d6b,#2b7fe0 55%,#8fd0ff)') },
  { id:'lucky', name:'Lucky Cat', rarity:'rare', glyph:'', ink:'#3a2200', flavour:'Waves in good luck, one pull at a time.',
    art: pixelArt(['WW..W......W..', 'WW..WW....WW..', 'WW..WWWWWWWW..', 'WW.WWWWWWWWWW.', '.WWWKKWWWWKKW.', '.W.WWWWWWWWWW.', '...WWWWPPWWWW.', '....RRRRRRRR..',
                   '....RRRYYRRR..', '...WWWWYYWWWW.', '...WWWWWWWWWW.', '...WWWWWWWWWW.'],
                  { W:'#fbf7ee', K:'#3a2410', P:'#f08aa0', R:'#e0463c', Y:'#f2c14e' }, 'radial-gradient(circle at 50% 35%,#fff1bd,#e0a21b 45%,#5a3300 100%)') },
  // Meme cards starring the owner's two cats: Yoko, the fluffy orange one (F), and Echo, the orange-and-white one (O).
  // Every card with a `star` is Legendary: the owner's own cats are the rarest pulls. Other memes fill the lower tiers.
  { id:'bowl', star:'Echo', name:'Bowl Cat', rarity:'legendary', glyph:'', ink:'#3a2410', flavour:'Liquid confirmed. Takes the shape of its container.',
    art: pixelArt(['...O......O...', '...OO....OO...', '...OOOWWOOO...', '..OOOOWWOOOO..', '..OEKOWWOEKO..', '..OOWWWWWWOO..', '..WWWWPPWWWW..', 'GGGGGGGGGGGGGG',
                   'gWWWWWWWWWWWWg', '.gWWWWWWWWWWg.', '..gWWWWWWWWg..', '...gggggggg...'], BP, 'linear-gradient(160deg,#ecd9b8,#c9a877)') },
  { id:'peek', star:'Yoko', name:'Peekaboo', rarity:'legendary', glyph:'', ink:'#f5e9b8', flavour:'Has been watching you code for three hours.',
    art: pixelArt(['LLLLLL......f.', 'LLLLLL.....FF.', 'LLLLLLFFFFFpF.', 'LLLLLLFsFsFFFF', 'LLLLLLFFFFFFFF', 'LLLLLLFAAKAFFF', 'LLLLLLFAAAAFFF', 'LLLLLLPFFFFFFF',
                   'LLLLLLwwFFFFF.', 'LLLLLLDDDDDDDD', 'LLLLLLDDDDDDDD'], FP, 'linear-gradient(160deg,#3a4050,#22262f)') },
  { id:'blep', star:'Yoko', name:'Blep', rarity:'legendary', glyph:'', ink:'#3a2410', flavour:'Forgot to put the tongue back. No further questions.',
    art: pixelArt(['.Ff........fF.', '.FF........FF.', '.FpFFFFFFFFpF.', 'FFFFsFsFsFFFFF', 'FFAKAFFFFAKAFF', 'FFAAAFFFFAAAFF', 'FFFFFFPPFFFFFF', 'fFFFFwwwwFFFFf',
                   '.FFFFwTTwFFFF.', '..FFFFTTFFFF..'], FP, 'linear-gradient(160deg,#ffe3ec,#ffb3c8)') },
  { id:'chef', star:'Yoko', name:"Chef's Hat", rarity:'legendary', glyph:'', ink:'#3a2410', flavour:'Did not order this hat. Wearing it anyway.',
    art: pixelArt(['......YY......', '.....RYYR.....', '.FFWWWWWWWWFF.', '.FFFFsFFsFFFF.', 'FFAKAFFFFAKAFF', 'FFAAAFFFFAAAFF', 'FFFFFFPPFFFFFF', '.FFFFwwwwFFFF.',
                   '.WRWRWRWRWRWR.', '..RRRRRRRRRR..', '..FFFFFFFFFF..'], FP, 'linear-gradient(160deg,#e8f6ee,#9fd6b8)') },
  { id:'paws', star:'Echo', name:'Polite Paws', rarity:'legendary', glyph:'', ink:'#3a2410', flavour:'Would like a word with the manager of dinner.',
    art: pixelArt(['.O..........O.', '.OO........OO.', '.OpOOOWWOOOpO.', 'OOOOOoWWoOOOOO', 'OOLLLOWWOLLLOO', 'OOEKEOWWOEKEOO', 'OOOOWWWWWWOOOO', '.OOWWWPPWWWOO.',
                   '..WWWWWWWWWW..', '...WWWWWWWW...', '...WWWWwWWW...', '...WWwWWWWW...'], BP, 'linear-gradient(160deg,#dfeee6,#8fc7a8)') },
  { id:'zoom', star:'Echo', name:'Zoomies', rarity:'legendary', glyph:'', ink:'#ffffff', flavour:'3 am. No reason. Maximum speed.',
    art: pixelArt(['..........O.O.', 'SSS......OOOO.', '.....OOOOOKOP.', 'SS.OOOOOOOOOO.', 'O.OOoOOOoOOO..', 'OOOOOOOOOOO...', 'SS.OO.....OO..', '..OO.......OO.'],
                  BP, 'linear-gradient(150deg,#0f2d6b,#2b7fe0 55%,#8fd0ff)') },
  { id:'judge', star:'Echo', name:'Judging You', rarity:'legendary', glyph:'', ink:'#ffffff', flavour:'Saw what you pushed to main.',
    art: pixelArt(['.O..........O.', '.OO........OO.', '.OpOOOWWOOOpO.', 'OOOOOoWWoOOOOO', 'OLLLLOWWOLLLLO', 'OOEEKOWWOEEKOO', 'OOOOWWWWWWOOOO', '.OOWWWPPWWWOO.',
                   '..WWWmmmmWWW..', '...WWWWWWWW...'], BP, 'linear-gradient(150deg,#1a2a5c,#3a6fd0 55%,#a8c8ff)') },
  { id:'duo', star:'Yoko & Echo', name:'Double Trouble', rarity:'legendary', glyph:'', ink:'#3a2200', flavour:'Yoko knocks it off the table. Echo watches.',
    art: pixelArt(['F.....F.O.....O', 'FFFFFFF.OOOWOOO', 'FAFFFAF.OEOWOEO', 'FFFPFFF.OOWPWOO', '.FyyyF...WWWWW.', '.FFFFF...OWWWO.', 'FFFFFFF.OOWWWOO', 'FFFFFFF.OOWWWOO'],
                  { ...BP, F:'#e89a48', A:'#7a4a10', y:'#f8dcae' }, 'radial-gradient(circle at 50% 45%,#fffbe8 0 34%,#f2c14e 60%,#6a3a12 100%)') },
  // More memes, with other cats.
  { id:'buffer', name:'Buffering', rarity:'common', glyph:'', ink:'#3a2410', flavour:'Staring at the wall. Loading. Please wait.',
    art: pixelArt(['..............', '....o.o.o.....', '..............', '...G......G...', '...GG....GG...', '...GGGGGGGG...', '..GGGGGGGGGG..', '..GGGGGGGGGG..',
                   '...GGGGGGGG...', '..GGGGGGGGGG..', '.GGGGGGGGGGGG.', '.GGGGGGGGGGGGg', '.GGGGGGGGGGGgg'], { G:'#9aa0b4', g:'#6f7590', o:'#ffffff' }, 'linear-gradient(160deg,#f3ead8,#d9c9a8)') },
  { id:'long', name:'Loooong Cat', rarity:'common', glyph:'', ink:'#123a3a', flavour:'Longer than expected. Still going.',
    art: pixelArt(['....W....W....', '....WWWWWW....', '....WKWWKW....', '....WWPPWW....', '.....WWWW.....', '.....WWWW.....', '.....WWWW.....', '.....WWWW.....',
                   '.....WWWW.....', '.....WWWW.....', '.....WWWW.....', '....WW..WW....'], { W:'#ffffff', K:'#2a1d14', P:'#f08aa0' }, 'linear-gradient(160deg,#c8f0ec,#6cc4c0)') },
  { id:'sad', name:'Empty Bowl', rarity:'common', glyph:'', ink:'#ffffff', flavour:'Saw the bottom of the bowl. Inconsolable.',
    art: pixelArt(['.G..........G.', '.GG........GG.', '.GGGGGGGGGGGG.', 'GGGGGGGGGGGGGG', 'GGKKWGGGGKKWGG', 'GGKKKGGGGKKKGG', 'GGbGGGPPGGGbGG', '.GbGGGGGGGGbG.',
                   '..GGGGmmGGGG..', '...GGGGGGGG...'], { G:'#b4bacb', K:'#1c1a26', W:'#ffffff', b:'#7fd0ff', P:'#f08aa0', m:'#6f7590' }, 'linear-gradient(160deg,#6c7a9c,#3a4466)') },
  { id:'laser', name:'Laser Hunter', rarity:'common', glyph:'', ink:'#ffffff', flavour:'Has never caught it. Will never stop.',
    art: pixelArt(['..............', '....T.T.......', '...TTTTT......', '...TTKTK......', 'TTTTTTTTP.....', 'TTTtTTtT....R.', '.TT..TT.......'],
                  { T:'#c9a06a', t:'#a07a48', K:'#2a1d14', P:'#f08aa0', R:'#ff2a2a' }, 'radial-gradient(circle at 86% 62%,rgba(255,60,60,.55) 0 5%,transparent 16%),linear-gradient(160deg,#3a3148,#1f1a2c)') },
  { id:'scream', name:'Dinner Alarm', rarity:'uncommon', glyph:'', ink:'#3a2410', flavour:'Dinner is four minutes late. Everyone must know.',
    art: pixelArt(['.N..........N.', '.NN........NN.', '.NNNNNNNNNNNN.', 'NNNNNNNNNNNNNN', 'NNWkNNNNNNkWNN', 'NNNNNWWWWNNNNN', 'NNNNWRRRRWNNNN', '.NNNWRPPRWNNN.',
                   '.NNNWWRRWWNNN.', '..NNWWWWWWNN..'], { N:'#2a2636', W:'#ffffff', k:'#000000', R:'#c8323c', P:'#f08aa0' }, 'repeating-conic-gradient(#ffe27a 0 12deg,#ffc94a 12deg 24deg)') },
  { id:'gravity', name:'Gravity Check', rarity:'uncommon', glyph:'', ink:'#3a2410', flavour:'Pushed it off the table. Gravity still works.',
    art: pixelArt(['..........C.C.', '.........CCCCC', '.........CKCCC', '.....CCCCCCCCC', '..MM...CCCCCCC', '..MM...CCCCCCC', '....TTTTTTTTTT', '..s.T.........', '..s.T.........'],
                  { C:'#f3e3c3', K:'#3a6fd0', M:'#e0463c', T:'#b07a4a', s:'#ffffff' }, 'linear-gradient(160deg,#dff0e4,#9ccfae)') },
  { id:'cuke', name:'Cucumber Panic', rarity:'uncommon', glyph:'', ink:'#123a1a', flavour:'Unknown green object detected. Launching.',
    art: pixelArt(['...N......N...', '...NNNNNNNN...', '...NWKNNWKN...', '...NNNPPNNN...', '..NNNNNNNNNN..', '.N.NNNNNNNN.N.', 'N...NN..NN...N', '..............', '..............',
                   '...UUUUUUUU...', '..UuUUuUUuUU..'], { N:'#9aa0b4', W:'#ffffff', K:'#1c1a26', P:'#f08aa0', U:'#4a9a4a', u:'#7ac06a' }, 'linear-gradient(160deg,#eef8d8,#b9dc8a)') },
  { id:'boss', name:'Business Cat', rarity:'rare', glyph:'', ink:'#ffffff', flavour:"Let's circle back after my nap.",
    art: pixelArt(['.N..........N.', '.NN........NN.', '.NNNNNNNNNNNN.', 'NNNNNNNNNNNNNN', 'NNYKNNNNNNYKNN', 'NNNNNNPPNNNNNN', '.NNNNWWWWNNNN.', '..WWWWRRWWWW..',
                   '..SSSSRRSSSS..', '..SSSSRRSSSS..', '..SSSSSRSSSS..'], { N:'#6a6f84', Y:'#ffd84a', K:'#1c1a26', P:'#f08aa0', W:'#ffffff', R:'#d93a34', S:'#2b3148' }, 'linear-gradient(150deg,#0f2d6b,#2b7fe0 55%,#8fd0ff)') },
];
// Turns a grid of letters into a crisp pixel-art image layered over a background, for a card's `art`.
function pixelArt(rows, pal, behind) {
  let rects = '';
  rows.forEach((row, y) => [...row].forEach((ch, x) => { if (pal[ch]) rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${pal[ch]}"/>`; }));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges">${rects}</svg>`;
  return `url('data:image/svg+xml,${encodeURIComponent(svg)}') center / 78% auto no-repeat, ${behind}`;
}
CARDS.forEach(c => { c.set ||= 'cats'; });
const inSet = k => CARDS.filter(c => c.set === k);
// Copies other people already hold, so serial numbers look like a live set.
const SEED_SERIALS = { hello:37, night:29, board:14, hack:6, keynote:1, loaf:22, keys:18, prowl:9, box:4, lucky:0, bowl:16, peek:12, blep:11, chef:7, paws:5, zoom:3, judge:2, duo:0, buffer:19, long:15, sad:13, laser:10, scream:8, gravity:6, cuke:5, boss:2 };

/* ================= helpers ================= */
const $ = id => document.getElementById(id);
const wait = ms => new Promise(r => setTimeout(r, ms));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
const pad = n => String(n).padStart(3, '0');
const initials = CONFIG.name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
const byId = id => CARDS.find(c => c.id === id);
const profileUrl = () => CONFIG.url || location.href.split('#')[0];
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
};
// Sound: everything is synthesised (no files). A small engine gives each voice an envelope and sends some of it through a reverb.
// Off until the visitor turns it on.
const midiHz = m => 440 * 2 ** ((m - 69) / 12);
const Sound = {
  on: store.get('cardstock-sound', false), ac: null, out: null, wet: null,
  init(ctx) {                                               // `ctx` lets a test render into an offline context
    const a = this.ac = ctx || new (window.AudioContext || window.webkitAudioContext)();
    const comp = a.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 6; comp.connect(a.destination);
    this.out = a.createGain(); this.out.gain.value = 2.4; this.out.connect(comp);   // master level; the compressor after it stops loud moments clipping
    const n = a.sampleRate * 2.2 | 0, ir = a.createBuffer(2, n, a.sampleRate);   // reverb: two seconds of decaying noise as the room
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2.6); }
    const conv = a.createConvolver(); conv.buffer = ir; this.wet = a.createGain(); this.wet.gain.value = .5; this.wet.connect(conv); conv.connect(this.out);
    if (!ctx) fetch('splash.mp3').then(r => r.arrayBuffer()).then(b => a.decodeAudioData(b)).then(b => { this.splashBuf = b; }).catch(() => {});   // recorded splash; the synth one below plays until it loads
  },
  send(node, wet) { node.connect(this.out); if (wet) { const g = this.ac.createGain(); g.gain.value = wet; node.connect(g); g.connect(this.wet); } },
  // One oscillator: pitch f (gliding to `to`, or following `curve`), length d, volume v, start delay `at`, attack a, reverb `wet`, optional vibrato and low-pass.
  v({ f, to, curve, d = .2, type = 'sine', v = .05, at = 0, a = .005, wet = 0, det = 0, vib = 0, lp = 0 }) {
    const ac = this.ac, t = ac.currentTime + at, o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.detune.value = det;
    if (curve) o.frequency.setValueCurveAtTime(new Float32Array(curve), t, d); else { o.frequency.setValueAtTime(f, t); if (to) o.frequency.exponentialRampToValueAtTime(to, t + d); }
    if (vib) { const l = ac.createOscillator(), lg = ac.createGain(); l.frequency.value = vib; lg.gain.value = (f || curve[0]) * .03; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + d); }
    g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(v, t + Math.min(a, d * .8)); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); let node = g;
    if (lp) { node = ac.createBiquadFilter(); node.type = 'lowpass'; node.frequency.value = lp; g.connect(node); }
    this.send(node, wet); o.start(t); o.stop(t + d + .02);
  },
  // Filtered noise: for paper, air, water and impacts. The filter can sweep from f to `to`.
  n({ d = .3, v = .08, at = 0, type = 'bandpass', f = 1000, to, q = 1, a = .005, wet = 0 }) {
    const ac = this.ac, t = ac.currentTime + at, len = Math.max(1, ac.sampleRate * d | 0), buf = ac.createBuffer(1, len, ac.sampleRate), ch = buf.getChannelData(0);
    for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
    const src = ac.createBufferSource(), fl = ac.createBiquadFilter(), g = ac.createGain();
    fl.type = type; fl.Q.value = q; fl.frequency.setValueAtTime(f, t); if (to) fl.frequency.exponentialRampToValueAtTime(to, t + d);
    g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(v, t + Math.min(a, d * .8)); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    src.buffer = buf; src.connect(fl); fl.connect(g); this.send(g, wet); src.start(t);
  },
  fx: {
    // interface
    click() { this.v({ f: 1900, to: 1200, d: .04, v: .09 }); },
    on() { [72, 79].forEach((m, i) => this.v({ f: midiHz(m), d: .4, type: 'triangle', v: .06, at: i * .09, wet: .4 })); },
    // cats
    catch() { this.v({ f: 540, to: 1180, d: .1, v: .2 }); this.v({ f: 1760, d: .16, v: .08, at: .05, wet: .3 }); },
    gold() { [84, 88, 91, 96].forEach((m, i) => this.v({ f: midiHz(m), d: .5, type: 'triangle', v: .05, at: i * .06, wet: .5 })); this.n({ d: .5, v: .02, type: 'highpass', f: 6000, wet: .4 }); },
    meow() { this.v({ curve: [620, 940, 980, 880, 600], d: .42, type: 'sawtooth', v: .13, lp: 1900, wet: .2, a: .04 }); this.v({ curve: [1240, 1880, 1960, 1760, 1200], d: .42, v: .04, a: .04 }); },
    mrr() { this.v({ curve: [300, 360, 340], d: .32, type: 'sawtooth', v: .12, lp: 900, vib: 26, a: .03 }); },
    // packs and cards
    whoosh() { this.n({ d: .5, v: .14, f: 300, to: 2600, q: .8, a: .2, wet: .3 }); },
    next() { this.n({ d: .28, v: .12, f: 500, to: 2200, q: .9, a: .1, wet: .2 }); },
    tear(p = 0) { this.n({ d: .05, v: .07 + p * .05, type: 'highpass', f: 1800 + p * 2600 + Math.random() * 900, a: .002 }); this.n({ d: .03, v: .05, f: 700 + p * 500, q: 2 }); },   // one tick of foil giving way under the finger
    rip() {                                                 // foil pack torn open: a snap, a long rasp sweeping up as the strip comes away, crackle, and a low flap of the wrapper
      this.n({ d: .04, v: .22, type: 'highpass', f: 2200, a: .001 });
      this.n({ d: .5, v: .2, f: 900, to: 4200, q: .6, a: .02, wet: .15 }); this.n({ d: .45, v: .1, type: 'highpass', f: 5000, a: .03 });
      for (let i = 0; i < 26; i++) this.n({ d: .012 + Math.random() * .014, v: .07 + Math.random() * .06, type: 'highpass', f: 2000 + Math.random() * 4500, at: .02 + Math.pow(Math.random(), 1.4) * .46, a: .001 });
      this.n({ d: .12, v: .12, type: 'lowpass', f: 420, at: .44 }); this.v({ f: 150, to: 70, d: .1, v: .12, at: .45 });
    },
    thud() { this.v({ f: 170, to: 42, d: .26, v: .45 }); this.n({ d: .09, v: .2, type: 'lowpass', f: 260 }); },
    flip() { this.n({ d: .16, v: .18, f: 700, to: 3200 }); this.v({ f: 420, to: 840, d: .12, type: 'triangle', v: .15 }); },
    charge() { this.v({ f: 160, to: 1300, d: 1.1, type: 'sawtooth', v: .035, lp: 2400, vib: 14, a: .3, wet: .3 }); this.n({ d: 1.1, v: .03, f: 400, to: 5000, q: 2, a: .8, wet: .3 }); },
    card() { [81, 88].forEach((m, i) => this.v({ f: midiHz(m), d: .6, v: .05, at: i * .05, wet: .5 })); },
    rare() { [72, 76, 79, 84, 88].forEach((m, i) => { this.v({ f: midiHz(m), d: .7, type: 'triangle', v: .055, at: i * .075, wet: .55 }); this.v({ f: midiHz(m) * 2.76, d: .3, v: .012, at: i * .075 }); }); },
    legendary() {                                           // three rising chords, then a held chord with a shimmer on top
      const stab = (ms, at, d) => ms.forEach(m => this.v({ f: midiHz(m), d, type: 'sawtooth', v: .03, at, lp: 2600, wet: .5, det: (Math.random() - .5) * 14 }));
      stab([60, 64, 67, 72], 0, .3); stab([65, 69, 72, 77], .22, .3); stab([67, 71, 74, 79], .44, .34); stab([72, 76, 79, 84, 88], .7, 1.6);
      [84, 88, 91, 96, 100, 103].forEach((m, i) => this.v({ f: midiHz(m), d: .6, v: .03, at: .75 + i * .07, wet: .6 }));
      this.v({ f: 65, to: 40, d: .6, v: .14, at: .7 });
    },
    shiny() { for (let i = 0; i < 16; i++) this.v({ f: midiHz([84, 86, 88, 91, 93, 96, 98, 100][Math.random() * 8 | 0] + (Math.random() < .4 ? 12 : 0)), d: .4, v: .025, at: i * .07 + Math.random() * .03, wet: .6 }); },
    treats() { this.v({ f: 988, d: .08, type: 'triangle', v: .06 }); this.v({ f: 1319, d: .35, type: 'triangle', v: .06, at: .08, wet: .3 }); },
    lucky() { this.fx.treats.call(this); [72, 76, 79, 84].forEach((m, i) => this.v({ f: midiHz(m), d: .6, type: 'triangle', v: .05, at: .25 + i * .08, wet: .5 })); },
    craft() { this.v({ f: 1319, to: 660, d: .18, type: 'triangle', v: .05 }); [76, 83, 88].forEach((m, i) => this.v({ f: midiHz(m), d: .6, type: 'triangle', v: .05, at: .15 + i * .07, wet: .5 })); },
    // scenes
    whistle() { this.v({ f: 480, to: 1900, d: .38, v: .025, vib: 30 }); this.n({ d: .38, v: .01, type: 'highpass', f: 4000, a: .2 }); },
    boom() { this.n({ d: 1.1, v: .12, type: 'lowpass', f: 520, to: 60, wet: .5 }); this.v({ f: 95, to: 32, d: .6, v: .1 }); for (let i = 0; i < 12; i++) this.n({ d: .03, v: .02, type: 'highpass', f: 3000 + Math.random() * 4000, at: .15 + Math.random() * .9, wet: .3 }); },
    petals() { this.n({ d: .45, v: .035, type: 'highpass', f: 3500, a: .2, wet: .4 }); [93, 98, 100].forEach((m, i) => this.v({ f: midiHz(m), d: .5, v: .018, at: i * .09, wet: .6 })); },
    lantern() { [69, 76, 81].forEach((m, i) => this.v({ f: midiHz(m), d: 1.4, v: .035, at: i * .02, wet: .7, a: .02 })); this.v({ f: midiHz(69) * 2.76, d: .4, v: .008 }); },
    splash() {
      if (this.splashBuf) { const src = this.ac.createBufferSource(), g = this.ac.createGain(); src.buffer = this.splashBuf; g.gain.value = .26; src.connect(g); g.connect(this.out); return src.start(0, .22); }   // skip the silence at the start of the recording
      //                                            // noise only, no tones and no reverb: pitched blips and the reverb tail made it ring like metal
      this.n({ d: .09, v: .2, type: 'lowpass', f: 700, a: .004 });                                  // the body hitting the water
      this.n({ d: .7, v: .26, type: 'lowpass', f: 3800, to: 500, q: .3, a: .03 });                  // the wash: bright, then dulling as it settles
      this.n({ d: .5, v: .08, type: 'highpass', f: 3500, q: .3, a: .06, at: .03 });                 // spray hiss
      for (let i = 0; i < 10; i++) this.n({ d: .03 + Math.random() * .03, v: .05, f: 1200 + Math.random() * 1800, q: .9, a: .008, at: .2 + Math.random() * .5 });   // drops pattering back
    },
    bell() { for (let i = 0; i < 8; i++) { const f = i % 2 ? 575 : 700, at = i * .26; this.v({ f, d: .24, type: 'triangle', v: .07, at, wet: .25 }); this.v({ f: f * 2.76, d: .12, v: .02, at }); this.v({ f: f * 5.4, d: .06, v: .01, at }); } },
    train() { this.n({ d: 5.5, v: .3, type: 'lowpass', f: 160, a: 1.6, wet: .2 }); for (let i = 0; i < 14; i++) { const at = .9 + i * .3; this.n({ d: .05, v: .14, f: 900, q: 2, at }); this.n({ d: .05, v: .12, f: 700, q: 2, at: at + .09 }); } },
    horn() { [349, 440].forEach(f => this.v({ f, d: .7, type: 'sawtooth', v: .05, lp: 1400, a: .04, wet: .4 })); },
    gulls() { for (let i = 0; i < 3; i++) this.v({ curve: [1300, 2000, 1700, 1200], d: .3, type: 'triangle', v: .05, at: i * .38, lp: 3000, wet: .5, a: .03 }); },
    rain() { this.n({ d: 5, v: .035, type: 'highpass', f: 5000, a: 1, wet: .2 }); },
    rainbow() { [72, 74, 76, 79, 81, 84].forEach((m, i) => this.v({ f: midiHz(m), d: .9, v: .04, at: i * .11, wet: .7 })); },
    meteors() { for (let i = 0; i < 10; i++) this.v({ f: 3200 - i * 170, to: 1400 - i * 60, d: .35, v: .04, at: i * .17, wet: .7 }); },
    lamp() { this.n({ d: .03, v: .2, type: 'highpass', f: 2000 }); this.v({ f: 120, d: .25, type: 'square', v: .05, at: .02, lp: 600 }); },
    foghorn() { this.v({ f: 110, d: 1.8, type: 'sawtooth', v: .07, lp: 500, a: .3, wet: .6 }); this.v({ f: 165, d: 1.8, v: .03, a: .3, wet: .6 }); },
    festival() { for (let i = 0; i < 12; i++) this.v({ f: midiHz([69, 72, 76, 79, 81, 84][Math.random() * 6 | 0]), d: 1.2, v: .03, at: i * .16, wet: .7 }); },
    secret() { [79, 83, 86, 91].forEach((m, i) => this.v({ f: midiHz(m), d: .5, type: 'triangle', v: .05, at: i * .09, wet: .5 })); },
  },
  // Quiet background for each scene, called every 0.6 s: waves and far gulls by day, softer waves and wind at dusk, crickets at night, birds and a breeze in the morning.
  ambient(phase, n) {
    if (!this.on || !this.ac || document.hidden || !$('stageWrap').hidden) return;
    try {
      const R = Math.random;
      if (phase === 'day') { if (n % 9 === 0) this.n({ d: 4.2, v: .022, type: 'lowpass', f: 500, to: 900, a: 2, wet: .3 }); if (R() < .03) this.v({ curve: [1300, 1900, 1200], d: .3, type: 'triangle', v: .005, lp: 2600, wet: .7, a: .03 }); }
      if (phase === 'evening') { if (n % 10 === 0) this.n({ d: 4.6, v: .016, type: 'lowpass', f: 420, to: 760, a: 2.2, wet: .4 }); if (n % 7 === 3) this.n({ d: 3, v: .008, f: 400, to: 700, q: 3, a: 1.5, wet: .4 }); }
      if (phase === 'night' && n % 2 === 0) [0, .07, .14].forEach(at => { this.v({ f: 4200, d: .04, v: .005, at }); this.v({ f: 4275, d: .04, v: .004, at }); });
      if (phase === 'morning') {
        if (n % 12 === 0) this.n({ d: 4, v: .007, f: 600, to: 1100, q: 2, a: 2, wet: .4 });
        if (R() < .28) { const f = 2300 + R() * 1200, k = 2 + (R() * 4 | 0); for (let i = 0; i < k; i++) this.v({ f: f * (1 + i * .04), to: f * (1.25 + i * .04), d: .07, v: .008, at: i * .1, wet: .4 }); }
      }
    } catch (e) {}
  },
  play(name, arg) {
    if (!this.on) return;
    try {
      if (!this.ac) this.init();
      if (this.ac.state === 'suspended') this.ac.resume();
      if (this.fx[name]) this.fx[name].call(this, arg);
    } catch (e) {}                                          // no audio available: stay silent
  },
};
// A soft click on every button, icon and chip.
addEventListener('click', e => { if (e.target.closest('.btn, .icoL, .chip, .hud, .pk-mini, .more-btn, .slot, button.empty')) Sound.play('click'); });
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600); }
async function copy(text, done) {
  try { await navigator.clipboard.writeText(text); toast(done); } catch (e) { toast('Copy failed. Select the text and copy it instead.'); }
}
// Ink ripple on every button and icon, from where the finger lands.
addEventListener('pointerdown', e => {
  const el = e.target.closest('.ico, .btn'); if (!el || reduced()) return;
  const r = el.getBoundingClientRect(), s = Math.max(r.width, r.height), dot = document.createElement('span');
  dot.className = 'ripple'; dot.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  el.append(dot); setTimeout(() => dot.remove(), 600);
});

/* ================= "server" ================= */
// shortcut: the roll runs in this browser and is saved in localStorage, so anyone can edit it; serials only count this browser's pulls.
// Move rollPack into the Supabase pack function (doc: Architecture) before real use.
let S = store.get('cardstock-state', null) || { pulls: [], serials: { ...SEED_SERIALS }, dupStreak: 0 };
let packSet = SETS[store.get('cardstock-set', 'cats')] ? store.get('cardstock-set', 'cats') : 'cats';   // which pack the visitor is opening
const server = {
  roll() {                                                  // resolves with the pack's cards, in the order they are revealed
    return new Promise((resolve, reject) => setTimeout(() => {
      const cards = inSet(packSet), now = Date.now(), first = rollPack(S, cards, now, Math.random(), Math.random());
      if (first.wait) return reject(new Error('cooldown'));
      let state = first.state; const pulls = [first.pull];
      while (pulls.length < PACK_SIZE) { const o = drawCard(state, cards, now, Math.random(), Math.random(), first.pull.lucky); state = o.state; pulls.push(o.pull); }
      S = state; checkSets(); store.set('cardstock-state', S); resolve(pulls);
    }, 350));
  },
};
// Finishing a pack's whole set earns a lucky pack and an outfit for a mascot. The message waits until the pack screen closes.
let pendingToast = '';
function checkSets() {
  S.done ||= [];
  for (const k of Object.keys(SETS)) if (!S.done.includes(k) && inSet(k).every(c => S.pulls.some(p => p.id === c.id))) {
    S.done.push(k); S.bonus = (S.bonus || 0) + 1;
    pendingToast = `${SETS[k].name} complete. You earned a lucky pack, and ${SETS[k].reward}.`;
  }
}

/* ================= card rendering ================= */
// The copy to show for a card the collector owns: a shiny one if they have it, otherwise their lowest serial.
function bestPull(id) { const mine = S.pulls.filter(p => p.id === id); return mine.find(p => p.shiny) || mine.reduce((a, b) => a.serial < b.serial ? a : b, mine[0]); }
const RAINBOW = ['#ff6ad5', '#ffd36a', '#7dffb0', '#6ad4ff', '#b58cff', '#ffffff'];
function cardHTML(card, pull, extraClass = '') {
  const tier = TIERS[card.rarity], mates = inSet(card.set), n = mates.indexOf(card) + 1;
  const shiny = pull && pull.shiny;
  return `<div class="card r-${card.rarity} ${shiny ? 'shiny' : ''} ${extraClass}">
    <div class="cf">
      <div class="c-head"><span>${shiny ? '✦ ' : ''}${esc(card.name)}</span><span class="c-pip" title="${tier.label}">${tier.sym}</span></div>
      <div class="c-art" style="background:${card.art};color:${card.ink};${card.gs ? '--gs:' + card.gs : ''}"><span class="g">${esc(card.glyph)}</span><span class="o">${initials}</span></div>
      <div class="c-type">${shiny ? 'Shiny · ' : ''}${esc(card.star || CONFIG.name)} · ${tier.label}</div>
      <p class="c-flav">${esc(card.flavour)}</p>
      <div class="c-foot"><span>${pull ? '#' + pad(pull.serial) : 'S1'}</span>${pull && pull.first ? '<span class="c-1st">1st Edition</span>' : ''}<span>${n}/${mates.length}</span></div>
    </div></div>`;
}

/* ================= profile ================= */
const SVG = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.100-1.500-1.100-1.500-.9-.6.1-.6.1-.6 1 .1 1.500 1 1.500 1 .9 1.500 2.300 1.100 2.900.8.1-.6.300-1.100.6-1.300-2.200-.3-4.600-1.100-4.600-5a3.900 3.900 0 0 1 1-2.700c-.1-.3-.4-1.300.1-2.700 0 0 .8-.3 2.700 1a9.400 9.400 0 0 1 5 0c1.900-1.300 2.700-1 2.700-1 .5 1.400.2 2.400.1 2.700a3.900 3.900 0 0 1 1 2.700c0 3.900-2.400 4.700-4.600 5 .4.300.7.900.7 1.800v2.700c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 3.2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM3.3 9h3.4v11.5H3.3zM9 9h3.3v1.6c.5-.9 1.7-1.9 3.6-1.9 3.5 0 4.1 2.3 4.1 5.2v6.6h-3.4v-5.9c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v6H9z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.4 3.7 2.9 10.9c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.5c.2.7.4.9.9.9.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.5-1.4zM8.9 13.7l9.3-5.9c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.3z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
  contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10" cy="8" r="3.6"/><path d="M3.5 20c.6-3.6 3.2-5.6 6.5-5.6 1.5 0 2.8.4 3.9 1.1M18.5 14v6M15.5 17h6"/></svg>',
  qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1"/></svg>',
};
function renderProfile() {
  $('name').textContent = CONFIG.name;
  $('role').textContent = CONFIG.title;
  $('bio').textContent = CONFIG.bio;
  $('avatar').innerHTML = CONFIG.photo ? `<img src="${esc(CONFIG.photo)}" alt="Photo of ${esc(CONFIG.name)}" onerror="this.replaceWith('${initials}')">` : initials;
  $('pkMono').textContent = $('backMono').textContent = initials;
  $('pkName').textContent = CONFIG.name;
  $('stageLabel').textContent = `Series 1 · ${CONFIG.name}`;
  $('qrTitle').textContent = CONFIG.name;
  $('ownerName').textContent = CONFIG.name;
  const firstName = CONFIG.name.split(' ')[0];
  $('helloTitle').textContent = `Send ${firstName} your details`; $('helloBtn').textContent = `Send ${firstName} your details`;
  const projects = CONFIG.projects.length ? CONFIG.projects
    : CONFIG.github ? [{ name: 'See my projects on GitHub', blurb: 'github.com/' + CONFIG.github, url: 'https://github.com/' + CONFIG.github }] : [];
  $('projects').hidden = !projects.length;
  $('projects').innerHTML = '<span class="label">Projects</span>' + projects.map(p => {
    const inner = `<b>${esc(p.name)}${p.url ? ' ↗' : ''}</b><span>${esc(p.blurb)}</span>`;
    return p.url ? `<a class="proj" href="${esc(p.url)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="proj">${inner}</div>`; }).join('');

  const items = [
    CONFIG.email     && { k: 'email',     label: 'Email ' + CONFIG.email, href: 'mailto:' + CONFIG.email },
    CONFIG.linkedin  && { k: 'linkedin',  label: 'LinkedIn',               href: CONFIG.linkedin },
    CONFIG.telegram  && { k: 'telegram',  label: 'Telegram @' + CONFIG.telegram, href: 'https://t.me/' + CONFIG.telegram },
    CONFIG.instagram && { k: 'instagram', label: 'Instagram @' + CONFIG.instagram, href: 'https://www.instagram.com/' + CONFIG.instagram },
    CONFIG.github    && { k: 'github',    label: 'GitHub @' + CONFIG.github, href: 'https://github.com/' + CONFIG.github },
    { k: 'qr',      label: 'Show QR code',    act: 'qr' },
  ].filter(Boolean);
  $('icons').style.gridTemplateColumns = `repeat(${items.length}, minmax(0,1fr))`;
  const NAMES = { email: 'Email', linkedin: 'LinkedIn', telegram: 'Telegram', instagram: 'Instagram', github: 'GitHub', qr: 'QR code' };
  const inner = i => `<span class="ico ico-${i.k}">${SVG[i.k]}</span><small>${NAMES[i.k]}</small>`;
  $('icons').innerHTML = items.map(i => i.href
    ? `<a class="icoL" href="${esc(i.href)}" target="_blank" rel="noopener" aria-label="${esc(i.label)}" title="${esc(i.label)}">${inner(i)}</a>`
    : `<button class="icoL" data-act="${i.act}" aria-label="${i.label}" title="${i.label}">${inner(i)}</button>`).join('');
  $('icons').addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    b.dataset.act === 'contact' ? saveContact() : openQR();
  });
  $('icons').addEventListener('pointerover', () => { scene.waving = true; });
  $('icons').addEventListener('pointerleave', () => { scene.waving = false; });
}

function renderOdds() {
  const cards = inSet(packSet);
  const odds = cardOdds(cards), tierPct = {}, tierN = {};
  cards.forEach(c => { tierPct[c.rarity] = (tierPct[c.rarity] || 0) + odds[c.id]; tierN[c.rarity] = (tierN[c.rarity] || 0) + 1; });
  $('oddsTable').innerHTML = Object.keys(TIERS).filter(t => tierN[t]).map(t =>
    `<tr><td><span class="r-${t}" style="color:var(--rc)">${TIERS[t].sym}</span> ${TIERS[t].label} <span style="color:var(--muted)">(${tierN[t]} card${tierN[t] > 1 ? 's' : ''})</span></td><td>${(tierPct[t] * 100).toFixed(1)}%</td></tr>`).join('') +
    `<tr><td colspan="2" style="color:var(--muted);border:0">You hold up to ${PACK_MAX} packs and one refills every hour. After 3 duplicates in a row, the next card is one you don't have. ${PACK_SIZE} cards per pack. Duplicates turn into treats, which you can spend in the binder on a card you are missing. Catch ${CATS_PER_LUCKY} cats to earn a lucky pack, which has no Commons. Any card has a 1 in 100 chance of being a shiny holo copy.</td></tr>`;
}

function fmtWait(ms) { const m = Math.ceil(ms / 60000), h = Math.floor(m / 60); return h ? `${h}h ${m % 60}m` : `${m}m`; }
function renderCollect() {
  const left = packsLeft(S, Date.now()), bonus = S.bonus || 0, btn = $('openBtn'), treats = S.treats || 0;
  const owned = new Set(S.pulls.map(p => p.id));
  btn.disabled = !bonus && left.n < 1;
  btn.classList.toggle('lucky', bonus > 0);
  btn.textContent = bonus ? 'Open lucky pack ★' : left.n ? 'Open a pack →' : `Next pack in ${fmtWait(left.nextIn)}`;
  $('setPick').innerHTML = Object.keys(SETS).map(k => { const cards = inSet(k), have = cards.filter(c => owned.has(c.id)).length;
    return `<button class="pk-mini set-${k}${k === packSet ? ' on' : ''}" data-set="${k}" aria-pressed="${k === packSet}"><span class="pk-mini-art" style="background:${SETS[k].art}"></span><b>${SETS[k].name}</b><span>${have}/${cards.length}${have === cards.length ? ' ✓' : ''}</span></button>`; }).join('');
  renderOdds();
  const toLucky = CATS_PER_LUCKY - score % CATS_PER_LUCKY;
  $('packStatus').textContent = (bonus ? `${bonus} lucky pack${bonus > 1 ? 's' : ''} ready: no Commons inside.`
    : `${left.n} of ${PACK_MAX} packs left${left.n < PACK_MAX ? `, next in ${fmtWait(left.nextIn)}` : ''}. Catch ${toLucky} more cat${toLucky > 1 ? 's' : ''} for a lucky pack.`)
    + (treats ? ` ${treats} treat${treats > 1 ? 's' : ''} to spend in the binder.` : '');
  $('binderCount').textContent = `${owned.size}/${CARDS.length}`;
  $('strip').style.gridTemplateColumns = `repeat(${CARDS.length > 10 ? Math.ceil(CARDS.length / 2) : CARDS.length}, minmax(0,1fr))`;
  $('strip').innerHTML = CARDS.map(c => owned.has(c.id) ? `<span class="mini">${cardHTML(c, bestPull(c.id))}</span>` : `<span class="mini none">?</span>`).join('');
}

/* ================= contact, QR, link ================= */
// The profile photo, read once at load so the saved contact can carry it. Save contact still works if this fails.
let photoB64 = '';
if (CONFIG.photo) fetch(CONFIG.photo).then(r => r.ok ? r.blob() : Promise.reject()).then(b => new Promise(done => { const fr = new FileReader(); fr.onload = () => done(fr.result); fr.readAsDataURL(b); }))
  .then(u => { photoB64 = String(u).split(',')[1] || ''; }).catch(() => {});
function saveContact() {
  const v = s => String(s).replace(/([\\,;])/g, '\\$1');
  const [first, ...rest] = CONFIG.name.split(' ');
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${v(rest.join(' '))};${v(first)};;;`, `FN:${v(CONFIG.name)}`,
    CONFIG.org && `ORG:${v(CONFIG.org)}`, CONFIG.title && `TITLE:${v(CONFIG.title)}`,
    CONFIG.phone && `TEL;TYPE=CELL:${CONFIG.phone.replace(/\s/g, '')}`, CONFIG.email && `EMAIL:${CONFIG.email}`,
    photoB64 && `PHOTO;ENCODING=b;TYPE=JPEG:${photoB64}`, `URL:${profileUrl()}`, 'END:VCARD'].filter(Boolean).join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([lines], { type: 'text/vcard' }));
  a.download = CONFIG.name.replace(/\W+/g, '_') + '.vcf';
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);   // revoking straight away can cancel the download in Safari
  toast('Opening the contact card. Add it to Contacts.');
}
let qrDrawn = false;
function openQR() {
  $('qrUrl').textContent = profileUrl();
  if (!qrDrawn && window.QRCode) {
    new QRCode($('qrBox'), { text: profileUrl(), width: 220, height: 220, colorDark: '#18161f', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
    qrDrawn = true;
  } else if (!window.QRCode) $('qrBox').textContent = 'QR code unavailable offline. Share the link below.';
  openModal('qrModal');
}
function openModal(id) { $(id).hidden = false; $(id).querySelector('[data-close]').focus(); }
document.querySelectorAll('.scrim').forEach(m => m.addEventListener('click', e => { if (e.target === m || e.target.hasAttribute('data-close')) m.hidden = true; }));
addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.scrim').forEach(m => { m.hidden = true; }); });
$('setPick').addEventListener('click', e => { const b = e.target.closest('[data-set]'); if (!b) return; packSet = b.dataset.set; store.set('cardstock-set', packSet); renderCollect(); });
$('helloBtn').onclick = () => { openModal('helloModal'); $('helloName').focus(); };
$('helloForm').addEventListener('submit', e => {            // opens the visitor's own mail app with the message filled in; nothing is sent from here
  e.preventDefault();
  const name = $('helloName').value.trim(), note = $('helloNote').value.trim(), reach = $('helloReach').value.trim();
  const text = [`Hi ${CONFIG.name.split(' ')[0]}, this is ${name}.`, note && `We met: ${note}.`, reach && `You can reach me at ${reach}.`, '(Sent from your card)'].filter(Boolean).join(' ');
  const href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Hello from ' + name)}&body=${encodeURIComponent(text)}`;
  const a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; document.body.append(a); a.click(); a.remove();
  $('helloModal').hidden = true; toast('Opening your mail app. Press send there.');
});
// Share text and the card's link through the phone's share sheet, or copy it where that is not available.
async function shareText(text) {
  const url = profileUrl();
  if (navigator.share) { try { await navigator.share({ text, url }); return; } catch (e) { if (e.name === 'AbortError') return; } }
  copy(`${text} ${url}`, 'Copied. Paste it anywhere to share.');
}
const pullLabel = p => `${p.shiny ? 'a shiny ' : ''}${byId(p.id).name} (${TIERS[byId(p.id).rarity].label})`;
$('qrSave').onclick = saveContact; $('saveBtn').onclick = saveContact; $('detailSave').onclick = saveContact;

/* ================= pack opening: six beats ================= */
const st = { token: 0, beat: 0, pull: null, pulls: null, i: 0 };   // pulls = the pack's cards; pull = the one on stage
const pack = $('pack'), flipbox = $('flipbox'), hint = $('hint'), result = $('result'), skipBtn = $('skipBtn'), slotbox = $('slotbox');
function setBeat(n, text) { st.beat = n; hint.textContent = text; }

function resetStage() {
  slotbox.classList.add('instant');
  pack.className = 'pack'; pack.style.setProperty('--tear', 0);
  pack.querySelector('.burst').classList.remove('on');
  flipbox.className = 'flipbox'; slotbox.classList.remove('fadein', 'revealed');
  result.hidden = true; skipBtn.hidden = true;
  $('confetti').innerHTML = ''; $('confetti').className = 'confetti';
  $('fx').innerHTML = ''; $('rays').className = 'rays'; $('stageWrap').classList.remove('shiny'); $('shock').className = 'shock'; $('stageWrap').classList.remove('shake');
  for (const v of ['--tx', '--ty']) slotbox.style.removeProperty(v);
  for (const v of ['--spin', '--spinT']) flipbox.style.removeProperty(v);
  void slotbox.offsetWidth; slotbox.classList.remove('instant');
}

// Puts card i of the pack on the stage, face down.
function stageCard(i) {
  const pull = st.pull = st.pulls[st.i = i], card = byId(pull.id);
  $('stageWrap').style.setProperty('--rc', `var(--r-${card.rarity})`);
  slotbox.className = `slotbox r-${card.rarity}`;
  $('stageWrap').classList.toggle('shiny', !!pull.shiny);
  $('frontFace').innerHTML = cardHTML(card, pull);
}
async function openPack() {
  const tok = ++st.token; st.pull = st.pulls = null;
  resetStage();
  const lucky = (S.bonus || 0) > 0;                        // a lucky pack is gold
  pack.classList.toggle('lucky', lucky);
  pack.classList.add('set-' + packSet);
  pack.querySelector('.pk-series').textContent = lucky ? 'NO COMMONS' : `${PACK_SIZE} CARDS`;
  $('pkTitle').textContent = lucky ? 'Lucky Pack' : SETS[packSet].title;
  $('pkArt').style.background = lucky ? RAYS + ', radial-gradient(circle,#fffbe0,#f2c14e 65%,#b07a1a)' : SETS[packSet].art;
  $('pkArt').textContent = lucky ? '★' : '';
  $('stageLabel').textContent = `${SETS[packSet].name} · ${CONFIG.name}`;
  $('stageWrap').style.removeProperty('--rc');
  $('stageWrap').hidden = false; document.body.style.overflow = 'hidden';
  if (!reduced()) { pack.classList.add('drop'); Sound.play('whoosh'); }
  setBeat(1, '');                                           // beat 1: pack appears while the server rolls
  let pull;
  try { [pull] = await Promise.all([server.roll(), wait(reduced() ? 0 : 900)]); }
  catch (e) {
    if (tok !== st.token) return;
    pack.classList.add('err');
    setBeat(0, e.message === 'cooldown' ? 'No pack yet. Come back when the timer ends.' : 'The pack could not be opened. Check your connection and try again.');
    return;
  }
  if (tok !== st.token) return;
  st.pulls = pull; stageCard(0);
  skipBtn.hidden = false; renderCollect();
  if (reduced()) return showResult(true);
  pack.classList.replace('drop', 'idle');
  setBeat(2, 'Swipe across the top to open it');            // beat 2: visitor rips
  pack.focus({ preventScroll: true });
}

// Pixel sparks flying out from a point on screen.
function fxSparks(x, y, n, colours, reach = 120) {
  if (reduced()) return;
  const box = $('fx');
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, d = reach * (.35 + Math.random() * .65), b = document.createElement('b');
    b.style.cssText = `left:${x}px;top:${y}px;background:${colours[i % colours.length]};--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--d:${.45 + Math.random() * .45}s`;
    box.append(b); setTimeout(() => b.remove(), 950);
  }
}
function shockwave(sy) { const el = $('shock'); el.style.setProperty('--sy', sy); el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); }
function shake() { const w = $('stageWrap'); w.classList.remove('shake'); void w.offsetWidth; w.classList.add('shake'); }
const rarityCols = r => ({ common: ['#c9ced6', '#ffffff'], uncommon: ['#2f9e6a', '#9ff0c4', '#ffffff'], rare: ['#2b7fe0', '#8fd0ff', '#ffffff'], legendary: ['#e0a21b', '#fff2c4', '#ff8a5c', '#ffffff'] }[r]);
// The pack, then the card, tilts in 3D toward the pointer; on the revealed card the foil follows too.
$('stageWrap').addEventListener('pointermove', e => {
  if (reduced() || st.beat < 2) return;
  const r = slotbox.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.height - .5;
  const cl = v => Math.max(-1, Math.min(1, v));
  slotbox.style.setProperty('--hx', (cl(dx) + .5).toFixed(3));   // the pack's holographic foil slides with the tilt
  slotbox.style.setProperty('--ty', `${cl(dx) * 16}deg`); slotbox.style.setProperty('--tx', `${cl(dy) * -12}deg`);
  const front = $('frontFace').firstElementChild;
  if (front && st.beat >= 5.5) front.style.setProperty('--fx', `${Math.round((cl(dx) + .5) * 100)}%`);
});
$('stageWrap').addEventListener('pointerleave', () => { slotbox.style.setProperty('--tx', '0deg'); slotbox.style.setProperty('--ty', '0deg'); });

let drag = null, lastSpark = 0;
pack.addEventListener('pointerdown', e => {
  if (st.beat !== 2) return;
  drag = { x: e.clientX, w: pack.getBoundingClientRect().width, p: 0 };
  pack.setPointerCapture(e.pointerId); pack.classList.replace('idle', 'tearing');
});
pack.addEventListener('pointermove', e => {
  if (!drag) return;
  drag.p = Math.min(1, Math.abs(e.clientX - drag.x) / drag.w);
  pack.style.setProperty('--tear', drag.p);
  if (e.timeStamp - lastSpark > 45) {                       // sparks fly off the tear line under the finger
    const r = pack.getBoundingClientRect(); lastSpark = e.timeStamp;
    fxSparks(Math.max(r.left, Math.min(r.right, e.clientX)), r.top + r.height * .14, 2, ['#ffffff', '#ffe9a0'], 46);
    Sound.play('tear', drag.p);
  }
  if (drag.p >= 0.85) { drag = null; rip(); }
});
pack.addEventListener('pointerup', () => {
  if (!drag) return;
  const p = drag.p; drag = null;
  if (p > 0.45 || p < 0.03) rip();                          // a long swipe or a plain tap both open it
  else { pack.style.setProperty('--tear', 0); pack.classList.replace('tearing', 'idle'); }
});
pack.addEventListener('pointercancel', () => { drag = null; pack.style.setProperty('--tear', 0); pack.classList.replace('tearing', 'idle'); });
pack.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && st.beat === 2) { e.preventDefault(); rip(); } });

async function rip() {
  if (st.beat !== 2) return;
  const tok = st.token, rarity = byId(st.pull.id).rarity, r = pack.getBoundingClientRect();
  pack.style.setProperty('--tear', 1); pack.classList.remove('idle', 'tearing');
  setBeat(3, ''); pack.classList.add('ripped');             // beat 3: the top tears off; shockwave, sparks and rays in the rarity colour
  pack.querySelector('.burst').classList.add('on');
  shockwave('14%'); shake(); $('rays').classList.add('on');
  fxSparks(r.left + r.width / 2, r.top + r.height * .14, 26, rarityCols(rarity), 170);
  if (navigator.vibrate) navigator.vibrate(40);
  Sound.play('rip');
  await wait(450); if (tok !== st.token || st.beat !== 3) return;
  setBeat(4, ''); pack.classList.add('gone'); flipbox.classList.add('rise');   // beat 4: the card leaps out face down
  await wait(950); if (tok !== st.token || st.beat !== 4) return;
  setBeat(5, 'Tap the card to flip it');                    // beat 5: it trembles harder the rarer it is, until the visitor flips it
  flipbox.classList.add('tremble');
  flipbox.tabIndex = 0; flipbox.focus({ preventScroll: true });
}

// The flip scales with rarity: Common and Uncommon turn once; Rare winds up and spins; Legendary winds up longer and spins twice more.
const FLIPS = { common: [180, .55, 0], uncommon: [180, .6, 0], rare: [540, 1.05, 280], legendary: [900, 1.7, 520] };
async function flip() {
  if (st.beat !== 5) return;
  const shiny = st.pull.shiny, rarity = shiny ? 'legendary' : byId(st.pull.id).rarity;   // a shiny copy gets the full Legendary flip
  const tok = st.token, [spin, secs, windup] = FLIPS[rarity], big = windup > 0;
  st.beat = 5.5; hint.textContent = '';
  flipbox.classList.remove('tremble');
  if (big) {                                                // wind-up: the card pulls back while the rays speed up
    flipbox.classList.add('windup'); $('rays').classList.add('hot'); Sound.play('charge');
    await wait(windup); if (tok !== st.token) return;
    flipbox.classList.remove('windup');
  }
  flipbox.style.setProperty('--spin', spin + 'deg'); flipbox.style.setProperty('--spinT', secs + 's');
  flipbox.classList.add('flipped'); Sound.play('flip');
  await wait(secs * 1000 - 90); if (tok !== st.token) return;
  const r = slotbox.getBoundingClientRect();                // impact: the face lands
  shockwave('50%'); slotbox.classList.add('revealed'); Sound.play('thud');
  fxSparks(r.left + r.width / 2, r.top + r.height / 2, { common: 10, uncommon: 18, rare: 34, legendary: 60 }[rarity], shiny ? RAINBOW : rarityCols(rarity), big ? 260 : 150);
  if (big) { shake(); if (navigator.vibrate) navigator.vibrate(rarity === 'legendary' ? [40, 30, 80] : 50); }
  $('frontFace').firstElementChild.classList.add('sweep');
  await wait(big ? 650 : 280);
  if (tok !== st.token) return;
  if (st.i < st.pulls.length - 1) { st.beat = 5.8; hint.textContent = `Card ${st.i + 1} of ${st.pulls.length}. Tap for the next one`; }
  else showResult(false);
}
// Swaps the revealed card for the pack's next one, face down.
async function nextCard() {
  if (st.beat !== 5.8) return;
  const tok = st.token; st.beat = 4; hint.textContent = '';
  slotbox.classList.add('instant'); flipbox.className = 'flipbox';
  flipbox.style.removeProperty('--spin'); flipbox.style.removeProperty('--spinT');
  void slotbox.offsetWidth; stageCard(st.i + 1);
  $('rays').classList.remove('hot'); flipbox.classList.add('rise'); Sound.play('next');
  await wait(950); if (tok !== st.token || st.beat !== 4) return;
  setBeat(5, 'Tap the card to flip it'); flipbox.classList.add('tremble');
}
const flipOrNext = () => st.beat === 5.8 ? nextCard() : flip();
flipbox.addEventListener('click', flipOrNext);
flipbox.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipOrNext(); } });

// Rare and Legendary pulls get pixel confetti in the rarity's colours; Legendary also flashes the screen.
function celebrate(rarity, shiny) {
  const top = shiny || rarity === 'legendary';
  Sound.play(top ? 'legendary' : rarity === 'rare' ? 'rare' : 'card'); if (shiny) Sound.play('shiny');
  const cols = shiny ? RAINBOW : { rare: ['#2b7fe0', '#8fd0ff', '#ffffff'], legendary: ['#e0a21b', '#fff2c4', '#ff8a5c', '#ffffff'] }[rarity];
  if (!cols || reduced()) return;
  const box = $('confetti'), n = shiny ? 120 : top ? 90 : 40;
  if (top) { box.classList.add('flash'); if (navigator.vibrate) navigator.vibrate([30, 40, 60]); }
  box.insertAdjacentHTML('beforeend', Array.from({ length: n }, (_, i) =>
    `<i style="left:${Math.random() * 100}%;background:${cols[i % cols.length]};animation-duration:${1.4 + Math.random() * 1.6}s;animation-delay:${Math.random() * .5}s"></i>`).join(''));
}
function showResult(instant) {                              // beat 6: every card in the pack, with the last one on stage
  if (st.beat === 6 || !st.pulls) return;
  st.beat = 6; st.token++;
  const pulls = st.pulls, last = pulls.length - 1;
  if (instant) {
    if (st.i !== last) stageCard(last);
    slotbox.classList.add('instant');
    pack.classList.add('ripped', 'gone'); flipbox.className = 'flipbox rise flipped';
    void slotbox.offsetWidth; slotbox.classList.remove('instant');
    if (reduced()) slotbox.classList.add('fadein');
  }
  flipbox.tabIndex = -1; skipBtn.hidden = true; hint.textContent = '';
  flipbox.classList.remove('tremble', 'windup'); pack.classList.remove('idle', 'tearing'); slotbox.classList.add('revealed');
  const rank = p => (p.shiny ? 10 : 0) + Object.keys(TIERS).indexOf(byId(p.id).rarity), top = pulls.reduce((a, b) => rank(b) > rank(a) ? b : a);
  const anyShiny = pulls.some(p => p.shiny), treats = pulls.reduce((n, p) => n + (p.treats || 0), 0);
  $('rays').classList.add('on'); $('rays').classList.toggle('hot', rank(top) >= 2);
  const packs = packsLeft(S, Date.now()).n, more = packs > 0 || (S.bonus || 0) > 0;
  result.innerHTML = `<h2>${pulls.length} cards</h2>
    <ul class="pulled">${pulls.map(p => { const c = byId(p.id), tier = TIERS[c.rarity];
      return `<li class="r-${c.rarity}"><span class="mini">${cardHTML(c, p)}</span>
        <span class="pl-name">${p.shiny ? '✦ Shiny ' : ''}${esc(c.name)}<small>${tier.sym} ${tier.label} · #${pad(p.serial)}${p.first ? ' · 1st Ed.' : ''}</small></span>
        <span class="badge ${p.shiny ? 'shiny' : p.isNew ? 'new' : 'dup'}">${p.isNew ? 'New' : `+${p.treats} treat${p.treats > 1 ? 's' : ''}`}</span></li>`; }).join('')}</ul>
    ${treats ? `<p class="meta">Duplicates became ${treats} treat${treats > 1 ? 's' : ''}. You have ${S.treats}. Spend them in the binder.</p>` : ''}
    <div class="btns">${more ? `
      <button class="btn primary" data-go="again">${S.bonus ? 'Open lucky pack ★' : `Open another pack · ${packs} left`}</button>
      <button class="btn" data-go="binder">View binder</button>` : `
      <button class="btn primary" data-go="binder">View binder</button>
      <button class="btn" data-go="profile">Back to profile</button>`}
      <button class="btn" data-go="share">Share</button>
    </div>${more ? '' : `<p class="meta">Next pack in ${fmtWait(packsLeft(S, Date.now()).nextIn)}. Catch cats for a lucky pack.</p>`}`;
  result.hidden = false;
  celebrate(byId(top.id).rarity, anyShiny);
  if (treats) setTimeout(() => Sound.play('treats'), 900);
  result.querySelector('button').focus({ preventScroll: true });
}
result.addEventListener('click', e => {
  const go = e.target.dataset.go; if (!go) return;
  if (go === 'share') return shareText(`I pulled ${st.pulls.map(pullLabel).join(', ')} from ${CONFIG.name}'s card.`);
  closeStage(); if (go === 'again') return openPack();
  location.hash = go === 'binder' ? 'binder' : '';
});
function closeStage() {
  st.token++; st.beat = 0; $('stageWrap').hidden = true; document.body.style.overflow = ''; renderCollect(); renderBinder();
  if (pendingToast) { toast(pendingToast); pendingToast = ''; Sound.play('lucky'); }
}
skipBtn.onclick = () => showResult(true);
$('closeStage').onclick = closeStage;
$('openBtn').onclick = openPack;

/* ================= binder ================= */
function renderBinder() {
  const owned = new Set(S.pulls.map(p => p.id));
  $('ownerProgress').textContent = `${owned.size} of ${CARDS.length}`;
  const shinies = S.pulls.filter(p => p.shiny).length;
  $('totals').textContent = `${S.pulls.length} pull${S.pulls.length === 1 ? '' : 's'}${shinies ? ` · ✦ ${shinies} shiny` : ''} · ${S.treats || 0} treats`;
  const slot = c => {
    const mine = S.pulls.filter(p => p.id === c.id);
    if (!mine.length) return `<button class="empty" data-craft="${c.id}" aria-label="Missing ${TIERS[c.rarity].label} card. Get it for ${CRAFT_COST[c.rarity]} treats"><i class="sil" style="background:${c.art}"></i><b>?</b>${TIERS[c.rarity].sym} ${TIERS[c.rarity].label}<small>${CRAFT_COST[c.rarity]} treats</small></button>`;
    const best = bestPull(c.id);
    return `<button class="slot" data-card="${c.id}" aria-label="${esc(c.name)}, ${mine.length} cop${mine.length > 1 ? 'ies' : 'y'}">${cardHTML(c, best)}${mine.length > 1 ? `<span class="copies">×${mine.length}</span>` : ''}</button>`;
  };
  $('binderGrid').innerHTML = Object.keys(SETS).map(k => { const cards = inSet(k);
    const have = cards.filter(c => owned.has(c.id)).length;
    return `<div class="owner set-head"><b>${SETS[k].name}</b><span>${have === cards.length ? 'Complete ✓' : `${have} of ${cards.length}`}</span></div><div class="grid">${cards.map(slot).join('')}</div>`; }).join('');
}
let detailId = null, craftId = null;
function openDetail(id) {
  const c = byId(detailId = id), mine = S.pulls.filter(p => p.id === id), best = bestPull(id);
  $('dflip').classList.remove('flipped');
  $('detailCard').innerHTML = cardHTML(c, best);
  $('detailFacts').innerHTML = `<dt>Card</dt><dd>${esc(c.name)}</dd><dt>Rarity</dt><dd>${TIERS[c.rarity].sym} ${TIERS[c.rarity].label}</dd>
    <dt>Copies</dt><dd>${mine.map(p => (p.shiny ? '✦ ' : '') + '#' + pad(p.serial)).join(', ')}</dd>
    <dt>First collected</dt><dd>${new Date(mine[0].t).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}${mine[0].crafted ? ' (with treats)' : ''}</dd>
    ${c.star ? `<dt>Starring</dt><dd>${esc(c.star)}</dd>` : ''}<dt>From</dt><dd>${esc(CONFIG.name)}, ${SETS[c.set].name}</dd>`;
  openModal('detailModal');
}
$('binderGrid').addEventListener('click', e => {
  const b = e.target.closest('[data-card]'), m = e.target.closest('[data-craft]');
  if (b) return openDetail(b.dataset.card);
  if (!m) return;
  const c = byId(craftId = m.dataset.craft), cost = CRAFT_COST[c.rarity], have = S.treats || 0, tier = TIERS[c.rarity];
  $('craftTitle').textContent = `A missing ${tier.label} card`;
  $('craftText').textContent = have >= cost ? `Spend ${cost} of your ${have} treats to add this ${SETS[c.set].name} card to your binder?`
    : `This card costs ${cost} treats and you have ${have}. Duplicate cards from packs turn into treats.`;
  $('craftOk').disabled = have < cost;
  openModal('craftModal');
});
$('craftOk').onclick = () => {
  const out = craftCard(S, byId(craftId), Date.now());
  if (!out.pull) return;
  S = out.state; checkSets(); store.set('cardstock-state', S);
  $('craftModal').hidden = true; renderBinder(); renderCollect(); Sound.play('craft'); openDetail(craftId);
  if (pendingToast) { toast(pendingToast); pendingToast = ''; Sound.play('lucky'); }
};
const flipDetail = () => $('dflip').classList.toggle('flipped');
$('detailFlip').onclick = flipDetail; $('dflip').addEventListener('click', flipDetail);
$('detailShare').onclick = () => { const p = bestPull(detailId); shareText(`I have ${pullLabel(p)} #${pad(p.serial)} from ${CONFIG.name}'s card.`); };
const dc = $('detailCard');                                  // drag a finger over the card to tilt it and move the foil
dc.addEventListener('pointermove', e => {
  const r = dc.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  const card = dc.firstElementChild; if (!card) return;
  card.style.setProperty('--fx', `${Math.round(x * 100)}%`);
  if (!reduced()) dc.style.transform = `rotateY(${(x - .5) * 16}deg) rotateX(${(.5 - y) * 16}deg)`;
});
dc.addEventListener('pointerleave', () => { dc.style.transform = ''; });

/* ================= the living background ================= */
// Each time of day is its own pixel scene: sky, far layer, ground palette and one landmark.
const PHASES = {
  morning: { name: 'Morning', icon: '◐', top: [140, 160, 226], bot: [232, 218, 242], body: { x: .2, y: .13, c: '255,250,236', r: 20 }, mote: '255,182,206', petals: true,
             stops: [[0, [138, 158, 226]], [.55, [180, 188, 238]], [1, [234, 220, 244]]], horizon: .56,
             ground: [[112, 198, 92], [98, 182, 84], [150, 104, 66], [118, 112, 130]], prop: 'blossom', back: 'lake' },
  day:     { name: 'Day',     icon: '☀', top: [80, 146, 228],  bot: [220, 236, 248], body: { x: .7, y: .1, c: '255,252,230', r: 20 }, mote: '255,255,235',
             stops: [[0, [80, 146, 228]], [.6, [150, 198, 242]], [1, [222, 238, 250]]], horizon: .46,
             ground: [[206, 202, 192], [194, 190, 180], [172, 166, 158], [146, 140, 134]], prop: 'none', back: 'coast', floor: 'platform', clouds: '255,255,255' },
  evening: { name: 'Evening', icon: '◒', top: [96, 34, 128],   bot: [255, 160, 96],  body: { x: .62, y: .4, c: '255,238,150', r: 30 }, mote: '255,190,210',
             stops: [[0, [96, 34, 128]], [.32, [176, 40, 132]], [.6, [236, 58, 116]], [.82, [255, 98, 96]], [1, [255, 162, 104]]], horizon: .5,
             ground: [[92, 34, 84], [78, 28, 74], [56, 20, 58], [40, 14, 44]], prop: 'pine', back: 'bay', floor: 'rocks' },
  night:   { name: 'Night',   icon: '☾', top: [8, 10, 38],     bot: [30, 42, 86],    body: { x: .82, y: .16, c: '243,239,214', r: 22 }, mote: '190,255,140',
             ground: [[52, 90, 74], [46, 80, 66], [60, 52, 72], [40, 38, 56]], prop: 'lamp', back: 'city', floor: 'roof', stars: true },
};
const ORDER = ['morning', 'day', 'evening', 'night'];
function ownerHour() {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: CONFIG.timeZone, hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  return +p.find(x => x.type === 'hour').value + +p.find(x => x.type === 'minute').value / 60;
}
const phaseFor = t => t >= 6 && t < 11 ? 'morning' : t >= 11 && t < 17 ? 'day' : t >= 17 && t < 20 ? 'evening' : 'night';
let phaseKey = phaseFor(ownerHour()), previewing = false;
function renderClock() {
  if (!previewing) phaseKey = phaseFor(ownerHour());
  const P = PHASES[phaseKey]; document.body.dataset.phase = phaseKey;
  $('phaseBtn').textContent = `${P.icon} ${P.name}${previewing ? ' (preview)' : ''}`;
  const time = new Intl.DateTimeFormat('en-US', { timeZone: CONFIG.timeZone, hour: 'numeric', minute: '2-digit' }).format(new Date());
  $('clock').textContent = `${time} in ${CONFIG.place}`;
}
$('phaseBtn').onclick = () => { previewing = true; phaseKey = ORDER[(ORDER.indexOf(phaseKey) + 1) % 4]; renderClock(); };

const cv = $('scene');
let ctx = cv.getContext('2d');
// Layers that don't move are drawn once into an offscreen canvas and copied each frame. Cleared on resize.
let cache = {};
function offscreen(draw) {
  const c = document.createElement('canvas'), dpr = cv.width / W, main = ctx;
  c.width = cv.width; c.height = cv.height;
  ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  try { draw(); } finally { ctx = main; }
  return c;
}
const blit = c => ctx.drawImage(c, 0, 0, W, H);
const scene = { waving: false };
let W = 0, H = 0, cs = 8, cols = 0, heights = [], treeC = 0, botC = 0, stars = [], motes = [], clouds = [], city = [], islands = [], branches = [], blossoms = [], baseRows = 6, topRows = 0, heightsBy = {};
let ripples = [], rings = [], fireworks = [],packs = [], sparks = [], meteors = [], nextMeteor = 0, petals = [], nextPetal = 0, nextPack = 1800, lastTrail = 0, trailX = -99, trailY = -99, mX = -999, mY = -999;
let score = store.get('cardstock-score', 0);
const seeded = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
const shade = (c, k, t) => `rgb(${Math.min(255, c[0] * k * t[0]) | 0},${Math.min(255, c[1] * k * t[1]) | 0},${Math.min(255, c[2] * k * t[2]) | 0})`;
const mobile = () => W < 800;

function resize() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cs = mobile() ? Math.max(7, Math.floor(W / 40)) : Math.max(9, Math.round(Math.min(W / 110, H / 58)));
  cols = Math.ceil(W / cs) + 1;
  const base = baseRows = mobile() ? 5 : 6;
  botC = Math.floor(cols * (mobile() ? .62 : .7)); treeC = Math.floor(cols * (mobile() ? .2 : .88));
  // Each scene has its own ground shape: rolling meadow, flat station platform, jagged shore rocks, flat rooftop.
  const shapes = {
    morning: c => Math.max(3, Math.round(base + 2 * Math.sin(c * .19 + 1) + 1.3 * Math.sin(c * .071 + 2.3))),
    day: () => base - 1,
    evening: c => Math.max(2, Math.round(base - 2 + 3.4 * Math.abs(Math.sin(c * .47 + 1)) + 1.5 * Math.sin(c * .13))),
    night: () => base,
  };
  heightsBy = {};
  for (const k of Object.keys(shapes)) {
    const hs = heightsBy[k] = Array.from({ length: cols }, (_, c) => shapes[k](c));
    for (let i = -13; i <= 9; i++) if (hs[botC + i] != null) hs[botC + i] = hs[botC];   // flat ground for the cats and their tails
    for (let i = -2; i <= 2; i++) if (hs[treeC + i] != null) hs[treeC + i] = hs[treeC];
  }
  heights = heightsBy[phaseKey];
  topRows = Math.max(...Object.values(heightsBy).flat());
  const rnd = seeded(7);
  stars = Array.from({ length: Math.floor(W * H / 6000) }, () => ({ x: rnd() * W, y: rnd() * H * .65, s: rnd() * 1.6 + .5, p: rnd() * 6 }));
  motes = Array.from({ length: Math.floor(W * H / 20000) }, () => ({ x: rnd() * W, y: rnd() * H, v: 8 + rnd() * 16, p: rnd() * 6 }));
  clouds = Array.from({ length: mobile() ? 3 : 5 }, () => ({ x: rnd() * W, y: H * (.06 + rnd() * .3), w: 5 + (rnd() * 5 | 0), v: 5 + rnd() * 9 }));
  city = []; for (let x = 0; x < W;) { const w = (3 + (rnd() * 5 | 0)) * cs, h = (5 + (rnd() * 15 | 0)) * cs; city.push({ x, w, h, seed: rnd() * 1000 | 0 }); x += w + (rnd() < .3 ? cs : 0); }
  islands = Array.from({ length: mobile() ? 4 : 6 }, () => {
    const depth = rnd();
    return { x: W * (.3 + rnd() * .72), y: H * (.54 + depth * .26), w: (5 + depth * 20) * cs, h: (1 + depth * 4.5) * cs, seed: 1 + (rnd() * 1e6 | 0), depth };
  }).sort((a, b) => a.y - b.y);
  branches = []; blossoms = [];                             // cherry branches: a few drooping limbs with blossom clusters
  const bp = Math.max(3, Math.round(cs / 2));
  const grow = (x, y, a, n, d) => {
    for (let i = 0; i < n; i++) {
      x += Math.cos(a) * bp; y += Math.sin(a) * bp; a += (rnd() - .42) * .14;
      branches.push([x, y, d]);
      if (i % 5 === 4 && rnd() < .85) blossoms.push({ x: x + (rnd() - .5) * bp * 5, y: y + bp + rnd() * bp * 4, r: bp * (1.6 + rnd() * 2.6), c: ['255,183,206', '250,206,222', '238,150,186'][rnd() * 3 | 0] });
      if (d < 2 && i > 6 && rnd() < .08) grow(x, y, a + (rnd() < .5 ? -.6 : .6), n * .45 | 0, d + 1);
    }
  };
  grow(W + bp, -bp, Math.PI * .86, W * .5 / bp | 0, 0);
  grow(W * .5, -bp * 2, Math.PI * .22, W * .14 / bp | 0, 0);
  grow(-bp, H * .04, .3, W * .28 / bp | 0, 0);
}
addEventListener('resize', () => { cache = {}; resize(); }); resize();
const groundTop = c => H - heights[Math.max(0, Math.min(cols - 1, c))] * cs;
const inScene = (x, y) => y > groundTop(Math.floor(x / cs)) - cs * 9;

// A ripple is a ring of lift travelling out from where the pointer touched; blocks rise as it passes.
function liftAt(x, y, t) {
  let lift = 0;
  for (const r of ripples) {
    const age = (t - r.t) / 1000, d = Math.hypot(x - r.x, y - r.y), front = age * cs * (r.big ? 22 : 15);
    lift += Math.exp(-(((d - front) / (cs * 1.7)) ** 2)) * (1 - age / 1.4) * cs * (r.big ? 1.4 : .75);
  }
  const near = Math.hypot(x - mX, y - mY);
  if (near < cs * 3) lift += (1 - near / (cs * 3)) * cs * .6;
  return lift;
}
function block(x, y, c, lift, tint) {
  const depth = Math.max(2, cs * .22) + lift, glow = 1 + lift / cs * .35;
  ctx.fillStyle = shade(c, .58, tint); ctx.fillRect(x, y, cs, cs);
  ctx.fillStyle = shade(c, glow, tint); ctx.fillRect(x, y - depth, cs - 1, cs - 1);
}
const TRUNK = [120, 84, 52];
// The mascot: Echo, the owner's orange-and-white cat, in blocks, sitting. Cream-orange fur, white blaze, muzzle, chest and paws, sleepy eyes.
// Yoko, the fluffy orange cat, sits to Echo's left with wide-open eyes.
const YOKO_PAL = { F: [238, 176, 96], f: [207, 138, 60], y: [248, 220, 174], P: [229, 143, 143], E: [232, 164, 28] };
const yokoRows = t => ['F.....F', 'FFFFFFF', catAsleep(t) || (t + 1700) % 6100 < 160 ? 'FfFFFfF' : 'FEFFFEF', 'FFFPFFF', '.FyyyF.', '.FFFFF.', '.FFFFF.', '.FF.FF.'];
const BOT_PAL = { Y: [242, 193, 78], B: [70, 120, 220], O: [232, 168, 104], o: [201, 138, 80], W: [251, 243, 234], E: [214, 160, 70], P: [216, 144, 122], C: [235, 84, 84], S: [30, 28, 45] };
// Each eye is painted on its block's top face: amber iris, dark pupil, glint, and a fur-coloured lid over the top third (sleepy, not shut).
let hopT = -1e9, awakeUntil = 0;                           // last catch (the cat hops), and how long it stays awake at night
const catAsleep = t => phaseKey === 'night' && !scene.waving && t > awakeUntil && score < 25;
function drawEye(x, top, tint, lidCol = BOT_PAL.O, lidK = .36) {
  const f = cs - 1, pw = Math.max(2, Math.round(f * .3)), lid = Math.round(f * lidK), lash = Math.max(1, Math.round(f * .1));
  const look = mX < -900 ? 0 : Math.round(Math.max(-1, Math.min(1, (mX - x - cs / 2) / (cs * 8))) * f * .22);   // pupils follow the pointer
  ctx.fillStyle = shade(BOT_PAL.E, 1, tint); ctx.fillRect(x, top, f, f);
  ctx.fillStyle = shade([40, 28, 20], 1, tint); ctx.fillRect(x + Math.round((f - pw) / 2) + look, top + lid, pw, f - lid);
  ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.fillRect(x + Math.round((f - pw) / 2) + look - lash, top + lid + lash, lash * 1.5, lash * 1.5);
  ctx.fillStyle = shade(lidCol, 1, tint); ctx.fillRect(x, top, f, lid);
  ctx.fillStyle = shade([96, 58, 30], 1, tint); ctx.fillRect(x, top + lid, f, lash);
}
function botRows(t) {
  const rows = ['O.....O', 'OOOWOOO', 'OEOWOEO', 'OOWPWOO', '.WWWWW.', '.oWWWo.', '.OWWWO.', '.WW.WW.'];
  if ((S.done || []).includes('dev')) rows[4] = '.BBBBB.';            // Dev pack complete: a scarf
  if (score >= 10) rows[0] = 'OCCCCCO';                             // 10 caught: a cap between the ears
  if (score >= 25) rows[2] = 'OSSSSSO';                             // 25 caught: a visor
  else if (catAsleep(t)) rows[2] = 'OoOWOoO';                       // asleep at night until someone taps
  else if (t % 5200 < 160) rows[2] = 'OOOWOOO';                     // slow blink
  return rows;
}

const ONE = [1, 1, 1];
const mix = (a, b, k) => a.map((v, i) => v + (b[i] - v) * k | 0);
function skyAt(P, y) {
  if (!P.stops) return mix(P.top, P.bot, Math.max(0, Math.min(1, y / H)));
  const k = Math.max(0, Math.min(1, y / (H * P.horizon)));  // several colour stops between the top and the horizon
  for (let i = 1; i < P.stops.length; i++) {
    const [k0, c0] = P.stops[i - 1], [k1, c1] = P.stops[i];
    if (k <= k1) return mix(c0, c1, (k - k0) / (k1 - k0));
  }
  return P.stops[P.stops.length - 1][1];
}
const pxs = () => Math.max(3, Math.round(cs / 2));
function pdisc(cx, cy, r, c, a = 1) {                       // a circle made of square pixels
  const p = pxs(); ctx.fillStyle = `rgba(${c},${a})`;
  for (let dy = -r; dy <= r; dy += p) {
    const w = Math.round(Math.sqrt(Math.max(0, r * r - dy * dy)) / p) * p;
    ctx.fillRect(Math.round((cx - w) / p) * p, Math.round((cy + dy) / p) * p, w * 2, p);
  }
}

// Where the sun or moon sits. If the card panel would cover it, it slides to just right of the panel when there is room.
function bodyXY(P) {
  const b = P.body, y = H * b.y; let x = mobile() ? W * Math.min(.82, Math.max(.18, b.x)) : W * b.x;
  const view = $('profileView').hidden ? $('binderView') : $('profileView');
  if (!view.classList.contains('peek')) {
    const r = view.querySelector('.panel').getBoundingClientRect(), m = b.r * 1.6;
    if (x > r.left - m && x < r.right + m && y > r.top - m && y < r.bottom + m && r.right + m * 2.4 < W) x = r.right + m * 1.5;   // on phones there is no room: Hide card shows it
  }
  return [x, y];
}
function drawSky(t, P) {
  if (bgImg) {                                              // owner's photo, already pixelated, scaled up with hard edges to cover the screen
    const iw = bgImg.width, ih = bgImg.height, s = Math.max(W / iw, H / ih);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(bgImg, (W - iw * s) / 2, (H - ih * s) / 2, iw * s, ih * s);
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = `rgba(${{ morning: '255,200,120,.1', day: '0,0,0,0', evening: '255,100,60,.24', night: '8,14,60,.52' }[phaseKey]})`;
    ctx.fillRect(0, 0, W, H);                               // time of day still shows as a tint over the photo
  } else {
    const band = P.stops ? pxs() : Math.max(6, cs);         // stepped gradient, like a dithered pixel sky; finer steps where there are many colours
    for (let y = 0; y < H; y += band) { ctx.fillStyle = `rgb(${skyAt(P, y + band / 2)})`; ctx.fillRect(0, y, W, band); }
  }
  if (P.stars) for (const s of stars) { ctx.globalAlpha = .35 + .65 * Math.abs(Math.sin(t * .0012 + s.p)); ctx.fillStyle = '#fffbe6'; ctx.fillRect(s.x | 0, s.y | 0, s.s > 1.4 ? 3 : 2, s.s > 1.4 ? 3 : 2); }
  ctx.globalAlpha = 1;
  if (P.stars && !reduced()) {                              // shooting stars: a pixel streak every few seconds
    if (t > nextMeteor) {
      meteors.push({ x: W * (.25 + Math.random() * .75), y: H * Math.random() * .3, t, sp: .7 + Math.random() * .5 });
      nextMeteor = t + 2200 + Math.random() * 4500;
    }
    meteors = meteors.filter(m => t - m.t < 900);
    const p = pxs();
    for (const m of meteors) {
      const a = (t - m.t) / 900, hx = m.x - a * 520 * m.sp, hy = m.y + a * 260 * m.sp;
      if (a < 0) continue;                                  // queued for a meteor shower
      for (let i = 0; i < 12; i++) {
        ctx.fillStyle = `rgba(255,255,240,${(1 - a) * (1 - i / 12)})`;
        ctx.fillRect(Math.round((hx + i * p * 1.6) / p) * p, Math.round((hy - i * p * .8) / p) * p, p, p);
      }
    }
  }
  const b = P.body, [bx, by] = bodyXY(P);
  if (!bgImg) {
    pdisc(bx, by, b.r * 1.9, b.c, .1); pdisc(bx, by, b.r * 1.45, b.c, .2); pdisc(bx, by, b.r, b.c);
    if (P.stars) pdisc(bx + b.r * .45, by - b.r * .25, b.r * .8, skyAt(P, by).join(','));   // crescent moon
  }
  if (P.clouds && !bgImg) for (const c of clouds) {
    const x = Math.round(((c.x + t / 1000 * c.v) % (W + 240) - 120) / cs) * cs, y = Math.round(c.y / cs) * cs;
    ctx.fillStyle = `rgba(${P.clouds},.85)`;
    ctx.fillRect(x + cs * 2, y - cs, (c.w - 4) * cs, cs); ctx.fillRect(x + cs, y, (c.w - 2) * cs, cs); ctx.fillRect(x, y + cs, c.w * cs, cs);
  }
  if (!P.petals) for (const m of motes) {                   // dust in the light by day, fireflies at night (morning has petals instead)
    const y = ((m.y + (P.petals ? 1 : -1) * t / 1000 * m.v) % H + H) % H, x = m.x + Math.sin(t * .0008 + m.p) * (P.petals ? 26 : 10);   // petals fall, dust rises
    ctx.globalAlpha = .25 + .55 * Math.abs(Math.sin(t * .0016 + m.p));
    const ms = P.stars || P.petals ? 3 : 2;
    ctx.fillStyle = `rgb(${P.mote})`; ctx.fillRect(x | 0, y | 0, ms, ms);
  }
  ctx.globalAlpha = 1;
  if (!bgImg) drawBack(t, P);
}

/* ---------- custom background: CONFIG.background (any photo) becomes pixel art for every visitor ---------- */
let bgImg = null;
const BG_WIDTH = 112, BG_LEVELS = 6;                        // grid width in pixels, and colour steps per channel
function pixelate(img) {
  const w = BG_WIDTH, h = Math.max(1, Math.round(img.naturalHeight / img.naturalWidth * w));
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0, w, h);
  const d = x.getImageData(0, 0, w, h), step = 255 / BG_LEVELS;
  for (let i = 0; i < d.data.length; i += 4) for (let k = 0; k < 3; k++) d.data[i + k] = Math.round(d.data[i + k] / step) * step;
  x.putImageData(d, 0, 0);
  return c;
}
if (CONFIG.background) {
  const img = new Image();
  img.onload = () => { bgImg = pixelate(img); };
  img.onerror = () => console.warn(`Background "${CONFIG.background}" could not be loaded; showing the time-of-day scenes.`);
  img.src = CONFIG.background;
}

function drawBack(t, P) {
  const horizon = H - (baseRows + 3) * cs;
  if (P.back === 'lake') {                                  // morning: snow-capped mountain over a still lake, under cherry blossom
    const p = pxs(), hz = Math.round(H * P.horizon / p) * p, mx = W * .62, mw = W * .3, peak = H * .23;
    const mtn = x => { const k = Math.abs(x - mx) / mw; return Math.max(k < 1 ? peak * Math.pow(1 - k, 1.3) : 0, k < 2.2 ? H * .045 * (1 - k / 2.2) : 0); };
    const snow = x => peak * .3 * (1 + .22 * Math.sin(x * .09));
    blit(cache.lake ||= offscreen(() => {                   // hill, mountain, town and lake never move: draw them once
    ctx.fillStyle = 'rgb(70,104,98)';                       // wooded hill on the left
    for (let x = 0; x < W * .3; x += p) { const h = Math.round(H * .09 * Math.sin(Math.min(1, (W * .3 - x) / (W * .3)) * Math.PI / 2) / p) * p; ctx.fillRect(x, hz - h, p, h + p); }
    for (let x = Math.round((mx - mw * 2.2) / p) * p; x < mx + mw * 2.2; x += p) {
      const h = Math.round(mtn(x) / p) * p; if (!h) continue;
      ctx.fillStyle = x < mx ? 'rgb(132,136,196)' : 'rgb(108,112,176)'; ctx.fillRect(x, hz - h, p, h);
      const s = Math.round(Math.min(h, snow(x)) / p) * p;
      if (h > peak * .32) { ctx.fillStyle = x < mx ? 'rgb(250,250,255)' : 'rgb(226,228,248)'; ctx.fillRect(x, hz - h, p, s); }
    }
    for (let x = Math.round(W * .2 / p) * p; x < W; x += p * 2) {   // lakeside town
      const k = (x * 13 + 7) % 11;
      if (k < 6) { ctx.fillStyle = ['rgb(244,240,236)', 'rgb(226,214,200)', 'rgb(212,224,236)', 'rgb(236,226,214)', 'rgb(250,246,240)', 'rgb(200,206,222)'][k]; ctx.fillRect(x, hz - p * (1 + k % 3), p * 2, p * (1 + k % 3)); }
      else if (k < 9) { ctx.fillStyle = 'rgb(84,126,96)'; ctx.fillRect(x, hz - p * 2, p * 2, p * 2); }
    }
    for (let y = hz; y < H; y += p) { ctx.fillStyle = `rgb(${mix([200, 206, 242], [92, 116, 198], (y - hz) / (H - hz))})`; ctx.fillRect(0, y, W, p); }
    }));
    const refl = cache.reflection ||= offscreen(() => {      // mirrored mountain, drawn once...
      for (let x = Math.round((mx - mw * 2.2) / p) * p; x < mx + mw * 2.2; x += p) {
        const h = Math.round(mtn(x) * .85 / p) * p; if (!h) continue;
        const snowTop = h > peak * .28 ? Math.round((h - snow(x) * .85) / p) * p : h;
        ctx.fillStyle = 'rgba(112,116,180,.32)'; ctx.fillRect(x, hz + p, p, snowTop);
        if (snowTop < h) { ctx.fillStyle = 'rgba(255,255,255,.32)'; ctx.fillRect(x, hz + p + snowTop, p, h - snowTop); }
      }
    });
    const dpr = cv.width / W;                               // ...then copied row by row with a sideways wobble for the ripples
    for (let y = 0; y < peak * .85 + p; y += p) {
      ctx.drawImage(refl, 0, (hz + p + y) * dpr, cv.width, p * dpr, Math.round(Math.sin(t * .002 + y * .35) * 1.2) * p, hz + p + y, W, p);
    }
    for (let y = hz + p * 3; y < H; y += p * 4) {           // light catching the water
      const x = ((Math.sin(y * 12.9) * 43758) % 1 + 1) % 1 * W + Math.sin(t * .001 + y) * 12;
      ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(Math.round(x / p) * p, y, p * (3 + (y % 4)), p / 2 | 0 || 1);
    }
    blit(cache.blossoms ||= offscreen(() => {               // cherry branches hanging from the top
      ctx.fillStyle = 'rgb(96,60,70)';
      for (const [x, y, d] of branches) ctx.fillRect(Math.round(x / p) * p, Math.round(y / p) * p, d ? p : p * 2, d ? p : p * 2);
      for (const b of blossoms) { pdisc(b.x, b.y, b.r, b.c); pdisc(b.x - b.r * .3, b.y - b.r * .3, b.r * .45, '255,236,244'); }
    }));
  } else if (P.back === 'coast') {                          // day: a seaside railway crossing
    const p = pxs(), thin = Math.max(1, p / 2 | 0), hz = Math.round(H * P.horizon / p) * p, shore = hz + Math.round(H * .15 / p) * p;
    const road = shore + p * 2, track = road + p * 5, poleX = Math.round(W * .93 / p) * p;
    for (let y = hz; y < shore; y += p) { ctx.fillStyle = `rgb(${mix([28, 84, 166], [74, 152, 208], (y - hz) / (shore - hz))})`; ctx.fillRect(0, y, W, p); }
    ctx.fillStyle = 'rgb(160,206,238)'; ctx.fillRect(0, hz, W, p);                 // haze on the horizon
    const rowsOfSea = Math.max(1, (shore - hz) / p - 3);
    for (let c = 0; c < W / p; c += 4) if (Math.sin(t * .003 + c * 1.7) > .6) {   // glints on the water
      ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.fillRect(c * p, hz + p * (2 + (c * 7) % rowsOfSea | 0), p * 2, thin);
    }
    ctx.fillStyle = 'rgb(238,246,250)'; ctx.fillRect(0, shore - p, W, p);         // surf line
    ctx.fillStyle = 'rgb(208,202,190)'; ctx.fillRect(0, shore, W, p * 2);         // sea wall
    ctx.fillStyle = 'rgb(146,146,150)'; ctx.fillRect(0, road, W, p * 4);          // coast road with lane marks
    ctx.fillStyle = 'rgb(240,238,228)'; for (let x = 0; x < W; x += p * 6) ctx.fillRect(x, road + p * 2, p * 3, thin);
    ctx.fillStyle = 'rgb(186,180,170)'; ctx.fillRect(0, track - p, W, H);         // concrete slope up from the tracks
    ctx.fillStyle = 'rgb(118,94,74)'; for (let x = 0; x < W; x += p * 2) ctx.fillRect(x, track, p, p * 2);   // sleepers
    ctx.fillStyle = 'rgb(82,78,82)'; ctx.fillRect(0, track, W, thin); ctx.fillRect(0, track + p + thin, W, thin);
    ctx.fillStyle = 'rgb(112,110,106)'; ctx.fillRect(poleX, H * .04 | 0, p * 2, track - (H * .04 | 0));   // utility pole
    ctx.fillRect(poleX - p * 4, H * .07 | 0, p * 10, p);
    ctx.fillStyle = 'rgba(46,48,58,.85)';                    // overhead wires sagging to the pole
    [.075, .1, .16].forEach((y0, i) => {
      for (let x = 0; x < poleX; x += p) { const k = x / poleX; ctx.fillRect(x, Math.round((H * y0 + H * (.05 + i * .02) * 4 * k * (1 - k)) / p) * p, p, Math.max(1, p / 3 | 0)); }
    });
    const car = p * 34, carH = p * 12, len = 2 * (car + p), run = TRAIN_RUN;   // the train: every 15 s, or sooner when the track is tapped
    while (t > trainAt + run + 400) trainAt += 15000;
    const tt = t - trainAt, active = tt > -1800 && tt < run + 1100;
    const gate = Math.max(0, Math.min(1, tt < run ? (tt + 1800) / 700 : 1 - (tt - run - 400) / 700));   // 0 = raised, 1 = down across the crossing
    if (active && bellFor !== trainAt) { bellFor = trainAt; Sound.play('bell'); }
    if (tt >= 0 && tt < run && rumbleFor !== trainAt) { rumbleFor = trainAt; Sound.play('train'); }
    trainBox = null;
    if (tt >= 0 && tt < run && !reduced()) {
      const x0 = W + p * 4 - (tt / run) * (W + len + p * 8);
      trainBox = { x: x0, y: track - carH, w: len, h: carH + p };
      for (let i = 0; i < 2; i++) drawCar(x0 + i * (car + p), track - carH + p, car, carH, p, i === 0);
    }
    const sigs = mobile() ? [.34, .8] : [.6, .84];          // crossing signals in front of the train
    for (const f of sigs) {
      const sx = Math.round(W * f / p) * p, top = track - p * 26;
      for (let y = top; y < track + p * 3; y += p) { ctx.fillStyle = ((y - top) / p | 0) % 4 < 2 ? 'rgb(250,204,40)' : 'rgb(30,30,32)'; ctx.fillRect(sx, y, p, p); }
      for (let i = -3; i <= 3; i++) {                       // crossbuck
        ctx.fillStyle = i % 2 ? 'rgb(30,30,32)' : 'rgb(250,204,40)';
        ctx.fillRect(sx + i * p, top + i * p, p, p); ctx.fillRect(sx + i * p, top - i * p, p, p);
      }
      const blink = (t / 450 | 0) % 2;
      [[-2, 0], [2, 1]].forEach(([dx, side]) => {
        const lx = sx + dx * p - p / 2, ly = top + p * 6, on = active && blink === side;
        ctx.fillStyle = 'rgb(28,28,30)'; ctx.fillRect(lx - p / 2, ly - p / 2, p * 3, p * 3);
        ctx.fillStyle = on ? 'rgb(255,64,52)' : 'rgb(96,34,34)'; ctx.fillRect(lx, ly, p * 2, p * 2);
        if (on) { ctx.fillStyle = 'rgba(255,80,60,.28)'; ctx.fillRect(lx - p * 2, ly - p * 2, p * 6, p * 6); }
      });
      // The gate arm: a striped bar hinged on the post. It stands up while the line is clear and swings down before a train.
      const dir = f === sigs[0] ? 1 : -1, py = track - p * 8, n = Math.floor(W * (sigs[1] - sigs[0]) / 2 / p) - 2, ang = (1 - gate) * 1.42;
      ctx.fillStyle = 'rgb(40,40,44)'; ctx.fillRect(sx - p, py - p, p * 3, p * 3);
      for (let i = 1; i <= n; i++) {
        ctx.fillStyle = (i / 3 | 0) % 2 ? 'rgb(30,30,32)' : 'rgb(250,204,40)';
        ctx.fillRect(Math.round((sx + dir * Math.cos(ang) * i * p) / p) * p, Math.round((py - Math.sin(ang) * i * p) / p) * p, p, p);
      }
      if (gate > .9 && blink) { ctx.fillStyle = 'rgb(255,64,52)'; ctx.fillRect(sx + dir * n * p, py - p, p, p); }   // warning lamp on the tip
    }
    [[1.0, .1, 9, [46, 96, 52]], [.97, .2, 8, [60, 116, 60]], [1.01, .3, 10, [46, 96, 52]], [.96, .34, 6, [74, 134, 66]], [.99, .02, 8, [60, 116, 60]]]
      .forEach(([fx, fy, r, c]) => { pdisc(W * fx, H * fy, r * p, c.join(',')); pdisc(W * fx - r * p * .3, H * fy - r * p * .3, r * p * .45, '104,164,84'); });   // leafy tree at the edge
  } else if (P.back === 'bay') {                            // evening: a pink bay at sunset with island silhouettes
    const p = pxs(), hz = Math.round(H * P.horizon / p) * p, sx = W * P.body.x;
    for (let y = hz; y < H; y += p) { ctx.fillStyle = `rgb(${mix([242, 116, 152], [168, 46, 118], (y - hz) / (H - hz))})`; ctx.fillRect(0, y, W, p); }
    ctx.fillStyle = 'rgb(255,176,170)'; ctx.fillRect(0, hz, W, p);
    const len = (H - hz) * .5;                              // the sun's reflection, shimmering in stepped strips
    for (let y = hz + p; y < hz + len; y += p * 2) {
      const f = 1 - (y - hz) / len, w = Math.round(P.body.r * (.4 + 1.1 * f) * (.55 + .45 * Math.sin(t * .004 + y * .21)) / p) * p;
      ctx.fillStyle = `rgba(255,232,160,${.25 + .7 * f})`; ctx.fillRect(Math.round((sx - w) / p) * p, y, w * 2, p);
    }
    ctx.fillStyle = 'rgb(84,44,118)';                       // far headland on the right
    for (let x = Math.round(W * .7 / p) * p; x < W; x += p) {
      const k = Math.min(1, (x - W * .7) / (W * .22)), h = Math.round(H * .15 * Math.sin(k * Math.PI / 2) * (1 + .06 * Math.sin(x * .05)) / p) * p;
      ctx.fillRect(x, hz - h, p, h + p);
    }
    for (const isl of islands) {                            // islands, nearer ones darker and bigger
      const col = mix([104, 44, 110], [42, 14, 46], isl.depth), r = seeded(isl.seed);
      ctx.fillStyle = `rgb(${col})`;
      for (let x = -isl.w / 2; x <= isl.w / 2; x += p) {
        const k = x / (isl.w / 2), h = Math.round(isl.h * Math.pow(Math.max(0, 1 - k * k), .55) / p) * p, px0 = Math.round((isl.x + x) / p) * p;
        ctx.fillRect(px0, isl.y - h, p, h + p);
        if (h > p && r() < .35) ctx.fillRect(px0, isl.y - h - p * (1 + (r() * 3 | 0)), p, p * 3);   // tufts of trees on top
      }
    }
  } else if (P.back === 'city') {                           // night: a skyline with lit windows
    const p = pxs();
    for (const b of city) {
      const top = horizon - b.h;
      ctx.fillStyle = 'rgb(20,22,48)'; ctx.fillRect(b.x, top, b.w, H);
      for (let i = p; i < b.w - p; i += p * 2) for (let j = p * 2; j < b.h; j += p * 3) {
        const k = (b.seed * 31 + i * 17 + j * 7) % 13;
        if (k < 4) { ctx.fillStyle = k === 0 && Math.sin(t * .002 + b.seed) > .6 ? 'rgba(255,214,120,.25)' : 'rgba(255,214,120,.85)'; ctx.fillRect(b.x + i, top + j, p, p); }
      }
    }
  }
}

let trainBox = null, lampOff = false;                      // where the train is right now (for taps), and the street lamp's state
let rumbleFor = 0;                                         // the train the rumble last played for
let bellFor = 0;                                           // the train the crossing bell last rang for
let trainAt = 4000;                                        // when the next train enters, on the animation clock
const TRAIN_RUN = 6500;
// Where the day scene's bands sit, shared by the drawing code and the tap handler.
function coastBands() {
  const p = pxs(), hz = Math.round(H * PHASES.day.horizon / p) * p, shore = hz + Math.round(H * .15 / p) * p;
  return { hz, shore, track: shore + p * 7 };
}
// One carriage of the green-and-cream coastal train, x/y = top-left, p = pixel size.
function drawCar(x, y, w, h, p, lead) {
  x = Math.round(x / p) * p;
  ctx.fillStyle = 'rgb(150,152,150)'; ctx.fillRect(x + p, y, w - p * 2, p * 2);                          // roof
  ctx.fillStyle = 'rgb(236,228,190)'; ctx.fillRect(x, y + p * 2, w, Math.round(h * .42 / p) * p);       // cream upper body
  const mid = y + p * 2 + Math.round(h * .42 / p) * p;
  ctx.fillStyle = 'rgb(62,136,82)'; ctx.fillRect(x, mid, w, y + h - p - mid);                            // green lower body
  ctx.fillStyle = 'rgb(46,48,52)'; ctx.fillRect(x + p * 3, y + h - p, w - p * 6, p);                     // skirt and wheels
  for (let k = p * 3; k < w - p * 5; k += p * 6) {                                                        // windows
    ctx.fillStyle = 'rgb(66,82,96)'; ctx.fillRect(x + k, y + p * 3, p * 4, p * 3);
    ctx.fillStyle = 'rgb(160,190,210)'; ctx.fillRect(x + k, y + p * 3, p, p);
  }
  if (lead) {
    ctx.fillStyle = 'rgb(255,226,120)'; ctx.fillRect(x, mid + p, p, p * 2);                              // headlight
    ctx.fillStyle = 'rgb(70,70,74)'; ctx.fillRect(x + w * .3, y - p * 3, p, p * 3); ctx.fillRect(x + w * .3 - p * 2, y - p * 3, p * 5, thinPx(p));   // pantograph
  }
}
const thinPx = p => Math.max(1, p / 2 | 0);

function drawProp(t, P, tint) {
  const x0 = treeC * cs, g = groundTop(treeC), at = (dx, up, col) => { const x = x0 + dx * cs, y = g - up * cs; block(x, y, col, liftAt(x, y, t), tint); };
  if (P.prop === 'blossom') {
    for (let i = 1; i <= 4; i++) at(0, i, TRUNK);
    for (let r = 0; r < 4; r++) for (let k = -2; k <= 2; k++) { if (r === 3 && Math.abs(k) === 2) continue; at(k, 5 + r, (k + r) % 2 ? [255, 176, 204] : [240, 140, 182]); }
  } else if (P.prop === 'pine') {                           // dark pine silhouette, like the trees on the islands
    at(0, 1, [44, 16, 46]); at(0, 2, [44, 16, 46]);
    [[3, 2], [4, 2], [5, 1], [6, 1], [7, 0], [8, 0]].forEach(([up, half]) => { for (let k = -half; k <= half; k++) at(k, up, [52, 20, 56]); });
  } else if (P.prop === 'lamp') {
    const gx = x0 + cs / 2, gy = g - 7.5 * cs, glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, cs * 9);
    glow.addColorStop(0, 'rgba(255,214,140,.45)'); glow.addColorStop(1, 'rgba(255,214,140,0)');
    if (!lampOff) { ctx.fillStyle = glow; ctx.fillRect(gx - cs * 9, gy - cs * 9, cs * 18, cs * 18); }
    for (let i = 1; i <= 6; i++) at(0, i, [70, 70, 92]);
    at(-1, 7, [70, 70, 92]); at(0, 7, lampOff ? [60, 58, 72] : [255, 222, 150]); at(1, 7, [70, 70, 92]);
  }
}

// The ground only moves while a ripple runs or the pointer is near it; the rest of the time a cached copy is drawn.
function drawLand(t, P) {
  const live = ripples.length || mY > H - topRows * cs - cs * 4;
  if (live) drawGround(t, P, false); else blit(cache['ground-' + phaseKey] ||= offscreen(() => drawGround(t, P, true)));
  drawFigures(t, P);
}
// The colour of ground block (column c, row r from the top) for the scene's kind of floor.
function tile(P, c, r) {
  const [top1, top2, sub, deep] = P.ground, hash = (c * 31 + r * 17 + c * r * 7) % 8;
  if (P.floor === 'platform') {                             // station platform: concrete top, yellow safety line, edge, then track ballast
    if (r === 0) return c % 2 ? [216, 212, 204] : [206, 202, 194];
    if (r === 1) return c % 2 ? [246, 202, 42] : [232, 186, 30];
    if (r === 2) return [132, 128, 124];
    return [[122, 104, 88], [98, 90, 84], [140, 124, 104], [84, 78, 76]][hash % 4];
  }
  if (P.floor === 'rocks') {                                // shore rocks: dark and mottled, with tide pools catching the sunset
    if (r === 0) return hash === 0 ? [240, 128, 156] : hash < 3 ? [112, 44, 96] : top1;
    return hash === 1 ? [84, 30, 78] : hash < 5 ? sub : deep;
  }
  if (P.floor === 'roof') {                                 // rooftop: pale stone ledge over brickwork with offset mortar lines
    if (r === 0) return c % 2 ? [98, 100, 124] : [88, 90, 114];
    return (c + (r % 2) * 2) % 4 === 0 ? [36, 32, 48] : [[78, 46, 60], [88, 52, 64], [68, 40, 56]][hash % 3];
  }
  return r === 0 ? ((c + r) % 3 ? top1 : top2) : r < 3 ? sub : deep;   // meadow
}
function drawGround(t, P, still) {
  const p = pxs();
  for (let c = 0; c < cols; c++) {
    const h = heights[c], x = c * cs;
    for (let r = 0; r < h; r++) {
      const y = H - (h - r) * cs, col = tile(P, c, r);
      const k = 1 - ((c * 7 + r * 3) % 5) * .025, lift = still ? 0 : liftAt(x + cs / 2, y + cs / 2, t);
      block(x, y, col.map(v => v * k), lift, ONE);
      if (r === 0 && P.prop === 'blossom' && c % 4 === 1) {   // morning flowers on the grass
        ctx.fillStyle = c % 8 === 1 ? '#ff8fb8' : '#fff6e0'; ctx.fillRect(x + cs / 2 - p / 2, y - Math.max(2, cs * .22) - lift - p, p, p);
      }
    }
  }
}
function drawFigures(t, P) {                                // tree or lamp, and the cat: small, and they animate
  const tint = P.stars ? [.8, .8, .95] : P.back === 'bay' ? [1.08, .82, .96] : ONE;
  drawProp(t, P, tint);
  const hop = t - hopT < 380 ? Math.sin((t - hopT) / 380 * Math.PI) * cs * 1.3 : 0;   // a little jump when a cat is caught
  const rows = botRows(t), bx = botC * cs, by = groundTop(botC) - rows.length * cs - hop;
  if (catAsleep(t)) {                                       // floating z's
    ctx.font = `700 ${Math.round(cs * 1.2)}px ui-monospace, Menlo, monospace`;
    for (let i = 0; i < 2; i++) { const k = (t / 2400 + i * .5) % 1; ctx.fillStyle = `rgba(255,255,255,${.8 * (1 - k)})`; ctx.fillText('z', bx + 7 * cs + k * cs * 2, by - k * cs * 3); }
  }
  if (score >= 50) {                                        // 50 caught: golden glow
    const gx = bx + cs * 3.5, gy = by + cs * 4, g = ctx.createRadialGradient(gx, gy, 0, gx, gy, cs * 9);
    g.addColorStop(0, 'rgba(255,201,74,.55)'); g.addColorStop(1, 'rgba(255,201,74,0)');
    ctx.fillStyle = g; ctx.fillRect(gx - cs * 9, gy - cs * 9, cs * 18, cs * 18);
  }
  // Tail behind the body: curls up on the right; flicks fast while you hover the contact icons, sways slowly otherwise.
  const swish = scene.waving ? Math.sin(t * .014) : Math.sin(t * .0021) * .45;
  [[6, 7, 'O'], [7, 7, 'o'], [8, 6, 'O']].forEach(([dx, dy, ch]) => { const x = bx + dx * cs, y = by + dy * cs; block(x, y, BOT_PAL[ch], liftAt(x, y, t), tint); });
  block(bx + 8 * cs + Math.round(swish) * cs, by + 5 * cs - Math.abs(swish) * cs * .7, BOT_PAL.o, 0, tint);   // tip
  rows.forEach((row, r) => [...row].forEach((ch, k) => {
    if (ch === '.') return;
    const x = bx + k * cs, y = by + r * cs, lift = liftAt(x, y, t);
    block(x, y, BOT_PAL[ch], lift, tint);
    if (ch === 'E') drawEye(x, y - Math.max(2, cs * .22) - lift, tint);
  }));
  if ((S.done || []).includes('cats')) [[1, 0], [3, -1], [5, 0], [2, 0], [4, 0]].forEach(([k, up]) => block(bx + k * cs, by - cs + up * cs, BOT_PAL.Y, 0, tint));   // Cat pack complete: a crown
  const yx = (botC - 10) * cs, yy = groundTop(botC) - 8 * cs - hop * .6, yr = yokoRows(t);   // Yoko
  const ysw = Math.sin(t * .0017 + 2) * .45;
  [[0, 7, 'F'], [-1, 7, 'f'], [-2, 6, 'F']].forEach(([dx, dy, ch]) => block(yx + dx * cs, yy + dy * cs, YOKO_PAL[ch], liftAt(yx + dx * cs, yy + dy * cs, t), tint));
  block(yx - 2 * cs + Math.round(ysw) * cs, yy + 5 * cs - Math.abs(ysw) * cs * .7, YOKO_PAL.f, 0, tint);
  yr.forEach((row, r) => [...row].forEach((ch, k) => {
    if (ch === '.') return;
    const x = yx + k * cs, y = yy + r * cs, lift = liftAt(x, y, t);
    block(x, y, YOKO_PAL[ch], lift, tint);
    if (ch === 'E') drawEye(x, y - Math.max(2, cs * .22) - lift, tint, YOKO_PAL.F, .12);
  }));
}

// Sakura petals: spawned one at a time like shooting stars, but drifting down slowly, swaying and flipping.
function drawPetals(t, dt, P) {
  if (!P.petals) { petals = []; return; }
  if (!reduced() && t > nextPetal && petals.length < 28) {
    const pr = $('panel').getBoundingClientRect(), minX = !mobile() && !$('profileView').hidden ? pr.right : 0;   // fall where they can be seen
    const open = blossoms.filter(q => q.x > minX), b = open.length && Math.random() < .55 ? open[Math.random() * open.length | 0] : null;
    petals.push({ x: b ? b.x : minX + Math.random() * (W - minX + 60), y: b ? b.y : -10, vx: -(3 + Math.random() * 12), vy: 22 + Math.random() * 30,
                  sway: Math.random() * 6, spin: Math.random() * 6, spinV: .002 + Math.random() * .003, light: Math.random() < .5 });
    nextPetal = t + 260 + Math.random() * 480;
  }
  const s = Math.max(4, Math.round(cs * .6));
  petals = petals.filter(q => q.y < H + 10 && q.x > -20);
  for (const q of petals) {
    if (q.burst) { q.vx += (-8 - q.vx) * .05; q.vy += (34 - q.vy) * .05; }   // a tapped puff settles into a normal fall
    q.y += q.vy * dt / 1000;
    q.x += (q.vx + Math.sin(t * .0016 + q.sway) * 34) * dt / 1000;
    const X = Math.round(q.x / s) * s, Y = Math.round(q.y / s) * s, face = Math.abs(Math.cos(t * q.spinV + q.spin));
    const c = q.light ? '255,168,200' : '246,120,168', edge = q.light ? '226,120,164' : '204,84,140';
    if (face > .45) {                                       // petal facing you: a slanted three-pixel shape with a pale tip
      ctx.fillStyle = `rgb(${c})`; ctx.fillRect(X, Y, s * 2, s); ctx.fillRect(X + s, Y + s, s * 2, s);
      ctx.fillStyle = 'rgba(255,244,248,.95)'; ctx.fillRect(X, Y, s, s);
    } else {                                                // edge-on while it turns
      ctx.fillStyle = `rgb(${edge})`; ctx.fillRect(X + s, Y, s, s * 2);
    }
  }
}

// The falling cat to catch: a pixel portrait of the owner's cat (cream-orange, white blaze and muzzle, sleepy eyes, crossed paws).
const CAT = [
  '.O...........O.', '.OO.........OO.', '.OpO.......OpO.', '.OppOOOOOOOppO.', 'OOOOOoOWOoOOOOO', 'OOOOoOWWWoOOOOO', 'OOLLLOWWWOLLLOO',
  'OOEKEOWWWOEKEOO', 'OOOOOWWWWWOOOOO', '.OOOWWWPWWWOOO.', '.OOWWWWWWWWWOO.', '..WWWWWWWWWWW..', '...WWWWWWWWW...', '....WWW.WWW....',
];
const CAT_PAL = { O: '#e8a868', o: '#c98a50', W: '#fbf3ea', L: '#a8703c', E: '#c99a50', K: '#3a2a1e', P: '#d8907a', p: '#f0b0a0' };
const GOLD_PAL = { ...CAT_PAL, O: '#f2c14e', o: '#d49a2a', W: '#fff4cc', L: '#b07a1a', E: '#fff0a0' };
const YOKO = [
  '.F...........F.', '.FF.........FF.', '.FpF.......FpF.', '.FppFFFFFFFppF.', 'FFFFsFFsFFsFFFF', 'FFFFFFFFFFFFFFF', 'FFAAAFFFFFAAAFF',
  'FFAKAFFFFFAKAFF', 'FFFFFFFFFFFFFFF', '.FFFFyyPyyFFFF.', '.FFFyyyyyyyFFF.', '..FFFyyyyyFFF..', '...FFFFFFFFF...', '....FFF.FFF....',
];
const YOKO_SPR = { F: '#eeb060', s: '#cf8a3c', A: '#e8a41c', K: '#2a1d14', P: '#e58f8f', p: '#f4b6a6', y: '#f8dcae' };
const YOKO_GOLD = { ...YOKO_SPR, F: '#f2c14e', s: '#d49a2a', y: '#fff4cc', A: '#fff0a0' };
function catSprite(gold, yoko = false) {                                  // drawn once per pixel size, then copied
  const s = Math.max(2, Math.round(packSize() / 9)), key = `cat-${gold}-${yoko}-${s}`, grid = yoko ? YOKO : CAT;
  return cache[key] ||= (() => {
    const c = document.createElement('canvas'), x = c.getContext('2d'), pal = yoko ? (gold ? YOKO_GOLD : YOKO_SPR) : gold ? GOLD_PAL : CAT_PAL;
    c.width = grid[0].length * s; c.height = grid.length * s;
    grid.forEach((row, r) => [...row].forEach((ch, k) => { if (pal[ch]) { x.fillStyle = pal[ch]; x.fillRect(k * s, r * s, s, s); } }));
    return c;
  })();
}
/* ---------- what a tap does at each time of day (night launches fireworks) ---------- */
let wrings = [], fishes = [], lanterns = [];
function tapEffect(x, y, t) {
  const groundY = H - topRows * cs;
  if (phaseKey === 'night') { launchFirework(x, y); if (++fwCount === 12) secret('finale', t); return; }
  if (reduced() || bgImg) return rings.push({ x, y, t });
  if (phaseKey === 'morning') {                             // a puff of sakura petals; on the lake, water rings too
    for (let i = 0; i < 14; i++) { const a = Math.random() * Math.PI * 2, sp = 60 + Math.random() * 110;
      petals.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40, sway: Math.random() * 6, spin: Math.random() * 6, spinV: .004 + Math.random() * .004, light: Math.random() < .5, burst: true }); }
    const lake = y > H * PHASES.morning.horizon && y < groundY;
    if (lake) wrings.push({ x, y, t });
    Sound.play(lake ? 'splash' : 'petals');
  } else if (phaseKey === 'day') {
    const b = coastBands();
    if (y > b.hz && y < b.shore) {                          // the sea: a splash and a jumping fish
      for (let i = 0; i < 12; i++) sparks.push({ x, y, vx: (Math.random() - .5) * 5, vy: -2 - Math.random() * 5, life: 1, c: i % 3 ? '#ffffff' : '#9fd8ff' });
      fishes.push({ x, y, t, dir: Math.random() < .5 ? -1 : 1 }); wrings.push({ x, y, t });
      Sound.play('splash');
    } else if (y >= b.shore && y < b.track + pxs() * 6) {   // the road and track: call the train
      if (t < trainAt - 1800) { trainAt = t + 1500; toast('Train coming.'); Sound.play('bell'); }
      rings.push({ x, y, t });
    } else rings.push({ x, y, t });
  } else {                                                  // evening: release a sky lantern
    if (lanterns.length < 16) lanterns.push({ x, y, t, sway: Math.random() * 6, v: 16 + Math.random() * 14 });
    if (++lanternCount === 10) secret('festival', t);
    Sound.play('lantern');
  }
}
function drawTapFx(t, dt) {
  const p = pxs(), snap = v => Math.round(v / p) * p;
  wrings = wrings.filter(r => t - r.t < 1300);
  for (const r of wrings) for (let k = 0; k < 2; k++) {     // flat pixel rings spreading on the water
    const a = (t - r.t) / 1300 - k * .22; if (a <= 0) continue;
    const rx = a * cs * 9, ry = rx * .28; ctx.fillStyle = `rgba(255,255,255,${.7 * (1 - a)})`;
    for (let i = 0; i < 28; i++) { const an = i / 28 * Math.PI * 2; ctx.fillRect(snap(r.x + Math.cos(an) * rx), snap(r.y + Math.sin(an) * ry), p, Math.max(1, p / 2 | 0)); }
  }
  fishes = phaseKey === 'day' ? fishes.filter(f => t - f.t < 900) : [];
  for (const f of fishes) {                                 // a small fish arcs out of the water and back
    const a = (t - f.t) / 900, x = snap(f.x + f.dir * a * cs * 6), y = snap(f.y - Math.sin(a * Math.PI) * cs * 5), d = f.dir;
    ctx.fillStyle = '#ff9a5c'; ctx.fillRect(x, y, p * 3, p * 2);
    ctx.fillStyle = '#ffd0a8'; ctx.fillRect(x, y + p, p * 3, p);
    ctx.fillStyle = '#ff9a5c'; ctx.fillRect(x - d * p + (d < 0 ? p * 2 : 0), y - (a < .5 ? 0 : p) + p / 2, p, p * 2);   // tail
    ctx.fillStyle = '#1d1a2a'; ctx.fillRect(x + (d > 0 ? p * 2 : 0), y, p / 2, p / 2);
  }
  lanterns = phaseKey === 'evening' ? lanterns.filter(l => t - l.t < 9000 && l.y > -40) : [];   // lanterns belong to the evening scene
  for (const l of lanterns) {                               // paper lanterns drift up, flicker and fade
    l.y -= l.v * dt / 1000;
    const age = (t - l.t) / 9000, x = snap(l.x + Math.sin(t * .0011 + l.sway) * 16 + age * 30), y = snap(l.y), fade = age > .75 ? (1 - age) * 4 : 1;
    const g = ctx.createRadialGradient(x + p * 1.5, y + p * 2, 0, x + p * 1.5, y + p * 2, p * 9);
    g.addColorStop(0, `rgba(255,190,90,${.5 * fade})`); g.addColorStop(1, 'rgba(255,190,90,0)');
    ctx.fillStyle = g; ctx.fillRect(x - p * 8, y - p * 7, p * 19, p * 18);
    ctx.globalAlpha = fade;
    ctx.fillStyle = '#ff9c4a'; ctx.fillRect(x, y, p * 3, p * 4);
    ctx.fillStyle = Math.sin(t * .012 + l.sway) > 0 ? '#fff0b0' : '#ffd872'; ctx.fillRect(x + p, y + p, p, p * 2);
    ctx.fillStyle = '#b4521e'; ctx.fillRect(x, y, p * 3, Math.max(1, p / 2 | 0)); ctx.fillRect(x + p, y + p * 4, p, p / 2);
    ctx.globalAlpha = 1;
  }
}

/* ---------- hidden secrets: one or more per scene, found by tapping the right thing ---------- */
const SECRETS = {
  rainbow: 'a rainbow over the lake', shower: 'a blossom shower', gulls: 'the seagulls', rain: 'a rain cloud', toot: 'the train horn',
  boat: 'a sailboat at sunset', festival: 'the lantern festival', meteors: 'a meteor shower', lamp: 'the street lamp', finale: 'the fireworks finale', goldrain: "Echo's gold rain",
};
let eggs = store.get('cardstock-eggs', []).filter(k => SECRETS[k]);
let rainbowT = -1e9, gullsT = -1e9, boatT = -1e9, lanternCount = 0, fwCount = 0, petCount = 0;
const cloudPos = (c, t) => ({ x: Math.round(((c.x + t / 1000 * c.v) % (W + 240) - 120) / cs) * cs, y: Math.round(c.y / cs) * cs, w: c.w * cs, h: cs * 3 });
function secret(k, t) {
  const R = Math.random;
  if (k === 'rainbow') rainbowT = t;
  if (k === 'shower') { const x = treeC * cs + cs / 2, y = groundTop(treeC) - 6.5 * cs;
    for (let i = 0; i < 44; i++) petals.push({ x: x + (R() - .5) * cs * 5, y: y + (R() - .5) * cs * 3, vx: (R() - .5) * 240, vy: -R() * 160, sway: R() * 6, spin: R() * 6, spinV: .004 + R() * .004, light: R() < .5, burst: true }); }
  if (k === 'gulls') gullsT = t;
  if (k === 'boat') boatT = t;
  if (k === 'festival') for (let i = 0; i < 22; i++) lanterns.push({ x: R() * W, y: H - topRows * cs - R() * cs * 6, t: t + i * 90, sway: R() * 6, v: 18 + R() * 20 });
  if (k === 'meteors') for (let i = 0; i < 14; i++) meteors.push({ x: W * (.3 + R() * .75), y: H * R() * .3, t: t + i * 170, sp: .7 + R() * .5 });
  if (k === 'lamp') lampOff = !lampOff;
  if (k === 'finale') for (let i = 0; i < 10; i++) setTimeout(() => launchFirework(W * (.15 + R() * .7), H * (.1 + R() * .35)), 400 + i * 260);
  if (k === 'goldrain') for (let i = 0; i < 6; i++) packs.push({ x: 30 + R() * (W - 60), y: -40 - i * 50, vy: H / 7, sway: R() * 6, rot: 0, vr: 0, gold: true });
  const fx = { rainbow: 'rainbow', shower: 'petals', gulls: 'gulls', rain: 'rain', toot: 'horn', boat: 'foghorn', festival: 'festival', meteors: 'meteors', lamp: 'lamp', goldrain: 'gold' }[k];
  if (fx) Sound.play(fx);
  if (!eggs.includes(k)) {                                  // first time: count it, and reward finding them all
    eggs.push(k); store.set('cardstock-eggs', eggs); renderScore(true); setTimeout(() => Sound.play('secret'), 450);
    const n = eggs.length, all = n === Object.keys(SECRETS).length;
    if (all) { S.bonus = (S.bonus || 0) + 1; store.set('cardstock-state', S); renderCollect(); }
    toast(`Secret found: ${SECRETS[k]} (${n}/${Object.keys(SECRETS).length})` + (all ? '. All found: you earned a lucky pack.' : ''));
  } else if (k === 'toot') toast('Toot toot!');
  else if (k === 'lamp') toast(lampOff ? 'Lights out.' : 'Lights on.');
  return true;
}
// Does this tap land on something secret in the current scene?
function secretTap(x, y, t) {
  if (reduced() || bgImg) return false;
  const P = PHASES[phaseKey], b = P.body, [sx, sy] = bodyXY(P), onBody = Math.hypot(x - sx, y - sy) < b.r * 1.5 + 10;
  const gt = groundTop(treeC), onProp = Math.abs(x - (treeC * cs + cs / 2)) < cs * 3 && y > gt - cs * 9.5 && y < gt;
  if (phaseKey === 'morning') return onBody ? secret('rainbow', t) : onProp ? secret('shower', t) : false;
  if (phaseKey === 'evening') return onBody ? secret('boat', t) : false;
  if (phaseKey === 'night') return onBody ? secret('meteors', t) : onProp ? secret('lamp', t) : false;
  if (onBody) return secret('gulls', t);
  if (trainBox && x > trainBox.x && x < trainBox.x + trainBox.w && y > trainBox.y - 6 && y < trainBox.y + trainBox.h + 6) return secret('toot', t);
  const c = clouds.find(c => { const q = cloudPos(c, t); return x > q.x - 6 && x < q.x + q.w + 6 && y > q.y - cs - 6 && y < q.y + q.h + 6; });
  if (c) { c.rain = t + 5000; return secret('rain', t); }
  return false;
}
function drawSecrets(t) {
  const p = pxs(), snap = v => Math.round(v / p) * p;
  if (phaseKey === 'morning' && t - rainbowT < 10000) {     // rainbow: six stepped arcs over the lake
    const age = t - rainbowT, al = Math.min(1, age / 900, (10000 - age) / 1500) * .7, cx = W * .62, cy = H * PHASES.morning.horizon, r0 = Math.min(W * .34, H * .42);
    ['255,90,90', '255,170,70', '255,230,90', '110,220,130', '90,170,255', '170,120,255'].forEach((c, i) => {
      const r = r0 - i * p; ctx.fillStyle = `rgba(${c},${al})`;
      for (let a = Math.PI; a < Math.PI * 2; a += p / r * .9) ctx.fillRect(snap(cx + Math.cos(a) * r), snap(cy + Math.sin(a) * r), p, p);
    });
  }
  if (phaseKey === 'day') {
    for (const c of clouds) if (c.rain > t) {               // rain under a tapped cloud
      const q = cloudPos(c, t), fall = H - topRows * cs - q.y - q.h; ctx.fillStyle = 'rgba(190,228,255,.9)';
      for (let i = 0; i < c.w * 2; i++) ctx.fillRect(snap(q.x + (i * 37) % q.w), snap(q.y + q.h + (t * .28 + i * 53) % fall), Math.max(1, p / 2 | 0), p * 2);
    }
    if (t - gullsT < 7000) {                                // seagulls flapping across the sky
      const a = (t - gullsT) / 7000; ctx.fillStyle = '#ffffff';
      [[0, 0], [-9, 3], [-16, -2], [-24, 5], [-31, 1]].forEach(([dx, dy], i) => {
        const x = snap(-30 + a * (W + 260) + dx * p), y = snap(H * .2 + dy * p + Math.sin(t * .004 + i) * p * 2), f = Math.sin(t * .014 + i) > 0 ? -1 : 1;
        ctx.fillRect(x, y, p, p); ctx.fillRect(x - p, y + f * p, p, p); ctx.fillRect(x + p, y + f * p, p, p); ctx.fillRect(x - p * 2, y + f * p * 2, p, p); ctx.fillRect(x + p * 2, y + f * p * 2, p, p);
      });
    }
  }
  if (phaseKey === 'evening' && t - boatT < 18000) {        // a sailboat silhouette crossing the horizon
    const a = (t - boatT) / 18000, x = snap(W + 40 - a * (W + 160)), y = snap(H * PHASES.evening.horizon) + p * 2 + Math.round(Math.sin(t * .002)) * (p / 2 | 0);
    ctx.fillStyle = '#3a1640';
    ctx.fillRect(x, y, p * 9, p * 2); ctx.fillRect(x + p, y + p * 2, p * 7, p);
    ctx.fillRect(x + p * 4, y - p * 7, p, p * 7);
    for (let i = 0; i < 6; i++) ctx.fillRect(x + p * 5, y - p * (7 - i), p * (i + 1) * .7, p);
    ctx.fillStyle = '#ffd7a0'; for (let i = 0; i < 5; i++) ctx.fillRect(x - p * 3 + i * p, y - p * (6 - i), p * (i * .6 + 1) | 0 || p, p);
  }
}

function packSize() { return Math.max(18, cs * 2.2); }
function drawPacks(t, dt) {
  packs = packs.filter(p => p.y < H + 60);
  for (const p of packs) {
    const img = catSprite(p.gold, p.yoko), w = img.width, h = img.height;
    p.y += p.vy * dt / 1000; p.rot += p.vr * dt / 1000;
    p.sx = p.x + Math.sin(t * .0012 + p.sway) * 14;
    ctx.save(); ctx.translate(p.sx, p.y); ctx.rotate(Math.sin(t * .002 + p.sway) * .28);   // a gentle rock as it floats down
    ctx.shadowColor = p.gold ? 'rgba(255,201,74,1)' : 'rgba(255,240,220,.7)'; ctx.shadowBlur = p.gold ? 18 : 8;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, -w / 2, -h / 2);
    ctx.restore();
    if (p.gold && Math.sin(t * .01 + p.sway) > .3) { ctx.fillStyle = '#fff6c8'; ctx.fillRect(p.sx + w * .55, p.y - h * .5, 3, 3); ctx.fillRect(p.sx - w * .6, p.y + h * .1, 2, 2); }
  }
}
// Night taps: a pixel firework rises from the city to the tap, then bursts in two colours.
const FW_COLOURS = [['255,90,110', '255,200,120'], ['120,200,255', '255,255,255'], ['190,140,255', '255,150,220'], ['255,214,90', '255,140,60'], ['120,255,170', '200,255,120']];
function launchFirework(x, y) {
  const groundY = H - topRows * cs, rise = !reduced() && y < groundY - cs * 2;
  const pair = FW_COLOURS[Math.random() * FW_COLOURS.length | 0];
  const parts = Array.from({ length: reduced() ? 16 : 40 }, (_, i) => {
    const a = i / 40 * Math.PI * 2 + Math.random() * .15, sp = 90 + Math.random() * 110;
    return { vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, c: pair[i % 2] };
  });
  fireworks.push({ x, y, x0: x + (Math.random() - .5) * 40, y0: groundY, t: performance.now(), rise: rise ? 380 : 0, parts });
  if (rise) Sound.play('whistle');
  setTimeout(() => Sound.play('boom'), rise ? 380 : 0);
}
function drawFireworks(t) {
  const p = pxs(), snap = v => Math.round(v / p) * p;
  fireworks = fireworks.filter(f => t - f.t < f.rise + 1500);
  for (const f of fireworks) {
    const age = t - f.t;
    if (age < f.rise) {                                     // the rocket climbing, with a short fading trail
      const k = age / f.rise, e = 1 - (1 - k) * (1 - k), x = f.x0 + (f.x - f.x0) * e, y = f.y0 + (f.y - f.y0) * e;
      for (let i = 0; i < 5; i++) { ctx.fillStyle = `rgba(255,240,200,${1 - i / 5})`; ctx.fillRect(snap(x - (f.x - f.x0) * i * .02), snap(y + i * p * 1.2), p, p); }
      continue;
    }
    const a = (age - f.rise) / 1000, fade = Math.max(0, 1 - a / 1.5);
    if (a < .12) { ctx.fillStyle = `rgba(255,255,240,${1 - a / .12})`; ctx.fillRect(f.x - p * 2, f.y - p * 2, p * 4, p * 4); }   // flash
    for (const q of f.parts) for (let k = 0; k < 3; k++) {  // each spark plus two trail pixels; slows, falls, twinkles out
      const b = Math.max(0, a - k * .05), x = f.x + q.vx * b * (1 - b * .35), y = f.y + q.vy * b * (1 - b * .35) + 60 * b * b;
      const twinkle = a > 1 && Math.sin(t * .03 + q.vx) > 0 ? .4 : 1;
      ctx.fillStyle = `rgba(${q.c},${fade * (1 - k * .35) * twinkle})`; ctx.fillRect(snap(x), snap(y), p, p);
    }
  }
}
function drawEffects(t) {
  rings = rings.filter(r => t - r.t < 900);
  for (const r of rings) {
    const a = Math.max(0, (t - r.t) / 900);
    ctx.strokeStyle = `rgba(255,255,255,${.55 * (1 - a)})`; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(r.x, r.y, 6 + a * cs * 9, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.arc(r.x, r.y, 4 + a * cs * 5, 0, 7); ctx.stroke();
  }
  sparks = sparks.filter(s => s.life > 0);
  for (const s of sparks) {
    s.x += s.vx; s.y += s.vy; s.vy += .15; s.life -= .025;
    ctx.globalAlpha = Math.max(0, s.life); ctx.fillStyle = s.c; ctx.fillRect(s.x, s.y, 3, 3);
  }
  ctx.globalAlpha = 1;
}

function spawnPack(t) {
  if (reduced() || t < nextPack || packs.length >= 5) return;
  const pr = $('panel').getBoundingClientRect(), side = !mobile() && !$('profileView').hidden;
  const minX = side ? pr.right + 30 : 24, maxX = W - 24;
  if (maxX - minX > 40) packs.push({ x: minX + Math.random() * (maxX - minX), y: -40, vy: H / (8 + Math.random() * 4), sway: Math.random() * 6, rot: (Math.random() - .5) * .6, vr: (Math.random() - .5) * .8, gold: Math.random() < .06, yoko: Math.random() < .5 });
  nextPack = t + 1400 + Math.random() * 2200;
}
function renderScore(bump) {
  const el = $('score'); el.hidden = !score && !eggs.length;
  el.innerHTML = `<b>${score}</b> cat${score === 1 ? '' : 's'} caught` + (eggs.length ? ` · ✦ <b>${eggs.length}</b>/${Object.keys(SECRETS).length}` : '');
  if (bump) { el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump'); }
}

const MILESTONES = { 10: '10 caught. Echo found a cap.', 25: '25 caught. Echo put on a visor.', 50: '50 caught. Echo is glowing gold.' };
function catchPack(x, y, finger) {
  const reach = catSprite(false).width * .6 + (finger ? 14 : 4);
  const p = packs.find(q => Math.hypot(x - q.sx, y - q.y) < reach);
  if (!p) return false;
  packs.splice(packs.indexOf(p), 1);
  const before = score; score += p.gold ? 5 : 1; store.set('cardstock-score', score);
  hopT = performance.now(); awakeUntil = hopT + 6000; Sound.play(p.gold ? 'gold' : 'catch');
  const earned = Math.floor(score / CATS_PER_LUCKY) - Math.floor(before / CATS_PER_LUCKY);
  if (earned > 0) { S.bonus = (S.bonus || 0) + earned; store.set('cardstock-state', S); setTimeout(() => Sound.play('lucky'), 200); }
  renderCollect();
  for (let i = 0; i < 18; i++) sparks.push({ x, y, vx: (Math.random() - .5) * 7, vy: (Math.random() - .8) * 7, life: 1, c: p.gold ? '#ffd56a' : '#f4c08a' });
  rings.push({ x, y, t: performance.now() });
  if (navigator.vibrate) navigator.vibrate(15);
  renderScore(true);
  const hit = Object.keys(MILESTONES).map(Number).filter(m => before < m && score >= m).pop();
  if (earned > 0) toast((hit ? MILESTONES[hit] + ' ' : `${score} cats caught. `) + 'You earned a lucky pack.');
  else if (hit) toast(MILESTONES[hit]); else if (p.gold) toast('Golden cat: +5');
  return true;
}
addEventListener('pointermove', e => {
  mX = e.clientX; mY = e.clientY;
  if (reduced() || !inScene(mX, mY)) return;
  const t = performance.now();
  if (t - lastTrail > 160 && Math.hypot(mX - trailX, mY - trailY) > cs) { ripples.push({ x: mX, y: mY, t }); lastTrail = t; trailX = mX; trailY = mY; }
});
addEventListener('pointerup', e => { if (e.pointerType !== 'mouse') mX = mY = -999; });   // a lifted finger stops hovering
addEventListener('pointerdown', e => {
  if (e.button > 0 || e.target.closest('.panel, .hud, .hud-bl, .intro, .scrim, .stage-wrap, a, button')) return;
  const finger = e.pointerType !== 'mouse';
  awakeUntil = performance.now() + 6000;                    // a tap wakes the cat
  if (catchPack(e.clientX, e.clientY, finger)) return;
  const t = performance.now();
  ripples.push({ x: e.clientX, y: e.clientY, t, big: true });
  if (!secretTap(e.clientX, e.clientY, t)) tapEffect(e.clientX, e.clientY, t);
  const bx = botC * cs, by = groundTop(botC) - 8 * cs;
  if (e.clientX > bx && e.clientX < bx + 9 * cs && e.clientY > by && e.clientY < by + 8 * cs) { if (++petCount % 5 === 0) secret('goldrain', t); else { toast(`Mrrp. I'm Echo. I look after ${CONFIG.name.split(' ')[0]}'s cards.`); Sound.play('meow'); } }
  const yx = (botC - 10) * cs;
  if (e.clientX > yx - 2 * cs && e.clientX < yx + 7 * cs && e.clientY > by && e.clientY < by + 8 * cs) { toast('Yoko stares at you. Yoko says nothing.'); Sound.play('mrr'); }
});

let last = performance.now();
function frame(t) {
  requestAnimationFrame(frame);
  const dt = Math.min(50, t - last); last = t;
  if (!$('stageWrap').hidden || document.hidden) return;   // the stage covers the scene, so stop drawing it
  ripples = ripples.filter(r => t - r.t < 1400);
  const P = PHASES[phaseKey]; heights = heightsBy[phaseKey];
  spawnPack(t);
  drawSky(t, P); drawLand(t, P); drawPetals(t, dt, P); drawTapFx(t, dt); drawSecrets(t); drawPacks(t, dt); drawEffects(t); drawFireworks(t);
}
requestAnimationFrame(frame);
if (!store.get('cardstock-hint', false)) { $('intro').hidden = false; $('introOk').onclick = () => { $('intro').hidden = true; store.set('cardstock-hint', true); }; }
$('moreBtn').onclick = () => { const open = $('panel').classList.toggle('open'); $('moreBtn').setAttribute('aria-expanded', open); $('moreBtn').textContent = open ? 'Show less' : 'More about me'; };

/* ================= views ================= */
function route() {
  const binder = location.hash === '#binder';
  $('profileView').hidden = binder; $('binderView').hidden = !binder;
  if (binder) renderBinder();
  scrollTo(0, 0);
}
addEventListener('hashchange', route);
$('backBtn').onclick = () => { location.hash = ''; };

/* ================= sound and hide-card toggles ================= */
function renderToggles() {
  $('soundBtn').textContent = Sound.on ? '♪ Sound on' : '♪ Turn sound on'; $('stageSound').hidden = Sound.on; $('soundBtn').setAttribute('aria-pressed', Sound.on);
  const peek = $('profileView').classList.contains('peek');
  $('peekBtn').textContent = peek ? 'Show card' : 'Hide card'; $('peekBtn').setAttribute('aria-pressed', peek);
}
$('soundBtn').onclick = $('stageSound').onclick = () => { Sound.on = !Sound.on; store.set('cardstock-sound', Sound.on); renderToggles(); Sound.play('on'); };
$('peekBtn').onclick = () => { $('profileView').classList.toggle('peek'); renderToggles(); };
renderToggles();
let ambientN = 0; setInterval(() => Sound.ambient(phaseKey, ambientN++), 600);

renderProfile(); renderCollect(); renderClock(); renderScore(); route();
setInterval(() => { renderCollect(); renderClock(); }, 30000);
