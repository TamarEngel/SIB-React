// import { useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Modal,
//   CircularProgress,
//   Typography,
//   TextField,
//   List,
//   ListItem,
//   IconButton
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const apiUrl = import.meta.env.VITE_APP_API_URL;

// export default function ChatPromptBot({
//   challengeTopic,
//   challengeDescription
// }: {
//   challengeTopic: string;
//   challengeDescription: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleOpen = async () => {
//     setOpen(true);
//     setChat([]); // אתחול שיחה
//     await sendMessage("system", `אתה עוזר יצירתי באתר SIB, שבו יוצרים מעלים תמונות AI לפי אתגרים. דבר רק על האתר, האתגרים, השראה, יצירתיות ודירוגים.`);
//     await sendMessage("user", `האתגר הנוכחי הוא: "${challengeTopic}". תיאור האתגר: "${challengeDescription}". תן לי רעיונות לפרומפטים.`);
//   };

//   const sendMessage = async (role: string, content: string) => {
//     setChat((prev) => [...prev, { role, content }]);
//     if (role === "user" || role === "system") {
//       setLoading(true);
//       try {
//         const response = await axios.post(`${apiUrl}/api/PromptSuggestions`, {
//           messages: [...chat, { role, content }]
//         });
//         const botReply = response.data.reply;
//         setChat((prev) => [...prev, { role: "assistant", content: botReply }]);
//       } catch (err) {
//         console.error("Error during chat:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     await sendMessage("user", input.trim());
//     setInput("");
//   };

//   return (
//     <>
//       <Button onClick={handleOpen} variant="outlined" sx={{
//         textTransform: 'none',
//         borderColor: 'pink',
//         color: 'black',
//         backgroundColor: 'transparent',
//         '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }
//       }}>
//         צריך השראה?
//       </Button>

//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={{
//           p: 2,
//           backgroundColor: 'white',
//           width: 500,
//           maxHeight: '80vh',
//           overflowY: 'auto',
//           margin: 'auto',
//           mt: 10,
//           borderRadius: 2,
//           display: 'flex',
//           flexDirection: 'column'
//         }}>
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Typography variant="h6">צ'אט עם הבוט</Typography>
//             <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
//           </Box>

//           <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
//             {chat.map((m, i) => (
//               <ListItem
//                 key={i}
//                 sx={{
//                   alignSelf: m.role === "user" ? "flex-end" : "flex-start",
//                   backgroundColor: m.role === "user" ? "#ffe6f0" : "#f0f0f0",
//                   borderRadius: 2,
//                   mb: 1,
//                   maxWidth: "90%"
//                 }}
//               >
//                 {m.content}
//               </ListItem>
//             ))}
//             {loading && <ListItem><CircularProgress size={20} /></ListItem>}
//           </List>

//           <Box display="flex" gap={1} mt={2}>
//             <TextField
//               fullWidth
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder="כתוב משהו לבוט..."
//               size="small"
//             />
//             <Button variant="contained" onClick={handleSend} disabled={loading}>
//               שלח
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// }


import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Modal,
  CircularProgress,
  Typography,
  TextField,
  List,
  ListItem,
  IconButton,
  Avatar,
  Fade,
  Paper,
  Tooltip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PersonIcon from "@mui/icons-material/Person";
import { keyframes } from "@emotion/react";

const apiUrl = import.meta.env.VITE_APP_API_URL;

