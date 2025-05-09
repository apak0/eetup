import { Image as ImageKitImage } from '@imagekit/next'

export const CompanyItem = ({ item }: { item: any }) => {
  return (
    <div className="card dark:border border-solid border-(--border-color) overflow-hidden hover:shadow-lg transition cursor-pointer">
      <div className="relative h-48">
        <ImageKitImage
          // src={item.image || '/LOGO.png'}
          src="https://img.freepik.com/free-photo/typical-cafe-scene-paris_1101-927.jpg?ga=GA1.1.1131479327.1725470941&semt=ais_hybrid&w=740"
          width={400}
          height={200}
          alt={`${item.organization} logo`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 text-gray-6 dark:text-gray-3">{item.organization}</h3>
        <p className="mb-2 text-(--text)">
          {item.street} {item.houseNumber}
          {item.houseNumberAddition && ` ${item.houseNumberAddition}`}
        </p>
        <div className="flex items-center justify-between">
          {item.minEstimatedDeliveryTime >= 0 && (
            <span className="text-sm text-gray-6 dark:text-gray-3">
              {item.minEstimatedDeliveryTime}-{item.maxEstimatedDeliveryTime} min
            </span>
          )}
          {item.score >= 0 && (
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{item.score}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
