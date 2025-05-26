import { useState, useEffect } from "react";
import { AppBar, Box, Button, Divider, Fade, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import UpdateUser from "../user/UpdateUser";
import { getUserDataFromToken } from "../../utils/authUtils";
import { AccountCircle } from "@mui/icons-material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [log, setLog] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setopenSignUp] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const token = sessionStorage.getItem('token');
  const { name } = getUserDataFromToken();
  const profilName = name ? name[0] : "?";
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => setShowBackground(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar position="fixed" sx={{ boxShadow: "none", transition: "background-color 0.3s", backgroundColor: showBackground ? "#000" : "transparent", padding: "10px 20px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexGrow: 1 }}>
            <Button component={Link} to="/" sx={linkStyles}>Home</Button>
            <Button component={Link} to="/allChallenges" sx={linkStyles}>Challenges</Button>
            <Button component={Link} to="/challengeHistory" sx={linkStyles}>Challenge History</Button>
          </Box>

          <Box sx={profileStyles} onClick={handleClick}>
            {token ? <span>{profilName}</span> : <AccountCircle sx={{ fontSize: "30px", color: "#555" }} />}
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            marginTop: "7px",
            marginRight: "10px",
            background: "linear-gradient(135deg, #111111 0%, #1a1a1a 100%)",
            color: "#FFF",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "18px",
            padding: "16px",
            width: "340px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.45), 0 1px 3px rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(8px)",
          },
          "& .MuiTypography-root": {
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "10px",
            fontFamily: "Plus Jakarta Sans, Arial, Helvetica, sans-serif",
            letterSpacing: "0.5px",
          },
          "& .MuiTypography-subtitle1": {
            fontSize: "14px",
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: "4px",
            marginBottom: "16px",
            fontFamily: "Plus Jakarta Sans, Arial, Helvetica, sans-serif",
            letterSpacing: "0.2px",
          },
          "& .MuiMenuItem-root": {
            borderRadius: "12px",
            margin: "8px 0",
            padding: "12px 16px",
            transition: "all 0.2s ease",
            "&:hover": {
              background: "linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            },
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={250}
      >
        <div>
          <Typography variant="h6">
            <span style={{ background: "linear-gradient(90deg, #FFFFFF 0%, #E0E0E0 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Profile
            </span>
          </Typography>
          <Typography variant="subtitle1">
            Your profile helps improve your interactions with select{" "}
            <span style={{
              background: "linear-gradient(90deg, #FF6B6B 0%, #FF8E8E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "600",
              fontSize: "14px",
              padding: "0 4px"
            }}>
              SIB
            </span>{" "}
            experiences.
          </Typography>

          <Divider sx={{
            my: 2,
            background: "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 100%)",
            height: "1px",
            border: "none"
          }} />

          {token ? (
            <>
              <MenuItem
                key="updateProfile"
                onClick={() => {
                  setOpenUpdate(true);
                  handleClose();
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "500",
                  fontSize: "15px",
                }}
              >
                <span>Update Profile</span>
                <EditIcon sx={{
                  fontSize: "19px",
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "6px",
                  borderRadius: "50%",
                  color: "#FFFFFF"
                }} />
              </MenuItem>
              <MenuItem
                key="logout"
                onClick={() => {
                  sessionStorage.removeItem("token");
                  window.location.reload();
                  navigate("/");
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "500",
                  fontSize: "15px",
                }}
              >
                <span>Logout</span>
                <ExitToAppIcon sx={{
                  fontSize: "20px",
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "6px",
                  borderRadius: "50%",
                  color: "#FFFFFF"
                }} />
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                key="login"
                onClick={() => {
                  setOpenLogin(true);
                  handleClose();
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "500",
                  fontSize: "15px",
                  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.08) 100%)",
                }}
              >
                <span>Login</span>
                <LoginIcon sx={{
                  fontSize: "19px",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%)",
                  padding: "6px",
                  borderRadius: "50%",
                  color: "#FFFFFF"
                }} />
              </MenuItem>
              <MenuItem
                key="signUp"
                onClick={() => {
                  setopenSignUp(true);
                  handleClose();
                }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "500",
                  fontSize: "15px",
                  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)",
                }}
              >
                <span>Sign Up</span>
                <PersonAddIcon sx={{
                  fontSize: "20px",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%)",
                  padding: "6px",
                  borderRadius: "50%",
                  color: "#FFFFFF"
                }} />
              </MenuItem>
            </>
          )}

          <div style={{
            marginTop: "16px",
            padding: "12px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            textAlign: "center",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.5)"
          }}>
            Premium experience
          </div>
        </div>
      </Menu>
      {!(token || log) && <Login setLog={setLog} open={openLogin} setOpen={setOpenLogin} />}
      {!(token || log) && !signUp && <SignUp setSignUp={setSignUp} open={openSignUp} setOpen={setopenSignUp} />}
      {(log || signUp || token) && <UpdateUser open={openUpdate} setOpen={setOpenUpdate} />}
    </>
  );
};



const linkStyles = { padding: "12px 20px", background: "white text", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "flex", justifyContent: "center", height: "40px", transition: "transform 0.5s ease", fontSize: "14px", letterSpacing: "1px", '&:hover': { transform: "scale(1.08)", background: "linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%) text" } };
const profileStyles = { display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: "10px", right: "20px", width: "40px", height: "40px", fontSize: "16px", fontWeight: "bold", color: "black", cursor: "pointer", borderRadius: "50%", backgroundColor: "#FFF", border: "2px solid transparent", backgroundImage: "linear-gradient(white, white), linear-gradient(81.02deg, #f1535d, #ffffff, #edc106)", backgroundOrigin: "border-box", backgroundClip: "content-box, border-box", transition: "all 0.3s ease", boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)", '&:hover': { boxShadow: "0 0 25px rgba(255, 255, 255, 1)", backgroundColor: "#f8f9fa" } };

export default NavBar;

