// import { Typography, Box, Avatar, Chip, Skeleton } from "@mui/material";
// import { observer } from "mobx-react-lite";
// import { useState, useEffect } from "react";
// import { CreationType } from "../../models/creation";
// import { UserType } from "../../models/user";
// import challengeStore from "../../store/challengeStore";
// import CreationView from "./CreationView";

// // קומפוננטה להצגת התמונה הזוכה
// const WinningCreation = observer(({ challengeId }: { challengeId: number }) => {
//     const [winningCreation, setWinningCreation] = useState<CreationType | null>(null);
//     const [user, setUser] = useState<UserType | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchWinningCreation = async () => {
//             setIsLoading(true);
//             try {
//                 const creation = await challengeStore.getWinningCreation(challengeId);
//                 setWinningCreation(creation);

//                 if (creation) {
//                     const userData = await challengeStore.getUserByIdentityAsync(creation.userId);
//                     setUser(userData);
//                 }
//             } catch (error) {
//                 console.error("Error fetching winning creation:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchWinningCreation();
//     }, [challengeId]);

//     if (isLoading) {
//         return (
//             <Box sx={{ width: "100%", height: "100%", minHeight: "200px" }}>
//                 <Skeleton 
//                     variant="rectangular" 
//                     width="100%" 
//                     height="150px" 
//                     animation="wave"
//                     sx={{ 
//                         bgcolor: 'rgba(255, 255, 255, 0.03)',
//                         borderRadius: '4px',
//                         mb: 1
//                     }}
//                 />
//                 <Skeleton 
//                     variant="text" 
//                     width="70%" 
//                     sx={{ 
//                         bgcolor: 'rgba(255, 255, 255, 0.03)',
//                         mx: 'auto'
//                     }}
//                 />
//                 <Skeleton 
//                     variant="text" 
//                     width="50%" 
//                     sx={{ 
//                         bgcolor: 'rgba(255, 255, 255, 0.03)',
//                         mx: 'auto'
//                     }}
//                 />
//             </Box>
//         );
//     }

//     if (!winningCreation || !user) {
//         return (
//             <Box sx={{ 
//                 width: "100%", 
//                 height: "100%",
//                 minHeight: "200px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 background: "rgba(15, 15, 15, 0.5)",
//                 borderRadius: "4px"
//             }}>
//                 <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
//                     No winning creation found
//                 </Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ width: "100%", position: "relative", height: "100%" }}>
//             {/* תצוגת התמונה עצמה */}
//             <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
//                 <CreationView fileName={winningCreation.fileName} />
                
//                 {/* תווית מספר הצבעות בעיצוב מינימליסטי */}
//                 <Chip 
//                     label={`${winningCreation.votes || 0} Votes`}
//                     size="small"
//                     sx={{
//                         position: "absolute",
//                         top: 8,
//                         right: 8,
//                         backgroundColor: "rgba(0, 0, 0, 0.6)",
//                         color: "#fff",
//                         border: "1px solid rgba(255, 255, 255, 0.1)",
//                         fontWeight: 400,
//                         fontSize: "0.7rem",
//                         height: "20px",
//                         '& .MuiChip-label': {
//                             px: 1
//                         }
//                     }}
//                 />
                
//                 {/* אזור פרטי היוצר בתחתית התמונה */}
//                 <Box sx={{ 
//                     position: "absolute",
//                     bottom: 0,
//                     left: 0,
//                     right: 0,
//                     padding: "12px 10px",
//                     background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0) 100%)",
//                     textAlign: "left",
//                     zIndex: 2
//                 }}>
//                     {/* שם קובץ */}
//                     <Typography 
//                         variant="body2" 
//                         sx={{ 
//                             color: "rgba(255, 255, 255, 0.95)",
//                             fontWeight: 500,
//                             fontSize: "0.8rem",
//                             whiteSpace: "nowrap",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             mb: 0.5
//                         }}
//                     >
//                         {winningCreation.fileName}
//                     </Typography>
                    
