import { useState, useEffect } from "react";
import { AppBar, Box, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{"& .MuiPaper-root": { marginTop: "7px", marginRight: "10px", backgroundColor: "#000", color: "#FFF", border: "1px solid #FFF", borderRadius: "16px", padding: "10px", width: "320px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" },"& .MuiTypography-root": { fontSize: "18px", fontWeight: "bold", textAlign: "center", marginBottom: "8px", fontFamily: "Plus Jakarta Sans, Arial, Helvetica, sans-serif" }, "& .MuiTypography-subtitle1": { fontSize: "13px", textAlign: "center", color: "#BBB", marginTop: "4px", fontFamily: "Plus Jakarta Sans, Arial, Helvetica, sans-serif" }}}>
        <div>
          <Typography variant="h6">Profile</Typography>
          <Typography variant="subtitle1">Your profile helps improve your interactions with select <span style={{color:"pink",margin:"5px",fontSize: "13px"}}>SIB</span> experiences.</Typography>
          {token ? (
            <>
              <MenuItem key="updateProfile" onClick={() => { setOpenUpdate(true); handleClose() }} sx={linkStyles2}>
                Update Profile <EditIcon sx={{ marginLeft: "8px", fontSize: "19px" }} />
              </MenuItem>
              <MenuItem key="logout" sx={linkStyles2} onClick={() => { sessionStorage.removeItem('token'); window.location.reload(); }}>
                Logout <ExitToAppIcon sx={{ marginLeft: "8px", fontSize: "20px" }} />
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem key="login" onClick={() => { setOpenLogin(true); handleClose() }} sx={linkStyles2}>
                Login <LoginIcon sx={{ marginLeft: "8px", fontSize: "19px" }} />
              </MenuItem>
              <MenuItem key="signUp" onClick={() => { setopenSignUp(true); handleClose() }} sx={linkStyles2}>
                Sign Up <PersonAddIcon sx={{ marginLeft: "8px", fontSize: "20px" }} />
              </MenuItem>
            </>
          )}
        </div>
      </Menu>
      {!(token || log) && <Login setLog={setLog} open={openLogin} setOpen={setOpenLogin} />}
      {!(token || log) && !signUp && <SignUp setSignUp={setSignUp} open={openSignUp} setOpen={setopenSignUp} />}
      {(log || signUp || token) && <UpdateUser open={openUpdate} setOpen={setOpenUpdate} />}
    </>
  );
};



const linkStyles = { padding: "12px 20px", background: "white text", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "flex", justifyContent: "center", height: "40px", transition: "transform 0.5s ease", fontSize: "14px", letterSpacing: "1px", '&:hover': { transform: "scale(1.08)", background: "linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%) text" } };
const linkStyles2 = { padding: "12px 20px", background: "white text", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "flex", justifyContent: "center", height: "40px", transition: "transform 0.5s ease", fontSize: "14px", letterSpacing: "1px", '&:hover': { transform: "scale(1.08)", background: "linear-gradient(81.02deg, #f1535d 35.47%, #ffffff 45.52%, #edc106 60.8%) text" } };
const profileStyles = { display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: "10px", right: "20px", width: "40px", height: "40px", fontSize: "16px", fontWeight: "bold", color: "black", cursor: "pointer", borderRadius: "50%", backgroundColor: "#FFF", border: "2px solid transparent", backgroundImage: "linear-gradient(white, white), linear-gradient(81.02deg, #f1535d, #ffffff, #edc106)", backgroundOrigin: "border-box", backgroundClip: "content-box, border-box", transition: "all 0.3s ease", boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)", '&:hover': { boxShadow: "0 0 25px rgba(255, 255, 255, 1)", backgroundColor: "#f8f9fa" } };

// const linkStyles = {
//   padding: "12px 20px",
//   background: "white text",
//   backgroundClip: "text",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   display: "flex",
//   justifyContent: "center",
//   height: "40px",
//   transition: "transform 0.5s ease",
//   fontSize: "14px",
//   fontFamily: "Plus Jakarta Sans, Arial, Helvetica, sans-serif",
//   letterSpacing: "1px",
//   '&:hover': {
//     transform: "scale(1.08)",
//     background: "linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%) text",
//   },
// };
// const linkStyles2 = {
//   fontFamily: "Plus Jakarta Sans, Arial, Helvetica, sans-serif",
//   padding: "12px 20px",
//   background: "white text",
//   backgroundClip: "text",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   display: "flex",
//   justifyContent: "center",
//   height: "40px",
//   transition: "transform 0.5s ease",
//   fontSize: "14px",
//   letterSpacing: "1px",
//   '&:hover': {
//     transform: "scale(1.08)",
//     background: "linear-gradient(81.02deg, #f1535d 35.47%, #ffffff 45.52%, #edc106 60.8%) text",
//   },
// };
// const profileStyles = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   position: "absolute",
//   top: "10px",
//   right: "20px",
//   width: "40px",
//   height: "40px",
//   fontSize: "16px",
//   fontWeight: "bold",
//   color: "black",
//   cursor: "pointer",
//   borderRadius: "50%",
//   backgroundColor: "#FFF",
//   border: "2px solid transparent",
//   backgroundImage: "linear-gradient(white, white), linear-gradient(81.02deg, #f1535d, #ffffff, #edc106)",
//   backgroundOrigin: "border-box",
//   backgroundClip: "content-box, border-box",
//   transition: "all 0.3s ease",
//   boxShadow: "0 0 10px rgba(255, 255, 255, 0.6)",
//   '&:hover': {
//     boxShadow: "0 0 25px rgba(255, 255, 255, 1)",
//     backgroundColor: "#f8f9fa",
//   }
// };

export default NavBar;

