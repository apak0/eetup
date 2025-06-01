import { db } from './db'
import { category, tag } from './schema'

await db.insert(tag).values([
  { name: 'Burger', companyId: null },
  { name: 'Pizza', companyId: null },
  { name: 'Dessert', companyId: null },
  { name: 'Salad', companyId: null },
  { name: 'Vegan', companyId: null },
  { name: 'Vegetarian', companyId: null },
  { name: 'Steak', companyId: null },
  { name: 'Mediterranean', companyId: null },
  { name: 'Organic', companyId: null },
  { name: 'Gluten-Free', companyId: null },
  { name: 'Healthy', companyId: null },
  { name: 'Halal', companyId: null },
  { name: 'Seafood', companyId: null },
  { name: 'BBQ', companyId: null },
  { name: 'Pasta', companyId: null },
  { name: 'Fried Chicken', companyId: null },
  { name: 'Asian Cuisine', companyId: null },
  { name: 'Mexican', companyId: null },
  { name: 'Indian Cuisine', companyId: null },
  { name: 'Italian Cuisine', companyId: null },
  { name: 'Turkish Cuisine', companyId: null },
])

await db.insert(category).values([
  { name: 'Main Dishes', companyId: null },
  { name: 'Snacks', companyId: null },
  { name: 'Menu', companyId: null },
  { name: 'Drinks', companyId: null },
  { name: 'Salads', companyId: null },
  { name: 'Desserts', companyId: null },
  { name: 'Sides', companyId: null },
  { name: 'Breakfast', companyId: null },
  { name: 'Starters', companyId: null },
])
