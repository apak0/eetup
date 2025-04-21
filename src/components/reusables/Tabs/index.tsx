import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import classNames from 'classnames'

export const Tabs = ({ tabs }: { tabs: { key: string; label: string; content: React.ReactNode; icon?: React.ReactNode }[] }) => {
  return (
    <TabGroup>
      <TabList className="flex items-center gap-1">
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            className={classNames(
              'flex items-center justify-center gap-2 min-w-32 h-10 rounded-t-lg rounded-b-none text-white shadow-none bg-orange-3 hover:bg-orange-4 transition duration-100',

              'data-selected:bg-orange-4 ',
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
