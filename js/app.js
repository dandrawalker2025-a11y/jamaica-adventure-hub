/* ==========================================================
   app.js - behaviour for Jamaica Adventure Hub
   Depends on: data.js (attractions, islandFacts, constants),
               Bootstrap bundle (Modal, Toast), jQuery.
   Each page sets <body data-page="..."> so only the code for
   that page runs.
   ========================================================== */
"use strict";

/* ---------- Small helpers ---------- */

// Shorthand DOM selectors (DOM selection)
const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

// Turn a number into a money string, e.g. 25 -> "$25.00"
function formatMoney(amount) {
  return "$" + amount.toFixed(2);
}

// Escape user-typed text before placing it inside innerHTML
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Pick a Bootstrap badge colour based on difficulty (conditions)
function getDifficultyClass(difficulty) {
  if (difficulty === "Easy") {
    return "text-bg-success";
  } else if (difficulty === "Moderate") {
    return "text-bg-warning";
  }
  return "text-bg-danger";
}

function findAttraction(id) {
  return attractions.find((item) => item.id === id);
}

/* ---------- Wish list (saved in localStorage) ---------- */

const WISHLIST_KEY = "jahWishlist";

function loadWishlist() {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return []; // storage unavailable - start with an empty list
  }
}

let wishlist = loadWishlist(); // array of attraction ids

function saveWishlist() {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch (error) {
    /* ignore - the list simply will not persist */
  }
}

function updateWishlistBadge() {
  const badge = qs("#wishlistCount");
  if (badge) {
    badge.textContent = wishlist.length;
  }
}

// Adds or removes an id. Returns true if the item is now saved.
function toggleWishlist(id) {
  const index = wishlist.indexOf(id);
  let nowSaved;
  if (index === -1) {
    wishlist.push(id);
    nowSaved = true;
  } else {
    wishlist.splice(index, 1);
    nowSaved = false;
  }
  saveWishlist();
  updateWishlistBadge();
  return nowSaved;
}

/* ---------- Bootstrap Toast ---------- */

function showToast(message) {
  const toastElement = qs("#appToast");
  qs("#toastMessage").textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastElement, { delay: 3000 }).show();
}

/* ---------- Cards ---------- */

function wishButtonLabel(saved) {
  return saved ? "\u2665 Saved" : "\u2661 Save";
}

// If a photo (.jpg) is missing, fall back to the matching illustration (.svg)
function fallbackImage(path) {
  return path.replace(/\.jpe?g$|\.png$|\.webp$/i, ".svg");
}

// Build the HTML for one attraction card from an object
function createCardHTML(item) {
  const saved = wishlist.includes(item.id);
  const hourWord = item.duration === 1 ? "hour" : "hours";

  return `
    <div class="col-sm-6 col-lg-4">
      <article class="card h-100 attraction-card shadow-sm">
        <img src="${item.image}" class="card-img-top" alt="${item.alt}" loading="lazy"
             onerror="this.onerror=null;this.src='${fallbackImage(item.image)}'">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge category-badge">${item.category}</span>
            <span class="small text-muted" aria-label="Rated ${item.rating} out of 5">&#9733; ${item.rating}</span>
          </div>
          <h3 class="h5 card-title">${item.name}</h3>
          <p class="small text-muted mb-2">${item.parish} &middot; ${item.duration} ${hourWord} &middot; from ${formatMoney(item.price)}</p>
          <p class="card-text">${item.summary}</p>
          <div class="mt-auto d-flex gap-2">
            <button type="button" class="btn btn-jam btn-sm details-btn" data-id="${item.id}">View details</button>
            <button type="button" class="btn btn-outline-danger btn-sm wish-btn ${saved ? "saved" : ""}"
                    data-id="${item.id}" aria-pressed="${saved}">${wishButtonLabel(saved)}</button>
          </div>
        </div>
      </article>
    </div>`;
}

// Loop through a list and put all of the cards in a container (iteration)
function renderAttractions(list, container) {
  let html = "";
  for (const item of list) {
    html += createCardHTML(item);
  }
  container.innerHTML = html;
}