// Keyframes animations
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 46, 255, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(255, 46, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 46, 255, 0); }
`;

const glowing = keyframes`
  0% { text-shadow: 0 0 5px #fff, 0 0 10px #ff2eff, 0 0 15px #ff2eff; }
  50% { text-shadow: 0 0 20px #fff, 0 0 30px #ff2eff, 0 0 40px #ff2eff; }
  100% { text-shadow: 0 0 5px #fff, 0 0 10px #ff2eff, 0 0 15px #ff2eff; }
`;

export default function ChatPromptBot({
  challengeTopic,
  challengeDescription
}: {
  challengeTopic: string;
  challengeDescription: string;
}) {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleOpen = async () => {
    setOpen(true);
    setChat([]); // Reset chat
    await sendMessage("system", `אתה עוזר יצירתי באתר SIB, שבו יוצרים מעלים תמונות AI לפי אתגרים. דבר רק על האתר, האתגרים, השראה, יצירתיות ודירוגים.`);
    await sendMessage("user", `האתגר הנוכחי הוא: "${challengeTopic}". תיאור האתגר: "${challengeDescription}". תן לי רעיונות לפרומפטים.`);
  };

  const sendMessage = async (role: string, content: string) => {
    setChat((prev) => [...prev, { role, content }]);
    if (role === "user" || role === "system") {
      setLoading(true);
      setShowTypingIndicator(true);
      try {
        const response = await axios.post(`${apiUrl}/api/PromptSuggestions`, {
          messages: [...chat, { role, content }]
        });
        
        // Small delay to make it feel more natural
        setTimeout(() => {
          setShowTypingIndicator(false);
          const botReply = response.data.reply;
          setChat((prev) => [...prev, { role: "assistant", content: botReply }]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error during chat:", err);
        setShowTypingIndicator(false);
        setLoading(false);
        setChat((prev) => [...prev, { role: "assistant", content: "אירעה שגיאה בתקשורת. אנא נסה שוב מאוחר יותר." }]);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    await sendMessage("user", input.trim());
    setInput("");
  };

  // Typing indicator component
  const TypingIndicator = () => (
    <Box sx={{ display: 'flex', gap: 0.5, p: 1, alignItems: 'center' }}>
      <div className="dot" style={{ 
        width: 8, 
        height: 8, 
        borderRadius: '50%', 
        backgroundColor: '#ff2eff',
        animation: `${pulse} 1.5s infinite`,
        animationDelay: '0s'
      }}></div>
      <div className="dot" style={{ 
        width: 8, 
        height: 8, 
        borderRadius: '50%', 
        backgroundColor: '#ff2eff',
        animation: `${pulse} 1.5s infinite`,
        animationDelay: '0.3s'
      }}></div>
      <div className="dot" style={{ 
        width: 8, 
        height: 8, 
        borderRadius: '50%', 
        backgroundColor: '#ff2eff',
        animation: `${pulse} 1.5s infinite`,
        animationDelay: '0.6s'
      }}></div>
    </Box>
  );

  return (
    <>
      {/* Trigger Button with Neon Effect */}
      <Button 
        onClick={handleOpen} 
        variant="outlined"
        startIcon={<LightbulbIcon />}
        sx={{
          textTransform: 'none',
          borderColor: '#ff2eff',
          color: '#ffffff',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderRadius: '24px',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          position: 'relative',
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-3px',
            padding: '3px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #ff2eff, #00e5ff)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: 0.7
          },
          '&:hover': { 
            transform: 'translateY(-3px)',
            boxShadow: '0 0 15px #ff2eff, 0 0 30px rgba(255, 46, 255, 0.3)',
            '&::before': {
              opacity: 1
            }
          },
          animation: `${glowing} 2s infinite alternate`
        }}
      >
        צריך השראה למשימה?
      </Button>

      {/* Chat Modal */}
      <Modal 
        open={open} 
        onClose={() => setOpen(false)}
        closeAfterTransition
      >
        <Fade in={open}>
          <Paper sx={{
            width: { xs: '90%', sm: '550px' },
            maxHeight: '80vh',
            margin: 'auto',
            mt: { xs: 5, sm: 8 },
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px #ff2eff',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #000000, #111122)',
            border: '1px solid #333',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '-1px',
              padding: '1px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ff2eff, #00e5ff)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }
          }}>
            {/* Header */}
            <Box sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              background: 'rgba(0,0,0,0.6)',
            }}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Avatar sx={{ 
                  bgcolor: '#000', 
                  border: '2px solid #ff2eff',
                  boxShadow: '0 0 10px #ff2eff'
                }}>
                  <SmartToyIcon sx={{ color: '#ff2eff' }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ 
                    color: '#fff',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px #ff2eff'
                  }}>
                    SIB Prompt Assistant
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ccc', fontStyle: 'italic' }}>
                    מחולל רעיונות לתחרות
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setOpen(false)} sx={{ 
                color: '#fff', 
                '&:hover': { color: '#ff2eff' } 
              }}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            {/* Challenge Info Banner */}
            <Box sx={{ 
              p: 2, 
              background: 'linear-gradient(90deg, rgba(255,46,255,0.1), rgba(0,229,255,0.1))',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              <Typography variant="body2" sx={{ color: '#ccc' }}>
                <span style={{ fontWeight: 'bold', color: '#fff' }}>האתגר הנוכחי:</span> {challengeTopic}
              </Typography>
            </Box>

            {/* Messages Area */}
            <List sx={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.5,
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255,46,255,0.5)',
                borderRadius: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0,0,0,0.3)',
              }
            }}>
              {chat.filter(m => m.role !== 'system').map((message, i) => (
                <ListItem
                  key={i}
                  sx={{
                    display: 'flex',
                    p: 0,
                    width: '100%',
                    justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'flex-start',
                      flexDirection: message.role === "user" ? 'row-reverse' : 'row',
                      maxWidth: '85%',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: message.role === "user" ? '#333' : '#000',
                        border: message.role === "user" 
                          ? '2px solid #00e5ff'
                          : '2px solid #ff2eff',
                        boxShadow: message.role === "user"
                          ? '0 0 5px #00e5ff'
                          : '0 0 5px #ff2eff'
                      }}
                    >
                      {message.role === "user" ? (
                        <PersonIcon sx={{ color: '#00e5ff' }} />
                      ) : (
                        <SmartToyIcon sx={{ color: '#ff2eff' }} />
                      )}
                    </Avatar>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: message.role === "user" 
                          ? 'rgba(0, 229, 255, 0.15)'
                          : 'rgba(255, 46, 255, 0.15)',
                        border: message.role === "user"
                          ? '1px solid rgba(0, 229, 255, 0.3)'
                          : '1px solid rgba(255, 46, 255, 0.3)',
                        color: '#fff',
                        backdropFilter: 'blur(5px)',
                        direction: 'rtl',
                        maxWidth: '100%',
                        wordBreak: 'break-word'
                      }}
                    >
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {message.content}
                      </Typography>
                    </Paper>
                  </Box>
                </ListItem>
              ))}
              
              {showTypingIndicator && (
                <ListItem sx={{ p: 0, justifyContent: "flex-start" }}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: '#000',
                        border: '2px solid #ff2eff',
                        boxShadow: '0 0 5px #ff2eff'
                      }}
                    >
                      <SmartToyIcon sx={{ color: '#ff2eff' }} />
                    </Avatar>
                    <Paper
                      elevation={2}
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'rgba(255, 46, 255, 0.15)',
                        border: '1px solid rgba(255, 46, 255, 0.3)',
                      }}
                    >
                      <TypingIndicator />
                    </Paper>
                  </Box>
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>

            {/* Input Area */}
            <Box sx={{ 
              p: 2, 
              backgroundColor: 'rgba(0,0,0,0.7)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              gap: 1
            }}>
              <TextField
                fullWidth
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="שאל על רעיונות לפרומפט..."
                multiline
                maxRows={3}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    borderRadius: 3,
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#ff2eff',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ff2eff',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.5)',
                    opacity: 1,
                  },
                }}
                InputProps={{
                  sx: { color: '#fff', direction: 'rtl' }
                }}
              />
              <Tooltip title="שלח הודעה">
                <span>
                  <IconButton 
                    onClick={handleSend} 
                    disabled={loading || !input.trim()} 
                    sx={{
                      backgroundColor: loading ? 'rgba(255,46,255,0.2)' : 'rgba(255,46,255,0.7)',
                      color: 'white',
                      height: '100%',
                      width: '56px',
                      '&:hover': { 
                        backgroundColor: loading ? 'rgba(255,46,255,0.2)' : '#ff2eff',
                        boxShadow: '0 0 10px #ff2eff'
                      },
                      '&.Mui-disabled': {
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.3)'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : <SendIcon />}
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </>
  );
}