import qs from 'qs'

export const getLatLon = async (address: { q?: string; postalcode?: string; city?: string; street?: string }) => {
  const [data] = await fetch(
    `https://nominatim.openstreetmap.org/search?${qs.stringify(address)}${address?.postalcode ? '&country=Netherlands' : ''}&format=json`,
  )
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        return [{ lat: null, lon: null }]
      }
    })
    .catch((e) => {
      return [e]
    })

  const lat = data?.lat || null
  const lon = data?.lon || null
  return {
    lat: lat ? parseFloat(lat) : null,
    lon: lon ? parseFloat(lon) : null,
  }
}
