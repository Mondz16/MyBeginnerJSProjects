const products = [
  {
    id: 0,
    name: "Product1",
    price: 14.55,
  },
  {
    id: 1,
    name: "Product2",
    price: 16.55,
  },
  {
    id: 2,
    name: "Product3",
    price: 20.55,
  },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const shoppingCart = document.getElementById("shopping-cart");
  const totalPrice = document.getElementById("total-price");
  const checkoutContainer = document.getElementById("checkout-container");
  const checkoutButton = document.getElementById("checkout-button");
  const clearCartButton = document.getElementById("clear-cart-button");
  const message = document.getElementById("message");

  renderCart();

  checkoutButton.addEventListener("click", (e) => {
    console.log("Checkout button clicked!");
    alert(`The user checked out!\n\nTotal:$${getTotalPrice().toFixed(2)}`);
    clearCart();
    renderCart();
  });

  clearCartButton.addEventListener("click", (e) => {
    clearCart();
    console.log(`Cart cleared!`);
  })

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.setAttribute("data-id", product.id);
    productItem.innerHTML = `
            <span>${product.name} - $${product.price}</span>
            <button>Add to cart</button>
        `;

    productItem.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      console.log(`Added to cart: ${product.name}!`);
      addToCart(product);
    });

    productList.append(productItem);
  });

  function addToCart(product) {
    const updateProduct = {
      id: Date.now(),
      name: product.name,
      price: product.price,
    };
    cart.push(updateProduct);
    saveCart();
    renderCart();
  }

  function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Updated cart!");
    
  }

  function renderCart() {
    console.log(`Refresh cart: ${cart.length}`);
    
    shoppingCart.innerHTML = "";

    if (cart.length <= 0) {
      checkoutContainer.classList.add("hidden");
      message.classList.remove("hidden");
      return;
    }

    checkoutContainer.classList.remove("hidden");
    message.classList.add("hidden");
    cart.forEach((product) => {
      const productItem = document.createElement("li");
      productItem.setAttribute("data-id", product.id);
      productItem.innerHTML = `
                <span>${product.name} - $${product.price}</span>
                <button>Remove</button>
            `;

      productItem.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        console.log(`Remove to cart: ${product.id}!`);
        cart = cart.filter((x) => x.id !== product.id);
        productItem.remove();
        console.log(cart);
        saveCart();
        renderCart();
      });

      shoppingCart.append(productItem);
    });

    const total = getTotalPrice();
    totalPrice.textContent = total.toFixed(2);
  }

  function getTotalPrice() {
    let totalvalue = 0;
    cart.forEach((product) => {
      totalvalue += product.price;
    });

    return totalvalue;
  }

  function clearCart(){
    localStorage.clear();
    cart = [];
    renderCart();
  }
});
