import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            color: "white",
            py: 8,
            px: 4,
            textAlign: "center",
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Platform E-Commerce UMKM
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ opacity: 0.9 }}
          >
            Kalimantan Tengah
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 600, mx: "auto", mb: 4, opacity: 0.8 }}
          >
            Temukan produk-produk berkualitas dari UMKM lokal Kalimantan Tengah.
            Dukung ekonomi daerah dengan berbelanja langsung dari produsen.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/products")}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              bgcolor: "white",
              color: "primary.main",
              "&:hover": {
                bgcolor: "grey.100",
              },
            }}
          >
            Jelajahi Produk
          </Button>
        </Box>

        {/* Status Banner */}
        <Box
          sx={{
            bgcolor: "success.light",
            color: "success.contrastText",
            p: 3,
            borderRadius: 2,
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            🎉 Platform Status: Semua Fitur Utama Aktif!
          </Typography>
          <Typography variant="body2">
            ✅ Shopping Cart & Checkout ✅ Chat System ✅ Admin Dashboard
          </Typography>
        </Box>

        {/* Features Section */}
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Fitur Platform UMKM
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Platform lengkap untuk mendukung UMKM Kalimantan Tengah
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
              mt: 4,
            }}
          >
            <Box
              sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                🛒 E-Commerce Lengkap
              </Typography>
              <Typography variant="body2">
                Shopping cart, checkout, dan payment gateway demo
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                💬 Chat Real-time
              </Typography>
              <Typography variant="body2">
                Komunikasi langsung antara pembeli dan penjual
              </Typography>
            </Box>

            <Box
              sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" gutterBottom color="primary">
                📊 Admin Dashboard
              </Typography>
              <Typography variant="body2">
                Manajemen produk, penjual, dan analisis penjualan
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Mulai Berbelanja Sekarang!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Dukung UMKM lokal Kalimantan Tengah
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/products")}
              sx={{ px: 4, py: 1.5 }}
            >
              Lihat Produk
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/register")}
              sx={{ px: 4, py: 1.5 }}
            >
              Daftar Sebagai Vendor
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
