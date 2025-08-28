import Header from "../components/Header";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../utils/api_categories";
import Swal from "sweetalert2";

const CategoriesPage = () => {
  // store orders data from API
  const [categories, setCategories] = useState([]);
  const [label, setLabel] = useState([]);

  // call the API
  useEffect(() => {
    getCategories()
      .then((data) => {
        // putting the data into orders state
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call only once when the page load

  //add new category
  const handleAddNew = async (event) => {
    // 1. check for error
    if (!label) {
      toast.error("Please fill up the required fields");
    }

    try {
      // 2. trigger the API to create new product
      await createCategory(label);

      // 3. if successful, redirect user back to home page and show success message
      toast.success("New Category has been added");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // edit category
  const handleLabelUpdate = (category) => {
    // 5a. prompt the user to update the new label for the selected category (pass in the current value)
    const updateCategory = prompt(
      "Please enter the new label for the selected category.",
      category.label
    );
    // 5b. update the categories with the update category label
    if (updateCategory) {
      const updatedCategories = [...categories];
      setCategories(
        updatedCategories.map((cat) => {
          if (cat._id === category._id) {
            cat.label = updateCategory;
          }
          return cat;
        })
      );
      // show notification of success message
      toast("Category has been updated");
      // 5c. update the local storage with the updated categories
    }
  };

  // delete category
  const handleCategoryDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this category?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // once user confirm, then we delete the product
      if (result.isConfirmed) {
        await deleteCategory(id);
        // method #1: get new orders data
        const updatedCategories = await getCategories();
        setCategories(updatedCategories);
        // method #2:
        // setCategories(orders.filter((i) => i._id !== id));
        toast.info("Category has been deleted");
      }
    });
  };

  return (
    <>
      <Header current="categories" title="Manage Categories" />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4">Manage Categories</Typography>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <InputLabel>Add New Category</InputLabel>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              mt: "5px",
            }}
          >
            <TextField
              fullWidth
              label="Category"
              variant="outlined"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
            <Button color="primary" variant="contained" onClick={handleAddNew}>
              Add
            </Button>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: "20px",
            mt: "20px",
          }}
        >
          <InputLabel>Existing Categories ({categories.length})</InputLabel>
          <List sx={{ width: "100%" }}>
            {categories.map((category) => (
              <ListItem
                key={category._id}
                disableGutters
                divider
                secondaryAction={
                  <Box sx={{ display: "flex", gap: "10px" }}>
                    <IconButton onClick={() => handleLabelUpdate(category)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        handleCategoryDelete(category._id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText primary={`${category.label}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};

export default CategoriesPage;
