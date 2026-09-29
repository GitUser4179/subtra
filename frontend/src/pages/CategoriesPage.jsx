import { useEffect, useState } from "react"
import { Box, Typography, TextField, Button } from "@mui/material"
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../features/categories/api"

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState("")

  useEffect(() => {
    async function loadCategories() {
      try {
        const result = await getCategories()
        setCategories(result)
      } catch (error) {
        console.error(error)
        setErrorMessage("Could not load categories.")
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  async function SubmitCategory(event) {
    setErrorMessage("")
    event.preventDefault()

    try {
      const createdCategory = await createCategory(categoryName.trim())
      setCategories((current) => [...current, createdCategory])
      setCategoryName("")
    } catch (error) {
      console.error(error)
      setErrorMessage("Could not submit category.")
    }
  }

  async function handleSaveEdit() {
    setErrorMessage("")
    try {
      const updatedCategory = await updateCategory(editingId, editName.trim())
      setCategories((current) =>
        current.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category,
        ),
      )
      setEditingId(null)
      setEditName("")
    } catch (error) {
      console.error(error)
      setErrorMessage("Could not update category.")
    }
  }

  async function handleDelete(id) {
    setErrorMessage("")
    try {
      await deleteCategory(id)

      setCategories((current) => current.filter((category) => category.id !== id))
    } catch (error) {
      console.error(error)
      setErrorMessage(error.message)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography component="h1" variant="h4">
        Categories
      </Typography>
      <form onSubmit={SubmitCategory}>
        <TextField
          label="Category name"
          value={categoryName}
          onChange={(event) => setCategoryName(event.target.value)}
        />
        <Button type="submit" disabled={!categoryName.trim()}>
          Add category
        </Button>
      </form>
      {errorMessage && <Typography role="alert">{errorMessage}</Typography>}
      {isLoading ? (
        <Typography>Loading categories...</Typography>
      ) : categories.length === 0 ? (
        errorMessage ? null : (
          <Typography>No categories yet.</Typography>
        )
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name}
              <Button
                type="button"
                onClick={() => {
                  setEditingId(category.id)
                  setEditName(category.name)
                }}
              >
                Edit
              </Button>
              <Button type="button" onClick={() => handleDelete(category.id)}>
                Delete
              </Button>
              {editingId === category.id && (
                <>
                  <TextField
                    label="Edit category name"
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                  />
                  <Button type="button" onClick={handleSaveEdit} disabled={!editName.trim()}>
                    Save
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </Box>
  )
}
