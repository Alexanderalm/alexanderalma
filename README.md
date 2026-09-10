# Alexander — Artist, Musician, Sound Healer

Static marketing site. Plain HTML, CSS and one small JS file — **no build step,
no dependencies**. Open `index.html` in a browser and it works.

Imported from the Claude Design canvas *Alexander Artist* (project
`ca916265-3ba2-42ae-8f55-e28cc479afa2`), which used the **Organic** design
system (`497d94a3-…`).

## Structure

```
index.html          The tree — two branches, three roots
sound-healer.html   Branch: sound baths, sessions, pricing
musician.html       Branch: live sets, ceremony, collaboration
business.html       Root: corporate wellbeing, retreat ops, mentoring
practitioner.html   Root: training, practice, ethics
facilitator.html    Root: circles, offsites, festival spaces
css/organic.css     Design system — tokens + component classes
css/site.css        Site layer — layout, page chrome, hover states
js/site.js          Mobile nav, contact form, footer year
assets/img/         Hero photograph, five widths for srcset
assets/reference/   Original concept art (not shipped in a page)
```

The canvas was a single file that swapped sections with `<sc-if>` and a
`DCLogic` class. That is a canvas runtime, not the web — here each "page" is a
real page with its own URL, title, description and canonical link, so the site
is crawlable, shareable and works without JavaScript.

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

### First push — when Alexander's GitHub account is ready

The repo does not exist yet. It will live on **Alexander's** account, with us
pushing as a collaborator, so he needs to create it (or invite us to create
it) as **`alexanderalma`**, then:

```sh
# ALEX = Alexander's GitHub username
git remote add origin https://github.com/$ALEX/alexanderalma.git
git push -u origin main
```

Then he enables **Settings → Pages → Source: deploy from branch `main` / root**.

Three things worth knowing before that conversation:

- **The repo must be public.** Pages from a private repo needs a paid plan
  (Pro/Team). The site is public either way; this is about the source.
- **The `www` CNAME target depends on whose account it is** —
  `<his-username>.github.io`, not ours. The four apex A records above are the
  same regardless.
- **A domain can only serve one Pages site at a time.** If `alexanderalma.com`
  gets attached to a repo on another account first, the second one silently
  fails verification.

Optionally he can verify the domain at account level (Settings → Pages →
Verified domains) which blocks anyone else claiming it on Pages later.

### Deploying a change after that

```sh
git push          # Pages rebuilds on push to main
```

## Open questions

- **Contact address.** Still `hello@alexander.art`, in four places
  (`index.html` JSON-LD, the form's `data-to`, and the contact list). Needs a
  real mailbox on the new domain.

## Design tokens

`css/organic.css` is the source of truth for the look. **The palette is
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
      carried over from the design.
- [ ] **Social links** — footer points at bare `instagram.com` / `spotify.com`.
