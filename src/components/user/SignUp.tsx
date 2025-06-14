import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Box, 
  Button, 
  Modal, 
  TextField, 
  Typography, 
  IconButton, 
  InputAdornment,
  CircularProgress,
  Divider,
  Fade
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { FormEvent, useRef, useState } from "react";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const animateGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const SignUpContainer = styled(Box)(({ }) => ({
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#111",
  color: "#fff",
  width: "420px",
  maxWidth: "95vw",
  margin: "auto",
  marginTop: "5vh",
  boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.5)",
  padding: 0,
  border: "1px solid rgba(255, 255, 255, 0.08)",
}));

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.1)",
      transition: "border-color 0.3s ease",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.6)",
    "&.Mui-focused": {
      color: "rgba(255, 255, 255, 0.8)",
    },
  },
  "& .MuiInputAdornment-root": {
    color: "rgba(255, 255, 255, 0.4)",
  },
});

const GradientText = styled(Typography)({
  background: "linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)",
  backgroundSize: "200% 200%",
  animation: `${animateGradient} 3s ease infinite`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
  display: "inline-block",
});

const SignUpButton = styled(Button)({
  textTransform: "none",
  borderRadius: "8px",
  padding: "10px",
  backgroundColor: "transparent",
  color: "#fff",
  fontWeight: "500",
  fontSize: "16px",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  "&:hover": {
    backgroundColor: "transparent",
    transform: "scale(1.03)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgb(226 153 157)",
  },
  "&:active": {
    backgroundColor: "0.5px solid rgba(255, 255, 255, 0.05)",
    transform: "translateY(1px) scale(1.02)",
  },
  transition: "all 0.3s ease",
});

const SocialButton = styled(Button)({
  textTransform: "none",
  borderRadius: "8px",
  padding: "6px",
  minWidth: "40px",
  height: "40px",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  color: "#fff",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  "& .MuiButton-startIcon": {
    margin: 0,
  },
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  }
});

const CloseIconButton = styled(IconButton)({
  position: "absolute",
  top: "12px",
  right: "12px",
  color: "rgba(255, 255, 255, 0.6)",
  zIndex: 2,
  "&:hover": {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const SignUp = ({ 
  setSignUp, 
  open, 
  setOpen 
}: { 
  setSignUp: (log: boolean) => void, 
  open: boolean, 
  setOpen: (open: boolean) => void 
}) => {
  const navigate = useNavigate();
  const userIdRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!userIdRef.current?.value || !nameRef.current?.value || 
        !emailRef.current?.value || !passwordRef.current?.value) {
      setError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await axios.post(
        `${apiUrl}/api/User/registerUser`,
        {
          UserId: userIdRef.current?.value,
          Name: nameRef.current?.value,
          Email: emailRef.current?.value,
          PasswordHash: passwordRef.current?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      if (res.data && res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        console.log("Registration successful:", res.data.token);
        
        setLoading(false);
        setSignUp(true);
        
        setTimeout(() => {
          setOpen(false);
          navigate("/");
        }, 500);
      } else {
        setLoading(false);
        setError("Registration failed. Please try again.");
        console.log("Token not found in response");
      }
    } catch (e: any) {
      setLoading(false);
      console.error("Registration error:", e);
      
      if (e.response && (e.response.status === 401 || e.response.status === 400)) {
        setError("Registration failed. Please check your information and try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <Modal 
        open={open} 
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(3px)",
          },
        }}
      >
        <Fade in={open}>
          <SignUpContainer>
            <CloseIconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </CloseIconButton>
            
            <Box sx={{ position: "relative", zIndex: 1, p: 4 }}>
              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 56, 
                    height: 56, 
                    borderRadius: "50%", 
                    background: "linear-gradient(140deg, #333 0%, #111 100%)",
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    margin: "0 auto 16px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <PersonOutlineIcon sx={{ fontSize: 26, color: "#fff" }} />
                </Box>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 0.5 }}>
                  Create an account
                </Typography>
                <GradientText variant="body2" sx={{ mb: 2 }}>
                  Please enter your details to sign up
                </GradientText>
              </Box>

              <form onSubmit={handleSignUp}>
                <StyledTextField
                  label="User ID"
                  type="number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputRef={userIdRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="off"
                />
                
                <StyledTextField
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputRef={nameRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="name"
                />
                
                <StyledTextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputRef={emailRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="email"
                />
                
                <StyledTextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputRef={passwordRef}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          sx={{ color: "rgba(255, 255, 255, 0.4)" }}
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="new-password"
                />
                
                {error && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "#e0e0e0", 
                      mb: 2, 
                      textAlign: "center",
                      padding: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderRadius: "8px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {error}
                  </Typography>
                )}
                
                <SignUpButton 
                  type="submit"
                  fullWidth
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? "Creating account..." : "Create account"}
                </SignUpButton>
              </form>
              
              <Box sx={{ display: "flex", alignItems: "center", mt: 3, mb: 3 }}>
                <Divider sx={{ flex: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "rgba(255, 255, 255, 0.4)", 
                    px: 2,
                    fontSize: "12px",
                  }}
                >
                  OR SIGN UP WITH
                </Typography>
                <Divider sx={{ flex: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                <SocialButton>
                  <GoogleIcon />
                </SocialButton>
                <SocialButton>
                  <FacebookIcon />
                </SocialButton>
                <SocialButton>
                  <AppleIcon />
                </SocialButton>
              </Box>
              

            </Box>
          </SignUpContainer>
        </Fade>
      </Modal>
    </>
  );
};

export default SignUp;