import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Link,
  Divider,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Store,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect jika sudah login
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      // Redirect akan dilakukan oleh useEffect
    } catch (err: any) {
      setError(err.message || "Login gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Demo credentials
  const handleDemoLogin = (role: 'customer' | 'vendor' | 'admin') => {
    const demoCredentials = {
      customer: { email: "customer@demo.com", password: "password123" },
      vendor: { email: "vendor@demo.com", password: "password123" },
      admin: { email: "admin@demo.com", password: "password123" },
    };

    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Store sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            Masuk ke Platform UMKM
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Kalimantan Tengah
          </Typography>
        </Box>

        <Card sx={{ width: "100%", maxWidth: 400 }}>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                margin="normal"
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
              >
                {isLoading ? "Sedang Masuk..." : "Masuk"}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                atau
              </Typography>
            </Divider>

            {/* Demo Login Buttons */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                Demo Login:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleDemoLogin("customer")}
                  sx={{ flex: 1 }}
                >
                  Customer
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleDemoLogin("vendor")}
                  sx={{ flex: 1 }}
                >
                  Vendor
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleDemoLogin("admin")}
                  sx={{ flex: 1 }}
                >
                  Admin
                </Button>
              </Box>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Belum punya akun?{" "}
                <Link component={RouterLink} to="/register" color="primary">
                  Daftar di sini
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Dengan masuk, Anda menyetujui{" "}
            <Link href="#" color="primary">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="#" color="primary">
              Kebijakan Privasi
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
