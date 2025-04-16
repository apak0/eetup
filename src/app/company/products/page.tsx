'use client'

import { useState } from 'react'
import classNames from 'classnames'
import { PlusIcon } from 'lucide-react'

import { CreateProduct } from './create'

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('list')

  return (
    <div className="">
      <div className="flex border-bottom gap-1 ">
        <button
          onClick={() => setActiveTab('tab1')}
          className={classNames(
            'min-w-32 h-10 rounded-t-lg rounded-b-none text-white shadow-none bg-orange-3 hover:bg-orange-4 transition duration-100',
            {
              'bg-orange-4 ': activeTab === 'tab1',
            },
          )}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          className={classNames(
            'flex items-center gap-1 min-w-32 h-10 rounded-t-lg rounded-b-none text-white shadow-none bg-orange-3 hover:bg-orange-4 transition duration-100',
            {
              'bg-orange-4 ': activeTab === 'tab2',
            },
          )}
        >
          <PlusIcon className="h-6" /> Create
        </button>
      </div>
      <div id="tab1" className={`tab-content py-4 ${activeTab !== 'tab1' ? 'hidden' : ''}`}>
        <h2>Content for Overview</h2>
        <p>This is the content for the first tab.</p>
      </div>

      <div id="tab2" className={`tab-content py-4 ${activeTab !== 'tab2' ? 'hidden' : ''}`}>
        <CreateProduct />
      </div>
    </div>
  )
}
