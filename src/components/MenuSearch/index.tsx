import React, { useEffect, useRef, useState } from 'react'
import { Button, Input } from '@headlessui/react'
import classNames from 'classnames'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'

import { StyledDiv } from './style'

interface Tab {
  id: number
  label: string
  items: any
}

interface MenuSearchProps {
  tabs: Tab[]
  onSearch?: (query: string) => void
  onTabClick?: (tabId: number) => void
}

export const MenuSearch: React.FC<MenuSearchProps> = ({ tabs, onSearch, onTabClick }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : '')
  const tabsRootRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const [visibleEntries, setVisibleEntries] = useState<any>({})

  const [hasOverflowLeft, setHasOverflowLeft] = useState(false)
  const [hasOverflowRight, setHasOverflowRight] = useState(false)

  const checkOverflow = () => {
    if (!navbarRef.current) return

    const { scrollWidth, clientWidth, scrollLeft } = navbarRef.current
    setHasOverflowLeft(scrollLeft > 0)
    setHasOverflowRight(scrollLeft + clientWidth < scrollWidth)
  }

  useEffect(() => {
    checkOverflow()
    const el = navbarRef.current
    if (!el) return
    el.addEventListener('scroll', checkOverflow)
    window.addEventListener('resize', checkOverflow)

    return () => {
      el.removeEventListener('scroll', checkOverflow)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [tabs, navbarRef])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleEntries((prev: any) => {
          const nextList = { ...prev }

          entries.forEach((entry) => {
            const id = Number(entry.target.id.replace('tab-', ''))
            if (entry.isIntersecting) {
              nextList[id] = entry.boundingClientRect.top
            } else {
              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
              delete nextList[id]
            }
          })
          return nextList
        })
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px -70% 0px',
      },
    )

    const refs = Object.values(sectionRefs.current)
    refs.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      observer.disconnect()
    }
  }, [tabs])

  useEffect(() => {
    const firstVisibleEntryId = Object.entries(visibleEntries)?.sort((a: any, b: any) => a[1] - b[1])?.[0]?.[0]
    setActiveTab(Number(firstVisibleEntryId))
  }, [visibleEntries])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId)
    onTabClick?.(tabId)

    const tabElement = document.getElementById(`tab-${tabId}`)
    if (tabElement) {
      const top = tabElement.getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (navbarRef.current) {
      const scrollAmount = 200
      const newScrollLeft = direction === 'left' ? navbarRef.current.scrollLeft - scrollAmount : navbarRef.current.scrollLeft + scrollAmount

      navbarRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="@container">
      <div className="flex bg-(--bg) gap-2 flex-col @xl:flex-row items-center mb-4 sticky top-0 z-40 border-bottom p-2">
        <div className="flex gap-2 w-full @xl:w-auto">
          <Input
            type="text"
            placeholder="Search menu"
            value={searchQuery}
            onChange={handleSearchChange}
            className="rounded-full px-4 h-8 pr-10 w-60 flex-1"
          />
          {searchQuery && (
            <Button
              className="btn-default rounded-full h-8 w-8 px-2 -ml-10"
              onClick={() => {
                setSearchQuery('')
                onSearch?.('')
              }}
            >
              <X size={20} />
            </Button>
          )}
        </div>
        {hasOverflowLeft && (
          <Button className="btn-default h-8 px-2 rounded-full" onClick={() => scroll('left')}>
            <ArrowLeft size={16} />
          </Button>
        )}
        <StyledDiv className="flex gap-1 max-w-full overflow-x-auto" ref={navbarRef}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              className={classNames('text-sm h-8 px-2 rounded-full border ', {
                'btn border-transparent bg-gray-6': activeTab === tab.id,
                'btn-default border-gray-6 text-gray-6 dark:text-gray-2 dark:border-gray-2 hover:bg-gray-6 hover:text-white': activeTab !== tab.id,
              })}
              type="button"
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </StyledDiv>
        {hasOverflowRight && (
          <Button className="btn-default h-8 px-2 rounded-full" onClick={() => scroll('right')}>
            <ArrowRight size={16} />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4" ref={tabsRootRef}>
        {tabs
          ?.filter(
            (item) =>
              !searchQuery ||
              item.label.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
              item.items?.some((subItem: any) => subItem.props.item.name.toLowerCase()?.includes(searchQuery.toLowerCase())),
          )
          ?.map((tabItem) => (
            <div
              key={tabItem.id}
              id={`tab-${tabItem.id}`}
              ref={(el) => {
                sectionRefs.current[tabItem.id] = el
              }}
            >
              <h3 className="font-bold mb-2">{tabItem.label}</h3>
              <div className="grid gap-4 grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-3">{tabItem.items}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
