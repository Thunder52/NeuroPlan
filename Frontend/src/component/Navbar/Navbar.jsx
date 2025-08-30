import { useState } from "react";
import { AppBar, Toolbar, Box, Button, Typography, Stack, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/ChatGPT Image Aug 11, 2025, 04_30_47 PM.png";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? true : false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#093FB4",
        padding: { xs: "0.5rem 1rem", md: "0.5rem 2rem" },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box component="img" src={logo} height={60} width={60} sx={{ cursor: "pointer" }} />
        <Stack
          direction="row"
          spacing={3}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <Link
            href="#addpromt"
            underline="none"
            sx={{
              color: "white",
              fontWeight: 500,
              transition: "0.3s",
              "&:hover": { color: "#FFD700" },
            }}
          >
            Preference Section
          </Link>
          <Link
            href="#plans"
            underline="none"
            sx={{
              color: "white",
              fontWeight: 500,
              transition: "0.3s",
              "&:hover": { color: "#FFD700" },
            }}
          >
            Your Plans
          </Link>
          <Link
            href="#plans"
            underline="none"
            sx={{
              color: "white",
              fontWeight: 500,
              transition: "0.3s",
              "&:hover": { color: "#FFD700" },
            }}
          >
            Edit Your Plans
          </Link>
        </Stack>
        {isLogin ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1" sx={{ color: "white" }}>
              Welcome back! {user?.name}
            </Typography>
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: "#5EABD6",
                color: "white",
                borderRadius: "10px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#2f5ec4ff" },
              }}
            >
              Logout
            </Button>
          </Stack>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            sx={{
              backgroundColor: "#5EABD6",
              color: "white",
              borderRadius: "20px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#093FB4" },
            }}
          >
            Login/Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
