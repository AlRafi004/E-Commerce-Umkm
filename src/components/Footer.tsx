import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  WhatsApp,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        mt: "auto",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              UMKM Market Kalimantan Tengah
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Platform e-commerce untuk mendukung UMKM lokal di Kalimantan
              Tengah. Bergabunglah dengan kami dalam memajukan ekonomi lokal.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="WhatsApp">
                <WhatsApp />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom>
              Menu
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" color="inherit" underline="hover">
                Beranda
              </Link>
              <Link href="/products" color="inherit" underline="hover">
                Produk
              </Link>
              <Link
                href="/products?isLocal=true"
                color="inherit"
                underline="hover"
              >
                Produk Lokal
              </Link>
              <Link href="/register" color="inherit" underline="hover">
                Bergabung Sebagai Vendor
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Bantuan
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/help/how-to-buy" color="inherit" underline="hover">
                Cara Berbelanja
              </Link>
              <Link href="/help/how-to-sell" color="inherit" underline="hover">
                Cara Berjualan
              </Link>
              <Link href="/help/payment" color="inherit" underline="hover">
                Metode Pembayaran
              </Link>
              <Link href="/help/shipping" color="inherit" underline="hover">
                Pengiriman
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Kontak
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2">
                  Jl. Tjilik Riwut KM 1.5, Palangka Raya
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone fontSize="small" />
                <Typography variant="body2">+62 536 123 4567</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email fontSize="small" />
                <Typography variant="body2">support@umkmmarket.id</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <WhatsApp fontSize="small" />
                <Typography variant="body2">+62 812 3456 7890</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.2)" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body2">
            © 2024 UMKM Market Kalimantan Tengah. Dikembangkan oleh Jitara
            Software House.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: { xs: 1, md: 0 } }}>
            <Link
              href="/privacy"
              color="inherit"
              underline="hover"
              variant="body2"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="/terms"
              color="inherit"
              underline="hover"
              variant="body2"
            >
              Syarat & Ketentuan
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
