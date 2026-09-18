# Motiq — one-page site

An independent design concept for **Motiq**, a Korean-owned coffee, ceremonial matcha
and brunch cafe in Koreatown, Los Angeles. One scroll-driven page in static HTML, CSS
and vanilla JavaScript, where the page background changes to match the photograph on
screen.

**Live site:** https://designz-ah.github.io/motiq-la/

## Not affiliated with Motiq

This is a speculative design exercise. It is **not** an official Motiq website, and it
was not commissioned, reviewed or approved by the business.

- Photography and video are exports from the business's own Instagram account,
  [@motiqlosangeles](https://www.instagram.com/motiqlosangeles/), and remain their
  property. They are used here for a non-commercial design study, and would need the
  owner's permission, or replacement, before any real launch.
- No photography from Yelp is used anywhere. Those images belong to the reviewers who
  took them.
- Menu items, prices, hours and amenities come from the business's own published
  listings, were current in September 2026, and are subject to change.
- Anything that could not be verified was deliberately left off the page. See
  [`research/owner-confirmation.md`](research/owner-confirmation.md).

## Run it

```bash
ruby -run -e httpd . -p 8788
```

Then open <http://localhost:8788/>. Opening `index.html` directly works too, but a
server is closer to production behaviour for the video.

No build step, no package manager, no dependencies to install. GSAP and Lenis load
from a CDN; fonts load from Google Fonts. Both need a network connection.

## What is here

```
index.html                the whole page
assets/css/style.css      design system and layout (tokens at :root, theme per section)
assets/js/main.js         nav, hero video lifecycle, GSAP/ScrollTrigger + Lenis motion
images/                   production photography by section, at -600/-1000/-1600 widths
video/hero/               the hero clip
video/posters/            stills pulled from that clip, including the cropped versions
source-assets/            untouched originals (16 Instagram stills and the video)
research/                 Phase 0 findings: business facts, menu, brand notes, open questions
content/captured-copy.md  every line of the business's own wording, verbatim
phase-1-inputs.md         the brief this build was made from
```

## The idea

The page ground colour changes to match whatever is on screen: cream for the matcha
world, dark marble for the cream tops, near-black for espresso, roasted brown for
hojicha, slate for the kitchen, daylight neutral for the room. Every value was sampled
from the actual image pixels rather than picked by eye.

Typography follows what the business already uses on its own tasting cards: a
high-contrast serif for display, a letterspaced grotesque for labels and body.

## Key behaviour

- **Hero** loops a six-second segment of the supplied video (21.1s–27.1s, the matcha
  pour), CSS-cropped to hide a caption burned into the source. Poster renders first;
  the clip loads second, pauses offscreen and when the tab is hidden, and never loads
  at all under reduced motion or `Save-Data`.
- **Motion** is GSAP with ScrollTrigger, and Lenis as the single smooth-scroll engine.
  Headings reveal word by word with the unsplit text kept as the accessible name.
- **`prefers-reduced-motion`** disables smooth scroll and every reveal, renders final
  states immediately, and drops the video for the still.
- **No JavaScript** still gives a complete page: all copy, all images, all links.

## Verified

Checked at 1280, 1100, 768, 510 and 375 px with no horizontal overflow; keyboard
navigation and focus; mobile menu open, Escape and focus return; JavaScript disabled;
`prefers-reduced-motion`; hero video autoplay, loop and fallback; console clean.

## Known limitations

- **Wordmark** is set in Bodoni Moda as a stand-in. The real mark is a brush script and
  appears only as a photograph in the Visit section. Swap in the vector when it exists.
- **Video** is 1276x718 at roughly 1 Mbps, the only master available. With `ffmpeg` it
  should be trimmed to the six-second pour, cutting about 80% of its weight.
- **The room photograph** shows identifiable customers. See `research/owner-confirmation.md`.
- **Images are JPEG only.** The machine this was built on could not write WebP or AVIF.

## Credits

Design and build: [@DesignZ-ah](https://github.com/DesignZ-ah), with Claude Code.
Photography and video: [@motiqlosangeles](https://www.instagram.com/motiqlosangeles/).
