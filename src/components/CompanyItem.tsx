import { Image as ImageKitImage } from '@imagekit/next'

export const CompanyItem = ({ item }: { item: any }) => {
  // TODO: Add company item card with styles
  return (
    <div>
      <ImageKitImage src={item.image} width={400} height={400} alt="Picture of the company" />
      {JSON.stringify(item)}
    </div>
  )
}
