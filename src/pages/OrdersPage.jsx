import { useState, useEffect } from "react";
import Header from "../components/Header";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { Container } from "@mui/material";
import { getOrders } from "../utils/api_orders";

const OrdersPage = () => {
  // store orders data from API
  const [orders, setOrders] = useState([]);

  // call the API
  useEffect(() => {
    getOrders()
      .then((data) => {
        // putting the data into orders state
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // call on;y once when the page load

  console.log(orders);

  // change status
  const handleChangeStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // remove order (pending)
  const handleRemoveOrder = (orderId) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      setOrders((prev) => prev.filter((order) => order._id !== orderId));

      toast.success("order has been deleted");
    });
  };

  return (
    <>
      <Header current="orders" title="My Orders" />
      <Container maxWidth="lg">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell align="right">Products</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Payment Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((orders) => (
                  <TableRow
                    key={orders._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {orders.customerName}
                      <div>{orders.customerEmail}</div>
                    </TableCell>
                    <TableCell align="right">
                      {orders.products.map((p) => (
                        <div key={p.id}>{p.name}</div>
                      ))}
                    </TableCell>
                    <TableCell align="right">{orders.totalPrice}</TableCell>
                    <TableCell align="right">
                      <FormControl
                        fullWidth
                        disabled={orders.status === "pending"}
                      >
                        <InputLabel id="demo-simple-select-label">
                          {orders.status}
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label={orders.status}
                          onChange={(e) =>
                            handleChangeStatus(orders._id, e.target.value)
                          }
                        >
                          <MenuItem value={"paid"}>paid</MenuItem>
                          <MenuItem value={"failed"}>failed</MenuItem>
                          <MenuItem value={"completed"}>completed</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    <TableCell align="right">
                      {(orders.status === "paid" ||
                        orders.status === "completed") &&
                        orders.paid_at}
                    </TableCell>

                    <TableCell align="right">
                      {orders.status === "pending" && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleRemoveOrder(orders._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No order yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default OrdersPage;