// One click listener on the grid handles every card button (event delegation)
function attachCardEvents(container) {
  container.addEventListener("click", (event) => {
    const detailsButton = event.target.closest(".details-btn");
    const wishButton = event.target.closest(".wish-btn");

    if (detailsButton) {
      openDetails(detailsButton.dataset.id);
    } else if (wishButton) {
      const id = wishButton.dataset.id;
      const saved = toggleWishlist(id);
      wishButton.classList.toggle("saved", saved);
      wishButton.setAttribute("aria-pressed", String(saved));
      wishButton.textContent = wishButtonLabel(saved);
      showToast(saved ? `${findAttraction(id).name} added to your wish list.` : "Removed from your wish list.");
    }
  });
}

/* ---------- Bootstrap Modal filled by JavaScript ---------- */

function openDetails(id) {
  const item = findAttraction(id);
  if (!item) {
    return; // unknown id - do nothing
  }

  qs("#detailsModalLabel").textContent = item.name;
  const image = qs("#modalImage");
  image.onerror = () => {
    image.onerror = null;
    image.src = fallbackImage(item.image);
  };
  image.src = item.image;
  image.alt = item.alt;

  qs("#modalCategory").textContent = item.category;
  const difficulty = qs("#modalDifficulty");
  difficulty.textContent = item.difficulty;
  difficulty.className = "badge " + getDifficultyClass(item.difficulty);

  const hourWord = item.duration === 1 ? "hour" : "hours";
  qs("#modalMeta").textContent =
    `${item.parish} | ${item.duration} ${hourWord} | Rating ${item.rating}/5 | from ${formatMoney(item.price)} per guest`;
  qs("#modalDescription").textContent = item.description;

  const tipsList = qs("#modalTips");
  tipsList.innerHTML = "";
  for (const tip of item.tips) {
    const li = document.createElement("li");
    li.textContent = tip;
    tipsList.appendChild(li);
  }

  qs("#modalPlanLink").href = `plan.html?activity=${encodeURIComponent(item.id)}`;
  bootstrap.Modal.getOrCreateInstance(qs("#detailsModal")).show();
}

/* ==========================================================
   HOME PAGE
   ========================================================== */

function initHome() {
  const featuredGrid = qs("#featuredGrid");
  const featured = attractions.filter((item) => item.featured);
  renderAttractions(featured, featuredGrid);
  attachCardEvents(featuredGrid);

  // "Surprise me" button shows a random fact
  const factButton = qs("#factBtn");
  const factText = qs("#factText");
  let lastIndex = -1;

  factButton.addEventListener("click", () => {
    let index = Math.floor(Math.random() * islandFacts.length);
    while (index === lastIndex) { // avoid showing the same fact twice in a row
      index = Math.floor(Math.random() * islandFacts.length);
    }
    lastIndex = index;
    factText.textContent = islandFacts[index];
  });
}

/* ==========================================================
   EXPLORE PAGE - filter, search, sort
   ========================================================== */

function initExplore() {
  const grid = qs("#attractionGrid");
  const filterButtons = qs("#filterButtons");
  const searchInput = qs("#searchInput");
  const sortSelect = qs("#sortSelect");
  const resultsCount = qs("#resultsCount");
  const noResults = qs("#noResults");

  // Current choices made by the user
  const state = { category: "All", search: "", sort: "rating" };

  // Build the category list from the data, so new categories appear automatically
  const categories = ["All", ...new Set(attractions.map((item) => item.category))];
  for (const category of categories) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-outline-jam filter-btn";
    button.textContent = category;
    button.dataset.category = category;
    button.setAttribute("aria-pressed", String(category === "All"));
    if (category === "All") {
      button.classList.add("active");
    }
    filterButtons.appendChild(button);
  }

  function getVisibleAttractions() {
    const term = state.search.trim().toLowerCase();

    const result = attractions.filter((item) => {
      const matchesCategory = state.category === "All" || item.category === state.category;
      const matchesSearch =
        term === "" ||
        item.name.toLowerCase().includes(term) ||
        item.parish.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    switch (state.sort) {
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }

  function updateView() {
    const visible = getVisibleAttractions();
    renderAttractions(visible, grid);

    const noun = visible.length === 1 ? "experience" : "experiences";
    resultsCount.textContent = `Showing ${visible.length} ${noun}` +
      (state.category !== "All" ? ` in ${state.category}` : "");

    if (visible.length === 0) {
      noResults.classList.remove("d-none");
    } else {
      noResults.classList.add("d-none");
    }
  }

  filterButtons.addEventListener("click", (event) => {
    const clicked = event.target.closest(".filter-btn");
    if (!clicked) {
      return;
    }
    state.category = clicked.dataset.category;
    for (const button of qsa(".filter-btn", filterButtons)) {
      const isActive = button === clicked;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    }
    updateView();
  });

  searchInput.addEventListener("input", () => {
    state.search = searchInput.value;
    updateView();
  });

  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    updateView();
  });

  attachCardEvents(grid);
  updateView();
}

