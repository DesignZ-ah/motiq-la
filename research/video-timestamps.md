# Video Audit & Shot List — Motiq
Source file: ``hero-motiq/igexport-DdDrXFVJIeH.mp4` (as supplied)`
Preserved at `source-assets/video/igexport-DdDrXFVJIeH.mp4` · production copy at `video/hero/weekend-at-motiq.mp4`

## Technical facts (measured, not assumed)
| Property | Value |
|---|---|
| Duration | **32.46 s** |
| Dimensions | **1276 × 718** — landscape, 16:9 |
| File size | 4.57 MB |
| Total bitrate | ~1,123 kbps (video ~1,025 kbps, audio ~97 kbps) |
| Audio | **Yes** — 2 channels. Would be muted for background use |
| Container | MP4 |
| Provenance | Instagram export from the brand's own account, same export naming as the 16 stills |
| Baked-in overlay | **"Weekend" at mid-left, "at Motiq" at mid-right**, light sans, present for the whole clip |

**This is the first and only landscape asset in the entire project.** It changes the hero problem completely.

## How this was measured
No `ffmpeg`, `ffprobe`, ImageMagick, Xcode command line tools, Homebrew, Node or usable Python exist on this machine. Frames were extracted by loading the file in a real browser over a local server, seeking to exact timestamps, and drawing each frame to a canvas. Shot boundaries were found by sampling every 0.25 s and measuring frame-to-frame difference. **Every timestamp below was observed. None is estimated.**

## Shot list — verified cuts
| Range | Content | Use |
|---|---|---|
| **00:00–00:02.8** | Exterior/lobby signage: the "motiq." wordmark in black script on a warm cream illuminated lightbox, sculptural plant beside it, suite plaque reading **201** | **A** — the brand mark in the real world. Also independently corroborates Suite 201 |
| 00:02.8–00:05.1 | Queue of customers arriving at the glass entrance, daylight, handheld, heavy movement | C — energy and proof of demand, but shaky |
| 00:05.1–00:07.6 | Counter handoff: a barista's arm places two branded matcha cups onto the counter for a waiting customer | **B+** — service and the branded cup together |
| 00:07.6–00:10.6 | Interior queue along the counter, guests waiting, daylight | C |
| 00:10.6–00:12.8 | Exterior storefront, "motiq." sign above the glass doors, guests seated outside | **B** — the arrival shot |
| **00:12.8–00:16.1** | **Wide daylight interior.** The full room: exposed ceiling and ducting, circular ring pendants, concrete columns and floor, blue banquettes, floor-to-ceiling glass, and dozens of people working and eating at tables | **A** — the single most important frame we now hold. Proves the room, the scale and the "second home during the day" claim in one image |
| 00:16.1–00:18.6 | Barista preparing matcha at the bar, hands and pitcher, close | **B+** — craft |
| 00:18.6–00:21.1 | Three finished matcha cups on the counter, coconut flakes on top, branded labels facing camera | **B+** — product line-up |
| **00:21.1–00:27.1** | **The pour.** Matcha poured from a pitcher into a cup of milk over ice, green breaking through white. Six seconds, the longest single shot in the clip | **A** — the hero motion moment, and the exact motif the brand shoots over and over in stills |
| 00:27.1–00:30.6 | Finished layered drinks: a green/white/amber layered cup next to a cream-top drink with a dusted line | **B** — the cream top and the layers, in colour |
| 00:30.6–00:32.4 | A hand sets an iced coffee down on marble | B |

## Ranking
- **A — hero footage:** 00:21.1–00:27.1 (the pour) · 00:12.8–00:16.1 (the room) · 00:00–00:02.8 (the sign)
- **B — strong storytelling:** 00:05.1–00:07.6 · 00:16.1–00:18.6 · 00:18.6–00:21.1 · 00:27.1–00:30.6 · 00:10.6–00:12.8 · 00:30.6–00:32.4
- **C — supporting only:** the two queue shots, 00:02.8–00:05.1 and 00:07.6–00:10.6. Handheld and unstable
- **D — avoid:** none

## Posters extracted (1276 × 718, in `video/posters/`)
| File | Timestamp | Subject |
|---|---|---|
| `poster-storefront-sign.jpg` | 1.2 s | The wordmark lightbox and suite 201 plaque |
| `poster-counter-handoff.jpg` | 6.5 s | Two matcha cups handed across the counter |
| `poster-room-daylight-full.jpg` | 14.0 s | The full daylight room, packed |
| `poster-barista-whisk.jpg` | 17.4 s | Matcha preparation at the bar |
| `poster-three-cups.jpg` | 19.6 s | Three finished matcha cups |
| `poster-matcha-pour.jpg` | 23.7 s | The pour, mid-stream |
| `poster-matcha-pour-2.jpg` | 25.4 s | The pour, later, green filling the cup |
| `poster-finished-drinks.jpg` | 28.6 s | Two finished layered drinks |

## Quality assessment, honestly
**Strengths:** landscape, real, on-brand, and it fills four gaps the stills could not — the sign, the daylight room, the staff, and motion. The pour segment is genuinely good footage.

**Limitations, all real:**
1. **Resolution and bitrate are modest.** 1276 px wide at ~1 Mbps is an Instagram re-encode. Full-bleed on a 1440 px or larger screen means upscaling, and compression artefacts will show in the dark and in fast motion. It is strong at contained sizes, behind an overlay, or as a masked panel. It is not 4K hero footage.
2. **The "Weekend / at Motiq" overlay is burned in at mid-left and mid-right** — exactly where a hero headline or CTA usually sits. Any use needs a crop, a mask, or a composition that works around the text. It cannot be removed without tooling this machine does not have.
3. **Handheld.** Two shots have real camera shake.
4. **Identifiable faces.** The wide room shot shows dozens of recognisable customers. See `owner-confirmation.md`.
5. **Audio is present** but was not evaluated for music licensing. Background video would be muted anyway.

## Tooling gap that affects Phase 1
There is no `ffmpeg` on this machine, and no Homebrew or Xcode command line tools to install it with. That means **no transcoding to WebM/AV1, no trimming to the good segments, no re-compression, and no multi-bitrate versions.** Options:
- **(a)** Install Homebrew and ffmpeg. The Homebrew install needs your Mac password, so it is the one step you would have to run yourself.
- **(b)** Ship the 4.57 MB MP4 as-is, loaded conditionally — poster first, video only on capable connections, never on Save-Data or reduced-motion.
Option (a) is better: trimming to the 6-second pour alone would cut the payload by roughly 80%.
