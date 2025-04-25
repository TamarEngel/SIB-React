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
//     const [isHovered, setIsHovered] = useState<boolean>(false);

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
//                     width: "50px",
//                     height: "50px",
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
//                 <Box sx={{
//                     width: "80px",
//                     height: "80px",
//                     borderRadius: "50%",
//                     backgroundColor: "rgba(20, 20, 20, 0.6)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     mb: 3
//                 }}>
//                     <Typography component="span" sx={{ fontSize: "2.5rem", opacity: 0.5 }}>
//                         🏆
//                     </Typography>
//                 </Box>
//                 <Typography variant="body1" sx={{ 
//                     color: "rgba(255, 255, 255, 0.7)",
//                     textAlign: "center",
//                     mb: 2,
//                     fontSize: "1.2rem"
//                 }}>
//                     No winning creation found
//                 </Typography>
//                 <Typography variant="body2" sx={{ 
//                     color: "rgba(255, 255, 255, 0.5)",
//                     textAlign: "center",
//                     maxWidth: "320px",
//                     fontSize: "1rem"
//                 }}>
//                     This challenge may not have any entries or the voting hasn't been completed yet
//                 </Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box 
//             sx={{ width: "100%", height: "100%", position: "relative" }}
//             onMouseEnter={() => setIsHovered(true) }
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* MUCH LARGER creation image display */}
//             <Box sx={{ 
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 zIndex: 1,
//                 "& > div": {
//                     height: "100%",
//                     width: "100%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     "& img": {
//                         maxWidth: "100%",
//                         maxHeight: "calc(100% - 30px)", // Ensure there's space for the info bar
//                         objectFit: "contain"
//                     }
//                 }
//             }}>
//                 <CreationView fileName={winningCreation.fileName} />
//             </Box>
            
//             {/* Subtle trophy indicator */}
//             <Box sx={{
//                 position: "absolute",
//                 top: "20px",
//                 left: "20px",
//                 zIndex: 3,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1.5,
//                 background: "rgba(12, 12, 12, 0.7)",
//                 backdropFilter: "blur(10px)",
//                 padding: "10px 16px",
//                 borderRadius: "12px",
//                 border: "1px solid rgba(60, 60, 60, 0.3)"
//             }}>
//                 <Typography 
//                     component="span" 
//                     role="img" 
//                     aria-label="trophy" 
//                     sx={{ fontSize: "1.2rem", color: "rgba(255, 225, 0, 0.7)" }}
//                 >
//                     🏆
//                 </Typography>
//                 <Typography sx={{
//                     fontWeight: 400,
//                     fontSize: "0.95rem",
//                     color: "#ffffff",
//                 }}>
//                     Winner
//                 </Typography>
//             </Box>
            
//             {/* Vote indicator - very subtle */}
//             <Box sx={{
//                 position: "absolute",
//                 top: "20px",
//                 right: "20px",
//                 zIndex: 3,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1.5,
//                 background: "rgba(12, 12, 12, 0.7)",
//                 backdropFilter: "blur(10px)",
//                 padding: "10px 16px",
//                 borderRadius: "12px",
//                 border: "1px solid rgba(60, 60, 60, 0.3)"
//             }}>
//                 <Typography sx={{
//                     fontWeight: 400,
//                     fontSize: "0.95rem",
//                     color: "#ffffff",
//                 }}>
//                     {winningCreation.votes || 0 || isHovered} Votes
//                 </Typography>
//             </Box>
            
//             {/* LARGER, cleaner creator info bar */}
//             <Box sx={{ 
//                 position: "absolute",
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 backdropFilter: "blur(15px)",
//                 background: "rgba(0, 0, 0, 0.75)",
//                 padding: { xs: "30px 24px", md: "32px 28px" },
//                 zIndex: 4,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center"
//             }}>
//                 {/* Left side - Creator info */}
//                 <Box sx={{ 
//                     display: "flex", 
//                     alignItems: "center", 
//                     gap: 2.5
//                 }}>
//                     <Avatar 
//                         sx={{ 
//                             width: 48, 
//                             height: 48,
//                             border: "1px solid rgba(80, 80, 80, 0.4)",
//                             backgroundColor: "rgba(16, 16, 16, 0.8)",
//                             color: "#fff",
//                             fontSize: "1.3rem",
//                             fontWeight: 500
//                         }}
//                     >
//                         {user.name.charAt(0)}
//                     </Avatar>
                    
//                     <Box>
//                         <Typography sx={{ 
//                             color: "#ffffff",
//                             fontSize: "1.1rem",
//                             fontWeight: 500,
//                             lineHeight: 1.3,
//                             mb: 0.5
//                         }}>
//                             {user.name}
//                         </Typography>
//                         <Typography sx={{ 
//                             color: "rgba(200, 200, 200, 0.8)",
//                             fontSize: "0.9rem",
//                             fontWeight: 400,
//                             lineHeight: 1.2
//                         }}>
//                             Challenge #{challengeId}
//                         </Typography>
//                     </Box>
//                 </Box>
                
//                 {/* Right side - File name */}
//                 <Box sx={{
//                     maxWidth: "50%",
//                     textAlign: "right"
//                 }}>
//                     <Typography sx={{ 
//                         color: "rgba(255, 255, 255, 0.9)",
//                         fontSize: "0.95rem",
//                         fontWeight: 400,
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

