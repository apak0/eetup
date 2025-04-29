import { and, between } from 'drizzle-orm'
import { redirect } from 'next/navigation'

import { db } from '@/lib/database/db'
import { company } from '@/lib/database/schema'
import { getLatLon } from '@/lib/utils/getLatLon'

export async function getNearbyCompanies(address: string) {
  const { lat, lon } = await getLatLon({ q: address })
  const delta = 0.05 // ~3 km

  if (!lat || !lon) {
    return redirect('/')
  }

  const latMin = lat - delta
  const latMax = lat + delta
  const lonMin = lon - delta
  const lonMax = lon + delta

  const results = await db
    .select()
    .from(company)
    .where(and(between(company.lat, latMin, latMax), between(company.lon, lonMin, lonMax)))

  return results
}