//                     {/* פרטי היוצר */}
//                     <Box sx={{ 
//                         display: "flex", 
//                         alignItems: "center", 
//                         gap: 1
//                     }}>
//                         <Avatar 
//                             sx={{ 
//                                 width: 22, 
//                                 height: 22,
//                                 border: "1px solid rgba(255, 255, 255, 0.2)",
//                                 backgroundColor: "rgba(255, 255, 255, 0.1)",
//                                 color: "#fff",
//                                 fontSize: "0.7rem",
//                                 fontWeight: 500
//                             }}
//                         >
//                             {user.name.charAt(0)}
//                         </Avatar>
//                         <Typography 
//                             variant="body2" 
//                             sx={{ 
//                                 color: "rgba(255, 255, 255, 0.8)",
//                                 fontSize: "0.75rem",
//                                 fontWeight: 400,
//                                 lineHeight: 1.2,
//                                 flex: 1,
//                                 overflow: "hidden",
//                                 textOverflow: "ellipsis",
//                                 whiteSpace: "nowrap"
//                             }}
//                         >
//                             {user.name}
//                         </Typography>
//                     </Box>
//                 </Box>
//             </Box>
//         </Box>
//     );
// });

// export default WinningCreation;



// import { Typography, Box, Avatar } from "@mui/material";
// import { observer } from "mobx-react-lite";
// import { useState, useEffect } from "react";
// import { CreationType } from "../../models/creation";
// import { UserType } from "../../models/user";
// import challengeStore from "../../store/challengeStore";
// import CreationView from "./CreationView";

// const WinningCreation = observer(({ challengeId }: { challengeId: number }) => {
//     const [winningCreation, setWinningCreation] = useState<CreationType | null>(null);
//     const [user, setUser] = useState<UserType | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchWinningCreation = async () => {
//             setIsLoading(true);
//             try {
//                 const creation = await challengeStore.getWinningCreation(challengeId);
//                 setWinningCreation(creation);

//                 if (creation) {
//                     const userData = await challengeStore.getUserByIdentityAsync(creation.userId);
//                     setUser(userData);
//                 }
//             } catch (error) {
//                 console.error("Error fetching winning creation:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchWinningCreation();
//     }, [challengeId]);

//     if (isLoading) {
//         return (
//             <Box sx={{ 
//                 width: "100%", 
//                 height: "100%", 
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 background: "rgba(8, 8, 8, 0.4)"
//             }}>
//                 <Box sx={{
//                     width: "40px",
//                     height: "40px",
//                     borderRadius: "50%",
//                     border: "2px solid rgba(50, 50, 50, 0.2)",
//                     borderTop: "2px solid rgba(200, 200, 200, 0.7)",
//                     animation: "spin 1s linear infinite",
//                     mb: 3,
//                     "@keyframes spin": {
//                         "0%": { transform: "rotate(0deg)" },
//                         "100%": { transform: "rotate(360deg)" },
//                     }
//                 }} />
//                 <Typography sx={{ 
//                     color: "rgba(255, 255, 255, 0.6)",
//                     fontSize: "1rem",
//                     fontWeight: 400
//                 }}>
//                     Loading winner...
//                 </Typography>
//             </Box>
//         );
//     }

