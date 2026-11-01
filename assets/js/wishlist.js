// KATT Cosmetics — wishlist functionality
// No purchasing logic here: this site does not process orders.
// Wishlist state is saved in the browser's localStorage so it persists
// between pages and visits (no backend/account system required).

const WISHLIST_KEY = "katt-wishlist";
const WISHLIST_BASE = location.pathname.includes("/pages/") ? "../" : "";
let productNaames = {}; // Will be populated with product names from products.json

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(items) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }catch (e) {
    /* Storage unavailable (private mode) - wishlist just wont persist*/
  }
}

function isWishlist(productId) {
  return getWsishlist().includes(productId); // Check if a product is in the wishlist
}

function toggleWishlistItem(productId) {
  let items = getWishlist(); // Get current wishlist items
  if (items.includes(productId)) {
    items = items.filter((id) => id !== productId); // Remove item if it exists
  } else {
    items.push(productId); // Add item if it doesn't exist
  }
  saveWishlist(items); // Save updated wishlist
  return items.includes(productId); // Return whether the item is now in the wishlist
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
  list.replaceChildren(); // Clear existing items

  if (emptyMessage) emptyMessage.hidden = items.length > 0;
    
  items.forEach((productId) => {
    const li = document.createElement("li");
    li.textContent = (productNames[productId] || productId) + " "; // Fallback to productId if name not found

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute("aria-label", "Remove " + (productNames[productId] || productId) + " from wishlist");
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

  // Event delegation for wishlist buttons to handle clicks and update the wishlist state
  document.addEventListener("click", (event) => {
    const btn = event.target.closest(".wishlist-btn");
    if (!btn) return;
    toggleWishlistItem(btn.getAttribute("data-product-id"));
    renderWishlistButtons();
    renderWishlistSection();
  });

  // Re-sync buttons after the catalogue renders them
  document.addEventListener("katt:catalogue-rendered", renderWishlistButtons);

  // Show product names instead of ids in the wishlist
  fetch("assets/data/products.json")
    .then((r) => (r.ok ? r.json() : []))
    .then((data) => {
      data.forEach((p) => { productNames[p.id] = p.name; });
      renderWishlistSection();
    })
    .catch(() => {});
});    
 