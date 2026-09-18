# PHASE 0 BRIEF — Motiq
Research complete. No design, no code, no layout decisions have been made.

---

## BUSINESS
Motiq is a Korean-owned coffee, matcha and brunch cafe upstairs at 2789 W Olympic Blvd, Ste 201, in Koreatown, Los Angeles. It opened under this name in 2026 after operating as M Cafe and then Mi Cafe at the same address. It runs two real programmes at once: a documented espresso and ceremonial matcha drink list at $4.50–$7.50, and a full brunch and lunch kitchen at $7–$17 that includes kimchi carbonara, kimchi and spam fried rice, three sandwiches and a burger. It is open 8am to 10pm every day, has free parking and free Wi-Fi, holds 4.4 stars from 216 Yelp reviews, and **has never had a website.**

## AUDIENCE
Read off the evidence, not assumed:
- **People who came for the matcha specifically.** Reviewers arrive having been told about it and compare it against other LA matcha spots. Matcha is the reason Motiq is on out-of-town itineraries.
- **People who need somewhere to work or study.** Yelp's own "People also searched for" module returns *Study Cafe*, *Study Spots*, *Study*. Review after review talks about seating, Wi-Fi, laptops and outlets. The owner's own older copy calls it "your second home during the day".
- **Koreatown locals and the Korean-American community**, for whom misugaru, hojicha, kimchi carbonara and spam fried rice are familiar rather than novel.
- **Brunch and lunch customers**, a distinct visit that the drink programme alone would not explain.
- **Drivers**, explicitly. Free parking in Koreatown is repeatedly named as the reason people chose this cafe.

## PRIMARY GOAL
As stated by the client: a premium, attention-catching landing page with scroll animation. Underneath that, the real conversions are **visit** (directions, hours, parking) and **order online**. Ranked in the conversion audit below.

## BRAND
Already exists and is unusually coherent for a business with no website. A black brush-script wordmark ending in a full stop. A self-written three-word positioning, *Coffee • Matcha • Brunch*. Two deliberate photographic worlds — matcha shot light on cream, espresso and food shot dark with a single warm light. A typographic system of its own: high-contrast letterspaced serif caps for display, quiet grotesque caps for labels. A voice that is precise, sensory, restrained and quietly proud, which publishes origin, roast and process for its espresso and never once says "best". Full detail in `brand.md`.

## STRONGEST CONTENT
1. **The cream-top family** — the owner's own "Signature Drink" category, six items, one named after the business.
2. **The espresso spec cards** — 01 BRIGHT and 02 BOLD, with notes, origin, roast and process already written. Roastery-grade transparency, ready to use.
3. **The hojicha copy** — "(Uji) … Kyoto", and two finished paragraphs of the brand's own tasting language.
4. **The menu itself** — 37 items with real descriptions and prices, written in the house voice.
5. **The room** — 8am to 10pm, free parking, free Wi-Fi, indoor, covered patio and a rooftop level. The most-praised thing in the reviews.
6. **The Korean-American specificity** — misugaru, kimchi carbonara, spam fried rice. The differentiator, and it lives in the products rather than in the decor.

## STRONGEST MEDIA
**Stills:** 16 first-party images, all portrait. Top tier: the macro matcha pour onto ice (`matcha-pour-macro-ice.jpg`), the pour into the branded cup (`matcha-pour-branded-cup.jpg`), the espresso extraction (`espresso-extraction-portafilter.jpg`) and the single espresso in a ribbed glass (`espresso-shot-ribbed-glass.jpg`).

**Video:** one 32.46 s clip, **1276 × 718 landscape**, 4.57 MB — the only landscape asset in the project. Three A-grade segments: the pour (00:21.1–00:27.1), the full daylight room (00:12.8–00:16.1) and the signage (00:00–00:02.8). Eight posters extracted. Caveats are real: Instagram-grade bitrate, and a "Weekend / at Motiq" overlay burned in at mid-left and mid-right.

Full grading in `media-audit.md`, full shot list in `video-timestamps.md`.

