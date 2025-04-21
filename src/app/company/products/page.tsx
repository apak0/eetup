import { PlusIcon } from 'lucide-react'

import { CreateProduct } from './create'

import { Tabs } from '@/components/reusables/Tabs'

export default function ProductsPage() {
  const tabs = [
    { key: '', label: 'Overview', content: <div>Overview Content</div> },
    { key: 'tab2', label: 'Create Product', content: <CreateProduct />, icon: <PlusIcon /> },
  ]
  return <Tabs tabs={tabs} />
}
