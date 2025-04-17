'use client'
import { useState } from 'react'
import classNames from 'classnames'

export const Tabs = ({ tabs }: { tabs: { key: string; label: string; content: React.ReactNode; icon?: React.ReactNode }[] }) => {
  const [activeTab, setActiveTab] = useState('')

  return (
    <div>
      {' '}
      <div className="flex border-bottom gap-1 ">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.key)}
            className={classNames(
              'flex items-center justify-center gap-2 min-w-32 h-10 rounded-t-lg rounded-b-none text-white shadow-none bg-orange-3 hover:bg-orange-4 transition duration-100',
              {
                'bg-orange-4 ': activeTab === tab.key,
              },
            )}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      <div> {tabs.find((tab) => tab.key === activeTab)?.content}</div>
    </div>
  )
}
