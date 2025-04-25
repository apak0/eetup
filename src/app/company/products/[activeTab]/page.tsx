import { PlusIcon } from 'lucide-react'

import { CreateProduct } from './create'
import { ProductsOverview } from './overview'

import { Tabs } from '@/components/reusables/Tabs'

export default async function ProductsPage({ params }: { params: Promise<{ activeTab: string }> }) {
  const { activeTab } = await params

  const tabs = [
    { key: 'overview', label: 'Overview', content: <ProductsOverview /> },
    { key: 'create', label: 'Create Product', content: <CreateProduct />, icon: <PlusIcon /> },
  ]
  return <Tabs tabs={tabs} selectedTab={activeTab} />
}
