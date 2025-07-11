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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  Grid,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Phone,
  Store,
  PersonAdd,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RegisterPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "customer" as "customer" | "vendor",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const steps = ["Pilih Peran", "Data Pribadi", "Konfirmasi"];

  // Redirect jika sudah login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleNext = () => {
    setError("");
    
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      // Validasi step 2
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.username) {
        setError("Semua field wajib diisi");
        return;
      }
      if (!formData.email.includes("@")) {
        setError("Format email tidak valid");
        return;
      }
      setActiveStep(2);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validasi password
    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak sesuai");
      return;
    }

    setIsLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      // Redirect akan dilakukan oleh useEffect
    } catch (err: any) {
      setError(err.message || "Pendaftaran gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom align="center">
              Pilih Peran Anda
            </Typography>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as "customer" | "vendor" })}
              >
                <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
                  <FormControlLabel
                    value="customer"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          🛒 Pembeli
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Berbelanja produk UMKM lokal Kalimantan Tengah
                        </Typography>
                      </Box>
                    }
                    sx={{ width: "100%" }}
                  />
                </Card>
                
                <Card variant="outlined" sx={{ p: 2 }}>
                  <FormControlLabel
                    value="vendor"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          🏪 Penjual/UMKM
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Jual produk Anda di platform marketplace UMKM
                        </Typography>
                      </Box>
                    }
                    sx={{ width: "100%" }}
                  />
                </Card>
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom align="center">
              Data Pribadi
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nama Depan"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nama Belakang"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  value={formData.username}
                  onChange={handleInputChange("username")}
                  required
                  helperText="Username unik untuk login"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        @
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nomor Telepon"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  helperText="Opsional"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom align="center">
              Keamanan Akun
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  required
                  helperText="Minimal 6 karakter"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Konfirmasi Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange("confirmPassword")}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Ringkasan */}
            <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Ringkasan Pendaftaran:
              </Typography>
              <Typography variant="body2">
                <strong>Nama:</strong> {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> {formData.email}
              </Typography>
              <Typography variant="body2">
                <strong>Username:</strong> @{formData.username}
              </Typography>
              <Typography variant="body2">
                <strong>Peran:</strong> {formData.role === "customer" ? "Pembeli" : "Penjual/UMKM"}
              </Typography>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Store sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            Daftar Platform UMKM
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Kalimantan Tengah
          </Typography>
        </Box>

        <Card sx={{ width: "100%", maxWidth: 500 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Stepper */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  onClick={handleBack}
                  disabled={activeStep === 0 || isLoading}
                  variant="outlined"
                >
                  Kembali
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : <PersonAdd />}
                  >
                    {isLoading ? "Mendaftar..." : "Daftar"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    disabled={isLoading}
                  >
                    Selanjutnya
                  </Button>
                )}
              </Box>
            </Box>

            {activeStep === 0 && (
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="body2">
                  Sudah punya akun?{" "}
                  <Link component={RouterLink} to="/login" color="primary">
                    Masuk di sini
                  </Link>
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Dengan mendaftar, Anda menyetujui{" "}
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

export default RegisterPage;
