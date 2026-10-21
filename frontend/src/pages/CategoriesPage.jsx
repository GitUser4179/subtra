import { useEffect, useState } from "react"
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material"
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
    if (!window.confirm("Delete this category?")) return
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
    <Box sx={{ display: "grid", gap: 4 }}>
      <Box>
        <Typography component="h1" variant="h4">
          Categories
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Organize subscriptions into categories.
        </Typography>
      </Box>

      <Card>
        <CardContent sx={{ p: { xs: 2.5, sm: 3 }, "&:last-child": { pb: 3 } }}>
          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            Add category
          </Typography>

          <Box
            component="form"
            onSubmit={SubmitCategory}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
              gap: 1.5,
              alignItems: "start",
            }}
          >
            <TextField
              label="Category name"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!categoryName.trim()}
              sx={{ minHeight: 56 }}
            >
              Add category
            </Button>
          </Box>
        </CardContent>
      </Card>

      {errorMessage && (
        <Alert severity="error" role="alert">
          {errorMessage}
        </Alert>
      )}

      <Box sx={{ display: "grid", gap: 2 }}>
        <Typography component="h2" variant="h5">
          Your categories
        </Typography>

        {isLoading ? (
          <Card>
            <CardContent>
              <Typography color="text.secondary">Loading categories...</Typography>
            </CardContent>
          </Card>
        ) : categories.length === 0 ? (
          errorMessage ? null : (
            <Card>
              <CardContent>
                <Typography component="h3" variant="h6" sx={{ mb: 1 }}>
                  No categories yet
                </Typography>
                <Typography color="text.secondary">Add a category above to get started.</Typography>
              </CardContent>
            </Card>
          )
        ) : (
          <Box
            component="ul"
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
              gap: 2,
            }}
          >
            {categories.map((category) => (
              <Box component="li" key={category.id} sx={{ minWidth: 0 }}>
                <Card sx={{ height: "100%" }}>
                  <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
                    {editingId === category.id ? (
                      <Box sx={{ display: "grid", gap: 2 }}>
                        <TextField
                          label="Edit category name"
                          value={editName}
                          onChange={(event) => setEditName(event.target.value)}
                          fullWidth
                        />

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          <Button
                            type="button"
                            variant="contained"
                            onClick={handleSaveEdit}
                            disabled={!editName.trim()}
                          >
                            Save
                          </Button>
                          <Button
                            type="button"
                            variant="outlined"
                            onClick={() => {
                              setEditingId(null)
                              setEditName("")
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: { xs: "stretch", sm: "center" },
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Typography
                          component="h3"
                          variant="h6"
                          sx={{ minWidth: 0, overflowWrap: "anywhere" }}
                        >
                          {category.name}
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          <Button
                            type="button"
                            variant="outlined"
                            aria-label={`Edit ${category.name}`}
                            onClick={() => {
                              setEditingId(category.id)
                              setEditName(category.name)
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            color="error"
                            aria-label={`Delete ${category.name}`}
                            onClick={() => handleDelete(category.id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
