import { observer } from "mobx-react-lite";
import { Box, Typography, Grid, Paper } from "@mui/material";
import challengeStore from "../../store/challengeStore";
import WinningCreation from "../creation/WinningCreation";

const ChallengeHistory = observer(() => {    
    const notActiveCallenges = challengeStore.getNotActiveCallenges;

    return (
        <Box sx={{ padding: 3, backgroundColor: "#000000", color: "#ffffff" }}>
            <Typography sx={{
                fontSize: "clamp(1.5625rem, 0.8152rem + 2.9891vw, 2.25rem)",
                fontWeight: 700,
                lineHeight: 1.4,
                fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
                marginTop: "40px",
                textAlign: "left",
                marginBottom: "20px",
                background: "linear-gradient(81.02deg, #f1535d -22.47%, #ffffff 30.52%, #edc106 75.8%) text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}>
                Challenge History
            </Typography>
            <Grid container spacing={3} sx={{ marginTop: 2 }}>
                {notActiveCallenges.length > 0 ? (
                    notActiveCallenges.map((challenge) => (
                        <Grid item xs={12} sm={6} md={4} key={challenge.id}>
                            <Paper sx={{
                                padding: 2,
                                textAlign: "center",
                                backgroundColor: "#1e1e1e",
                                border: "1px solid #26272c",
                                borderRadius: 2,
                            }}>
                                <Typography variant="h5" sx={{ color: "#ffffff" }}>
                                    {challenge.title}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#ffffff", marginTop: 1 }}>
                                    Participants: {challenge.countCreations}
                                </Typography>
                                
                                {/* Winning image */}
                                <WinningCreation challengeId={challenge.id} />
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography sx={{ padding: 2, color: "#ffffff" }}>No inactive challenges found</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
});

export default ChallengeHistory;



// import { useState, useEffect } from "react";
// import { observer } from "mobx-react-lite";
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Paper,
//   Chip,
//   Avatar,
//   Fade,
//   Divider,
//   Button 
// } from "@mui/material";
// import { 
//   CalendarMonth, 
//   Person, 
//   Image, 
//   LocalFireDepartment,
//   Visibility
// } from "@mui/icons-material";
// import challengeStore from "../../store/challengeStore";
// import WinningCreation from "../creation/WinningCreation";

// const ChallengeHistory = observer(() => {    
//     const notActiveCallenges = challengeStore.getNotActiveCallenges;
//     const [selectedChallenge, setSelectedChallenge] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // סימולציה של טעינת נתונים
//         setTimeout(() => {
//             setIsLoading(false);
//             if (notActiveCallenges.length > 0) {
//                 setSelectedChallenge(notActiveCallenges[0].id);
//             }
//         }, 800);
//     }, [notActiveCallenges]);

//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'short', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString('he-IL', options);
//     };

//     return (
//         <Box sx={{ 
//             padding: { xs: 2, md: 4 }, 
//             backgroundColor: "#050505",
//             color: "#ffffff",
//             minHeight: "100vh",
//             background: "radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000000 100%)",
//             position: "relative",
//             overflow: "hidden"
//         }}>
//             {/* דקורטיבי גריד בלור ברקע */}
//             <Box sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundImage: "radial-gradient(circle at 50% 50%, rgba(32, 75, 233, 0.03) 0%, rgba(32, 75, 233, 0) 70%), radial-gradient(circle at 80% 10%, rgba(233, 32, 99, 0.03) 0%, rgba(233, 32, 99, 0) 70%), radial-gradient(circle at 10% 90%, rgba(239, 193, 24, 0.03) 0%, rgba(239, 193, 24, 0) 70%)",
//                 zIndex: 0,
//                 pointerEvents: "none"
//             }} />

//             <Typography sx={{
//                 fontSize: "clamp(2rem, 1.5rem + 2.5vw, 3rem)",
//                 fontWeight: 800,
//                 lineHeight: 1.2,
//                 fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
//                 marginTop: "40px",
//                 position: "relative",
//                 zIndex: 1,
//                 textAlign: "center",
//                 marginBottom: "40px",
//                 background: "linear-gradient(81.02deg, #f1535d -22.47%, #ffffff 30.52%, #00dbff 75.8%, #edc106 100%) text",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 textTransform: "uppercase",
//                 letterSpacing: "1px",
//                 textShadow: "0 0 15px rgba(255, 255, 255, 0.2)"
//             }}>
//                 אתגרים שהסתיימו
//             </Typography>

//             <Box sx={{ 
//                 position: "relative", 
//                 zIndex: 2,
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//                 gap: 3
//             }}>
//                 {/* רשימת אתגרים בצד */}
//                 <Box sx={{ 
//                     flex: { xs: "1 1 100%", md: "0 0 280px" },
//                     backgroundColor: "rgba(18, 18, 22, 0.6)",
//                     backdropFilter: "blur(10px)",
//                     borderRadius: "12px",
//                     border: "1px solid rgba(255, 255, 255, 0.08)",
//                     padding: 2,
//                     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)"
//                 }}>
//                     <Typography variant="h6" sx={{ 
//                         color: "#ffffff", 
//                         marginBottom: 2, 
//                         borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
//                         paddingBottom: 1,
//                         fontWeight: 600,
//                         fontSize: "1.1rem",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1
//                     }}>
//                         <CalendarMonth fontSize="small" sx={{ color: "#00dbff" }} />
//                         אתגרים קודמים
//                     </Typography>

//                     {isLoading ? (
//                         Array(4).fill(0).map((_, index) => (
//                             <Box 
//                                 key={`skeleton-${index}`}
//                                 sx={{ 
//                                     height: "60px", 
//                                     backgroundColor: "rgba(255, 255, 255, 0.03)",
//                                     marginBottom: 1.5,
//                                     borderRadius: "8px",
//                                     animation: "pulse 1.5s infinite ease-in-out",
//                                     "@keyframes pulse": {
//                                         "0%": { opacity: 0.3 },
//                                         "50%": { opacity: 0.15 },
//                                         "100%": { opacity: 0.3 }
//                                     }
//                                 }}
//                             />
//                         ))
//                     ) : notActiveCallenges.length > 0 ? (
//                         <Box sx={{ 
//                             display: "flex", 
//                             flexDirection: "column", 
//                             gap: 1.5,
//                             maxHeight: "70vh",
//                             overflowY: "auto",
//                             padding: "0 4px 4px 0",
//                             "&::-webkit-scrollbar": {
//                                 width: "4px",
//                             },
//                             "&::-webkit-scrollbar-track": {  
//                                 background: "rgba(255, 255, 255, 0.05)",
//                                 borderRadius: "10px"
//                             },
//                             "&::-webkit-scrollbar-thumb": {
//                                 background: "rgba(255, 255, 255, 0.15)",
//                                 borderRadius: "10px",
//                                 "&:hover": {
//                                     background: "rgba(255, 255, 255, 0.25)"
//                                 }
//                             }
//                         }}>
//                             {notActiveCallenges.map((challenge) => (
//                                 <Paper 
//                                     key={challenge.id}
//                                     onClick={() => setSelectedChallenge(challenge.id)}
//                                     sx={{
//                                         padding: 2,
//                                         cursor: "pointer",
//                                         backgroundColor: selectedChallenge === challenge.id ? 
//                                             "rgba(78, 78, 252, 0.15)" : "rgba(30, 30, 34, 0.6)",
//                                         border: `1px solid ${selectedChallenge === challenge.id ? 
//                                             "rgba(103, 103, 255, 0.5)" : "rgba(255, 255, 255, 0.05)"}`,
//                                         borderRadius: "8px",
//                                         transition: "all 0.3s ease",
//                                         position: "relative",
//                                         overflow: "hidden",
//                                         "&:hover": {
//                                             backgroundColor: "rgba(78, 78, 252, 0.1)",
//                                             transform: "translateY(-2px)",
//                                             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
//                                         }
//                                     }}
//                                 >
//                                     {selectedChallenge === challenge.id && (
//                                         <Box sx={{
//                                             position: "absolute",
//                                             left: 0,
//                                             top: 0,
//                                             width: "4px",
//                                             height: "100%",
//                                             background: "linear-gradient(to bottom, #4e4efc, #00dbff)"
//                                         }} />
//                                     )}
//                                     <Typography noWrap sx={{ 
//                                         fontWeight: 600, 
//                                         fontSize: "0.95rem",
//                                         color: selectedChallenge === challenge.id ? "#ffffff" : "#e0e0e0"
//                                     }}>
//                                         {challenge.title}
//                                     </Typography>
//                                     <Box sx={{ 
//                                         display: "flex", 
//                                         alignItems: "center", 
//                                         mt: 1,
//                                         gap: 2,
//                                         color: "rgba(255, 255, 255, 0.7)",
//                                         fontSize: "0.75rem"
//                                     }}>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                             <Person fontSize="small" sx={{ fontSize: "0.9rem", color: "#f1535d" }} />
//                                             {challenge.countCreations}
//                                         </Box>
//                                         <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
//                                             <CalendarMonth fontSize="small" sx={{ fontSize: "0.9rem", color: "#edc106" }} />
//                                             {formatDate(challenge.endDate || '2025-01-01')}
//                                         </Box>
//                                     </Box>
//                                 </Paper>
//                             ))}
//                         </Box>
//                     ) : (
//                         <Typography sx={{ color: "rgba(255, 255, 255, 0.5)", textAlign: "center", padding: 2 }}>
//                             לא נמצאו אתגרים שהסתיימו
//                         </Typography>
//                     )}
//                 </Box>

//                 {/* תצוגת האתגר הנבחר עם התמונה הזוכה */}
//                 <Box sx={{ 
//                     flex: "1 1 auto",
//                     backgroundColor: "rgba(18, 18, 22, 0.6)",
//                     backdropFilter: "blur(10px)",
//                     borderRadius: "12px",
//                     border: "1px solid rgba(255, 255, 255, 0.08)",
//                     padding: 3,
//                     boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
//                     minHeight: "500px",
//                     display: "flex",
//                     flexDirection: "column"
//                 }}>
//                     {isLoading ? (
//                         <Box sx={{ 
//                             display: "flex", 
//                             flexDirection: "column", 
//                             gap: 2,
//                             flex: 1,
//                             alignItems: "center",
//                             justifyContent: "center"
//                         }}>
//                             <Box sx={{ 
//                                 width: "150px", 
//                                 height: "150px", 
//                                 borderRadius: "50%",
//                                 background: "rgba(255, 255, 255, 0.03)",
//                                 animation: "pulse 1.5s infinite ease-in-out",
//                                 "@keyframes pulse": {
//                                     "0%": { opacity: 0.3 },
//                                     "50%": { opacity: 0.15 },
//                                     "100%": { opacity: 0.3 }
//                                 }
//                             }} />
//                             <Typography sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
//                                 טוען היסטוריית אתגרים...
//                             </Typography>
//                         </Box>
//                     ) : selectedChallenge ? (
//                         <Fade in={!!selectedChallenge} timeout={500}>
//                             <Box>
//                                 {notActiveCallenges.map((challenge) => {
//                                     if (challenge.id !== selectedChallenge) return null;
                                    
//                                     return (
//                                         <Box key={challenge.id}>
//                                             <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//                                                 <Typography variant="h5" sx={{ 
//                                                     color: "#ffffff", 
//                                                     fontWeight: 700,
//                                                     fontSize: "1.5rem"
//                                                 }}>
//                                                     {challenge.title}
//                                                 </Typography>
//                                                 <Chip 
//                                                     size="small" 
//                                                     label="הסתיים" 
//                                                     sx={{ 
//                                                         backgroundColor: "rgba(230, 30, 80, 0.15)",
//                                                         color: "#ff6b8b",
//                                                         fontWeight: 600,
//                                                         border: "1px solid rgba(230, 30, 80, 0.3)"
//                                                     }} 
//                                                 />
//                                             </Box>
                                            
//                                             <Typography sx={{ 
//                                                 color: "rgba(255, 255, 255, 0.8)", 
//                                                 mb: 3,
//                                                 lineHeight: 1.6
//                                             }}>
//                                                 {challenge.description || 'אתגר יצירתי שהסתיים בהצלחה עם תמונות מרהיבות מהמשתתפים. תודה לכל המשתתפים על היצירתיות והמקוריות שהביאו לאתגר זה!'}
//                                             </Typography>

//                                             <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
//                                                 <Box sx={{ 
//                                                     display: "flex", 
//                                                     alignItems: "center", 
//                                                     backgroundColor: "rgba(255, 255, 255, 0.05)",
//                                                     padding: "6px 12px",
//                                                     borderRadius: "20px"
//                                                 }}>
//                                                     <Person sx={{ color: "#f1535d", mr: 1, fontSize: "1.1rem" }} />
//                                                     <Box>
//                                                         <Typography sx={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)" }}>
//                                                             משתתפים
//                                                         </Typography>
//                                                         <Typography sx={{ fontWeight: 600 }}>
//                                                             {challenge.countCreations}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
                                                
//                                                 <Box sx={{ 
//                                                     display: "flex", 
//                                                     alignItems: "center", 
//                                                     backgroundColor: "rgba(255, 255, 255, 0.05)",
//                                                     padding: "6px 12px",
//                                                     borderRadius: "20px"
//                                                 }}>
//                                                     <CalendarMonth sx={{ color: "#edc106", mr: 1, fontSize: "1.1rem" }} />
//                                                     <Box>
//                                                         <Typography sx={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)" }}>
//                                                             תאריך סיום
//                                                         </Typography>
//                                                         <Typography sx={{ fontWeight: 600 }}>
//                                                             {formatDate(challenge.endDate || '2025-01-01')}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
                                                
//                                                 <Box sx={{ 
//                                                     display: "flex", 
//                                                     alignItems: "center", 
//                                                     backgroundColor: "rgba(255, 255, 255, 0.05)",
//                                                     padding: "6px 12px",
//                                                     borderRadius: "20px"
//                                                 }}>
//                                                     <LocalFireDepartment sx={{ color: "#00dbff", mr: 1, fontSize: "1.1rem" }} />
//                                                     <Box>
//                                                         <Typography sx={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)" }}>
//                                                             דירוג פופולריות
//                                                         </Typography>
//                                                         <Typography sx={{ fontWeight: 600 }}>
//                                                             {challenge.popularity || 'גבוה'}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
//                                             </Box>

//                                             <Typography sx={{ 
//                                                 color: "#ffffff", 
//                                                 fontWeight: 700,
//                                                 fontSize: "1.2rem",
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 gap: 1,
//                                                 mb: 2,
//                                                 background: "linear-gradient(90deg, #edc106, #f1535d) text",
//                                                 WebkitBackgroundClip: "text",
//                                                 WebkitTextFillColor: "transparent",
//                                             }}>
//                                                 <Image /> התמונה הזוכה
//                                             </Typography>
                                            
//                                             <Box sx={{ 
//                                                 borderRadius: "12px",
//                                                 overflow: "hidden",
//                                                 mb: 3,
//                                                 position: "relative",
//                                                 boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
//                                                 border: "1px solid rgba(255, 255, 255, 0.08)",
//                                                 transition: "transform 0.3s ease",
//                                                 "&:hover": {
//                                                     transform: "scale(1.02)"
//                                                 }
//                                             }}>
//                                                 <WinningCreation challengeId={challenge.id} />
                                                
//                                                 {/* אפקט גלואו מעל התמונה */}
//                                                 <Box sx={{
//                                                     position: "absolute",
//                                                     top: 0,
//                                                     left: 0,
//                                                     right: 0,
//                                                     bottom: 0,
//                                                     boxShadow: "inset 0 0 30px rgba(237, 193, 6, 0.2), inset 0 0 60px rgba(241, 83, 93, 0.1)",
//                                                     pointerEvents: "none"
//                                                 }} />
//                                             </Box>
                                            
//                                             <Box sx={{ 
//                                                 display: "flex", 
//                                                 justifyContent: "space-between",
//                                                 alignItems: "center" 
//                                             }}>
//                                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                                     <Avatar sx={{ 
//                                                         width: 32, 
//                                                         height: 32,
//                                                         background: "linear-gradient(45deg, #4e4efc, #00dbff)"
//                                                     }}>
//                                                         {challenge.winnerName?.charAt(0) || 'W'}
//                                                     </Avatar>
//                                                     <Box>
//                                                         <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
//                                                             {challenge.winnerName || 'משתמש יצירתי'}
//                                                         </Typography>
//                                                         <Typography sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.75rem" }}>
//                                                             יוצר/ת הזוכה
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
                                                
//                                                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                                                     <Button 
//                                                         size="small" 
//                                                         variant="contained"
//                                                         startIcon={<Visibility />}
//                                                         sx={{
//                                                             background: "linear-gradient(45deg, #4e4efc, #00dbff)",
//                                                             borderRadius: "8px",
//                                                             textTransform: "none",
//                                                             boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
//                                                             "&:hover": {
//                                                                 background: "linear-gradient(45deg, #3b3bc7, #00b8d4)"
//                                                             }
//                                                         }}
//                                                     >
//                                                         צפה בפרטים
//                                                     </Button>
//                                                 </Box>
//                                             </Box>
//                                         </Box>
//                                     );
//                                 })}
//                             </Box>
//                         </Fade>
//                     ) : (
//                         <Box sx={{ 
//                             display: "flex", 
//                             flexDirection: "column", 
//                             alignItems: "center",
//                             justifyContent: "center",
//                             flex: 1,
//                             color: "rgba(255, 255, 255, 0.5)",
//                             gap: 2
//                         }}>
//                             <Image sx={{ fontSize: "3rem", opacity: 0.5 }} />
//                             <Typography>
//                                 בחר אתגר מהרשימה כדי לצפות בפרטים
//                             </Typography>
//                         </Box>
//                     )}
//                 </Box>
//             </Box>
//         </Box>
//     );
// });

// export default ChallengeHistory;