import React from "react";
import { Box, Container, Typography } from "@mui/material";

const ProductDetailPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Detail Produk
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Halaman detail produk sedang dalam pengembangan
        </Typography>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
