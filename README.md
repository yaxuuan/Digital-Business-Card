# Cardstock

A gamified digital business card in one file, `index.html`. Visitors open it from an NFC tap or a QR code, see your contact links, catch falling pixel cats, and rip open a pack to collect one of your cards.

## Files

| File | Holds |
|---|---|
| `index.html` | The page markup, plus the link-preview tags at the top |
| `style.css` | All styles |
| `rules.js` | Pack rules: odds, cooldown, duplicates, serial numbers |
| `app.js` | Everything else: your details, cards, scenes, game, pack opening, binder |
| `tests/rules.test.js` | Tests for the pack rules: `node --test tests/` |

## Make it yours

Click **Use this template** on GitHub, then open `app.js` and edit at the top. The photo and links are blank, so fill in the ones you want to show:

- `CONFIG`: name, title, bio, photo, `github`, `projects` (name, blurb and optional link for each), background (a photo to turn into the pixel background, or blank for the time-of-day scenes), email, phone, Telegram, Instagram, LinkedIn, time zone, and `url` (the address written to your NFC card and QR code).
- `CARDS`: your collectible cards (name, rarity, art, flavour text). Each card has a `set`, which decides which pack it comes from.
- `SETS`: the packs a visitor can choose between (Dev pack, Cat pack), with the title and art printed on each pack.

Then in `index.html`, update the title and description tags at the top. They show when the link is shared in a chat.

## Run it

Open `index.html` in a browser, or put the file on any static host (Cloudflare Pages, GitHub Pages, Netlify). No build step.

## Deploy it

1. Click **Use this template** and create your own repo.
2. Edit `CONFIG` in `app.js` and the tags at the top of `index.html`.
3. Host the folder on any static host:
   - **Cloudflare Pages / Workers**: connect your repo, no build command, output directory `/`.
   - **GitHub Pages**: Settings, Pages, deploy from the `main` branch.
   - **Netlify**: drag the folder in, or connect the repo.
4. Set `url` in `CONFIG` to your live address so the QR code and NFC link point at it.

## Hidden secrets

Eleven things in the scenes react to a tap, and a counter beside the cat score tracks how many a visitor has found. Finding all of them earns a lucky pack. The list and what each does are in `SECRETS` and `secretTap` in `app.js`.

## Known limits

- Packs: a visitor holds 3, one refills every hour, and every 10 cats caught earns a lucky pack with no Commons. Each pack has 3 cards. Duplicates turn into treats, which buy a chosen missing card in the binder. Finishing a pack's set earns a lucky pack and a mascot outfit. The numbers are `PACK_MAX`, `PACK_REFILL_MS`, `CATS_PER_LUCKY`, `PACK_SIZE`, `TREATS` and `CRAFT_COST` in `rules.js`.
- "Send me your details" opens the visitor's own mail app with a message filled in. Nothing is stored or sent by the page.
- Share image: none ships with the template. Screenshot your finished card as `og.jpg` (1200x630) and add the `og:image` tags described at the top of `index.html`.
- Pack rolls and the catch score are stored in the visitor's browser only. Lines marked `shortcut:` show what moves to a server before real use.

## License

MIT, see `LICENSE`.
