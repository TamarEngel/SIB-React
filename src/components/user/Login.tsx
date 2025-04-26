// import { Box, Button, Modal, TextField } from "@mui/material"
// import axios from "axios";
// import { FormEvent, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// const apiUrl=import.meta.env.VITE_APP_API_URL ;    // קישור לשרת

// const Login = ({ setLog, open, setOpen }: { setLog: (log: boolean) => void, open: boolean, setOpen: (open: boolean) => void }) => {
//     const navigate = useNavigate();
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);

//     const handleLogin = async (e: FormEvent) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`${apiUrl}/api/User/login`, {
//                 Email: emailRef.current?.value,
//                 Password: passwordRef.current?.value,  
//             }, 
//             {
//                 headers: {
//                     'Content-Type': 'application/json', // Specify that the request body is JSON
//                     'Accept': 'application/json' // Indicate that you expect a JSON response
//                 }
//             });

//             if (res.data && res.data.token) {
//                 sessionStorage.setItem('token', res.data.token);
//                 console.log('Token stored:', res.data.token); // Log the token being stored
//                 setLog(true)
//                 navigate("/");
//             }
//             else {
//                 console.log('Token not found in response');
//             }

//             setOpen(false);
//         }
//         catch (e: any) {
//             console.log(e)
//             if ((e.response && e.status === 401) || e.status === 400) {
//                 alert('email or password are not correct')
//             }
//         }
//     }
//     return (<>
//         <div style={{position: 'absolute', top: 0, left: 0,marginRight:'20px', marginTop: '20px' }}>
//             <Modal open={open} onClose={() => { setOpen(false) }}>
//                 <Box sx={{ padding: 4, backgroundColor: 'white', width: 300, margin: 'auto', marginTop: 10 }}>
//                     <h2>Login</h2>
//                     <TextField label="email" type='email' variant="outlined" fullWidth margin="normal" inputRef={emailRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
//                     <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" inputRef={passwordRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
//                     <Button variant="outlined" onClick={handleLogin} fullWidth sx={{ textTransform: 'none', marginTop: 2.5, borderColor: 'pink', color: 'black', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }, '&:active': { backgroundColor: 'transparent', color: 'pink' } }}>
//                         You're In!
//                     </Button>
//                 </Box>
//             </Modal>
//         </div>
//     </>)
// }
// export default Login
import { useState, useRef, FormEvent } from "react";
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
  Fade,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";

const apiUrl = import.meta.env.VITE_APP_API_URL;

// Custom styled components
const LoginContainer = styled(Box)(({  }) => ({
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
  backgroundColor: "#111",
  color: "#fff",
  width: "360px",
  maxWidth: "95vw",
  margin: "auto",
  marginTop: "10vh",
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

const LoginButton = styled(Button)({
  textTransform: "none",
  borderRadius: "8px",
  padding: "10px",
  background: "linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)",
  backgroundSize: "200% 100%",
  color: "#000",
  fontWeight: "600",
  fontSize: "16px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  "&:hover": {
    backgroundPosition: "right center",
    transition: "all 0.4s ease",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
  },
  "&:active": {
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    transform: "translateY(1px)",
  },
  transition: "all 0.3s ease",
});

// Social buttons with their brand colors
const GoogleButton = styled(Button)({
  textTransform: "none",
  borderRadius: "8px",
  padding: "8px",
  backgroundColor: "#ffffff",
  color: "#000",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  "&:hover": {
    backgroundColor: "#f1f1f1",
  },
  flex: 1,
});

const FacebookButton = styled(Button)({
  textTransform: "none",
  borderRadius: "8px",
  padding: "8px",
  backgroundColor: "#1877F2",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#0a61d6",
  },
  flex: 1,
});

const AppleButton = styled(Button)({
  textTransform: "none",
  borderRadius: "8px",
  padding: "8px",
  backgroundColor: "#000",
  color: "#fff",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  "&:hover": {
    backgroundColor: "#333",
  },
  flex: 1,
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

const Login = ({ 
  setLog, 
  open, 
  setOpen 
}: { 
  setLog: (log: boolean) => void, 
  open: boolean, 
  setOpen: (open: boolean) => void 
}) => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      setError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await axios.post(
        `${apiUrl}/api/User/login`,
        {
          Email: emailRef.current?.value,
          Password: passwordRef.current?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      if (res.data && res.data.token) {
        // Save token in storage
        if (rememberMe) {
          localStorage.setItem("token", res.data.token);
        } else {
          sessionStorage.setItem("token", res.data.token);
        }
        
        console.log("Login successful:", res.data.token);
        
        // Add success animation before redirecting
        setLoading(false);
        setLog(true);
        
        setTimeout(() => {
          setOpen(false);
          navigate("/");
        }, 500);
      } else {
        setLoading(false);
        setError("Authentication failed. Please try again.");
        console.log("Token not found in response");
      }
    } catch (e: any) {
      setLoading(false);
      console.error("Login error:", e);
      
      if (e.response && (e.response.status === 401 || e.response.status === 400)) {
        setError("Invalid email or password. Please try again.");
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
          <LoginContainer>
            <CloseIconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </CloseIconButton>
            
            <Box sx={{ position: "relative", zIndex: 1, p: 3 }}>
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
                  <LockOutlinedIcon sx={{ fontSize: 26, color: "#fff" }} />
                </Box>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 0.5 }}>
                  Welcome back
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.6)" sx={{ mb: 2 }}>
                  Please enter your details to sign in
                </Typography>
              </Box>

              <form onSubmit={handleLogin}>
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
                  autoComplete="current-password"
                />
                
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={rememberMe} 
                        onChange={(e) => setRememberMe(e.target.checked)} 
                        sx={{ 
                          color: "rgba(255, 255, 255, 0.4)",
                          '&.Mui-checked': {
                            color: "#f1535d",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                        Remember me
                      </Typography>
                    }
                  />
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "#f1535d", 
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      }
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Box>
                
                {error && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "#ff4d4f", 
                      mb: 2, 
                      textAlign: "center",
                      padding: "8px",
                      backgroundColor: "rgba(255, 77, 79, 0.1)",
                      borderRadius: "8px",
                    }}
                  >
                    {error}
                  </Typography>
                )}
                
                <LoginButton 
                  type="submit"
                  fullWidth
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </LoginButton>
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
                  OR CONTINUE WITH
                </Typography>
                <Divider sx={{ flex: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
              </Box>
              
              <Box sx={{ display: "flex", gap: 2 }}>
                <GoogleButton startIcon={<GoogleIcon />}>
                  Google
                </GoogleButton>
                <FacebookButton startIcon={<FacebookIcon />}>
                  Facebook
                </FacebookButton>
                <AppleButton startIcon={<AppleIcon />}>
                  Apple
                </AppleButton>
              </Box>
              
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                  Don't have an account?{" "}
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: "#f1535d",
                      fontWeight: "600",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      }
                    }}
                    onClick={() => {
                      setOpen(false);
                      // Replace with your signup handler
                      // openSignup();
                    }}
                  >
                    Sign up
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </LoginContainer>
        </Fade>
      </Modal>
    </>
  );
};

export default Login;