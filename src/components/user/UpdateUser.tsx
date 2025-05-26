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
  Fade
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { FormEvent, useRef, useState } from "react";
import { getUserDataFromToken } from "../../utils/authUtils";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const animateGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const UpdateContainer = styled(Box)(({ }) => ({
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

const UpdateButton = styled(Button)({
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

const UpdateUser = ({ 
  open, 
  setOpen 
}: { 
  open: boolean, 
  setOpen: (open: boolean) => void 
}) => {
  const { userId, name, email } = getUserDataFromToken();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!userId || !nameRef.current?.value || !emailRef.current?.value) {
      setError("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await axios.put(
        `${apiUrl}/api/User/${userId}`,
        {
          name: nameRef.current?.value,
          email: emailRef.current?.value
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setLoading(false);
        setSuccess(true);
        
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        }, 1000);
      }
    } catch (e: any) {
      setLoading(false);
      console.error("Update error:", e);
      
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          setError("User not found");
        } else if (e.response?.status === 403) {
          setError("Unauthorized access");
        } else {
          setError("An error occurred. Please try again later.");
        }
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
          <UpdateContainer>
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
                  <EditOutlinedIcon sx={{ fontSize: 26, color: "#fff" }} />
                </Box>
                <Typography variant="h6" fontWeight="600" sx={{ mb: 0.5 }}>
                  Update Profile
                </Typography>
                <GradientText variant="body2" sx={{ mb: 2 }}>
                  Edit your account information
                </GradientText>
              </Box>

              <form onSubmit={handleUpdate}>
                <StyledTextField
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputRef={nameRef}
                  defaultValue={name || ""}
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
                  defaultValue={email || ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: "rgba(255, 255, 255, 0.4)" }} />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="email"
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
                
                {success && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "#a3ffb0", 
                      mb: 2, 
                      textAlign: "center",
                      padding: "8px",
                      backgroundColor: "rgba(100, 255, 100, 0.05)",
                      borderRadius: "8px",
                      border: "1px solid rgba(100, 255, 100, 0.2)",
                    }}
                  >
                    Profile updated successfully!
                  </Typography>
                )}
                
                <UpdateButton 
                  type="submit"
                  fullWidth
                  disabled={loading || success}
                  startIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? "Updating..." : success ? "Updated!" : "Save Changes"}
                </UpdateButton>
              </form>
            </Box>
          </UpdateContainer>
        </Fade>
      </Modal>
    </>
  );
};

export default UpdateUser;