/* ==========================================================
   PLAN PAGE - form, validation, estimate calculator
   ========================================================== */

// Work out the estimate for a booking (pure function: input -> result object)
function calculateEstimate(price, guests, wantsPickup) {
  const base = price * guests;
  const pickupFee = wantsPickup && guests > 0 ? PICKUP_FEE : 0;
  let discount = 0;

  if (guests >= GROUP_SIZE_FOR_DISCOUNT) {
    discount = base * GROUP_DISCOUNT;
  }
  return { base, pickupFee, discount, total: base + pickupFee - discount };
}

// One validation function per field. Each returns an error message, or "" when OK.
const validators = {
  fullName: (value) => (value.trim().length < 2 ? "Please enter your full name (at least 2 characters)." : ""),

  email: (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address, like name@example.com.",

  activity: (value) => (value === "" ? "Please choose an experience." : ""),

  tripDate: (value) => {
    if (value === "") {
      return "Please choose a date.";
    }
    const chosen = new Date(value + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return chosen < today ? "The date cannot be in the past." : "";
  },

  guests: (value) => {
    const count = Number(value);
    if (value === "" || !Number.isInteger(count)) {
      return "Enter a whole number of guests.";
    }
    if (count < 1 || count > MAX_GUESTS) {
      return `Guests must be between 1 and ${MAX_GUESTS}.`;
    }
    return "";
  },

  terms: (checked) => (checked ? "" : "Please tick this box to continue.")
};

function initPlan() {
  const form = qs("#bookingForm");
  const activitySelect = qs("#activity");
  const guestsInput = qs("#guests");
  const dateInput = qs("#tripDate");
  const successBox = qs("#successBox");

  // Date picker cannot choose a past day
  const now = new Date();
  const todayISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
  dateInput.min = todayISO;

  // Fill the select from the data array (saved items are marked with a heart)
  for (const item of attractions) {
    const option = document.createElement("option");
    option.value = item.id;
    const heart = wishlist.includes(item.id) ? "\u2665 " : "";
    option.textContent = `${heart}${item.name} - ${formatMoney(item.price)} per guest`;
    activitySelect.appendChild(option);
  }

  // Pre-select an experience if we arrived from a details modal (?activity=id)
  const requested = new URLSearchParams(window.location.search).get("activity");
  if (requested && findAttraction(requested)) {
    activitySelect.value = requested;
  }

  function getFieldValue(name) {
    const field = form.elements[name];
    return field.type === "checkbox" ? field.checked : field.value;
  }

  // Validate one field and show/hide Bootstrap's visible feedback
  function validateField(name) {
    const field = form.elements[name];
    const message = validators[name](getFieldValue(name));
    qs(`#${name}Error`).textContent = message;
    field.classList.toggle("is-invalid", message !== "");
    field.classList.toggle("is-valid", message === "");
    return message === "";
  }

  // Validate every field; focus the first one with a problem
  function validateForm() {
    let allValid = true;
    let firstInvalid = null;
    for (const name of Object.keys(validators)) {
      const ok = validateField(name);
      if (!ok && firstInvalid === null) {
        firstInvalid = form.elements[name];
      }
      allValid = allValid && ok;
    }
    if (firstInvalid) {
      firstInvalid.focus();
    }
    return allValid;
  }

  function clearValidationStyles() {
    for (const field of qsa(".is-valid, .is-invalid", form)) {
      field.classList.remove("is-valid", "is-invalid");
    }
  }

  // Update the live estimate panel
  function updateEstimate() {
    const item = findAttraction(activitySelect.value);
    const guestCount = Number(guestsInput.value);
    const guests = Number.isInteger(guestCount) && guestCount >= 1 ? Math.min(guestCount, MAX_GUESTS) : 0;

    if (!item) {
      qs("#estimateName").textContent = "Choose an experience to see an estimate.";
      qs("#estPrice").textContent = formatMoney(0);
      qs("#estGuests").textContent = guests;
      qs("#estPickup").textContent = formatMoney(0);
      qs("#estDiscount").textContent = "-" + formatMoney(0);
      qs("#estTotal").textContent = formatMoney(0);
      return;
    }

    const estimate = calculateEstimate(item.price, guests, qs("#pickup").checked);
    qs("#estimateName").textContent = item.name;
    qs("#estPrice").textContent = formatMoney(item.price);
    qs("#estGuests").textContent = guests;
    qs("#estPickup").textContent = formatMoney(estimate.pickupFee);
    qs("#estDiscount").textContent = "-" + formatMoney(estimate.discount);
    qs("#estTotal").textContent = formatMoney(estimate.total);
  }

  // Validate a field as soon as the user changes it
  for (const name of Object.keys(validators)) {
    const field = form.elements[name];
    field.addEventListener(field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "blur", () => validateField(name));
  }
  // Re-check while typing only after the field has been marked invalid
  for (const name of ["fullName", "email", "tripDate", "guests"]) {
    form.elements[name].addEventListener("input", () => {
      if (form.elements[name].classList.contains("is-invalid")) {
        validateField(name);
      }
    });
  }

  // Anything that changes the price updates the estimate
  activitySelect.addEventListener("change", updateEstimate);
  guestsInput.addEventListener("input", updateEstimate);
  qs("#pickup").addEventListener("change", updateEstimate);

  // Quantity selector buttons
  function changeGuests(amount) {
    const current = Number(guestsInput.value) || 0;
    const next = Math.min(MAX_GUESTS, Math.max(1, current + amount));
    guestsInput.value = next;
    validateField("guests");
    updateEstimate();
  }
  qs("#guestsMinus").addEventListener("click", () => changeGuests(-1));
  qs("#guestsPlus").addEventListener("click", () => changeGuests(1));

  // Form submission handled in JavaScript
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    successBox.classList.add("d-none");

    if (!validateForm()) {
      showToast("Please fix the highlighted fields.");
      return;
    }

    // Read the values into an object
    const booking = {
      fullName: form.elements.fullName.value.trim(),
      email: form.elements.email.value.trim(),
      activityId: form.elements.activity.value,
      date: form.elements.tripDate.value,
      guests: Number(form.elements.guests.value),
      pickup: form.elements.pickup.checked,
      notes: form.elements.notes.value.trim()
    };

    const item = findAttraction(booking.activityId);
    const estimate = calculateEstimate(item.price, booking.guests, booking.pickup);
    const reference = "JAH-" + Date.now().toString(36).toUpperCase().slice(-6);
    const guestWord = booking.guests === 1 ? "guest" : "guests";

    successBox.innerHTML = `
      <h3 class="h5 alert-heading">Request received, ${escapeHTML(booking.fullName)}!</h3>
      <p class="mb-1"><strong>${escapeHTML(item.name)}</strong> on <strong>${escapeHTML(booking.date)}</strong>
         for ${booking.guests} ${guestWord}${booking.pickup ? " with hotel pickup" : ""}.</p>
      <p class="mb-1">Estimated total: <strong>${formatMoney(estimate.total)}</strong></p>
      <p class="mb-0">Reference code: <strong>${reference}</strong>. A confirmation would be sent to ${escapeHTML(booking.email)}.</p>`;
    successBox.classList.remove("d-none");
    successBox.focus();
    successBox.scrollIntoView({ behavior: "smooth", block: "center" });

    form.reset();
    clearValidationStyles();
    qs("#notesCount").textContent = "0 / 200";
    updateEstimate();
    showToast("Your booking request was sent.");
  });

  // reset event fires before values clear, so wait a tick
  form.addEventListener("reset", () => {
    setTimeout(() => {
      clearValidationStyles();
      qs("#notesCount").textContent = "0 / 200";
      updateEstimate();
    }, 0);
  });

  updateEstimate();
}

/* ==========================================================
   START-UP
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  updateWishlistBadge();
  qs("#year").textContent = new Date().getFullYear();

  const page = document.body.dataset.page;
  if (page === "home") {
    initHome();
  } else if (page === "explore") {
    initExplore();
  } else if (page === "plan") {
    initPlan();
  }
});

/* ==========================================================
   jQuery features
   1) Back-to-top button: fades in after scrolling, animates scroll
   2) Live character counter for the notes textarea
   ========================================================== */

$(function () {
  const $backToTop = $("#backToTop");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 300) {
      $backToTop.fadeIn(200);
    } else {
      $backToTop.fadeOut(200);
    }
  });

  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
  });

  $("#notes").on("input", function () {
    const used = $(this).val().length;
    $("#notesCount")
      .text(used + " / 200")
      .toggleClass("text-danger fw-bold", used >= 180);
  });
});
