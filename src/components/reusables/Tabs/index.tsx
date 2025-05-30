import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import classNames from 'classnames'
import { headers } from 'next/headers'
import Link from 'next/link'

export const Tabs = async ({
  tabs,
  selectedTab,
}: {
  tabs: { key: string; label: string; content: React.ReactNode; icon?: React.ReactNode }[]
  selectedTab: string
}) => {
  const headerList = await headers()
  const pathname = headerList.get('current-path')

  return (
    <TabGroup selectedIndex={tabs.findIndex((tab) => tab.key === selectedTab)} vertical>
      <TabList className="flex items-center gap-1">
        {tabs.map((tab) => (
          <Tab
            as={Link}
            href={pathname?.replace(/\/.*$/g, '') + tab.key}
            key={tab.key}
            className={classNames(
              'btn flex items-center justify-center gap-2 min-w-32 h-9 rounded-t-lg rounded-b-none inset-4  shadow-none hover:text-white transition duration-100',
              'data-selected:bg-orange-4 data-selected:text-white',
            )}
          >
            {tab.icon} {tab.label}
          </Tab>
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
