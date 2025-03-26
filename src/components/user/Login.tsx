import { Box, Button, Modal, TextField } from "@mui/material"
import axios from "axios";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl=import.meta.env.VITE_APP_API_URL ;    // קישור לשרת

const Login = ({ setLog, open, setOpen }: { setLog: (log: boolean) => void, open: boolean, setOpen: (open: boolean) => void }) => {
    //const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${apiUrl}/api/User/login`, {
                Email: emailRef.current?.value,
                Password: passwordRef.current?.value,  
            }, 
            {
                headers: {
                    'Content-Type': 'application/json', // Specify that the request body is JSON
                    'Accept': 'application/json' // Indicate that you expect a JSON response
                }
            });

            if (res.data && res.data.token) {
                sessionStorage.setItem('token', res.data.token);
                console.log('Token stored:', res.data.token); // Log the token being stored
                setLog(true)
                navigate("/");
            }
            else {
                console.log('Token not found in response');
            }

            setOpen(false);
        }
        catch (e: any) {
            console.log(e)
            if ((e.response && e.status === 401) || e.status === 400) {
                alert('email or password are not correct')
            }
        }
    }
    return (<>
        <div style={{position: 'absolute', top: 0, left: 0,marginRight:'20px', marginTop: '20px' }}>
            <Modal open={open} onClose={() => { setOpen(false) }}>
                <Box sx={{ padding: 4, backgroundColor: 'white', width: 300, margin: 'auto', marginTop: 10 }}>
                    <h2>Login</h2>
                    <TextField label="email" type='email' variant="outlined" fullWidth margin="normal" inputRef={emailRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" inputRef={passwordRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <Button variant="outlined" onClick={handleLogin} fullWidth sx={{ textTransform: 'none', marginTop: 2.5, borderColor: 'pink', color: 'black', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }, '&:active': { backgroundColor: 'transparent', color: 'pink' } }}>
                        You're In!
                    </Button>
                </Box>
            </Modal>
        </div>
    </>)
}
export default Login
