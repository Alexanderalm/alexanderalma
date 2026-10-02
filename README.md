# Alexander — Artist, Musician, Sound Healer

Static marketing site. Plain HTML, CSS and one small JS file — **no build step,
no dependencies**. Open `index.html` in a browser and it works.

Imported from the Claude Design canvas *Alexander Artist* (project
`ca916265-3ba2-42ae-8f55-e28cc479afa2`), which used the **Organic** design
system (`497d94a3-…`).

## Structure

```
index.html          Home, three visual pathways and Let’s Go Deeper enquiries
about.html          About landing page, introduction and Alexander profile
musician.html       Music landing page: performance, sound healing, collaboration, recording, discography
sacred-playground.html Sacred Playground landing page: philosophy, Records, Brotherhood, gatherings, podcast
transpersonal-healing.html  Concise introduction and enquiry pathway
relational-coaching.html    Concise introduction and enquiry pathway
sound-healer.html   Detailed sound-healing sessions and practicalities
business.html       Existing business and corporate service details
practitioner.html   Existing practitioner and mentoring information
facilitator.html    Existing facilitation and gatherings information
css/organic.css     Design system — base tokens + component classes
css/palette.css     Colour palette — overrides organic.css colour tokens
css/site.css        Site layer — layout, shared dropdown navigation and responsive styling
js/site.js          Mobile navigation, dropdown behavior, contact form, footer year
assets/img/         Hero photography, responsive sizes and optimized October 2026 photos
assets/img/october-2026/  Optimized site copies of the supplied photo set
assets/video/       Muted looping Music page backdrop video
assets/reference/   Original concept art (not shipped in a page)
```

The canvas was a single file that swapped sections with `<sc-if>` and a
`DCLogic` class. That is a canvas runtime, not the web — here each "page" is a
real page with its own URL, title, description and canonical link, so the site
is crawlable, shareable and works without JavaScript.

## Content architecture

The primary navigation is a compact, content-width bar shared across the site. The clickable Alexander Alma mark and name come first, followed by **About**, **Music**, **Sacred Playground**, **Transpersonal Healing**, and **Relational Coaching**. Music and Sacred Playground link directly to their landing pages. On each landing page, a click-to-open menu beside the active tab jumps to sections on that page; the page itself is the overview. Transpersonal Healing and Relational Coaching each have a concise introduction and enquiry pathway. Footer pathways are grouped under **Sound**, **Musician**, and **Contact**.

The pages are **not** one template. Each changes the *kind* of content as the
visitor scrolls — image, statement, story, process, media, people, invitation —
in its own order, so no section is predictable from the one before it. The
rhythm was modelled on how cristinastoian.nl moves between narrative modes,
borrowing the structure only, never the look or the words.

`css/site.css` → *Editorial vocabulary* holds the components: `.statement`,
`.editorial-split`, `.media-feature`, `.process` (+ `.process-vertical`),
`.ruled-list`, `.word-stack`, `.facts`, `.image-story`, `.audio-feature`,
`.voices`, `.faq`, `.final-invitation`. They are vocabulary, not a template:
before adding a section, check the one above it isn't the same shape.

## Running it

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Deployment — GitHub Pages

Hosted on GitHub Pages at **alexanderalma.com**. There is no build step, so
Pages serves the repository root exactly as it stands.

Two files exist only for Pages:

- `CNAME` — holds the custom domain. **Do not delete it**; the Pages UI
  rewrites it when you change the domain there, and removing it drops the
  site back to `<user>.github.io/<repo>`.
- `.nojekyll` — stops Pages running the files through Jekyll, which silently
  skips anything whose name begins with an underscore.

### DNS at GoDaddy

Delete GoDaddy's default parking records first, or their "domain for sale"
page keeps winning. Then:

| Type | Name | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `Alexanderalm.github.io` |

All four A records — they are GitHub's published apex addresses and give you
redundancy, not alternatives. Add the AAAA set too if you want IPv6:
`2606:50c0:8000::153` through `...8003::153`.

Then in **Settings → Pages**, set the custom domain and wait for the
certificate to issue before ticking **Enforce HTTPS**. It is normal for that
tickbox to be greyed out for up to an hour after DNS first resolves.

### Repository and deployment

This working copy is connected to `git@github.com:Alexanderalm/alexanderalma.git`. GitHub Pages serves the repository root without a build step. Changes become public only after they are pushed to the configured publishing branch.

The `CNAME` and `.nojekyll` files are required for the current Pages setup; keep them in place.

## Open questions

