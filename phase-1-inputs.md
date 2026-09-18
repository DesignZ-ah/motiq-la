# PHASE 1 INPUT SHEET — Motiq
Filled from Phase 0 evidence. **Three lines need your decision before Phase 1 starts — they are marked ⚠.**

**BUSINESS:** Motiq (the business writes it as "Motiq coffee & brunch")

**INDUSTRY:** Specialty coffee, ceremonial matcha and brunch cafe

**WHAT THEY SELL / OFFER:** Espresso, ceremonial matcha, hojicha and tea, $4.50–$7.50, built around a signature "cream top" family of six drinks. Plus a full brunch and lunch kitchen, $7–$17, including kimchi carbonara, kimchi and spam fried rice, three sandwiches, a burger and brunch plates. 37 items total.

**TARGET CUSTOMER:** Matcha seekers who compare LA cafes against each other · remote workers and students who need somewhere to sit for hours · Koreatown locals and the Korean-American community · brunch and lunch customers · people driving, for whom free parking decides the choice.

**PRIMARY CTA:** ⚠ **Order Online** → `cash.app/order/$motiqlosangeles` — the only CTA the brand has ever written for itself.
*My recommendation: make **Visit / Get Directions** primary and Order Online secondary. For a neighbourhood cafe open 8am–10pm with free parking, the visit is the sale, and the site's biggest unmet job is being the correct source of hours, address and parking. Tell me which way you want it.*

**SECONDARY CTA:** Get Directions (or Order Online, if the above is flipped) — 2789 W Olympic Blvd, Ste 201

**THIRD CTA:** View Menu · with `tel:+12134602588` available throughout

**LOCATION:** Koreatown, Los Angeles. Upstairs at M Plaza, 2789 W Olympic Blvd, Ste 201, LA 90006

**BRAND PERSONALITY:** Precise · sensory · restrained · quietly proud · editorial · Korean-American. Publishes origin, roast and process. Never says "best". *(Derived from their own copy — see `research/brand.md`.)*

**DESIRED FEELING:** The care in the cup, visible before a word is read. Calm rather than loud. Somewhere you would both queue for a drink and stay for four hours.

**COLOURS THEY LIKE** *(read off their own photography, not invented)*: one saturated matcha green · cream and warm off-white · milk white · warm near-black · roasted brown · amber and caramel · dark green-grey marble. The rule the brand follows: **one strong colour per view, everything else neutral.**

**COLOURS TO AVOID:** any second strong colour competing in the same view · pastel "cute cafe" palettes · black-and-gold luxury cliché · cool blue-grey neutrals, which fight the warm browns.

**FONT PREFERENCES:** Match what they already use: a high-contrast serif in letterspaced caps for display, a quiet grotesque in caps for labels and small body. The script is the logo and stays the logo. **Their actual font files are unknown** — close matches will be used unless the owner supplies them.

**PAGES NEEDED:** ⚠ One landing page is the recommendation, with sections for the drinks, the cream top, the kitchen, the room and visiting. A separate `/menu` page is worth adding if the full 37 items should be browsable. *Confirm one page or two.*

**CURRENT WEBSITE:** None. Greenfield.

**REFERENCE WEBSITES:** None supplied. Category review in `research/competitor-notes.md` — the local matcha cafes have far better photography than websites, which is the opening.

**AVAILABLE PHOTOS / VIDEOS:**
- **16 first-party JPEGs**, graded in `research/media-audit.md`. All portrait. Five carry baked-in text. No logo vector.
- **One video**, `video/hero/weekend-at-motiq.mp4` — 1276×718 landscape, 32.46 s, 4.57 MB, with audio. Verified shot list in `research/video-timestamps.md`. Three A-grade segments: the pour (00:21.1–00:27.1), the full daylight room (00:12.8–00:16.1), the signage (00:00–00:02.8).
- **8 posters** extracted at 1276×718 in `video/posters/`.
- Caveats: Instagram-grade bitrate, and a **"Weekend / at Motiq" caption burned in at mid-left and mid-right**, which is where a hero headline normally sits.

**TECH STACK:** ⚠ Recommendation: **static HTML, CSS and vanilla JS, with GSAP and exactly one smooth-scroll engine.** No CMS, no ecommerce, no accounts and no bookings are needed, so a framework would add weight without adding anything. *Confirm, or name the stack you want.*

**GITHUB REPOSITORY:** None. This folder is not a git repository yet.

**SPECIAL FEATURES:**
- A scroll journey that moves light → dark → warm dark, following the assets' own backgrounds. This is the direct answer to "keep the background relevant to each picture".
- A pour / cream-top reveal as the motion idea, taken from the brand's own photography rather than added on — and now backed by six seconds of real pour footage.
- Hero video with a poster-first load: the still shows immediately, the clip loads only on capable connections, and never under Save-Data or reduced motion.
- The espresso spec cards (01 BRIGHT, 02 BOLD) re-set as live type instead of shipped as flat images.
- Menu prices held in one editable data file.
- Directions, hours and parking treated as a designed section, not footer small print.
- Full reduced-motion and no-JS fallbacks.

**PROPOSED SKILL SET FOR PHASE 1** *(smallest relevant set, no mixing of unrelated aesthetic systems)*
1. `design-first-ui-prompting` — settle the look before building
2. `build-awwwards-quality-sites` — main design and build pass
3. `image-first-grid-layout` — portrait-led editorial composition, which is what our assets force
4. `cinematic-gsap-lenis-motion-system` — one motion stack, one scroll engine
5. `optimize-web-animations` — motion clean-up after the design works
6. `iterate-until-verified` — final visual QA loop

**HARD RULES CARRIED FORWARD FROM PHASE 0**
- Do not publish the Los Angeles Times claim without the article link.
- Do not publish a rating other than Yelp 4.4 / 216, cited.
- Do not invent testimonials, awards, dietary labels, catering details or staff.
- Do not use any Yelp customer photograph.
- Resolve the image-rights question in `research/owner-confirmation.md` before the site goes public.
