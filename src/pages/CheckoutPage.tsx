import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  Grid,
  Divider,
  Alert,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { CreditCard, AccountBalance, Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("demo_transfer");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Demo order summary
  const orderItems = [
    { name: "Durian Montong Premium", quantity: 2, price: 85000 },
    { name: "Kopi Robusta Kalteng", quantity: 1, price: 45000 },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15000;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    // Simulate API call
    setTimeout(() => {
      navigate("/profile");
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <Alert severity="success" sx={{ mb: 3 }}>
          ✅ Pesanan berhasil dibuat!
        </Alert>
        <Typography variant="h5" gutterBottom>
          Terima kasih atas pesanan Anda
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          ID Pesanan: #DEMO-{Date.now().toString().slice(-6)}
        </Typography>
        <Typography variant="body2">
          Mengarahkan ke halaman profil dalam 3 detik...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Checkout
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Demo Mode: Ini adalah simulasi checkout untuk testing
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Shipping Address */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alamat Pengiriman
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nama Lengkap"
                    defaultValue="Sari Dewi"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nomor Telepon"
                    defaultValue="0813-1234-5678"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Alamat Lengkap"
                    defaultValue="Jl. Diponegoro No. 45, Palangka Raya"
                    multiline
                    rows={2}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Kota"
                    defaultValue="Palangka Raya"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Kode Pos"
                    defaultValue="73111"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Metode Pembayaran
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Paper sx={{ p: 2, mb: 1 }}>
                    <FormControlLabel
                      value="demo_transfer"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccountBalance />
                          <Box>
                            <Typography variant="body1">
                              Transfer Bank (Demo)
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Transfer ke rekening demo
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </Paper>

                  <Paper sx={{ p: 2, mb: 1 }}>
                    <FormControlLabel
                      value="demo_ewallet"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Phone />
                          <Box>
                            <Typography variant="body1">
                              E-Wallet (Demo)
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              DANA, OVO, GoPay
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </Paper>

                  <Paper sx={{ p: 2 }}>
                    <FormControlLabel
                      value="demo_card"
                      control={<Radio />}
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CreditCard />
                          <Box>
                            <Typography variant="body1">
                              Kartu Kredit (Demo)
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Visa, Mastercard
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </Paper>
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Order Summary */}
          <Card sx={{ position: "sticky", top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ringkasan Pesanan
              </Typography>

              {orderItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">
                    {item.name} ({item.quantity}x)
                  </Typography>
                  <Typography variant="body2">
                    {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="body2">Subtotal</Typography>
                <Typography variant="body2">{formatPrice(subtotal)}</Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="body2">Ongkos Kirim</Typography>
                <Typography variant="body2">{formatPrice(shipping)}</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Total
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {formatPrice(total)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handlePlaceOrder}
              >
                Buat Pesanan
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
