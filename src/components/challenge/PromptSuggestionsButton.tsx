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
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

const apiUrl = import.meta.env.VITE_APP_API_URL;

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
        width: 6, 
        height: 6, 
        borderRadius: '50%', 
        backgroundColor: '#f1535d',
        opacity: 0.7,
        animation: 'pulse 1.5s infinite',
        animationDelay: '0s'
      }}></div>
      <div className="dot" style={{ 
        width: 6, 
        height: 6, 
        borderRadius: '50%', 
        backgroundColor: '#f1535d',
        opacity: 0.7,
        animation: 'pulse 1.5s infinite',
        animationDelay: '0.3s'
      }}></div>
      <div className="dot" style={{ 
        width: 6, 
        height: 6, 
        borderRadius: '50%', 
        backgroundColor: '#f1535d',
        opacity: 0.7,
        animation: 'pulse 1.5s infinite',
        animationDelay: '0.6s'
      }}></div>
      <style >{`
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
      `}</style>
    </Box>
  );

  return (
    <>
      {/* Floating Chat Button - positioned at bottom right */}
      <Button 
        onClick={handleOpen} 
        variant="contained"
        startIcon={<ChatIcon />}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '16px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)',
          background: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
          color: '#000',
          textTransform: 'none',
          zIndex: 1000,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
            background: 'linear-gradient(81.02deg, #f1535d 7.47%, #ffffff 45.52%, #edc106 114.8%)',
            opacity: 0.9
          }
        }}
      >
        Need Ideas?
      </Button>

      {/* Chat Modal */}
      <Modal 
        open={open} 
        onClose={() => setOpen(false)}
        closeAfterTransition
      >
        <Fade in={open}>
          <Paper sx={{
            width: { xs: '85%', sm: '400px' },
            height: '500px',
            maxHeight: '80vh',
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            background: '#111',
            border: '1px solid #333'
          }}>
            {/* Header */}
            <Box sx={{
              p: 1.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(0,0,0,0.5)',
            }}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Avatar sx={{ 
                  bgcolor: '#f1535d', 
                  width: 32,
                  height: 32
                }}>
                  <SmartToyIcon sx={{ color: '#fff', fontSize: '18px' }} />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ 
                    color: '#fff',
                    fontWeight: 500,
                    fontFamily: '"Inter", "Roboto", sans-serif',
                    fontSize: '16px'
                  }}>
                    AI Prompt Assistant
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: '#aaa', 
                    fontFamily: '"Inter", "Roboto", sans-serif',
                    fontSize: '12px'
                  }}>
                    Get creative ideas for your challenge
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setOpen(false)} sx={{ 
                color: '#aaa', 
                padding: '4px',
                '&:hover': { color: '#fff' } 
              }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
            
            {/* Challenge Info Banner */}
            <Box sx={{ 
              p: 1.5, 
              background: 'rgba(241, 83, 93, 0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              <Typography variant="caption" sx={{ 
                color: '#ccc',
                fontSize: '12px',
                fontFamily: '"Inter", "Roboto", sans-serif',
              }}>
                <span style={{ fontWeight: 'bold', color: '#eee' }}>Current Challenge:</span> {challengeTopic}
              </Typography>
            </Box>

            {/* Messages Area */}
            <List sx={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              p: 1.5, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.5,
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(241, 83, 93, 0.5)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0,0,0,0.2)',
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
                      gap: 1,
                      alignItems: 'flex-start',
                      flexDirection: message.role === "user" ? 'row-reverse' : 'row',
                      maxWidth: '90%',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: message.role === "user" ? '#333' : '#f1535d',
                        fontSize: '14px'
                      }}
                    >
                      {message.role === "user" ? (
                        <PersonIcon sx={{ color: '#fff', fontSize: '16px' }} />
                      ) : (
                        <SmartToyIcon sx={{ color: '#fff', fontSize: '16px' }} />
                      )}
                    </Avatar>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: message.role === "user" 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(241, 83, 93, 0.08)',
                        border: message.role === "user"
                          ? '1px solid rgba(255, 255, 255, 0.1)'
                          : '1px solid rgba(241, 83, 93, 0.2)',
                        color: '#fff',
                        direction: 'rtl',
                        maxWidth: '100%',
                        wordBreak: 'break-word'
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          whiteSpace: 'pre-wrap',
                          fontFamily: '"Heebo", "Roboto", sans-serif',
                          fontSize: '14px',
                          textAlign: 'right',
                          lineHeight: 1.5
                        }}
                      >
                        {message.role === "assistant" 
                          ? formatNumberedIdeas(message.content)
                          : message.content
                        }
                      </Typography>
                    </Paper>
                  </Box>
                </ListItem>
              ))}
              
              {showTypingIndicator && (
                <ListItem sx={{ p: 0, justifyContent: "flex-start" }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: '#f1535d',
                      }}
                    >
                      <SmartToyIcon sx={{ color: '#fff', fontSize: '16px' }} />
                    </Avatar>
                    <Paper
                      elevation={0}
                      sx={{
                        borderRadius: 2,
                        backgroundColor: 'rgba(241, 83, 93, 0.08)',
                        border: '1px solid rgba(241, 83, 93, 0.2)',
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
              p: 1.5, 
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
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
                maxRows={2}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    fontSize: '14px',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#f1535d',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#f1535d',
                      borderWidth: '1px',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.4)',
                    opacity: 1,
                    fontSize: '14px',
                  },
                }}
                InputProps={{
                  sx: { 
                    color: '#fff', 
                    direction: 'rtl',
                    fontFamily: '"Heebo", "Roboto", sans-serif',
                  }
                }}
              />
              <Tooltip title="Send Message">
                <span>
                  <IconButton 
                    onClick={handleSend} 
                    disabled={loading || !input.trim()} 
                    sx={{
                      backgroundColor: '#f1535d',
                      color: 'white',
                      height: '40px',
                      width: '40px',
                      '&:hover': { 
                        backgroundColor: '#d84550',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.2)'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <SendIcon fontSize="small" />}
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

// Helper function to format numbered ideas
function formatNumberedIdeas(content: string): React.ReactNode {
  // Check if the content has numbered ideas like "1.", "2.", etc.
  const lines = content.split('\n');
  const numberedPattern = /^\d+\.\s/;
  
  // If there are no numbered lines, return the content as is
  if (!lines.some(line => numberedPattern.test(line))) {
    return content;
  }
  
  // Process the text to properly format numbered ideas
  return lines.map((line, index) => {
    const match = line.match(numberedPattern);
    if (match) {
      return (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          <Box sx={{ display: 'flex', marginBottom: '8px' }}>
            <Typography 
              component="span" 
              sx={{ 
                color: '#f1535d', 
                fontWeight: 'bold', 
                marginRight: '8px',
                minWidth: '20px'
              }}
            >
              {match[0]}
            </Typography>
            <Typography component="span">
              {line.replace(numberedPattern, '')}
            </Typography>
          </Box>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          {line}
        </React.Fragment>
      );
    }
  });
}