//     if (!winningCreation || !user) {
//         return (
//             <Box sx={{ 
//                 width: "100%", 
//                 height: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 background: "rgba(8, 8, 8, 0.4)",
//                 padding: "20px"
//             }}>
//                 <Typography variant="body1" sx={{ 
//                     color: "rgba(255, 255, 255, 0.7)",
//                     textAlign: "center",
//                     mb: 2,
//                     fontSize: "1.1rem"
//                 }}>
//                     No winning creation found
//                 </Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ 
//             width: "100%", 
//             height: "100%", 
//             position: "relative",
//             display: "flex",
//             flexDirection: "column"
//         }}>
//             {/* Trophy badge */}
//             <Box sx={{
//                 position: "absolute",
//                 top: "20px",
//                 left: "20px",
//                 zIndex: 5,
//                 display: "flex",
//                 alignItems: "center",
//                 background: "rgba(0, 0, 0, 0.7)",
//                 borderRadius: "12px",
//                 padding: "8px 16px",
//                 gap: 1.5
//             }}>
//                 <Typography 
//                     component="span" 
//                     sx={{ 
//                         color: "#FFD700",
//                         fontSize: "1.2rem",
//                         display: "flex",
//                         alignItems: "center"
//                     }}
//                 >
//                     🏆
//                 </Typography>
//                 <Typography sx={{
//                     fontWeight: 500,
//                     fontSize: "0.95rem",
//                     color: "#ffffff",
//                 }}>
//                     Winner
//                 </Typography>
//             </Box>
            
//             {/* Vote count */}
//             <Box sx={{
//                 position: "absolute",
//                 top: "20px",
//                 right: "20px",
//                 zIndex: 5,
//                 background: "rgba(0, 0, 0, 0.7)",
//                 borderRadius: "12px",
//                 padding: "8px 16px",
//             }}>
//                 <Typography sx={{
//                     fontWeight: 500,
//                     fontSize: "0.95rem",
//                     color: "#ffffff",
//                 }}>
//                     {winningCreation.votes || 0} Votes
//                 </Typography>
//             </Box>
            
//             {/* Creation display - Makes up most of the content area */}
//             <Box sx={{ 
//                 flex: 1,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 width: "100%",
//                 position: "relative",
//                 overflow: "hidden", // Prevent any content overflow
//                 padding: "80px 20px 80px 20px", // Space for badges and info bar
//             }}>
//                 <Box sx={{
//                     width: "100%",
//                     height: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     "& img": {
//                         maxWidth: "100%",
//                         maxHeight: "100%",
//                         objectFit: "contain" // Maintain aspect ratio
//                     }
//                 }}>
//                     <CreationView fileName={winningCreation.fileName} />
//                 </Box>
//             </Box>
            
//             {/* Creator info bar - Fixed at bottom */}
//             <Box sx={{ 
//                 width: "100%",
//                 background: "rgba(0, 0, 0, 0.8)",
//                 padding: "16px 20px",
//                 zIndex: 4,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 right: 0
//             }}>
//                 {/* Creator info */}
//                 <Box sx={{ 
//                     display: "flex", 
//                     alignItems: "center", 
//                     gap: 2 
//                 }}>
//                     <Avatar 
//                         sx={{ 
//                             width: 40, 
//                             height: 40,
//                             backgroundColor: "#1A1A1A",
//                             color: "#fff",
//                             fontWeight: 500
//                         }}
//                     >
//                         {user.name.charAt(0)}
//                     </Avatar>
                    
//                     <Box>
//                         <Typography sx={{ 
//                             color: "#ffffff",
//                             fontSize: "1rem",
//                             fontWeight: 500,
//                             mb: 0.5
//                         }}>
//                             {user.name}
//                         </Typography>
//                         <Typography sx={{ 
//                             color: "rgba(200, 200, 200, 0.8)",
//                             fontSize: "0.85rem"
//                         }}>
//                             Challenge #{challengeId}
//                         </Typography>
//                     </Box>
//                 </Box>
                
//                 {/* File name */}
//                 <Box sx={{
//                     maxWidth: "40%",
//                     textAlign: "right"
//                 }}>
//                     <Typography sx={{ 
//                         color: "rgba(255, 255, 255, 0.8)",
//                         fontSize: "0.85rem",
//                         direction: "rtl",
//                         textAlign: "left",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         whiteSpace: "nowrap"
//                     }}>
//                         {winningCreation.fileName}
//                     </Typography>
//                 </Box>
//             </Box>
//         </Box>
//     );
// });

// export default WinningCreation;

