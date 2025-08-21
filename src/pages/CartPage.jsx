import Box from "@mui/material/Box";
import { Link } from "react-router";
import { Typography, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { getCart, deleteItemFromCart, updateCart } from "../utils/cart";

function CartPage() {
  const [products, setProducts] = useState([]);

  // load cart items on mount
  useEffect(() => {
    const fetchCart = async () => {
      const cartItems = await getCart(); // get items from API or local storage
      setProducts(cartItems);
    };
    fetchCart();
  }, []);

  // remove product from cart
  const handleRemove = async (id) => {
    await deleteItemFromCart(id); // call your cart.js delete function
    const updated = products.filter((product) => product._id !== id);
    setProducts(updated);

    // update the cart in local storage or API
    await updateCart(updated);
  };

  // calculate total of all products
  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <>
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderBottom: "1px solid #ddd",
          mb: 3,
        }}
      >
        <Typography variant="h3">Cart</Typography>
        <Button
          component={Link}
          to={`/`}
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to={`/cart`}
          variant="contained"
          color="primary"
        >
          Cart
        </Button>
      </Box>
      <Container>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid #ddd" }}>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          {products.length === 0 ? (
            <Typography variant="h5">No Product Add Yet!</Typography>
          ) : null}
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">
                  {product.price * product.quantity}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleRemove(product._id);
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Typography variant="h6" sx={{ mr: 6 }}>
            Total: ${total}
          </Typography>
          <Button component={Link} to={`/`} variant="contained" color="primary">
            Check Out
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default CartPage;
