# Design Brief

## Direction

FotoData — an Indonesian photo-logging tool for Product Safety Hium 3, presented as a clean chronological gallery with a printable report, now gated by a username/password login and a change-username profile screen.

## Tone

Cool, trustworthy editorial gallery — a light off-white canvas where photos pop, with a deep ocean-blue primary (safety/industrial) and a warm amber "shutter" accent reserved for the capture moment and brand emblem.

## Differentiation

The amber camera-shutter accent is the signature "capture moment" color against a cool gallery canvas; the login and change-username screens reuse the same brand lockup and ocean-blue actions so auth feels like part of the product, not a bolt-on.

## Color Palette

| Token       | OKLCH          | Role                                  |
| ----------- | -------------- | ------------------------------------- |
| background  | 0.98 0.008 230 | Cool off-white gallery canvas         |
| foreground  | 0.18 0.015 230 | Primary text                          |
| card        | 1.0 0.004 230  | Photo card / form surface             |
| primary     | 0.42 0.14 240  | Deep ocean-blue actions, links, header|
| accent      | 0.72 0.17 70   | Warm amber capture/shutter CTA        |
| muted       | 0.94 0.01 230  | Subtle fills & secondary zones        |
| destructive | 0.55 0.22 25   | Delete / error / failed login         |
| success     | 0.6 0.16 150   | Upload-complete / username saved      |

## Typography

- Display: Space Grotesk — headings, page titles, "Product Safety Hium 3" logo lockup
- Body: DM Sans — paragraphs, labels, form inputs, UI text
- Mono: Geist Mono — timestamps, photo counts, report metadata
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, h2 `text-2xl md:text-3xl font-semibold tracking-tight`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Flat gallery canvas with soft elevated shadows on photo cards (`shadow-photo`) and a dedicated `shadow-form` on the login/change-username card; a warm glow for the shutter button (`shadow-shutter`) and a subtle ringed `shadow-logo` for the brand lockup; depth through layered surfaces, not gradients.

## Structural Zones

| Zone    | Background    | Border   | Notes                                          |
| ------- | ------------- | -------- | ---------------------------------------------- |
| Header  | bg-primary    | border-b | Deep-blue app bar with logo + amber capture CTA|
| Auth    | bg-auth       | —        | Centered login / change-username card on canvas|
| Content | bg-background | —        | Alternating muted bands for stats & gallery    |
| Footer  | bg-muted/40   | border-t | Subtle closing band                            |

## Spacing & Rhythm

Generous section gaps (py-12 md:py-20) with a tight 4-6-8 spacing grid inside cards; auth card is a focused centered column (max-w-sm) with comfortable field spacing; photo grid uses consistent gutters with responsive columns.

## Component Patterns

- Buttons: rounded-lg; primary ocean-blue, accent amber for capture; hover lifts with shadow
- Cards: rounded-2xl, bg-card, shadow-photo / shadow-form, hover shadow-elevated
- Inputs: rounded-lg, bg-background, border-input, focus-ring on focus, label as uppercase tracking-widest
- Badges: rounded-full pill, muted fill with accent text for day/week/month counts
- Logo: Space Grotesk lockup with amber shutter-ring emblem, shadow-logo, logo-in entrance

## Motion

- Entrance: logo-in 0.5s for brand, form-in 0.45s for auth card, fade-in 0.4s staggered for cards
- Hover: card lift + shadow transition 0.3s
- Decorative: shutter-pulse on capture button, shutter-spin on logo emblem ring

## Constraints

- Photo-centric layout: thumbnails and capture UI are the focal elements
- Responsive grid for desktop and mobile; auth card is mobile-first centered
- Indonesian UI text; clean, minimal, no decoration on productivity surfaces
- Login uses username + password (no Internet Identity); signed-in user can change username
- Print-friendly report view (browser print) for day/week/month ranges

## Signature Detail

The warm amber circular shutter button — the single capture CTA — set against a cool ocean-blue header and off-white gallery, with the "Product Safety Hium 3" logo lockup anchoring both the login and change-username screens and home.
