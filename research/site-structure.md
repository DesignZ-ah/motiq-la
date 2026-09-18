# Current Site Structure & Technology — Motiq

## There is no existing website.

Verified: the Yelp listing sidebar has no website link; Apple Maps lists the **Yelp page itself** as the business's website; no `motiq*` domain surfaced in any search; the business's own Instagram link-in-bio points to Cash App ordering, not to a site.

So the usual Phase 0 work — inventory the navigation, find dead links, spot duplicate pages, decide what to preserve — does not apply. There is nothing to preserve and nothing to clone. **This is a greenfield build.**

## What is serving as the website today
The brand's web presence is currently spread across platforms it does not control:

| Surface | Role it is playing | Problem |
|---|---|---|
| Instagram @motiqlosangeles | The real homepage. Identity, hours, parking, ordering link, all the photography | Requires an account to browse properly; nothing is indexable; hours buried in a bio |
| Yelp | The de-facto info page and menu | About text still describes the previous brand, M CAFÉ |
| Cash App order page | The checkout | Off-brand surface; no menu browsing experience |
| DoorDash / Uber Eats | Delivery | Their own menus, their own prices, unverifiable from outside |
| Apple Maps | Directions | Wrong suite number, and points "website" back at Yelp |
| Directory sites | Discovery | Contradict each other on hours and parking |

**Consequence for Phase 1:** the single largest, cheapest win available is simply becoming the source of truth. There is currently no page anywhere that Motiq controls where all the correct information appears together.

## Existing technology to preserve
No CMS, no theme, no ecommerce platform, no booking engine, no reservation system, no analytics, no forms, no customer accounts, no newsletter provider. Nothing to migrate.

**Backend functionality that must be preserved by linking out, not rebuilt:**
1. **Cash App ordering** — `cash.app/order/$motiqlosangeles`. First-party, already in use, already promoted by the business. A new site should send orders here, not attempt to build ordering.
2. **DoorDash and Uber Eats storefronts** — existing, working delivery. Link out.
3. **Phone** — `tel:+12134602588`, a real conversion for a cafe.
4. **Directions** — maps deep link.

Nothing here justifies building a cart, an account system or a reservation flow. A walk-in cafe with 8am–10pm hours does not take bookings, and there is no evidence it ever has.

## SEO / structured data that exists today
- No page titles, meta descriptions, canonical URLs, Open Graph tags or social preview images exist, because no site exists.
- Yelp publishes `LocalBusiness` schema for Motiq containing: name, image, priceRange `$$`, telephone, postal address, aggregateRating 4.4/216, opening hours 08:00–22:00 daily, `petsAllowed: true`, payments accepted (Apple Pay, Android Pay, credit card), amenity features (street parking, lot parking, wheelchair accessible, outdoor seating), and a catering offer. That is a useful model for the schema the new site should publish itself — **with facts confirmed by the owner, not copied from Yelp.**
- The business has no favicon, no OG image, and no owned URL to share. Every link anyone shares today is a Yelp or Instagram link.
