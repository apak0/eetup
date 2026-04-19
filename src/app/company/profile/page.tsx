import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { db } from '@/lib/database/db'
import { auth } from '@/lib/utils/auth'

async function updateCompanyProfile(formData: FormData) {
  'use server'
  const { auth } = await import('@/lib/utils/auth')
  const { db } = await import('@/lib/database/db')
  const { company } = await import('@/lib/database/schema')
  const { eq } = await import('drizzle-orm')

  const session = await auth()
  if (!session?.user?.id || session?.user?.role !== 'company') {
    redirect('/auth/signin')
  }

  const allowedFields = ['firstName', 'lastName', 'tel', 'postcode', 'city', 'street', 'houseNumber', 'houseNumberAddition']
  const updates: Record<string, string> = {}
  for (const key of allowedFields) {
    const value = formData.get(key)
    if (typeof value === 'string') {
      updates[key] = value.replace(/[<>]/g, '')
    }
  }
  const toast = { success: false, error: '', message: '' }
  if (Object.keys(updates).length === 0) {
    toast.error = 'No fields provided'
  } else {
    try {
      await db.update(company).set(updates).where(eq(company.id, session.user.id))
      revalidatePath('/company/profile')
      toast.success = true
      toast.message = 'Profile updated successfully.'
    } catch (_e: any) {
      toast.error = 'Update failed'
    }
  }
  const cookieStore = await cookies()
  cookieStore.set('toast', JSON.stringify(toast), { httpOnly: false })
  redirect('/company/profile')
}

export default async function CompanyProfilePage() {
  const session = await auth()
  if (!session?.user?.id || session?.user?.role !== 'company') {
    redirect('/auth/signin')
  }

  const companyData = await db.query.company.findFirst({
    where: (c) => eq(c.id, session.user.id),
  })

  if (!companyData) {
    return <div className="text-red-500">Company not found.</div>
  }

  return (
    <div className="max-w-xl mx-auto card p-8 mt-9">
      <h1 className="text-2xl font-bold mb-6">Company Profile</h1>
      <form action={updateCompanyProfile} className="space-y-4">
        <label className="block">
          <span className="font-medium">Organization</span>
          <input defaultValue={companyData.organization || ''} className="input w-full bg-gray-100" readOnly disabled />
        </label>
        <label className="block">
          <span className="font-medium">Chamber of Commerce ID</span>
          <input defaultValue={companyData.cocId || ''} className="input w-full bg-gray-100" readOnly disabled />
        </label>
        <label className="block">
          <span className="font-medium">First Name</span>
          <input name="firstName" defaultValue={companyData.firstName || ''} className="input w-full" />
        </label>
        <label className="block">
          <span className="font-medium">Last Name</span>
          <input name="lastName" defaultValue={companyData.lastName || ''} className="input w-full" />
        </label>
        <label className="block">
          <span className="font-medium">Phone</span>
          <input name="tel" defaultValue={companyData.tel || ''} className="input w-full" />
        </label>
        <div className="pt-2">
          <h2 className="font-semibold mb-2">Address</h2>
          <div className="space-y-2">
            <label className="block">
              <span className="font-medium">Postcode</span>
              <input name="postcode" defaultValue={companyData.postcode || ''} className="input w-full" />
            </label>
            <label className="block">
              <span className="font-medium">City</span>
              <input name="city" defaultValue={companyData.city || ''} className="input w-full" />
            </label>
            <label className="block">
              <span className="font-medium">Street</span>
              <input name="street" defaultValue={companyData.street || ''} className="input w-full" />
            </label>
            <label className="block">
              <span className="font-medium">House Number</span>
              <input name="houseNumber" defaultValue={companyData.houseNumber || ''} className="input w-full" />
            </label>
            <label className="block">
              <span className="font-medium">House Number Addition</span>
              <input name="houseNumberAddition" defaultValue={companyData.houseNumberAddition || ''} className="input w-full" />
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-full mt-4">
          Save Changes
        </button>
      </form>
    </div>
  )
}
