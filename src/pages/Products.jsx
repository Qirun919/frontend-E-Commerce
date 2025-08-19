import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";
import { getProducts } from "../utils/api";
import { useState, useEffect } from "react";

export default function Products() {
  // to store data from /products API
  const [products, setProducts] = useState([]);
  // to store what genre to filter
  const [category, setCategory] = useState("all");

  // useEffect
  useEffect(() => {
    // get products from API
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);
  /*
    usseeffect dependency
    -it depend on it for how many times needs to be loaded
    - || -> trigger once when the page load
    - null -> trigger everything some state changes
    - [state] -> trigger when the state changes
  */
  return (
    <>
      {/* header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <h1>Welcome to my store</h1>
      </Box>
      {/* products table */}
      <Container>
        <h3>product</h3>
        <TableContainer component={Card}>
          <Box
            sx={{
              paddingBottom: "10px",
            }}
          >
            <FormControl sx={{ minWidth: "250px" }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ backgroundColor: "white" }}
              >
                Filter By Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(event) => setCategory(event.target.value)}
              >
                <MenuItem value="all">All Category</MenuItem>
                <MenuItem value={"Consoles"}>Consoles</MenuItem>
                <MenuItem value={"Games"}>Games</MenuItem>
                <MenuItem value={"Accessories"}>Accessories</MenuItem>
                <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
            {products.map((product) => (
              <Grid item size={{ xs: 2, sm: 4, md: 4 }} key={product._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>

                    <Typography
                      variant="body2"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      ${product.price}{" "}
                      <span style={{ color: "gray" }}>{product.category}</span>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TableContainer>
      </Container>
    </>
  );
}
