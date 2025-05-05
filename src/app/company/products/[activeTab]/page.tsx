import { Edit, Plus } from 'lucide-react'

import { getProductDataAction } from './actions'
import { CreateEditProduct } from './create-edit'
import { ProductsOverview } from './overview'

import { Tabs } from '@/components/reusables/Tabs'

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ activeTab: string }>
  searchParams: { productId: string }
}) {
  const { activeTab } = await params
  const { productId: productIdParam } = await searchParams
  const productId = parseInt(productIdParam, 10)
  const productData = productId ? await getProductDataAction(productId) : null

  const tabs = [
    { key: 'overview', label: 'Overview', content: <ProductsOverview /> },
    { key: 'create', label: 'Create Product', content: <CreateEditProduct />, icon: <Plus size={20} /> },
  ]
  if (productData) {
    tabs.push({ key: 'edit', label: 'Edit Product', content: <CreateEditProduct productData={productData} />, icon: <Edit size={20} /> })
  }
  return <Tabs tabs={tabs} selectedTab={activeTab} />
}
