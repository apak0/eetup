'use client'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

import { getLoggedInCompanyWithConnectionsAction } from './actions'

import { MenuSearch } from '@/components/MenuSearch'
import { ProductItem } from '@/components/ProductItem'
import Loading from '@/components/reusables/Loading'
import { CompanyWithConnections } from '@/lib/database/type'

export const ProductsOverview = () => {
  const [companyData, setCompanyData] = useState<CompanyWithConnections>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      const res = await getLoggedInCompanyWithConnectionsAction()
      if (res?.error) {
        toast.error(res?.error)
        redirect('/home')
      } else if (res?.data) {
        setCompanyData({ ...res.data, category: res.data?.category?.filter((catItem) => !!catItem.product.length) })
      }
      setLoading(false)
    }

    loadProducts()
  }, [])

  return (
    <div className="card rounded-ss-none p-4">
      <MenuSearch
        tabs={
          companyData?.category?.map((catItem) => ({
            id: catItem.id,
            label: catItem.name,
            items: catItem?.product.map((product) => (
              <ProductItem
                key={product.id}
                item={product}
                showToggle={true}
                onEdit={() => redirect(`/company/products/edit?productId=${product.id}`)}
              />
            )),
          })) || []
        }
      />

      <Loading show={loading} />
    </div>
  )
}
