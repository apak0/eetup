import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import classNames from 'classnames'

export const Tabs = async ({
  tabs,
  selectedTab,
  basePath,
}: {
  tabs: { key: string; label: string; content: React.ReactNode; icon?: React.ReactNode }[]
  selectedTab: string
  basePath: string
}) => {
  const selectedIndex = tabs.findIndex((tab) => tab.key === selectedTab)

  return (
    <TabGroup selectedIndex={selectedIndex} vertical>
      <TabList className="flex items-center gap-1">
        {tabs.map((tab) => (
          <a
            href={basePath + tab.key}
            key={tab.key}
            className={classNames(
              'btn flex items-center justify-center gap-2 min-w-32 h-9 rounded-t-lg rounded-b-none inset-4 shadow-none hover:text-white transition duration-100',
              selectedTab === tab.key
                ? 'bg-orange-4 text-white'
                : 'btn-default border-gray-6 text-gray-6 dark:text-gray-2 dark:border-gray-2 hover:bg-gray-6 hover:text-white',
            )}
            aria-current={selectedTab === tab.key ? 'page' : undefined}
          >
            {tab.icon} {tab.label}
          </a>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={tab.key}>{tab.content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}
