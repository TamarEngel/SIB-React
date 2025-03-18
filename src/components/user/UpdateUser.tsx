import { Box, Button, Modal, TextField } from "@mui/material"; import axios from "axios";
import { FormEvent, useRef, useState } from "react"; 
import { getUserDataFromToken } from "../../utils/authUtils";

const UpdateUser = () => {
    const [open, setOpen] = useState(false);
    const { userId, name, email } = getUserDataFromToken();
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        try {
            const res = await axios.put(`https://localhost:7143/api/User/${userId}`,
                { 
                    name: nameRef.current?.value,
                    email: emailRef.current?.value 
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' 
                    }
                }
            );
            if (res.status === 200) 
            {   
                alert("User updated successfully!");
                setOpen(false); 
            }
            
        }
        catch (e)
        { 
            if (axios.isAxiosError(e)) {
                if (e.status === 404) {
                    alert('משתמש לא נמצא');
                } else if (e.status === 403) {
                    alert('גישה לא מורשית');
                } else {
                    alert('שגיאה לא ידועה');
                }
            }
        }
    };

    return (<>
        <div style={{ position: "absolute", top: 0, left: 0, marginLeft: "120px", marginTop: "20px" }}>
            <Button variant="outlined" onClick={() => { setOpen(true) }} sx={{marginLeft:'20px',borderColor: 'pink', color: 'black', backgroundColor: 'transparent', transition: '0.3s', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' } }}>
                Update Profile
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{ padding: 4, backgroundColor: "white", width: 300, margin: "auto", marginTop: 10 }}>
                    <h2>Update Profile</h2>
                    <TextField label="Name" type="text" variant="outlined" fullWidth margin="normal" inputRef={nameRef} defaultValue={name || ""} sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#B0B0B0" }, "&:hover fieldset": { borderColor: "blue" }, "&.Mui-focused fieldset": { borderColor: "blue" }}, "& .MuiInputLabel-root": { color: "#B0B0B0" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" }}} />
                    <TextField label="Email" type="email" variant="outlined" fullWidth margin="normal" inputRef={emailRef} defaultValue={email || ""} sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#B0B0B0" }, "&:hover fieldset": { borderColor: "blue" }, "&.Mui-focused fieldset": { borderColor: "blue" }}, "& .MuiInputLabel-root": { color: "#B0B0B0" }, "& .MuiInputLabel-root.Mui-focused": { color: "black" }}} />
                    <Button variant="outlined" onClick={handleUpdate} fullWidth sx={{ textTransform: "none", marginTop: 2.5, borderColor: "blue", color: "black", backgroundColor: "transparent", "&:hover": { backgroundColor: "transparent", borderColor: "black", color: "blue" }, "&:active": { backgroundColor: "transparent", color: "blue" }}}>Save Changes</Button>
                </Box>
            </Modal>
        </div>
    </>);
};

export default UpdateUser;
