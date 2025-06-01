import { getCompanyTagOptions } from './actions'
import CompanySettingsClient from './client'

export default async function CompanySettingsPage() {
  const tagOptions = await getCompanyTagOptions()

  return (
    <div className="card py-8 mt-9">
      <CompanySettingsClient tagOptions={tagOptions} />
    </div>
  )
}
