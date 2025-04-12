'use client'

import Image from 'next/image'

export default function GroceryImage() {
  return (
    <div className="md:block hidden absolute z-10">
      <Image
        src="/images/home_grocery_basket.png"
        alt="Grocery Basket"
        width={400}
        height={400}
        className="object-contain"
        priority
      />
    </div>
  )
}
