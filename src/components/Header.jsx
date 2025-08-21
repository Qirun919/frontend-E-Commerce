import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link } from "react-router";

const Header = () => {
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
        <Typography variant="h3">Welcome to my shop</Typography>
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
    </>
  );
};
export default Header;
