import { Button } from "@mui/material";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import { useState, useEffect } from "react";
import { getProducts } from "../utils/api_products";

const Products = () => {
  // to store the data from /products
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    getProducts(category).then((data) => {
      setProducts(data);
    });
  }, [category]);

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
            }}
          >
            Products
          </Typography>
          <Button variant="contained" color="success">
            Add New
          </Button>
        </Box>
        <Box
          sx={{
            paddingBottom: "10px",
          }}
        >
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ backgroundColor: "white", paddingRight: "5px" }}
            >
              Filter By Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Genre"
              onChange={(event) => setCategory(event.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={"Consoles"}>Consoles</MenuItem>
              <MenuItem value={"Games"}>Games</MenuItem>
              <MenuItem value={"Accessories"}>Accessories</MenuItem>
              <MenuItem value={"Subscriptions"}>Subscriptions</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} key={product._id}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h5" sx={{ minHeight: "64px" }}>
                    {product.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pt: 2,
                    }}
                  >
                    <Chip label={product.price} color="success" />
                    <Chip label={product.category} color="primary" />
                  </Box>
                </CardContent>
                <CardActions sx={{ display: "block", px: 3, pb: 3 }}>
                  <Button variant="contained" color="primary" fullWidth>
                    Add To Cart
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      pt: 2,
                      marginLeft: "0px !important",
                    }}
                  >
                    <Button variant="contained" color="info">
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Products;
