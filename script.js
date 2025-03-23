document.addEventListener('DOMContentLoaded', function() {
    // Close banner functionality
    const closeBanner = document.querySelector('.close-banner');
    const businessBanner = document.querySelector('.business-banner');
    
    if (closeBanner && businessBanner) {
        closeBanner.addEventListener('click', function() {
            businessBanner.style.display = 'none';
        });
    }
    
    // Locate me button functionality
    const locateBtn = document.querySelector('.locate-btn');
    
    if (locateBtn) {
        locateBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        // In a real app, you would use the coordinates to get the address
                        // For this demo, we'll just show an alert
                        alert('Location detected! In a real app, this would fill in your address.');
                    },
                    function(error) {
                        alert('Unable to get your location. Please enter your address manually.');
                    }
                );
            } else {
                alert('Geolocation is not supported by your browser. Please enter your address manually.');
            }
        });
    }
    
    // Find food button functionality
    const findFoodBtn = document.querySelector('.find-food-btn');
    const addressInput = document.querySelector('.search-input input');
    
    if (findFoodBtn && addressInput) {
        findFoodBtn.addEventListener('click', function() {
            const address = addressInput.value.trim();
            if (address) {
                alert(`Searching for food near: ${address}`);
                // In a real app, this would redirect to the restaurant listing page
            } else {
                alert('Please enter your address to find food near you.');
            }
        });
    }});

    document.addEventListener("DOMContentLoaded", () => {
        // Initialize cart
        let cart = JSON.parse(localStorage.getItem("foodCart")) || []
      
        // DOM Elements
        const cartIcon = document.querySelector(".cart-icon")
        const cartSummary = document.querySelector(".cart-summary")
        const cartItems = document.querySelector(".cart-items")
        const totalAmount = document.querySelector(".total-amount")
        const closeCartBtn = document.querySelector(".close-cart-btn")
        const checkoutBtn = document.querySelector(".checkout-btn")
        const overlay = document.createElement("div")
        overlay.className = "overlay"
        document.body.appendChild(overlay)
      
        // Food cards
        const foodCards = document.querySelectorAll(".food-card")
      
        // Get DOM elements
        const minusBtn = document.querySelector(".minus-btn")
        const plusBtn = document.querySelector(".plus-btn")
        const quantitySpan = document.querySelector(".quantity")
        const addToCartBtn = document.querySelector(".add-to-cart-btn")
        const viewCartBtn = document.querySelector(".view-cart-btn")
        const buyNowBtn = document.querySelector(".buy-now-btn")
        const foodName = document.querySelector(".food-name").textContent
        const priceElement = document.querySelector(".current-price")
        const checkoutModal = document.getElementById("checkoutModal")
        const closeCheckoutBtn = document.querySelector(".close-checkout")
        const cartCountElement = document.querySelector(".cart-count")
        const totalPriceElement = document.querySelector(".total-price")
        const checkoutPriceElement = document.querySelector(".checkout-price")
        const placeOrderBtn = document.querySelector(".place-order-btn")
      
        // Initialize values
        let quantity = 1
        // Use localStorage to persist cart between page refreshes
        // Get the base price (removing the currency symbol)
        const basePrice = Number.parseFloat(priceElement.textContent.replace("₱", "").trim())
        let totalPrice = basePrice
      
        // Initialize the page
        function init() {
          updateDisplay()
          updateCartCount()
      
          // Add event listeners
          minusBtn.addEventListener("click", decreaseQuantity)
          plusBtn.addEventListener("click", increaseQuantity)
          addToCartBtn.addEventListener("click", addToCart)
          viewCartBtn.addEventListener("click", openCart)
          buyNowBtn.addEventListener("click", buyNow)
          cartIcon.addEventListener("click", openCart)
          closeCartBtn.addEventListener("click", closeCart)
          closeCheckoutBtn.addEventListener("click", closeCheckout)
          overlay.addEventListener("click", closeAllModals)
          checkoutBtn.addEventListener("click", proceedToCheckout)
          placeOrderBtn.addEventListener("click", placeOrder)
        }
      
        // Update quantity and price display
        function updateDisplay() {
          quantitySpan.textContent = quantity
          totalPrice = basePrice * quantity
          priceElement.textContent = `₱${totalPrice.toFixed(0)}`
      
          // Disable minus button if quantity is 1
          minusBtn.disabled = quantity <= 1
          minusBtn.style.color = quantity <= 1 ? "#ccc" : "#333"
        }
      
        // Decrease quantity
        function decreaseQuantity() {
          if (quantity > 1) {
            quantity--
            updateDisplay()
          }
        }
      
        // Increase quantity
        function increaseQuantity() {
          quantity++
          updateDisplay()
        }
      
        // Add to cart
        function addToCart() {
          // Check if item already exists in cart
          const existingItemIndex = cart.findIndex((item) => item.name === foodName)
      
          if (existingItemIndex !== -1) {
            // Update existing item
            cart[existingItemIndex].quantity += quantity
            cart[existingItemIndex].totalPrice = cart[existingItemIndex].quantity * basePrice
          } else {
            // Add new item
            cart.push({
              id: Date.now(), // Unique ID for the item
              name: foodName,
              price: basePrice,
              quantity: quantity,
              totalPrice: totalPrice,
              image: document.querySelector(".food-image img").src,
            })
          }
      
          // Save cart to localStorage
          saveCart()
      
          // Update cart count
          updateCartCount()
      
          // Show toast
          showToast(`${quantity} ${foodName}(s) added to your cart - Total: ₱${totalPrice.toFixed(0)}`)
      
          // Reset quantity to 1
          quantity = 1
          updateDisplay()
      
          // Add animation to cart icon
          animateCartIcon()
        }
      
        // Animate cart icon when adding items
        function animateCartIcon() {
          cartIcon.classList.add("bounce")
          setTimeout(() => {
            cartIcon.classList.remove("bounce")
          }, 500)
        }
      
        // Save cart to localStorage
        function saveCart() {
          localStorage.setItem("foodCart", JSON.stringify(cart))
        }
      
        // Buy now
        function buyNow() {
          renderCheckoutItem()
          checkoutModal.style.display = "block"
          overlay.style.display = "block"
        }
      
        // Open cart
        function openCart() {
          renderCartItems()
          cartModal.style.display = "block"
          overlay.style.display = "block"
        }
      
        // Close cart
        function closeCart() {
          cartModal.style.display = "none"
          overlay.style.display = "none"
        }
      
        // Close checkout
        function closeCheckout() {
          checkoutModal.style.display = "none"
          overlay.style.display = "none"
        }
      
        // Close all modals
        function closeAllModals() {
          cartModal.style.display = "none"
          checkoutModal.style.display = "none"
          overlay.style.display = "none"
        }
      
        // Update cart count
        function updateCartCount() {
          const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
          cartCountElement.textContent = totalItems
      
          // Add visual indicator if cart has items
          if (totalItems > 0) {
            cartCountElement.classList.add("has-items")
          } else {
            cartCountElement.classList.remove("has-items")
          }
        }
      
        // Show toast notification
        function showToast(message) {
          // Remove existing toast if any
          const existingToast = document.querySelector(".toast")
          if (existingToast) {
            existingToast.remove()
          }
      
          // Create new toast
          const toast = document.createElement("div")
          toast.className = "toast"
          toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Added to cart</strong>
              <p>${message}</p>
            </div>
          `
      
          // Add to body
          document.body.appendChild(toast)
      
          // Show toast
          setTimeout(() => {
            toast.classList.add("show")
          }, 10)
      
          // Hide toast after 3 seconds
          setTimeout(() => {
            toast.classList.remove("show")
            setTimeout(() => {
              toast.remove()
            }, 300)
          }, 3000)
        }
      
        // Render cart items
        const cartItemsContainer = document.querySelector(".cart-items")
        const cartModal = document.querySelector(".cart-summary")
        function renderCartItems() {
          cartItemsContainer.innerHTML = ""
      
          if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>'
            totalPriceElement.textContent = "₱0"
            return
          }
      
          let cartTotal = 0
      
          cart.forEach((item) => {
            const cartItemElement = document.createElement("div")
            cartItemElement.className = "cart-item"
            cartItemElement.innerHTML = `
              <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">₱${item.price} × ${item.quantity}</span>
              </div>
              <div class="item-actions">
                <div class="item-quantity">
                  <button class="decrease-item" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                  <span>${item.quantity}</span>
                  <button class="increase-item" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                </div>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
              </div>
            `
      
            cartItemsContainer.appendChild(cartItemElement)
            cartTotal += item.totalPrice
          })
      
          totalPriceElement.textContent = `₱${cartTotal.toFixed(0)}`
      
          // Add event listeners to cart item buttons
          addCartItemEventListeners()
        }
      
        // Add event listeners to cart item buttons
        function addCartItemEventListeners() {
          document.querySelectorAll(".decrease-item").forEach((button) => {
            button.addEventListener("click", function () {
              const itemId = Number.parseInt(this.getAttribute("data-id"))
              decreaseCartItem(itemId)
            })
          })
      
          document.querySelectorAll(".increase-item").forEach((button) => {
            button.addEventListener("click", function () {
              const itemId = Number.parseInt(this.getAttribute("data-id"))
              increaseCartItem(itemId)
            })
          })
      
          document.querySelectorAll(".remove-item").forEach((button) => {
            button.addEventListener("click", function () {
              const itemId = Number.parseInt(this.getAttribute("data-id"))
              removeCartItem(itemId)
            })
          })
        }
      
        // Render checkout item for Buy Now
        const checkoutItemContainer = document.querySelector(".checkout-item")
        function renderCheckoutItem() {
          // Render checkout item
          checkoutItemContainer.innerHTML = `
            <div class="item-info">
              <span class="item-name">${foodName}</span>
              <span class="item-price">₱${basePrice} × ${quantity}</span>
            </div>
            <div class="item-total">
              ₱${totalPrice.toFixed(0)}
            </div>
          `
      
          // Update checkout price
          checkoutPriceElement.textContent = `₱${totalPrice.toFixed(0)}`
        }
      
        // Decrease cart item quantity
        function decreaseCartItem(itemId) {
          const itemIndex = cart.findIndex((item) => item.id === itemId)
      
          if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
              cart[itemIndex].quantity--
              cart[itemIndex].totalPrice = cart[itemIndex].quantity * cart[itemIndex].price
            } else {
              removeCartItem(itemId)
              return
            }
      
            saveCart()
            updateCartCount()
            renderCartItems()
          }
        }
      
        // Increase cart item quantity
        function increaseCartItem(itemId) {
          const itemIndex = cart.findIndex((item) => item.id === itemId)
      
          if (itemIndex !== -1) {
            cart[itemIndex].quantity++
            cart[itemIndex].totalPrice = cart[itemIndex].quantity * cart[itemIndex].price
      
            saveCart()
            updateCartCount()
            renderCartItems()
          }
        }
      
        // Remove cart item
        function removeCartItem(itemId) {
          cart = cart.filter((item) => item.id !== itemId)
      
          saveCart()
          updateCartCount()
          renderCartItems()
        }
      
        // Proceed to checkout
        function proceedToCheckout() {
          if (cart.length === 0) {
            alert("Your cart is empty!")
            return
          }
      
          // Close cart modal and open checkout modal
          cartModal.style.display = "none"
      
          // Calculate total price from cart
          const cartTotal = cart.reduce((total, item) => total + item.totalPrice, 0)
      
          // Create checkout items HTML
          let checkoutItemsHTML = ""
          cart.forEach((item) => {
            checkoutItemsHTML += `
              <div class="checkout-item">
                <div class="item-info">
                  <span class="item-name">${item.name}</span>
                  <span class="item-price">₱${item.price} × ${item.quantity}</span>
                </div>
                <div class="item-total">
                  ₱${item.totalPrice.toFixed(0)}
                </div>
              </div>
            `
          })
      
          // Update checkout item container
          checkoutItemContainer.innerHTML = checkoutItemsHTML
      
          // Update checkout price
          checkoutPriceElement.textContent = `₱${cartTotal.toFixed(0)}`
      
          // Show checkout modal
          checkoutModal.style.display = "block"
        }
      
        // Place order
        function placeOrder() {
          const name = document.getElementById("name").value
          const address = document.getElementById("address").value
          const phone = document.getElementById("phone").value
          const payment = document.getElementById("payment").value
      
          if (!name || !address || !phone) {
            alert("Please fill in all delivery information fields")
            return
          }
      
          // Create order object
          const order = {
            id: Date.now(),
            items:
              cart.length > 0
                ? cart
                : [
                    {
                      name: foodName,
                      price: basePrice,
                      quantity: quantity,
                      totalPrice: totalPrice,
                    },
                  ],
            customer: {
              name,
              address,
              phone,
            },
            paymentMethod: payment,
            total: cart.length > 0 ? cart.reduce((total, item) => total + item.totalPrice, 0) : totalPrice,
            date: new Date().toISOString(),
          }
      
          // Save order to localStorage (in a real app, this would be sent to a server)
          const orders = JSON.parse(localStorage.getItem("foodOrders")) || []
          orders.push(order)
          localStorage.setItem("foodOrders", JSON.stringify(orders))
      
          // Show success message
          alert(`Order #${order.id} placed successfully! Your food will be delivered to ${address} soon.`)
      
          // Clear cart and close modal
          cart = []
          saveCart()
          updateCartCount()
          checkoutModal.style.display = "none"
          overlay.style.display = "none"
      
          // Reset form
          document.getElementById("name").value = ""
          document.getElementById("address").value = ""
          document.getElementById("phone").value = ""
          document.getElementById("payment").selectedIndex = 0
      
          // Reset quantity
          quantity = 1
          updateDisplay()
        }
      
        // Initialize the page
        init()
      })
      
      document.addEventListener("DOMContentLoaded", () => {
        // Initialize cart
        let cart = JSON.parse(localStorage.getItem("foodCart")) || []
      
        // DOM Elements
        const cartIcon = document.querySelector(".cart-icon")
        const cartSummary = document.querySelector(".cart-summary")
        const cartItems = document.querySelector(".cart-items")
        const totalAmount = document.querySelector(".total-amount")
        const closeCartBtn = document.querySelector(".close-cart-btn")
        const checkoutBtn = document.querySelector(".checkout-btn")
        const overlay = document.createElement("div")
        overlay.className = "overlay"
        document.body.appendChild(overlay)
      
        // Food cards
        const foodCards = document.querySelectorAll(".food-card")
      
        // Initialize the page
        function init() {
          updateCartIcon()
          setupEventListeners()
        }
      
        // Setup event listeners
        function setupEventListeners() {
          // Add to cart buttons
          foodCards.forEach((card) => {
            const minusBtn = card.querySelector(".minus-btn")
            const plusBtn = card.querySelector(".plus-btn")
            const quantitySpan = card.querySelector(".quantity")
            const addToCartBtn = card.querySelector(".add-to-cart-btn")
      
            // Quantity controls
            minusBtn.addEventListener("click", () => {
              let quantity = Number.parseInt(quantitySpan.textContent)
              if (quantity > 1) {
                quantity--
                quantitySpan.textContent = quantity
                minusBtn.disabled = quantity === 1
              }
            })
      
            plusBtn.addEventListener("click", () => {
              let quantity = Number.parseInt(quantitySpan.textContent)
              quantity++
              quantitySpan.textContent = quantity
              minusBtn.disabled = false
            })
      
            // Add to cart
            addToCartBtn.addEventListener("click", () => {
              const foodName = card.querySelector(".food-name").textContent
              const foodPrice = card.querySelector(".current-price").textContent
              const quantity = Number.parseInt(quantitySpan.textContent)
              const restaurantName = card.querySelector(".restaurant-name span").textContent
              const foodImage = card.querySelector(".food-image img").src
      
              addToCart(foodName, foodPrice, quantity, restaurantName, foodImage)
      
              // Reset quantity
              quantitySpan.textContent = "1"
              minusBtn.disabled = true
            })
          })
      
          // Cart icon click
          cartIcon.addEventListener("click", toggleCart)
      
          // Close cart button
          closeCartBtn.addEventListener("click", toggleCart)
      
          // Overlay click
          overlay.addEventListener("click", toggleCart)
      
          // Checkout button
          checkoutBtn.addEventListener("click", checkout)
        }
      
        // Add to cart
        function addToCart(name, price, quantity, restaurant, image) {
          // Parse price (remove currency symbol)
          const priceValue = Number.parseFloat(price.replace(/[^\d.]/g, ""))
      
          // Check if item already exists in cart
          const existingItemIndex = cart.findIndex((item) => item.name === name)
      
          if (existingItemIndex !== -1) {
            // Update existing item
            cart[existingItemIndex].quantity += quantity
            cart[existingItemIndex].total = cart[existingItemIndex].quantity * cart[existingItemIndex].price
          } else {
            // Add new item
            cart.push({
              id: Date.now(),
              name: name,
              price: priceValue,
              quantity: quantity,
              total: priceValue * quantity,
              restaurant: restaurant,
              image: image,
            })
          }
      
          // Save cart to localStorage
          saveCart()
      
          // Update cart icon
          updateCartIcon()
      
          // Show toast notification
          showToast(`${quantity} ${name}(s) added to your cart`)
      
          // If cart is open, update cart items
          if (cartSummary.classList.contains("active")) {
            renderCartItems()
          }
        }
      
        // Save cart to localStorage
        function saveCart() {
          localStorage.setItem("foodCart", JSON.stringify(cart))
        }
      
        // Update cart icon
        function updateCartIcon() {
          const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
      
          if (totalItems > 0) {
            cartIcon.classList.add("has-items")
            cartIcon.setAttribute("data-count", totalItems)
          } else {
            cartIcon.classList.remove("has-items")
            cartIcon.removeAttribute("data-count")
          }
        }
      
        // Toggle cart
        function toggleCart() {
          cartSummary.classList.toggle("active")
          overlay.classList.toggle("active")
      
          if (cartSummary.classList.contains("active")) {
            renderCartItems()
          }
        }
      
        // Render cart items
        function renderCartItems() {
          cartItems.innerHTML = ""
      
          if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>'
            totalAmount.textContent = "₱0"
            return
          }
      
          let cartTotal = 0
      
          cart.forEach((item) => {
            const cartItemElement = document.createElement("div")
            cartItemElement.className = "cart-item"
            cartItemElement.innerHTML = `
              <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.restaurant} • ₱${item.price} × ${item.quantity}</div>
              </div>
              <div class="cart-item-quantity">
                <button class="cart-item-decrease" data-id="${item.id}">
                  <i class="fas fa-minus"></i>
                </button>
                <span>${item.quantity}</span>
                <button class="cart-item-increase" data-id="${item.id}">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <button class="cart-item-remove" data-id="${item.id}">
                <i class="fas fa-trash"></i>
              </button>
            `
      
            cartItems.appendChild(cartItemElement)
            cartTotal += item.total
          })
      
          totalAmount.textContent = `₱${cartTotal.toFixed(0)}`
      
          // Add event listeners to cart item buttons
          document.querySelectorAll(".cart-item-decrease").forEach((button) => {
            button.addEventListener("click", function () {
              const itemId = Number.parseInt(this.getAttribute("data-id"))
              decreaseCartItem(itemId)
            })
          })
      
          document.querySelectorAll(".cart-item-increase").forEach((button) => {
            button.addEventListener("click", function () {
              const itemId = Number.parseInt(this.getAttribute("data-id"))
              increaseCartItem(itemId)
            })
          })
      
          document.querySelectorAll(".cart-item-remove").forEach((button) => {
            button.addEventListener("click", function () {
              const itemId = Number.parseInt(this.getAttribute("data-id"))
              removeCartItem(itemId)
            })
          })
        }
      
        // Decrease cart item quantity
        function decreaseCartItem(itemId) {
          const itemIndex = cart.findIndex((item) => item.id === itemId)
      
          if (itemIndex !== -1) {
            if (cart[itemIndex].quantity > 1) {
              cart[itemIndex].quantity--
              cart[itemIndex].total = cart[itemIndex].quantity * cart[itemIndex].price
            } else {
              removeCartItem(itemId)
              return
            }
      
            saveCart()
            updateCartIcon()
            renderCartItems()
          }
        }
      
        // Increase cart item quantity
        function increaseCartItem(itemId) {
          const itemIndex = cart.findIndex((item) => item.id === itemId)
      
          if (itemIndex !== -1) {
            cart[itemIndex].quantity++
            cart[itemIndex].total = cart[itemIndex].quantity * cart[itemIndex].price
      
            saveCart()
            updateCartIcon()
            renderCartItems()
          }
        }
      
        // Remove cart item
        function removeCartItem(itemId) {
          cart = cart.filter((item) => item.id !== itemId)
      
          saveCart()
          updateCartIcon()
          renderCartItems()
        }
      
        // Show toast notification
        function showToast(message) {
          // Remove existing toast if any
          const existingToast = document.querySelector(".toast")
          if (existingToast) {
            existingToast.remove()
          }
      
          // Create new toast
          const toast = document.createElement("div")
          toast.className = "toast"
          toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
              <strong>Added to cart</strong>
              <p>${message}</p>
            </div>
          `
      
          // Add to body
          document.body.appendChild(toast)
      
          // Show toast
          setTimeout(() => {
            toast.classList.add("show")
          }, 10)
      
          // Hide toast after 3 seconds
          setTimeout(() => {
            toast.classList.remove("show")
            setTimeout(() => {
              toast.remove()
            }, 300)
          }, 3000)
        }
      
        // Checkout
        function checkout() {
          if (cart.length === 0) {
            alert("Your cart is empty!")
            return
          }
      
          const cartTotal = cart.reduce((total, item) => total + item.total, 0)
          alert(`Proceeding to checkout...\nTotal: ₱${cartTotal.toFixed(0)}`)
      
          // In a real application, you would redirect to a checkout page
          // For this demo, we'll just clear the cart
          cart = []
          saveCart()
          updateCartIcon()
          toggleCart()
        }
      
        // Filter buttons
        const filterButtons = document.querySelectorAll(".filter-btn")
        filterButtons.forEach((button) => {
          button.addEventListener("click", function () {
            // Remove active class from all buttons
            filterButtons.forEach((btn) => btn.classList.remove("active"))
      
            // Add active class to clicked button
            this.classList.add("active")
      
            // Get filter value
            const filter = this.getAttribute("data-filter")
      
            // Filter food cards
            foodCards.forEach((card) => {
              if (filter === "all" || card.getAttribute("data-category") === filter) {
                card.style.display = "block"
              } else {
                card.style.display = "none"
              }
            })
          })
        })
      
        // Location button
        const locateBtn = document.querySelector(".locate-btn")
        locateBtn.addEventListener("click", () => {
          if (navigator.geolocation) {
            locateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...'
      
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setTimeout(() => {
                  document.querySelector(".search-input input").value = "Current Location"
                  locateBtn.innerHTML = '<i class="fas fa-crosshairs"></i> Locate me'
                }, 1500)
              },
              (error) => {
                alert("Unable to retrieve your location. Please enter your address manually.")
                locateBtn.innerHTML = '<i class="fas fa-crosshairs"></i> Locate me'
              },
            )
          } else {
            alert("Geolocation is not supported by your browser. Please enter your address manually.")
          }
        })
      
        // Find food button
        const findFoodBtn = document.querySelector(".find-food-btn")
        findFoodBtn.addEventListener("click", () => {
          const address = document.querySelector(".search-input input").value
      
          if (!address) {
            alert("Please enter your address or use the locate me button.")
            return
          }
      
          // Scroll to food section
          document.querySelector(".fast-food-section").scrollIntoView({ behavior: "smooth" })
      
          // Show a loading animation
          findFoodBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Finding food...'
      
          // Reset after 1.5 seconds
          setTimeout(() => {
            findFoodBtn.innerHTML = "Find food"
          }, 1500)
        })
      
        // Business account signup
        const signupNowBtn = document.querySelector(".signup-now-btn")
        signupNowBtn.addEventListener("click", () => {
          window.location.href = "business-signup.html"
        })
      
        // Initialize the page
        init()
      })
      // Function to show restaurant info when a button is clicked
      function showInfo(restaurant) {
        // Hide all restaurant info sections
        let allInfo = document.querySelectorAll('.restaurant-info');
        allInfo.forEach(function(info) {
            info.style.display = 'none';
        });

        // Show the selected restaurant's info
        let selectedInfo = document.getElementById(restaurant);
        if (selectedInfo) {
            selectedInfo.style.display = 'block';
        }
    }
    // Initialize the cart
    const cartItems = [];
    const cartList = document.getElementById('cart-items');
    const totalPriceElement = document.querySelector('.total-price');

    // Add items to the cart
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');
            const itemName = menuItem.getAttribute('data-name');
            const itemPrice = parseFloat(menuItem.getAttribute('data-price'));

            cartItems.push({ name: itemName, price: itemPrice });
            updateCart();
        });
    });

    // Update the cart display
    function updateCart() {
        // Clear the cart list
        cartList.innerHTML = '';

        // Add cart items to the list
        let total = 0;
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartList.appendChild(listItem);
            total += item.price;
        });

        // Update total price
        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Checkout functionality
    document.getElementById('checkout').addEventListener('click', () => {
        if (cartItems.length > 0) {
            alert('Thank you for your purchase!');
            cartItems.length = 0; // Clear the cart
            updateCart();
        } else {
            alert('Your cart is empty!');
        }
    });
    
      
      
    
    