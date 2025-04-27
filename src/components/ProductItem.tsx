import { Image as ImageKitImage } from '@imagekit/next'

export const ProductItem = ({ item }: { item: any }) => {
  // TODO: Add product item card with styles
  return (
    <div>
      <ImageKitImage src={item.image} width={400} height={400} alt="Picture of the product" />
      {JSON.stringify(item)}
    </div>
  )
}
