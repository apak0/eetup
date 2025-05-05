import { Image as ImageKitImage } from '@imagekit/next'

export const CompanyItem = ({ item }: { item: any }) => {
  console.log(item.score)
  const itemScore = 5
  return (
    <div className="p-4 border border-solid border-(--border-color) rounded-lg hover:shadow-lg transition-shadow ">
      <div className="flex gap-4">
        <div className="flex-1">
          <h3 className="font-semibold mb-2 ">{item.organization}</h3>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
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
          {itemScore >= 0 && (
            <div className="mt-2 flex items-center">
              {[...Array(Math.round(itemScore))].map((_, index) => (
                <span key={index} className="text-red-700 text-xs">
                  ★
                </span>
              ))}
              <span className="text-xs ml-1">({item.score})</span>
            </div>
          )}
        </div>
        <div className="w-50 h-50 flex-shrink-0 relative rounded-lg overflow-hidden">
          <ImageKitImage
            // src={item.image || '/LOGO.png'}
            src="https://img.freepik.com/free-photo/typical-cafe-scene-paris_1101-927.jpg?ga=GA1.1.1131479327.1725470941&semt=ais_hybrid&w=740"
            width={96}
            height={96}
            alt={`${item.organization} logo`}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
