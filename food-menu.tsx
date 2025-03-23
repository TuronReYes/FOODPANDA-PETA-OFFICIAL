"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function FoodMenu() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [activeRestaurant, setActiveRestaurant] = useState("all")

  // Sample food items data
  const foodItems = [
    {
      id: 1,
      category: "burger",
      restaurant: "Burger King",
      rating: 4.5,
      name: "Cheeseburger Deluxe",
      description: "Juicy beef patty with melted cheese, fresh lettuce, tomatoes, and special sauce.",
      deliveryTime: "15-25 min",
      price: 144,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      category: "chicken",
      restaurant: "Jollibee",
      rating: 4.7,
      name: "Chickenjoy Bucket",
      description: "6-piece crispy fried chicken with gravy and a side of spaghetti.",
      deliveryTime: "20-30 min",
      price: 450,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      category: "pizza",
      restaurant: "Pizza Hut",
      rating: 4.3,
      name: "Supreme Pan Pizza",
      description: "Large pan pizza loaded with pepperoni, sausage, bell peppers, onions, and mushrooms.",
      deliveryTime: "25-40 min",
      price: 499,
      image: "/placeholder.svg?height=200&width=300",
    },
    // Jollibee additional items
    {
      id: 4,
      category: "burger",
      restaurant: "Jollibee",
      rating: 4.6,
      name: "Yumburger",
      description: "Classic Jollibee burger with a juicy beef patty, special dressing, and fresh vegetables.",
      deliveryTime: "15-25 min",
      price: 85,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      category: "chicken",
      restaurant: "Jollibee",
      rating: 4.8,
      name: "Spicy Chickenjoy",
      description: "Crispy fried chicken with a spicy kick, served with gravy.",
      deliveryTime: "20-30 min",
      price: 99,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      category: "dessert",
      restaurant: "Jollibee",
      rating: 4.5,
      name: "Peach Mango Pie",
      description: "Crispy pie crust filled with sweet peach and mango filling.",
      deliveryTime: "15-25 min",
      price: 45,
      image: "/placeholder.svg?height=200&width=300",
    },
    // McDonald's items
    {
      id: 7,
      category: "burger",
      restaurant: "McDonald's",
      rating: 4.4,
      name: "Big Mac",
      description:
        "Iconic burger with two beef patties, special sauce, lettuce, cheese, pickles, and onions on a sesame seed bun.",
      deliveryTime: "15-25 min",
      price: 169,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      category: "burger",
      restaurant: "McDonald's",
      rating: 4.3,
      name: "Quarter Pounder with Cheese",
      description: "100% beef patty with melted cheese, onions, pickles, and condiments on a sesame seed bun.",
      deliveryTime: "15-25 min",
      price: 189,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 9,
      category: "chicken",
      restaurant: "McDonald's",
      rating: 4.2,
      name: "Chicken McNuggets (6pcs)",
      description: "Crispy chicken nuggets made with white meat, served with your choice of dipping sauce.",
      deliveryTime: "15-25 min",
      price: 119,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 10,
      category: "dessert",
      restaurant: "McDonald's",
      rating: 4.6,
      name: "McFlurry Oreo",
      description: "Creamy vanilla soft serve with crushed Oreo cookies.",
      deliveryTime: "15-25 min",
      price: 79,
      image: "/placeholder.svg?height=200&width=300",
    },
    // Mang Inasal items
    {
      id: 11,
      category: "chicken",
      restaurant: "Mang Inasal",
      rating: 4.7,
      name: "Chicken Inasal (Paa)",
      description: "Grilled chicken leg quarter marinated in a blend of Filipino spices, served with rice.",
      deliveryTime: "20-35 min",
      price: 159,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 12,
      category: "chicken",
      restaurant: "Mang Inasal",
      rating: 4.6,
      name: "Chicken Inasal (Pecho)",
      description: "Grilled chicken breast marinated in a blend of Filipino spices, served with rice.",
      deliveryTime: "20-35 min",
      price: 149,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 13,
      category: "drinks",
      restaurant: "Mang Inasal",
      rating: 4.3,
      name: "Unlimited Rice",
      description: "All-you-can-eat rice to complement your grilled chicken meal.",
      deliveryTime: "20-35 min",
      price: 99,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 14,
      category: "dessert",
      restaurant: "Mang Inasal",
      rating: 4.4,
      name: "Halo-Halo",
      description: "Filipino dessert with shaved ice, sweet beans, fruits, and purple yam topped with ice cream.",
      deliveryTime: "20-35 min",
      price: 89,
      image: "/placeholder.svg?height=200&width=300",
    },
    // KFC items
    {
      id: 15,
      category: "chicken",
      restaurant: "KFC",
      rating: 4.5,
      name: "Original Recipe Bucket (8pcs)",
      description: "Chicken pieces coated with the Colonel's secret blend of 11 herbs and spices.",
      deliveryTime: "20-30 min",
      price: 549,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 16,
      category: "chicken",
      restaurant: "KFC",
      rating: 4.6,
      name: "Hot & Crispy Chicken (2pcs)",
      description: "Extra crispy fried chicken with a spicy kick.",
      deliveryTime: "20-30 min",
      price: 189,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 17,
      category: "burger",
      restaurant: "KFC",
      rating: 4.3,
      name: "Zinger Burger",
      description: "Spicy chicken fillet burger with lettuce and mayo on a sesame seed bun.",
      deliveryTime: "20-30 min",
      price: 159,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 18,
      category: "drinks",
      restaurant: "KFC",
      rating: 4.2,
      name: "Krushers Oreo",
      description: "Creamy milkshake blended with Oreo cookie pieces.",
      deliveryTime: "20-30 min",
      price: 99,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Filter food items based on active category and search query
  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Handle adding items to cart
  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item])
    alert(`Added ${item.name} to cart!`)
  }

  // Handle quantity change
  const handleQuantityChange = (itemId, change) => {
    // This would update the quantity in a real application
    console.log(`Changed quantity for item ${itemId} by ${change}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with cart count */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">FoodDelivery</h1>
        <div className="relative">
          <button className="bg-primary text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </div>
      </header>

      {/* Search bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="Search for food or restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category menu */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === "all" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All Categories
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === "burger" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveCategory("burger")}
          >
            Burgers
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === "chicken" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveCategory("chicken")}
          >
            Chicken
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === "pizza" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveCategory("pizza")}
          >
            Pizza
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === "dessert" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveCategory("dessert")}
          >
            Desserts
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeCategory === "drinks" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveCategory("drinks")}
          >
            Drinks
          </button>
        </div>

        <h3 className="font-medium mb-2 mt-4">Restaurants</h3>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeRestaurant === "all" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setActiveRestaurant("all")
              setSearchQuery("")
            }}
          >
            All Restaurants
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeRestaurant === "Jollibee" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setActiveRestaurant("Jollibee")
              setSearchQuery("Jollibee")
            }}
          >
            Jollibee
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeRestaurant === "McDonald's" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setActiveRestaurant("McDonald's")
              setSearchQuery("McDonald's")
            }}
          >
            McDonald's
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeRestaurant === "Mang Inasal" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setActiveRestaurant("Mang Inasal")
              setSearchQuery("Mang Inasal")
            }}
          >
            Mang Inasal
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeRestaurant === "KFC" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setActiveRestaurant("KFC")
              setSearchQuery("KFC")
            }}
          >
            KFC
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeRestaurant === "Burger King" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setActiveRestaurant("Burger King")
              setSearchQuery("Burger King")
            }}
          >
            Burger King
          </button>
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeRestaurant === "Pizza Hut" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => {
              setActiveRestaurant("Pizza Hut")
              setSearchQuery("Pizza Hut")
            }}
          >
            Pizza Hut
          </button>
        </div>
      </div>

      {/* Food items grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="food-card border rounded-lg overflow-hidden shadow-md"
            data-category={item.category}
          >
            <div className="food-image h-48 overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="food-info p-4">
              <div className="restaurant-name flex justify-between items-center mb-2">
                <span className="text-gray-600">{item.restaurant}</span>
                <div className="rating flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm">{item.rating}</span>
                </div>
              </div>
              <h3 className="food-name text-lg font-bold mb-2">{item.name}</h3>
              <p className="food-description text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="food-meta flex justify-between items-center mb-4">
                <div className="delivery-info flex items-center text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{item.deliveryTime}</span>
                </div>
                <div className="price-info">
                  <span className="current-price font-bold">₱{item.price}</span>
                </div>
              </div>
              <div className="food-actions flex justify-between items-center">
                <div className="quantity-control flex items-center border rounded-md">
                  <button
                    className="quantity-btn minus-btn px-2 py-1 text-gray-500 disabled:opacity-50"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={true}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="quantity px-3">1</span>
                  <button
                    className="quantity-btn plus-btn px-2 py-1 text-gray-500"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button
                  className="add-to-cart-btn bg-primary text-white px-4 py-2 rounded-md text-sm font-medium"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No food items found. Try a different search or category.</p>
        </div>
      )}
    </div>
  )
}