## WEAKNESSES
- **No website at all**, so no traffic, no indexable presence, and no owned link to share.
- **The owner's own Yelp description still describes the previous brand, M CAFÉ.**
- **Every still is portrait.** The only landscape material in the project is the video.
- **No patio and no rooftop photograph** — two of the things customers praise most.
- **One food image**, and it has text burned into it, for a 16-dish kitchen.
- **No logo vector and no brand fonts.**
- **The video is Instagram-grade** — 1276 px wide at ~1 Mbps, with a caption overlay burned across the middle of the frame.
- **Third-party listings contradict each other** on hours and parking, and Apple Maps has the wrong suite.
- **An unverified press claim** sits in the live menu copy.

## OPPORTUNITIES
- Become the **source of truth** — the one correct page for hours, parking, address, menu and ordering. Nothing currently fills that role.
- Build the page on the brand's **own two-world art direction**: light for matcha, dark for espresso, warm dark for the room and the food. This is exactly what the client asked for when they said keep each section's background relevant to its picture, and it turns a constraint into the structure of the page.
- Make the **cream top and the pour** the motion idea. The brand already shoots the pour obsessively. Scroll-linked reveal of a layer settling is native to this business, not decoration bolted on.
- Treat the **espresso spec cards as real content**, re-set as live type rather than shipped as flat images.
- Give the **kitchen genuine space**. Nobody in this category does.
- **Portrait-first composition.** Since all media is vertical, an editorial split layout is the honest answer and it makes the mobile experience native rather than reduced.

