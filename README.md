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
assets/reference/   Source concept art (not shipped in a page)
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

## Design tokens

`css/organic.css` is the source of truth for the look. The brand palette is
five browns:

| Token | Hex | Role |
|---|---|---|
| `--color-accent-900` | `#663A00` | Darkest — footer, dark bands |
| `--color-accent-700` | `#8F5509` | Primary accent (`--color-accent`) |
| `--color-accent-600` | `#B37C34` | Mid — hover states |
| `--color-accent-400` | `#D9B27C` | Light — leaves, highlights |
| `--color-accent-200` | `#F5E3CB` | Page ground (`--color-bg`) |

Interpolated steps fill the gaps so the ramps stay evenly spaced in visual
value. Retune the palette in `:root` and the whole site follows.

## Still to do before launch

- [ ] **Photography** — six image slots are empty and show their art-direction
      note. Drop a `<img>` inside each `.media-frame`; the note disappears
      automatically.
- [ ] **Audio** — replace the `.audio-strip` button with a SoundCloud,
      Bandcamp or Spotify embed.
- [ ] **Contact form** — currently opens a mail draft. For a real inbox, give
      the `<form>` an `action` (Formspree, Netlify Forms, your own handler);
      `js/site.js` steps aside as soon as an `action` is present.
- [ ] **Domain** — `SITE` in the canonical/OG tags is `https://alexander.art`.
      Search and replace once the real domain is settled.
- [ ] **Real content** — events, prices and testimonials are placeholder copy
      carried over from the design.
- [ ] **Social links** — footer points at bare `instagram.com` / `spotify.com`.
