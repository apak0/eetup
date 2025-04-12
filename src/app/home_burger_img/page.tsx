'use client'

import Image from 'next/image'

export default function BurgerImage() {
  return (
    <div className="md:block hidden absolute z-10 right-0">
      <Image
        src="/images/home_burger.png"
        alt="Grocery Basket"
        width={400}
        height={400}
        className="object-contain"
        priority
      />
    </div>
  )
}
