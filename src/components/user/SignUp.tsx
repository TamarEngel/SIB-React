import { Box, Button, Modal, TextField } from "@mui/material"
import axios from "axios";
import { FormEvent, useRef, useState } from "react";

const SignUp = ({ setSignUp }: { setSignUp: (signUp: boolean) => void }) => {
    const [open, setOpen] = useState(false);
    const userIdRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const PasswordHashRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(`https://localhost:7143/api/User/registerUser`, {
                UserId:userIdRef.current?.value,
                Name:nameRef.current?.value,
                Email: emailRef.current?.value,
                PasswordHash: PasswordHashRef.current?.value,
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                }
            });

            if (res.data && res.data.token) {
                sessionStorage.setItem('token', res.data.token);
                console.log('Token stored:', res.data.token); // Log the token being stored
                setSignUp(true)
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
        <div style={{position: 'absolute', top: 0, left: 0, marginLeft: '120px', marginTop: '20px' }}>

            <Button variant="outlined" onClick={() => { setOpen(true) }} sx={{borderColor: 'pink', color: 'black', backgroundColor: 'transparent', transition: '0.3s', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' } }}>
                Sign Up
            </Button>

            <Modal open={open} onClose={() => { setOpen(false) }}>
                <Box sx={{ padding: 4, backgroundColor: 'white', width: 300, margin: 'auto', marginTop: 10 }}>
                    <h2>Sign Up</h2>

                    <TextField label="UserId" type='number' variant="outlined" fullWidth margin="normal" inputRef={userIdRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <TextField label="Name" type='text' variant="outlined" fullWidth margin="normal" inputRef={nameRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <TextField label="email" type='email' variant="outlined" fullWidth margin="normal" inputRef={emailRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" inputRef={PasswordHashRef} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />

                    <Button variant="outlined" onClick={handleLogin} fullWidth sx={{ textTransform: 'none', marginTop: 2.5, borderColor: 'pink', color: 'black', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }, '&:active': { backgroundColor: 'transparent', color: 'pink' } }}>
                        You're In!
                    </Button>
                </Box>
            </Modal>
        </div>
    </>)
}

export default SignUp
