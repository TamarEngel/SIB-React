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


import { useState, useRef, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { LockIcon, Mail, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

const apiUrl = import.meta.env.VITE_APP_API_URL;

const Login = ({ setLog, open, setOpen }: { 
  setLog: (log: boolean) => void, 
  open: boolean, 
  setOpen: (open: boolean) => void 
}) => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Close modal with escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setOpen]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    } else if (!regex.test(email)) {
      setEmailError("Please enter a valid email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await axios.post(
        `${apiUrl}/api/User/login`,
        {
          Email: email,
          Password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      if (res.data && res.data.token) {
        if (rememberMe) {
          localStorage.setItem('token', res.data.token);
        } else {
          sessionStorage.setItem('token', res.data.token);
        }
        setSuccess(true);
        
        // Delay navigation to show success state
        setTimeout(() => {
          setLog(true);
          setOpen(false);
          navigate("/");
        }, 1000);
      } else {
        setError('Authentication failed. Please try again.');
      }
    } catch (e: any) {
      console.error(e);
      if (e.response && (e.response.status === 401 || e.response.status === 400)) {
        setError('Invalid email or password');
      } else {
        setError('Connection error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Modal backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  // Modal content animation
  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: -50,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <motion.div 
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={() => setOpen(false)}
      />
      
      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        onClick={(e:any) => e.stopPropagation()}
      >
        {/* Progress bar when loading */}
        {loading && (
          <div className="absolute top-0 left-0 right-0 h-1">
            <div className="h-full bg-purple-600 animate-pulse" />
          </div>
        )}
        
        {/* Close button */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Header */}
        <div className="w-full h-16 bg-gradient-to-r from-purple-900 to-gray-900 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white tracking-wider">Welcome Back</h2>
        </div>
        
        <div className="p-8">
          {/* Success message */}
          {success ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex justify-center mb-4"
              >
                <CheckCircle size={80} className="text-green-500" />
              </motion.div>
              <h3 className="text-xl font-medium text-white mb-2">Login Successful!</h3>
              <p className="text-gray-400">Redirecting you to the dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-900/40 border border-red-800 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-200 text-sm">{error}</p>
                </motion.div>
              )}
              
              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className={`relative rounded-lg overflow-hidden border ${emailError ? 'border-red-500' : 'border-gray-700'} focus-within:border-purple-500 transition-colors`}>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    id="email"
                    ref={emailRef}
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 bg-gray-800 placeholder-gray-500 text-white outline-none"
                    placeholder="Enter your email"
                    onChange={(e) => validateEmail(e.target.value)}
                  />
                </div>
                {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
              </div>
              
              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className={`relative rounded-lg overflow-hidden border ${passwordError ? 'border-red-500' : 'border-gray-700'} focus-within:border-purple-500 transition-colors`}>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LockIcon size={18} className="text-gray-500" />
                  </div>
                  <input
                    id="password"
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    className="block w-full pl-10 pr-10 py-3 bg-gray-800 placeholder-gray-500 text-white outline-none"
                    placeholder="Enter your password"
                    onChange={(e) => validatePassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
              </div>
              
              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-900"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium ${
                  loading 
                    ? 'bg-purple-800 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500'
                } transition-colors`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : "Sign in"}
              </button>
              
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>
              
              {/* Social login */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.416,1.363-1.547,2.349-2.89,2.349h-6.19c-1.683,0-3.048-1.365-3.048-3.048V9.263c0-1.683,1.365-3.048,3.048-3.048h6.19c1.343,0,2.474,0.986,2.89,2.349h-3.536c-1.054,0-1.909,0.855-1.909,1.909V12.151z M18.041,8.839h-1.909c-1.683,0-3.048,1.365-3.048,3.048v1.909c0,1.683,1.365,3.048,3.048,3.048h1.909c1.683,0,3.048-1.365,3.048-3.048v-1.909C21.089,10.204,19.724,8.839,18.041,8.839z M17.996,10.472c0.854,0,1.55,0.695,1.55,1.55c0,0.854-0.695,1.55-1.55,1.55c-0.854,0-1.55-0.695-1.55-1.55C16.446,11.167,17.142,10.472,17.996,10.472z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.283,10.356h-8.327v3.451h4.792c-0.446,2.193-2.313,3.453-4.792,3.453c-2.923,0-5.279-2.356-5.279-5.28c0-2.923,2.356-5.279,5.279-5.279c1.259,0,2.397,0.447,3.29,1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233c-4.954,0-8.934,3.979-8.934,8.934c0,4.955,3.979,8.934,8.934,8.934c4.467,0,8.529-3.249,8.529-8.934C20.485,11.453,20.404,10.884,20.283,10.356z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615,3.184c-3.604-0.246-11.631-0.245-15.23,0C0.817,3.426,0.108,6.422,0,12c0.108,5.578,0.817,8.574,4.385,8.816c3.6,0.245,11.626,0.246,15.23,0C23.183,20.574,23.892,17.578,24,12C23.892,6.422,23.183,3.426,19.615,3.184z M9.801,15.3V8.7l6.399,3.3L9.801,15.3z" />
                  </svg>
                </button>
              </div>
              
              {/* Sign up link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                    Sign up now
                  </a>
                </p>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;