// WinningCreation.tsx
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
    const [isHovered, setIsHovered] = useState<boolean>(false);

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
                    width: "60px", // Larger spinner
                    height: "60px",
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
                    fontSize: "1.1rem", // Slightly larger text
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
                <Box sx={{
                    width: "90px", // Larger icon
                    height: "90px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(20, 20, 20, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 3
                }}>
                    <Typography component="span" sx={{ fontSize: "3rem", opacity: 0.5 }}>
                        🏆
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ 
                    color: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center",
                    mb: 2,
                    fontSize: "1.3rem" // Larger text
                }}>
                    No winning creation found
                </Typography>
                <Typography variant="body2" sx={{ 
                    color: "rgba(255, 255, 255, 0.5)",
                    textAlign: "center",
                    maxWidth: "360px", // Wider
                    fontSize: "1rem"
                }}>
                    This challenge may not have any entries or the voting hasn't been completed yet
                </Typography>
            </Box>
        );
    }

    return (
        <Box 
            sx={{ 
                width: "100%", 
                height: "100%", 
                position: "relative",
                // Added subtle gradient background for the content area
                background: "linear-gradient(to bottom, rgba(12, 12, 12, 0.5), rgba(5, 5, 5, 0.8))"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* MUCH LARGER creation image display with better positioning */}
            <Box sx={{ 
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                padding: { xs: "50px 20px 100px", sm: "60px 30px 120px", md: "70px 40px 120px" }, // Added padding all around for more space
                "& > div": {
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "& img": {
                        maxWidth: "100%",
                        maxHeight: "100%", // Full height within the padded container
                        objectFit: "contain",
                        borderRadius: "6px", // Slight rounded edges
                        // Optional subtle shadow for the image
                        filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.15))"
                    }
                }
            }}>
                <CreationView fileName={winningCreation.fileName} />
            </Box>
            
            {/* Enhanced trophy indicator */}
            <Box sx={{
                position: "absolute",
                top: "24px",
                left: "24px",
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "rgba(12, 12, 12, 0.75)",
                backdropFilter: "blur(12px)",
                padding: "12px 18px",
                borderRadius: "14px",
                border: "1px solid rgba(60, 60, 60, 0.35)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
            }}>
                <Typography 
                    component="span" 
                    role="img" 
                    aria-label="trophy" 
                    sx={{ fontSize: "1.3rem", color: "rgba(255, 225, 0, 0.8)" }}
                >
                    🏆
                </Typography>
                <Typography sx={{
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: "#ffffff",
                }}>
                    Winner
                </Typography>
            </Box>
            
            {/* Vote indicator - enhanced */}
            <Box sx={{
                position: "absolute",
                top: "24px",
                right: "24px",
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                background: "rgba(12, 12, 12, 0.75)",
                backdropFilter: "blur(12px)",
                padding: "12px 18px",
                borderRadius: "14px",
                border: "1px solid rgba(60, 60, 60, 0.35)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)"
            }}>
                <Typography 
                    component="span" 
                    role="img" 
                    aria-label="votes" 
                    sx={{ fontSize: "1.1rem", color: "rgba(200, 200, 200, 0.9)" }}
                >
                    👍
                </Typography>
                <Typography sx={{
                    fontWeight: 500,
                    fontSize: "1rem",
                    color: "#ffffff",
                }}>
                    {winningCreation.votes || 0 ||isHovered} Votes
                </Typography>
            </Box>
            
            {/* LARGER, cleaner creator info bar */}
            <Box sx={{ 
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backdropFilter: "blur(20px)", // Increased blur
                background: "rgba(0, 0, 0, 0.8)", // Slightly darker
                padding: { xs: "32px 28px", md: "38px 34px" }, // Increased padding
                zIndex: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgba(50, 50, 50, 0.2)" // Added subtle border
            }}>
                {/* Left side - Creator info */}
                <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 3 // Increased gap
                }}>
                    <Avatar 
                        sx={{ 
                            width: 56, // Larger avatar
                            height: 56,
                            border: "1px solid rgba(80, 80, 80, 0.4)",
                            backgroundColor: "rgba(16, 16, 16, 0.8)",
                            color: "#fff",
                            fontSize: "1.4rem",
                            fontWeight: 500,
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)" // Added shadow
                        }}
                    >
                        {user.name.charAt(0)}
                    </Avatar>
                    
                    <Box>
                        <Typography sx={{ 
                            color: "#ffffff",
                            fontSize: "1.25rem", // Larger name
                            fontWeight: 500,
                            lineHeight: 1.3,
                            mb: 0.5
                        }}>
                            {user.name}
                        </Typography>
                        <Typography sx={{ 
                            color: "rgba(200, 200, 200, 0.8)",
                            fontSize: "0.9rem",
                            fontWeight: 400,
                            lineHeight: 1.2
                        }}>
                            Challenge #{challengeId}
                        </Typography>
                    </Box>
                </Box>
                
                {/* Right side - File name */}
                <Box sx={{
                    maxWidth: "50%",
                    textAlign: "right"
                }}>
                    <Typography sx={{ 
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "0.95rem",
                        fontWeight: 400,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        padding: "6px 12px", // Added padding
                        backgroundColor: "rgba(30, 30, 30, 0.5)", // Added subtle background
                        borderRadius: "8px", // Rounded corners
                        border: "1px solid rgba(60, 60, 60, 0.2)" // Subtle border
                    }}>
                        {winningCreation.fileName}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
});

export default WinningCreation;