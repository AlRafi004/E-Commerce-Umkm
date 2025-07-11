import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Store as StoreIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Chat as ChatIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Auth state
  const { user, isAuthenticated, logout } = useAuth();
  const cartItemCount = 3; // Replace with actual cart count

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const menuItems = [
    { text: "Beranda", icon: <HomeIcon />, path: "/" },
    { text: "Produk", icon: <CategoryIcon />, path: "/products" },
    {
      text: "Produk Lokal",
      icon: <StoreIcon />,
      path: "/products?isLocal=true",
    },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ color: "inherit", textDecoration: "none" }}
            onClick={handleDrawerToggle}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {user ? (
          <>
            <ListItem
              component={Link}
              to="/chat"
              sx={{ color: "inherit", textDecoration: "none" }}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary="Chat" />
            </ListItem>
            <ListItem
              component={Link}
              to="/profile"
              sx={{ color: "inherit", textDecoration: "none" }}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profil" />
            </ListItem>
            {user.role === 'vendor' && (
              <ListItem
                component={Link}
                to="/vendor"
                sx={{ color: "inherit", textDecoration: "none" }}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard Toko" />
              </ListItem>
            )}
            {user.role === 'admin' && (
              <ListItem
                component={Link}
                to="/admin"
                sx={{ color: "inherit", textDecoration: "none" }}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Admin Panel" />
              </ListItem>
            )}
            <ListItem
              onClick={() => {
                handleLogout();
                handleDrawerToggle();
              }}
              sx={{ color: "inherit", cursor: "pointer" }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Keluar" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem
              component={Link}
              to="/login"
              sx={{ color: "inherit", textDecoration: "none" }}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Masuk" />
            </ListItem>
            <ListItem
              component={Link}
              to="/register"
              sx={{ color: "inherit", textDecoration: "none" }}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Daftar" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            <StoreIcon sx={{ mr: 1 }} />
            UMKM Market
          </Typography>

          {!isMobile && (
            <Box sx={{ display: "flex", ml: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  to={item.path}
                  sx={{ mx: 1 }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <form onSubmit={handleSearch}>
              <StyledInputBase
                placeholder="Cari produk..."
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </Search>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={cartItemCount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {user ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.firstName?.[0] || "U"}
                </Avatar>
              </IconButton>
            ) : (
              !isMobile && (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button color="inherit" component={Link} to="/login">
                    Masuk
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    component={Link}
                    to="/register"
                  >
                    Daftar
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem component={Link} to="/profile">
          <PersonIcon sx={{ mr: 1 }} />
          Profil
        </MenuItem>
        {user?.role === 'vendor' && (
          <MenuItem component={Link} to="/vendor">
            <DashboardIcon sx={{ mr: 1 }} />
            Dashboard Toko
          </MenuItem>
        )}
        {user?.role === 'admin' && (
          <MenuItem component={Link} to="/admin">
            <DashboardIcon sx={{ mr: 1 }} />
            Admin Panel
          </MenuItem>
        )}
        <MenuItem component={Link} to="/chat">
          <ChatIcon sx={{ mr: 1 }} />
          Chat
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Keluar
        </MenuItem>
      </Menu>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
