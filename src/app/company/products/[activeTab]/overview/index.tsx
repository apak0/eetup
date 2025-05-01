import Image from 'next/image'

import { getProductsAction } from '../actions'

export const ProductsOverview = async () => {
  const products = await getProductsAction()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {products?.map((product) => (
        <div
          key={product.id}
          className="card p-4 shadow dark:border border-solid border-(--border-color) hover:shadow-lg transition cursor-pointer flex flex-col h-full"
        >
          <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
            {product.image && <Image src={product.image} alt={product.name} fill className="object-cover w-full h-full" />}
            {/* {product.active === false && (
              <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
                <span className="text-white font-bold py-1 px-3 bg-red-1 rounded-full">Passive</span>
              </div>
            )} */}
            {product.discount_price && (
              <div className="absolute top-2 right-2 bg-red-1 text-white text-sm font-bold py-1 px-2 rounded">Discounted</div>
            )}
          </div>

          <h3 className="font-medium">{product.name}</h3>

          <h6 className="">{product.description || 'There is not any order description.'}</h6>

          <div className="mt-auto">
            {product.categories && product.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {product.categories.map((catId) => (
                  <span key={catId} className="text-xs bg-(--bg) py-1 px-2 rounded-full">
                    Categorie {catId}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              <div>
                {product.discount_price ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{product.discount_price} ₺</span>
                    <span className="text-sm text-gray-500 line-through">{product.price} ₺</span>
                  </div>
                ) : (
                  <span className="text-lg font-bold">{product.price} Є</span>
                )}
              </div>

              <button className="bg-gray-800 hover:bg-gray-900 text-white py-1 px-3 rounded-lg text-sm">Edit</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
