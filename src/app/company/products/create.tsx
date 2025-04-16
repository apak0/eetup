import { useActionState } from 'react'

import { createProductAction } from './actions'

import Select from '@/components/reusables/Select'

export const CreateProduct = () => {
  const [, dispatch] = useActionState(createProductAction, null)

  return (
    <div>
      <h2>Create Product</h2>

      <form action={dispatch}>
        <div className="flex flex-col w-80 gap-4">
          <input type="text" name="name" id="name" placeholder="Product Name" required autoComplete="off" />
          <Select />
          {/* <input type="text" name="description" id="description" placeholder="Description" required autoComplete="off" />
          <input type="number" name="price" id="price" placeholder="Price" required autoComplete="off" />
          <input type="text" name="image" id="image" placeholder="Image URL" required autoComplete="off" />
          <input type="text" name="categories" id="categories" placeholder="Categories (comma separated)" required autoComplete="off" />
          <input type="text" name="allergens" id="allergens" placeholder="Allergens (comma separated)" required autoComplete="off" />
          <input type="text" name="dietary" id="dietary" placeholder="Dietary (comma separated)" required autoComplete="off" /> */}
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  )
}