import { Typography, Box, Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { CreationType } from "../../models/creation";
import { UserType } from "../../models/user";
import challengeStore from "../../store/challengeStore";
import CreationView from "./CreationView";

const WinningCreation = observer(({ challengeId }: { challengeId: number }) => {
    const [winningCreation, setWinningCreation] = useState<CreationType | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWinningCreation = async () => {
            setIsLoading(true);
            try {
                const creation = await challengeStore.getWinningCreation(challengeId);
                setWinningCreation(creation);

                if (creation) {
                    const userData = await challengeStore.getUserByIdentityAsync(creation.userId);
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching winning creation:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWinningCreation();
    }, [challengeId]);

    if (isLoading) {
        return (
            <Box sx={{ 
                width: "100%", 
                height: "100%", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "rgba(8, 8, 8, 0.4)"
            }}>
                <Box sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid rgba(50, 50, 50, 0.2)",
                    borderTop: "2px solid rgba(200, 200, 200, 0.7)",
                    animation: "spin 1s linear infinite",
                    mb: 3,
                    "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                    }
                }} />
                <Typography sx={{ 
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "1rem",
                    fontWeight: 400
                }}>
                    Loading winner...
                </Typography>
            </Box>
        );
    }

    if (!winningCreation || !user) {
        return (
            <Box sx={{ 
                width: "100%", 
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                background: "rgba(8, 8, 8, 0.4)",
                padding: "20px"
            }}>
                <Typography variant="body1" sx={{ 
                    color: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center",
                    mb: 2,
                    fontSize: "1.1rem"
                }}>
                    No winning creation found
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            width: "100%", 
            height: "100%", 
            position: "relative",
            overflow: "hidden",
            borderRadius: "16px", // להוסיף יופי לכרטיס
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)", // צל יפה
        }}>
            {/* Creation display - full container */}
            <Box sx={{ 
                width: "100%", 
                height: "100%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                "& img": {
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover" // כדי שהתמונה תכסה יפה
                }
            }}>
                <CreationView fileName={winningCreation.fileName} />
            </Box>
    
            {/* Trophy badge */}
            <Box sx={{
                position: "absolute",
                top: "16px",
                left: "16px",
                background: "rgba(0, 0, 0, 0.7)",
                borderRadius: "12px",
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 1,
                zIndex: 2
            }}>
                <Typography component="span" sx={{ color: "#FFD700", fontSize: "1.2rem" }}>
                    🏆
                </Typography>
                <Typography sx={{ fontWeight: 500, fontSize: "0.95rem", color: "#ffffff" }}>
                    Winner
                </Typography>
            </Box>
    
            {/* Vote count */}
            <Box sx={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(0, 0, 0, 0.7)",
                borderRadius: "12px",
                padding: "6px 12px",
                zIndex: 2
            }}>
                <Typography sx={{ fontWeight: 500, fontSize: "0.95rem", color: "#ffffff" }}>
                    {winningCreation.votes || 0} Votes
                </Typography>
            </Box>
    
            {/* Creator info bar - bottom */}
            <Box sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                background: "rgba(0, 0, 0, 0.7)",
                padding: "12px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 2
            }}>
                {/* Creator details */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar 
                        sx={{ width: 36, height: 36, backgroundColor: "#1A1A1A", color: "#fff", fontWeight: 500 }}
                    >
                        {user.name.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography sx={{ color: "#ffffff", fontSize: "0.95rem", fontWeight: 500 }}>
                            {user.name}
                        </Typography>
                        <Typography sx={{ color: "rgba(200, 200, 200, 0.8)", fontSize: "0.8rem" }}>
                            Challenge #{challengeId}
                        </Typography>
                    </Box>
                </Box>
    
                {/* File name */}
                <Box sx={{ maxWidth: "40%", textAlign: "right" }}>
                    <Typography sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "0.8rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                        {winningCreation.fileName}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
    
});

export default WinningCreation;
