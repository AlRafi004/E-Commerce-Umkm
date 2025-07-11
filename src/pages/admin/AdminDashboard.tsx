import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Alert,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  Store,
  People,
  ShoppingCart,
  Visibility,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

const AdminDashboard: React.FC = () => {
  // Demo data
  const stats = {
    totalVendors: 25,
    activeVendors: 18,
    totalProducts: 156,
    pendingProducts: 8,
    totalOrders: 89,
    totalRevenue: 12500000,
  };

  const recentVendors = [
    {
      id: 1,
      name: "Toko Buah Segar",
      email: "buah@example.com",
      status: "pending",
      joinDate: "2025-07-10",
    },
    {
      id: 2,
      name: "Kopi Nusantara",
      email: "kopi@example.com",
      status: "approved",
      joinDate: "2025-07-09",
    },
    {
      id: 3,
      name: "Kerajinan Borneo",
      email: "kerajinan@example.com",
      status: "approved",
      joinDate: "2025-07-08",
    },
  ];

  const pendingProducts = [
    {
      id: 1,
      name: "Durian Medan Super",
      vendor: "Toko Buah Segar",
      price: 120000,
      status: "review",
    },
    {
      id: 2,
      name: "Tas Rotan Handmade",
      vendor: "Kerajinan Borneo",
      price: 250000,
      status: "review",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleApproveVendor = (id: number) => {
    console.log("Approve vendor:", id);
    alert(`Vendor ${id} berhasil disetujui!`);
  };

  const handleRejectVendor = (id: number) => {
    console.log("Reject vendor:", id);
    alert(`Vendor ${id} ditolak!`);
  };

  const handleApproveProduct = (id: number) => {
    console.log("Approve product:", id);
    alert(`Produk ${id} berhasil disetujui!`);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Admin Dashboard
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Demo Mode: Dashboard ini menggunakan data simulasi untuk testing
      </Alert>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Store color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography color="text.secondary" variant="h6">
                  Total Vendor
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stats.totalVendors}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {stats.activeVendors} aktif
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <ShoppingCart color="success" sx={{ fontSize: 40 }} />
              <Box>
                <Typography color="text.secondary" variant="h6">
                  Total Produk
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stats.totalProducts}
                </Typography>
                <Typography variant="body2" color="warning.main">
                  {stats.pendingProducts} pending
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <People color="info" sx={{ fontSize: 40 }} />
              <Box>
                <Typography color="text.secondary" variant="h6">
                  Total Pesanan
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {stats.totalOrders}
                </Typography>
                <Typography variant="body2" color="info.main">
                  Bulan ini
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TrendingUp color="warning" sx={{ fontSize: 40 }} />
              <Box>
                <Typography color="text.secondary" variant="h6">
                  Total Revenue
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {formatPrice(stats.totalRevenue).slice(0, -3)}K
                </Typography>
                <Typography variant="body2" color="success.main">
                  +15% dari bulan lalu
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Vendor Management */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Manajemen Vendor
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nama Toko</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {vendor.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {vendor.email}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={vendor.status}
                          color={
                            vendor.status === "approved" ? "success" : "warning"
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {vendor.status === "pending" && (
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                              size="small"
                              color="success"
                              onClick={() => handleApproveVendor(vendor.id)}
                            >
                              <CheckCircle fontSize="small" />
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              onClick={() => handleRejectVendor(vendor.id)}
                            >
                              <Cancel fontSize="small" />
                            </Button>
                          </Box>
                        )}
                        {vendor.status === "approved" && (
                          <Button size="small" color="primary">
                            <Visibility fontSize="small" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Product Moderation */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Moderasi Produk
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Produk</TableCell>
                    <TableCell>Harga</TableCell>
                    <TableCell>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {product.vendor}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatPrice(product.price)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            size="small"
                            color="success"
                            onClick={() => handleApproveProduct(product.id)}
                          >
                            <CheckCircle fontSize="small" />
                          </Button>
                          <Button size="small" color="error">
                            <Cancel fontSize="small" />
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Analytics */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Analytics Overview
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            <Paper sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Vendor Approval Rate
              </Typography>
              <LinearProgress
                variant="determinate"
                value={72}
                sx={{ my: 1 }}
                color="success"
              />
              <Typography variant="h6">72%</Typography>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Product Approval Rate
              </Typography>
              <LinearProgress
                variant="determinate"
                value={85}
                sx={{ my: 1 }}
                color="info"
              />
              <Typography variant="h6">85%</Typography>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Platform Growth
              </Typography>
              <LinearProgress
                variant="determinate"
                value={92}
                sx={{ my: 1 }}
                color="warning"
              />
              <Typography variant="h6">+92%</Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminDashboard;