## FUNCTIONAL REQUIREMENTS TO PRESERVE
Link out, do not rebuild:
1. Cash App ordering — `cash.app/order/$motiqlosangeles` (the business's own ordering link)
2. DoorDash and Uber Eats storefronts
3. `tel:+12134602588`
4. Maps directions to 2789 W Olympic Blvd Ste 201
No cart, no accounts, no reservations, no newsletter. None exist and none are warranted.

## OWNER CONFIRMATION
See `owner-confirmation.md` in full. The critical five: the Los Angeles Times claim, parking specifics, the espresso bean naming conflict, the current authoritative menu with modifier prices, and image-use rights.

## MEDIA GAPS
**Resolved by the video:** landscape footage, the storefront and sign, the daylight room, staff at work, and the pour in motion.
**Still needed:** food photography without baked-in text (one card is the entire library for a 16-dish kitchen), a logo vector, and higher-resolution footage if the video is to run full-bleed on large screens.
**Nice to have:** the patio, the rooftop level, the pastry case, packaging, vertical mobile-native footage.
**New question raised by the video:** the wide room shot contains dozens of identifiable customers. That is a consent decision, not a technical one.

---

# DESIGN-PHASE INPUTS

## Conversion audit
**PRIMARY**
1. **Visit** — get directions, know the hours, know the parking. This is a neighbourhood cafe; a visit is the sale.
2. **Order online** — the business's own Cash App ordering link.

**SECONDARY**
3. **View the menu** — the most-wanted information after hours and location.
4. **Call** — `tel:` for a real cafe question.

**SUPPORTING**
5. Follow on Instagram — the brand's live channel and its best content.
6. Delivery via DoorDash / Uber Eats.
7. Catering enquiry — **blocked** until the owner supplies any catering information at all.

**Not applicable:** reservations, ecommerce checkout, customer accounts, quote requests, consultations. The business model does not support them.

## Trust / proof inventory
**Verified and usable**
- 4.4 stars from 216 Yelp reviews, cited and linked to the source. (Individual review text must not be copied without permission.)
- Health Score A.
- Yelp-listed attributes: Asian-owned, wheelchair accessible, ADA-compliant entrance and restroom, free Wi-Fi, outdoor seating, dogs allowed, compostable containers, plastic-free packaging, reusable tableware.
- The espresso programme's own documented origin, roast and process.

**Flagged, needs owner approval**
- The Los Angeles Times claim. Strong if real; unusable without the link.
- 1,276 Instagram followers — honest but weak as proof. Probably not worth displaying.

**Must not be used**
- The 4.5 / 109 rating found on joe.coffee — it belongs to the previous brand.
- Any invented testimonial, award, partnership or statistic.
- Customer review text lifted onto the site without permission.

## Storytelling themes (supported by real assets)
1. **The cream top** — the house signature. A layer that sits, then melts. Six menu items, one named after the business.
2. **Two temperaments** — matcha in daylight, espresso in the dark. The brand's own two photographic worlds, used as the page's structure.
3. **Ceremony and origin** — Uji and Kyoto matcha, whisked in a bowl; espresso with published origin, roast and process.
4. **The Korean-American table** — misugaru, hojicha with chestnut cream, kimchi carbonara, spam fried rice.
5. **Your second home during the day** — the room, 8am to 10pm, free parking, Wi-Fi, patio, rooftop. The owner's own phrase, and the thing customers praise most.
6. **Craft in the cup** — extraction, whisking, pouring. We have all three as stills.
7. **Upstairs on Olympic** — arrival, the M Plaza building, the parking, Koreatown itself.

## Media-to-story mapping
| Theme | Primary image | Supporting |
|---|---|---|
| The cream top | `images/creamtop/creamtop-dark-powder-teal-chair.jpg` | `creamtop-cocoa-orange-zest-marble.jpg`, `creamtop-grain-powder-marble.jpg` |
| Two temperaments | `images/matcha/matcha-pour-macro-ice.jpg` set against `images/espresso/espresso-shot-ribbed-glass.jpg` | the whole light set vs the whole dark set |
| Ceremony and origin | `images/editorial/hojicha-whisk-bowl-card.jpg` (photo only, text re-set live) | `espresso-01-bright-card.jpg`, `espresso-02-bold-card.jpg` as **content**, re-typeset |
| The Korean-American table | `images/editorial/food-kimchi-fried-rice-alfredo-card.jpg` | **thin — one image for the whole kitchen.** Flagged as a gap |
| Second home during the day | `images/interior/interior-counter-barista-evening.jpg` | **thin — night only. No daylight room exists.** Flagged as a gap |
| Craft in the cup | `images/espresso/espresso-extraction-portafilter.jpg` | `matcha-pour-glass-cream-bg.jpg`, `coffee-beans-kraft-bag.jpg` |
| Upstairs on Olympic | **no asset exists** | Needs a storefront shot |

## Hero candidates

**Candidate A — the video's pour segment, `video/hero/weekend-at-motiq.mp4` 00:21.1–00:27.1** *(recommended, with conditions)*
- Why: six seconds of matcha falling into milk over ice, in motion, landscape, and unmistakably this cafe. It is the same motif the brand shoots obsessively in stills, only alive. Poster fallback already extracted: `video/posters/poster-matcha-pour.jpg`.
- Readability: the frame is mostly mid-tone green and white, so type needs either a scrim or placement in the darker right third.
- Conditions, all real: the clip is 1276 px wide at ~1 Mbps, so full-bleed on a large display will soften; and the burned-in "Weekend / at Motiq" overlay sits at mid-left and mid-right, exactly where a headline would go. Either crop past the overlay, mask it, or design the type around it.
- Desktop: native 16:9, the only asset that fills a wide viewport honestly.
- Mobile: needs a centre crop to portrait, or swap to the poster still.

**Candidate B — `images/matcha/matcha-pour-macro-ice.jpg`** *(recommended if the hero stays still)*
- Why: the strongest single frame we hold. A stream of matcha breaking over ice, filling the frame. It is texture rather than object, so it crops in any direction without losing its subject — the only asset in the set that does.
- Readability: pale grey-white, so dark type sits on it cleanly. The upper-left is the quietest area.
- Desktop crop: works full-bleed at almost any ratio, or as the image half of a split composition.
- Mobile crop: native 4:5 portrait, no crop needed.
- Still, not video. There is no video.

**Candidate C — `images/matcha/matcha-pour-branded-cup.jpg`**
- Why: the pour plus the **branded cup**, so the hero carries brand identity as well as craft. Clean white ground. Largest matcha file at 1440×1920.
- Readability: white background, dark type, very high contrast. The logo is already burned into the lower right, which constrains where type can go.
- Desktop crop: best as a split or a contained portrait frame; a wide crop cuts the pour.
- Mobile: native portrait.

**Candidate D — `images/espresso/espresso-extraction-portafilter.jpg`**
- Why: if the hero should feel like a coffee bar rather than a matcha bar. Near-black with a single amber stream. The most dramatic frame in the dark world.
- Readability: excellent for light type; almost the whole frame is dark and quiet.
- Desktop crop: vertical subject, so a landscape crop loses the stream. Split composition or a pinned section suits it.
- Mobile: native portrait.

**Constraint that still applies:** every *still* is vertical. Only the video is landscape. So either the hero is built on the video with a portrait poster fallback for mobile, or it is built around a portrait frame on purpose. This is a composition decision for Phase 1, not made here.

## Creative opportunities worth considering (not decided)
Editorial split layouts driven by portrait media · a light-to-dark scroll progression following the assets' own backgrounds · scroll-linked reveal of a cream top settling or a pour landing · the espresso spec cards re-set as live typographic panels · an honest, restrained menu presentation with real prices · a visit section with map, parking, hours and a directions action.
**Probably wrong for this business:** an interactive map with heavy custom tooling for one location, a timeline (the history is a rebrand, not a heritage story), before/after, case studies, a shop.

## Performance risks to plan for
- **Three images are 3072×4096.** They must be converted to WebP/AVIF with responsive sizes; shipping them as-is would be the largest single performance mistake available.
- **All media is portrait**, so desktop will downscale heavily. Art-directed `<picture>` sources are needed rather than one file resized by CSS.
- **Aspect-ratio boxes are mandatory** or portrait media will cause visible layout shift.
- **Five images carry baked-in text** that becomes illegible when scaled down. They must never be used as responsive background images.
- **Two font families maximum** — a high-contrast display serif and a grotesque — subset and self-hosted.
- **One smooth-scroll engine only.** Never two.
- **The video is 4.57 MB for 32 seconds**, of which only about 6 seconds are hero-grade. It must never autoload on mobile data, under Save-Data, or under reduced motion. Poster first, video second.
- **No `ffmpeg` on this machine, and no Homebrew or Xcode command line tools to install it.** So the video cannot currently be trimmed, re-compressed, converted to WebM/AV1, or exported at multiple bitrates. Trimming to the pour alone would cut roughly 80% of the payload. Installing Homebrew needs your Mac password, so that step is yours to run. Posters were extracted through the browser instead, and those are already in the project.
- Instagram embeds, map iframes and third-party widgets should be avoided or deferred.

## Final media folder structure
```
motiq/
  research/        business-info · brand · menu · media-audit · video-timestamps ·
                   links · site-structure · competitor-notes · owner-confirmation ·
                   phase-0-summary · phase-00-research-brief
  content/         captured-copy.md   (all verbatim first-party copy)
  images/
    matcha/        4 files — pour macro, pour into branded cup, pour into glass, layered latte
    espresso/      3 files — extraction, shot in ribbed glass, beans in kraft bag
    creamtop/      3 files — cocoa and orange zest, grain powder, dark powder with teal chair
    interior/      1 file  — counter and barista, evening
    editorial/     5 files — hojicha whisk, hojicha iced, 01 Bright, 02 Bold, food card
                             (all five carry baked-in text)
  video/
    hero/          weekend-at-motiq.mp4  (1276×718, 32.46s, 4.57 MB)
    posters/       8 stills at 1276×718 — sign, counter handoff, daylight room,
                   barista whisk, three cups, pour ×2, finished drinks
  source-assets/
    instagram-export/  all 16 image originals, untouched, original filenames preserved
    video/             the video original, untouched
```
No `images/branding/`: there is no logo file. No empty folders were created.
