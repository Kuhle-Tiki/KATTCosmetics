// KATT Cosmetics — wishlist functionality
// No purchasing logic here: this site does not process orders.
// Wishlist state is saved in the browser's localStorage so it persists
// between pages and visits (no backend/account system required).

const WISHLIST_KEY = "katt-wishlist";

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(items) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

function toggleWishlistItem(productId) {
  let items = getWishlist();
  if (items.includes(productId)) {
    items = items.filter((id) => id !== productId);
  } else {
    items.push(productId);
  }
  saveWishlist(items);
  return items.includes(productId);
}

function renderWishlistButtons() {
  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    const productId = btn.getAttribute("data-product-id");
    const active = isInWishlist(productId);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    btn.textContent = active ? "Remove from Wishlist" : "Add to Wishlist";
  });
}

function renderWishlistSection() {
  const list = document.getElementById("wishlist-list");
  const emptyMessage = document.getElementById("wishlist-empty-message");
  if (!list) return;

  const items = getWishlist();
  list.innerHTML = "";

  if (items.length === 0) {
    if (emptyMessage) emptyMessage.hidden = false;
    return;
  }

  if (emptyMessage) emptyMessage.hidden = true;

  items.forEach((productId) => {
    const li = document.createElement("li");
    li.textContent = productId + " ";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      toggleWishlistItem(productId);
      renderWishlistButtons();
      renderWishlistSection();
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderWishlistButtons();
  renderWishlistSection();

  document.querySelectorAll(".wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-product-id");
      toggleWishlistItem(productId);
      renderWishlistButtons();
      renderWishlistSection();
    });
  });

  // Generic front-end form handling (no backend / no payment processing)
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      // Skip the shade-select form on product.html, which intentionally
      // redirects to enquiry.html with a query string.
      if (form.getAttribute("action") === "enquiry.html") return;

      e.preventDefault();
      alert(
        "Thanks! Your message has been received. This form is a front-end placeholder — connect it to a backend or form service before going live. No payment is processed through this website."
      );
      form.reset();
    });
  });
});