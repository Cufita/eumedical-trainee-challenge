import type { ReactNode } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

export interface TabItem {
  key: string
  label: string
  content: ReactNode
}

export function Tabs({
  items,
  selectedKey,
  onChange,
}: {
  items: TabItem[]
  selectedKey: string
  onChange: (key: string) => void
}) {
  const selectedIndex = Math.max(
    0,
    items.findIndex((item) => item.key === selectedKey),
  )

  return (
    <TabGroup selectedIndex={selectedIndex} onChange={(index) => onChange(items[index].key)}>
      <TabList className="flex gap-2 border-b border-mist mb-6">
        {items.map((item) => (
          <Tab
            key={item.key}
            className="font-label text-[0.98rem] px-4 py-3 border-b-2 border-transparent text-slate outline-none data-[selected]:text-navy data-[selected]:border-sage-deep data-[hover]:text-navy"
          >
            {item.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {items.map((item) => (
          <TabPanel key={item.key}>{item.content}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}
