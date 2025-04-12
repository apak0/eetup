import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[40vh] md:h-[50vh] flex items-center justify-center w-full ">
        <div className="md:block hidden absolute left-0 top-[10%] w-[30%] max-w-[400px]">
          <Image
            src="/images/home_grocery_basket.png"
            alt="Grocery Basket"
            width={400}
            height={400}
            className="object-contain w-full h-auto"
            priority
          />
        </div>
        <div className="container relative z-10 px-4 max-w-[1200px] mx-auto top-[10%] w-[60%] lg:w-[40%]">
          <div className="w-full flex flex-col items-center text-center">
            <p className="text-xl pr-10 md:text-3xl font-bold text-gray-600 mb-8 max-w-xl ">
              Order your favorite meals quickly and securely from the best restaurants.
            </p>
            <div className=" rounded-lg  w-full min-w-[280px] max-w-3xl flex items-center">
              <input
                type="text"
                placeholder="Enter your address..."
                className="w-full py-3 px-4 outline-none rounded-lg rounded-r-none"
              />
              <button className="rounded-l-none whitespace-nowrap bg-primary text-white max-h-10 mr-10 rounded-r-lg hover:bg-primary/90 transition">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="sm:block hidden absolute right-0 top-[10%] w-[30%] max-w-[400px]">
          <Image
            src="/images/home_burger.png"
            alt="Grocery Basket"
            width={400}
            height={400}
            className="object-contain w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer text-center"
              >
                <div className="w-16 h-16 mx-auto mb-2 relative">
                  <Image src={category.icon} alt={category.name} fill className="object-contain" />
                </div>
                <span className="font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.name}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-48">
                  <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{restaurant.deliveryTime}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{restaurant.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const categories = [
  { name: 'Burger', icon: 'https://cdn-icons-png.flaticon.com/512/877/877951.png' },
  { name: 'Pizza', icon: 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png' },
  { name: 'Kebab', icon: 'https://cdn-icons-png.flaticon.com/512/2515/2515263.png' },
  { name: 'Dessert', icon: 'https://cdn-icons-png.flaticon.com/512/3198/3198914.png' },
  { name: 'Drinks', icon: 'https://cdn-icons-png.flaticon.com/512/2738/2738730.png' },
  { name: 'Breakfast', icon: 'https://cdn-icons-png.flaticon.com/512/1205/1205756.png' },
]

const restaurants = [
  {
    name: 'Burger House',
    cuisine: 'Burgers, Fast Food',
    deliveryTime: '30-40 min',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format',
  },
  {
    name: 'Pizza Roma',
    cuisine: 'Pizza, Italian',
    deliveryTime: '40-50 min',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format',
  },
  {
    name: 'Kebab House',
    cuisine: 'Kebab, Turkish Cuisine',
    deliveryTime: '25-35 min',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format',
  },
]
