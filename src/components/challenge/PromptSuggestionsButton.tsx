// import { useState } from "react";
// import axios from "axios"; 
// import { Box, Button, Modal, CircularProgress, Typography, List, ListItem } from "@mui/material";

// const apiUrl = import.meta.env.VITE_APP_API_URL;

// export default function SendPrompt({ challengeTopic, challengeDescription }: { challengeTopic: string; challengeDescription: string; }) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState<string[]>([]);

//   const handleClick = async () => {
//     setOpen(true);
//     setLoading(true);

//     try {
//       const response = await axios.post(`${apiUrl}/api/PromptSuggestions`, {
//         topic: challengeTopic,
//         description: challengeDescription,
//       });

//       setSuggestions(response.data.prompts); // Access data from Axios response
//     } catch (err) {
//       console.error("Error fetching prompts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Button onClick={handleClick} variant="outlined" sx={{
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
//           padding: 4,
//           backgroundColor: 'white',
//           width: 400,
//           maxHeight: 500,
//           overflowY: 'auto',
//           margin: 'auto',
//           marginTop: 10,
//           borderRadius: 2
//         }}>
//           <Typography variant="h6" mb={2}>הצעות לפרומפטים לאתגר:</Typography>

//           {loading ? (
//             <Box display="flex" justifyContent="center"><CircularProgress /></Box>
//           ) : (
//             <List>
//               {suggestions.map((s, i) => (
//                 <ListItem key={i} sx={{ paddingLeft: 0 }}>{i + 1}. {s}</ListItem>
//               ))}
//             </List>
//           )}
//         </Box>
//       </Modal>
//     </>
//   );
// }


import { useState } from "react";
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
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

  const handleOpen = async () => {
    setOpen(true);
    setChat([]); // אתחול שיחה
    await sendMessage("system", `אתה עוזר יצירתי באתר SIB, שבו יוצרים מעלים תמונות AI לפי אתגרים. דבר רק על האתר, האתגרים, השראה, יצירתיות ודירוגים.`);
    await sendMessage("user", `האתגר הנוכחי הוא: "${challengeTopic}". תיאור האתגר: "${challengeDescription}". תן לי רעיונות לפרומפטים.`);
  };

  const sendMessage = async (role: string, content: string) => {
    setChat((prev) => [...prev, { role, content }]);
    if (role === "user" || role === "system") {
      setLoading(true);
      try {
        const response = await axios.post(`${apiUrl}/api/ChatPromptBot`, {
          messages: [...chat, { role, content }]
        });
        const botReply = response.data.reply;
        setChat((prev) => [...prev, { role: "assistant", content: botReply }]);
      } catch (err) {
        console.error("Error during chat:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage("user", input.trim());
    setInput("");
  };

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" sx={{
        textTransform: 'none',
        borderColor: 'pink',
        color: 'black',
        backgroundColor: 'transparent',
        '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }
      }}>
        צריך השראה?
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          p: 2,
          backgroundColor: 'white',
          width: 500,
          maxHeight: '80vh',
          overflowY: 'auto',
          margin: 'auto',
          mt: 10,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">צ'אט עם הבוט</Typography>
            <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
          </Box>

          <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {chat.map((m, i) => (
              <ListItem
                key={i}
                sx={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: m.role === "user" ? "#ffe6f0" : "#f0f0f0",
                  borderRadius: 2,
                  mb: 1,
                  maxWidth: "90%"
                }}
              >
                {m.content}
              </ListItem>
            ))}
            {loading && <ListItem><CircularProgress size={20} /></ListItem>}
          </List>

          <Box display="flex" gap={1} mt={2}>
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="כתוב משהו לבוט..."
              size="small"
            />
            <Button variant="contained" onClick={handleSend} disabled={loading}>
              שלח
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
