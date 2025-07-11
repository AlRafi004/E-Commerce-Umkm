import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Stack,
  Rating,
} from "@mui/material";
import {
  Search as SearchIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isLocal: boolean;
  store: {
    name: string;
    location: string;
  };
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Mock data - ini akan diganti dengan API call nanti
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Kerajinan Rotan Tradisional",
      description:
        "Tas rotan berkualitas tinggi buatan pengrajin lokal Kalimantan Tengah",
      price: 150000,
      originalPrice: 200000,
      image: "/api/placeholder/300/300",
      category: "Kerajinan",
      rating: 4.5,
      reviewCount: 23,
      isLocal: true,
      store: {
        name: "Kerajinan Dayak Asli",
        location: "Palangka Raya",
      },
    },
    {
      id: "2",
      name: "Kopi Robusta Kalteng",
      description: "Kopi premium dari perkebunan rakyat Kalimantan Tengah",
      price: 75000,
      image: "/api/placeholder/300/300",
      category: "Makanan & Minuman",
      rating: 4.8,
      reviewCount: 56,
      isLocal: true,
      store: {
        name: "Kopi Nusantara",
        location: "Sampit",
      },
    },
    {
      id: "3",
      name: "Batik Benang Bintik",
      description: "Batik khas Kalimantan Tengah dengan motif tradisional",
      price: 250000,
      originalPrice: 300000,
      image: "/api/placeholder/300/300",
      category: "Fashion",
      rating: 4.3,
      reviewCount: 18,
      isLocal: true,
      store: {
        name: "Batik Kalteng",
        location: "Kuala Kapuas",
      },
    },
  ];

  useEffect(() => {
    // Simulasi loading data dari API
    setProducts(mockProducts);
  }, []);

  const categories = [
    "Semua",
    "Kerajinan",
    "Makanan & Minuman",
    "Fashion",
    "Pertanian",
    "Elektronik",
  ];
  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price-low", label: "Harga Terendah" },
    { value: "price-high", label: "Harga Tertinggi" },
    { value: "rating", label: "Rating Tertinggi" },
    { value: "newest", label: "Terbaru" },
  ];

  // Filter dan sort products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "Semua" ||
      product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Box sx={{ py: 4, minHeight: "80vh" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 4 }}
        >
          Produk UMKM Kalimantan Tengah
        </Typography>

        {/* Search and Filter Bar */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
          >
            {/* Search */}
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: { md: 400 } }}
            />

            {/* Category Filter */}
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Kategori</InputLabel>
              <Select
                value={selectedCategory}
                label="Kategori"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category === "Semua" ? "" : category}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort */}
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Urutkan</InputLabel>
              <Select
                value={sortBy}
                label="Urutkan"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {/* Results Info */}
        <Typography variant="body1" sx={{ mb: 3 }}>
          Menampilkan {currentProducts.length} dari {sortedProducts.length}{" "}
          produk
        </Typography>

        {/* Products Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  {product.isLocal && (
                    <Chip
                      label="Produk Lokal"
                      color="success"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        backgroundColor: "success.main",
                        color: "white",
                      }}
                    />
                  )}
                  {product.originalPrice && (
                    <Chip
                      label="DISKON"
                      color="error"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "error.main",
                        color: "white",
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}
                  >
                    {product.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, fontSize: "0.85rem" }}
                  >
                    {product.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Rating
                      value={product.rating}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({product.reviewCount})
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {product.store.name} • {product.store.location}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 700 }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                    {product.originalPrice && (
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "text.secondary",
                        }}
                      >
                        {formatPrice(product.originalPrice)}
                      </Typography>
                    )}
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<FavoriteIcon />}
                    sx={{ mr: 1 }}
                  >
                    Wishlist
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<CartIcon />}
                    fullWidth
                  >
                    Tambah ke Keranjang
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* No Results */}
        {currentProducts.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Tidak ada produk yang ditemukan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Coba ubah kata kunci pencarian atau filter yang digunakan
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductsPage;
