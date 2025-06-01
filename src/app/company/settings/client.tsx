'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Field, Input, Label } from '@headlessui/react'
import { TicketPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { createTagAction } from './actions'

import Modal from '@/components/reusables/Modal'
import Select from '@/components/reusables/Select'
import { Tag } from '@/lib/database/type'

export default function CompanySettingsClient({ tagOptions }: { tagOptions: Tag[] }) {
  const router = useRouter()
  const [formValues, setFormValues] = useState({
    tagIds: [],
  })
  const [tagModalInput, setTagModalInput] = useState('')
  const [tagModalOpen, setTagModalOpen] = useState(false)

  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }))
  }
  return (
    <div className="p-4">
      <div className="w-80">
        <Select
          options={tagOptions.map((item) => ({ label: item.name, value: item.id }))}
          label={
            <div className="flex items-center justify-between">
              <div>Category</div>
              <Button className="btn-text h-7 font-normal gap-1" type="button" onClick={() => setTagModalOpen(true)}>
                <TicketPlus size={18} /> New
              </Button>
            </div>
          }
          onChange={(val) => handleChange('tagIds', val)}
          value={formValues.tagIds}
        />
        <Modal
          title={
            <div className="flex items-center gap-1 justify-center">
              <TicketPlus size={20} /> Create Category
            </div>
          }
          open={tagModalOpen}
          setOpen={setTagModalOpen}
          okText="Save"
          okClick={() => {
            createTagAction({ name: tagModalInput }).then((res) => {
              if (res.error) {
                toast.error(res.error)
              } else if (res.message) {
                toast.success(res.message)
                setTagModalOpen(false)
                router.refresh()
                handleChange('categoryId', res.data.id)
              }
            })
          }}
          content={
            <form className="p-8">
              <Field>
                <Label>Category Name</Label>
                <Input
                  placeholder="Drinks"
                  className="w-full"
                  type="text"
                  name="name"
                  required
                  value={tagModalInput}
                  onChange={(e) => setTagModalInput(e.target.value)}
                  autoComplete="off"
                />
              </Field>
            </form>
          }
        />
      </div>
    </div>
  )
}
