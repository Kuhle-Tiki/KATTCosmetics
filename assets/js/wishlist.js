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
  try {
    localStorage.setItem(WISHLIT_KEY, JSON.stringify(items));
  }
  catch (e) {
    /* Storage unavailable (private mode) - wishlist just wont persist*/
  }
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
  list.replaceChildren(); // Clear existing items

  if (emptyMesaage) emptyMessage.hidden = items.length > 0;
    
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
   const btn = e.target.closest("wishlist-btn");
   if (!btn) return;
   toggleWishlistItem(btn.getAttribute("data-product-id"));
   renderWishlistButtons();
   renderWishlistSection();});
  });

  // Re-sync buttons after the catalogue renders them
  document.addEventListener("katt:catalogue-rendered", renderWiahliatButtons);
  
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