- **Accounts (confirmed 2026-09-25).**
  - Cal.com — `cal.com/alexanderalma`. Every **Book** button opens the
    `90mins` event, *Vibrational Empathy Sound Healing*
    (`data-cal-link="alexanderalma/90mins"`). There is also a `15min`
    meeting, not linked yet. **Price still to confirm:** the site says
    £85 and Cal.com's page doesn't show a price we can read.
  - Mighty Networks — **Sacred Playground**, `alexander-alma.mn.co/spaces/25129475/about` (hero, `#ways-in`,
    `#stay-close`, every footer).
  - Patreon — `patreon.com/profile/creators?u=227957515`, same places. A
    vanity URL (`patreon.com/<name>`) reads better once one is claimed.

  Booking uses Cal.com's **embed** (`js/site.js`), not API v2: v2 authenticates
  with a secret `cal_live_…` key that must never reach the browser, and Pages
  has no server to hold it. If you later need v2 (e.g. syncing bookings into
  Mighty Networks), that needs a small serverless function alongside the site.

- **Contact address** — `presence@alexanderalma.com` (confirmed 2026-09-25).
## Design tokens

**Colour now lives in `css/palette.css`** — Alexander's ochre palette (ink, umber, bark, three ochres, gold, sun). It loads after `organic.css` and redefines every `--color-*` token, so change colour there and nowhere else. `site.css` uses no hardcoded palette colours: its near-black tones (hero scrim, night forest, nav shadow) all read `--palette-ink`. The notes below describe the original photo-sampled palette, which `palette.css` replaced; the type, spacing and radius tokens in `css/organic.css` still apply.

`css/organic.css` is the source of truth for the rest of the look. **The palette is
sampled from the hero photograph** — these anchors were read straight off the
frame, and every ramp is generated from their hues:

| Sampled from | Hex | Becomes |
|---|---|---|
| Foliage in shade — the dominant colour of the picture | `#1B2C16` | green ramp |
| Deepest shade, far right of frame | `#0E120C` | night-forest ground |
| Light through the canopy gap | `#608360` | top of the green ramp |
| Wet river stone | `#505144` | neutral ramp (olive, never cold grey) |
| The guitar — the only warm note in the image | `#9B816E` | warm ramp: every button, link and the lantern |

Ramps are generated in OKLCH on one shared lightness scale, so step N of any
ramp matches step N of the others in perceived value, and chroma is fitted
per step so nothing clips on the way into sRGB. Retune `:root` and the whole
site follows.

## Two things worth knowing before you edit

**The night forest.** The index section (`#ways`) is dark, and the cursor
carries a lantern: every row picks up the spill from wherever the light is,
and the row under the cursor lights its own hairline edge. `js/site.js`
writes the pointer position into `--mx` / `--my` custom properties once per
animation frame; the gradients live entirely in CSS, so the browser only ever
repaints. Touch devices and `prefers-reduced-motion` users get the lit state,
unmoving.

**Tone.** The design started from a canvas that was deliberately playful — a
bouncy display face, 999px pill buttons, and a cartoon tree with a face. All
three were retired: headings are Fraunces with its `SOFT` and `WONK` axes
zeroed, radii are 2–4px, and the tree's structure survives as a typographic
index rather than an illustration.

## Still to do before launch

- [ ] **Photography** — the hero is real (`assets/img/alexander-rainforest-*.jpg`,
      responsive via `srcset`). Five secondary slots are still empty and show
      their art-direction note. Drop an `<img>` inside each `.media-frame` and
      the note disappears automatically.
- [ ] **Second photo** — `IMG_0866.JPG` was requested but was not in
      `~/Downloads`; only `IMG_0865.JPG` was there. Supply it and it can fill
      one of the empty slots.
- [ ] **Audio** — replace the `.audio-strip` button with a SoundCloud,
      Bandcamp or Spotify embed.
- [ ] **Contact form** — currently opens a mail draft. For a real inbox, give
      the `<form>` an `action` (Formspree, Netlify Forms, your own handler);
      `js/site.js` steps aside as soon as an `action` is present.
- [ ] **Real content** — events, prices and testimonials are placeholder copy
- [ ] **Testimonials** — the three quotes in the home page's voices section
      came with the design canvas and are **not verified**. Replace them with
      real words (with permission) or delete the section. Never invent them.
- [ ] **New copy is draft** — the content restructure wrote new section copy
      on every page from the facts already on the site. Alexander should read
      all of it, especially: the practitioner **mentoring pathway and FAQ**
      (does he offer this, and how?), the business **formats**, the facilitator
      **examples** and "you provide", and the quote on the home page ("I would
      rather hold a room well than fill it") which is written in his voice.
- [ ] **Location vs. prices** — the site says he is based in the Dandenong
      Ranges (Victoria) but prices are in £ and the events are in the UK.
- [ ] **Case study** — `business.html` has a slot marked for one; add it
      when there is a real story to tell.
