# Jamaica Adventure Hub

A small, responsive, multi-page website that helps visitors discover things to do in Jamaica (waterfalls, hikes, beaches, food and culture) and send a booking request.

Built for **Dynamic Websites and Applications** (VTDI, School of Applied Technology) - Assignment 1.

- **Student:** DAndraWalker
- **Student ID:** 240-1011-258
- **Lecturer:** Trevoir Williams
- **Concept:** Jamaica Adventure Hub 

---

## 1. Project concept and planning

**Purpose:** Make it easy to browse a small set of Jamaican experiences, compare them, and request a booking.

**Audience:** Visitors and locals planning a day trip or weekend activity, on a phone or a computer.

**Site map**

| Page | File | Purpose |
| --- | --- | --- |
| Home / landing | `index.html` | Hero carousel, why use the hub, featured experiences, "Did you know?" fact button |
| Content / exploration | `explore.html` | Filter, search and sort all experiences; open full details in a modal |
| Interaction | `plan.html` | Booking request form with validation, live price estimate, FAQ |

**Visual identity:** Jamaican flag colours (green, gold, black) on a warm cream background, one navbar and footer shared by every page, and original SVG illustrations (so there are no copyright or broken-link issues).

---

## 2. Project structure

```
jamaica-adventure-hub/
├── index.html
├── explore.html
├── plan.html
├── css/
│   └── styles.css        custom brand styles on top of Bootstrap
├── js/
│   ├── data.js           the data: array of objects + constants
│   └── app.js            all behaviour (vanilla JavaScript + jQuery)
├── images/               original SVG illustrations (one per experience)
└── README.md
```

## 3. How to run

No build step is needed. Open `index.html` in a browser (or use the VS Code "Live Server" extension). An internet connection is needed because Bootstrap and jQuery load from a CDN.

---

## 4. Technologies used

| Technology | How it is used |
| --- | --- |
| **HTML5** | Semantic structure: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`; one `h1` per page with a logical heading order |
| **CSS3** | `css/styles.css`: brand variables, hero, card hover, focus styles, reduced-motion support |
| **Bootstrap 5.3** | Grid, navbar, cards, buttons, forms, spacing and responsive utilities |
| **Bootstrap JavaScript** | Carousel, Modal, Toast, Accordion/Collapse (see below) |
| **JavaScript (ES6)** | Data, rendering, filtering, validation, calculations |
| **jQuery 3.7** | Back-to-top button and live character counter |

### Bootstrap JavaScript components

| Component | Where | How |
| --- | --- | --- |
| **Navbar Collapse** | All pages | `data-bs-toggle="collapse"` for the mobile menu |
| **Carousel** | `index.html` | Hero slider using `data-bs-ride`, indicators and controls |
| **Modal** | `index.html`, `explore.html` | Opened from JavaScript with `bootstrap.Modal.getOrCreateInstance(...).show()`; its title, image, badges and tips list are filled from the data object |
| **Toast** | All pages | Created with `bootstrap.Toast.getOrCreateInstance(...)` for wish-list and form messages |
| **Accordion** | `plan.html` | FAQ using `data-bs-toggle="collapse"` and `data-bs-parent` |

---

## 5. JavaScript concepts and where to find them

| Concept | Example in the code |
| --- | --- |
| `const` / `let` | `const attractions` (never reassigned) vs `let wishlist`, `let html` in `renderAttractions` (reassigned) |
| Data types | strings (`name`), numbers (`price`, `rating`), booleans (`featured`, `saved`) in every attraction object |
| Arrays | `attractions`, `islandFacts`, `wishlist` |
| Objects | Each attraction is an object (`id`, `name`, `parish`, `category`, `price`, ...); `state` in `initExplore`; `booking` in the form handler |
| Conditions | `getDifficultyClass()`, group discount in `calculateEstimate()`, empty results message, `validators` |
| Functions | `createCardHTML()`, `renderAttractions()`, `calculateEstimate()`, `validateField()`, `openDetails()`, `showToast()` |
| Iteration | `for...of` loops build cards, filter buttons, the select list and modal tips; `.filter()`, `.map()` and `.sort()` for searching and sorting |
| DOM selection | `qs()` / `qsa()` helpers wrapping `querySelector` / `querySelectorAll` |
| DOM modification | `textContent`, `innerHTML`, `classList.toggle`, `setAttribute`, `createElement` |
| Events | `click` (filters, card buttons, fact button, guest stepper), `input` (search, live estimate), `change` (sort, select, checkboxes), `blur`, `submit`, `reset` |

### Interactive workflows

1. **Category filter + search + sort** (`explore.html`): buttons are generated from the data, then the grid re-renders and the result count updates.
2. **Details modal**: "View details" fills a Bootstrap modal using the clicked experience's object.
3. **Wish list**: Save/Unsave a card, count shown in the navbar, kept in `localStorage`, and a toast confirms.
4. **Booking form with live estimate** (`plan.html`): the price, guests and pickup option update the estimate instantly; groups of 5 or more get 10% off.
5. **"Surprise me" fact** (`index.html`): shows a random fact without repeating the same one twice in a row.

### Form and client-side validation (`plan.html`)

- Every control has a `<label>`; the form uses `novalidate` so JavaScript controls the messages.
- The form is submitted through a `submit` event listener that calls `preventDefault()`, then reads the values into a `booking` object.
- Rules: name (2+ characters), email format, experience chosen, date not in the past, guests a whole number from 1 to 20, and the checkbox ticked.
- Errors appear with Bootstrap `is-invalid` / `invalid-feedback`; the first invalid field receives focus.
- On success a green confirmation shows the details, estimated total and a reference code, and a toast appears. User-typed text is escaped before being inserted into the page.

### jQuery features (`js/app.js`, bottom of file)

1. **Back-to-top button** - `$(window).on("scroll", ...)` checks `scrollTop()` and uses `fadeIn()` / `fadeOut()`; clicking it uses `$("html, body").animate({ scrollTop: 0 })` for a smooth scroll.
2. **Notes character counter** - `$("#notes").on("input", ...)` reads `.val().length`, updates the text with `.text()` and turns it red near the limit with `.toggleClass()`.

---

## 6. Accessibility and responsive design

- "Skip to main content" link, `aria-current` on the active nav link, `aria-live` regions for results and totals, `aria-pressed` on toggle buttons.
- Meaningful `alt` text on every informative image; decorative emoji icons are hidden with `aria-hidden`.
- Visible keyboard focus (`:focus-visible`), keyboard-operable modal, accordion and carousel.
- Mobile-first Bootstrap grid (1 column on phones, 2 on tablets, 3 on desktop), collapsible navbar, and `prefers-reduced-motion` support.
- Tested at about 390px (phone), 768px (tablet) and 1280px (desktop) widths.

## 7. Data notice

All prices, durations and ratings are **sample values for a class project**, not real quotes. Attraction descriptions are brief summaries; check official sources before visiting.

---

## 8. AI use disclosure

AI tool used: Claude (Anthropic).
I used Claude to help build the project.
## 9. Credits

- [Bootstrap 5.3](https://getbootstrap.com/) and [jQuery 3.7](https://jquery.com/) loaded from CDNs
- Illustrations (`images/*.svg`) are original files created for this project and are used as a fallback if a photo is missing
- Photos (`images/*.jpg`): found through an online image search for each place and used here for a non-commercial school project. Original photographers are not individually identified; the photos are not my own work. Photos were resized and compressed for the web.
