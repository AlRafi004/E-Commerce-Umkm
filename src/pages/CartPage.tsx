import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  IconButton,
  TextField,
  Divider,
  Alert,
} from "@mui/material";
import { Add, Remove, Delete, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  store: string;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  // Demo cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Durian Montong Premium",
      price: 85000,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1580835845971-e1cb0c7c6dd1?w=100&h=100&fit=crop",
      store: "Kebun Durian Pak Hasan",
    },
    {
      id: "3",
      name: "Kopi Robusta Kalteng",
      price: 45000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=100&h=100&fit=crop",
      store: "Kopi Nusantara",
    },
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <ShoppingCart sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Keranjang Belanja Kosong
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Belum ada produk dalam keranjang belanja Anda
        </Typography>
        <Button variant="contained" onClick={() => navigate("/products")}>
          Mulai Belanja
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Keranjang Belanja
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Demo Mode: Keranjang ini menggunakan data contoh untuk testing
      </Alert>

      {cartItems.map((item) => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {item.store}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  {formatPrice(item.price)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  size="small"
                >
                  <Remove />
                </IconButton>

                <TextField
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value) || 0)
                  }
                  size="small"
                  sx={{ width: 60 }}
                  inputProps={{ style: { textAlign: "center" } }}
                />

                <IconButton
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  size="small"
                >
                  <Add />
                </IconButton>
              </Box>

              <IconButton
                onClick={() => removeItem(item.id)}
                color="error"
                size="small"
              >
                <Delete />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />

      <Card sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">
            Total ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            item)
          </Typography>
          <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
            {formatPrice(getTotalPrice())}
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleCheckout}
          sx={{ mt: 2 }}
        >
          Lanjut ke Checkout
        </Button>
      </Card>
    </Container>
  );
};

export default CartPage;
