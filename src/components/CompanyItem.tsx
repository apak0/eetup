import { Image as ImageKitImage } from '@imagekit/next'

export const CompanyItem = ({ item }: { item: any }) => {
  return (
    <div className="flex flex-col border border-solid rounded-t-lg border-(--border-color) hover:shadow-lg transition-shadow">
      <div className=" flex-shrink-0 items-center relative overflow-hidden rounded-t-lg">
        <ImageKitImage
          // src={item.image || '/LOGO.png'}
          src="https://img.freepik.com/free-photo/typical-cafe-scene-paris_1101-927.jpg?ga=GA1.1.1131479327.1725470941&semt=ais_hybrid&w=740"
          width={96}
          height={96}
          alt={`${item.organization} logo`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex gap-4 p-2">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{item.organization}</h3>
            {item.score >= 0 && (
              <div className="flex justify-end items-center">
                {[...Array(Math.round(item.score))].map((_, index) => (
                  <span key={index} className="text-red-700 text-xs">
                    ★
                  </span>
                ))}
                <span className="text-xs ml-1">({item.score})</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm ">
            <p>
              {item.street} {item.houseNumber}
              {item.houseNumberAddition && ` ${item.houseNumberAddition}`}
            </p>
            <p>
              {item.postcode} {item.city}
            </p>
            <p>Tel: {item.tel}</p>
          </div>
          {item.minEstimatedDeliveryTime >= 0 && (
            <p className="mt-2 text-sm">
              Delivery time: {item.minEstimatedDeliveryTime}-{item.maxEstimatedDeliveryTime} min
            </p>
          )}
          {item.deliveryFee && Number(item.deliveryFee) > 0 && <p className="text-sm">Delivery fee: €{item.deliveryFee}</p>}
        </div>
      </div>
    </div>
  )
}
