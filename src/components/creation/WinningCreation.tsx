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


// WinningCreation.tsx
import { Typography, Box, Avatar, IconButton } from "@mui/material";
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
                background: "rgba(15, 15, 22, 0.4)"
            }}>
                <Box sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "2px solid rgba(100, 100, 255, 0.1)",
                    borderTop: "2px solid rgba(140, 140, 255, 0.7)",
                    animation: "spin 1s linear infinite",
                    mb: 3,
                    "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                    }
                }} />
                <Typography sx={{ 
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "0.85rem",
                    fontWeight: 500
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
                background: "rgba(15, 15, 22, 0.4)",
                padding: "20px"
            }}>
                <Box sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(30, 30, 50, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2
                }}>
                    <Typography component="span" sx={{ fontSize: "1.8rem", opacity: 0.5 }}>
                        🏆
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ 
                    color: "rgba(255, 255, 255, 0.7)",
                    textAlign: "center",
                    mb: 1
                }}>
                    No winning creation found
                </Typography>
                <Typography variant="body2" sx={{ 
                    color: "rgba(255, 255, 255, 0.5)",
                    textAlign: "center",
                    maxWidth: "260px"
                }}>
                    This challenge may not have any entries or the voting hasn't been completed yet
                </Typography>
            </Box>
        );
    }

    return (
        <Box 
            sx={{ width: "100%", height: "100%", position: "relative" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Dramatic spotlight effect on hover */}
            <Box sx={{ 
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isHovered 
                    ? "radial-gradient(circle at center, rgba(0,0,0,0), rgba(0,0,0,0.7))" 
                    : "none",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.7s ease",
                pointerEvents: "none",
                zIndex: 2
            }} />
            
            {/* Creation image display */}
            <Box sx={{ 
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
                "& > div": {
                    height: "100%"
                }
            }}>
                <CreationView fileName={winningCreation.fileName} />
            </Box>
            
            {/* Vote badge - enhanced for better visibility */}
            <Box sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
                background: "linear-gradient(to right, rgba(20, 20, 40, 0.85), rgba(40, 40, 70, 0.85))",
                backdropFilter: "blur(8px)",
                padding: "8px 14px",
                borderRadius: "20px",
                border: "1px solid rgba(140, 140, 255, 0.2)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                transform: isHovered ? "scale(1.05)" : "scale(1)"
            }}>
                <Box component="span" sx={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 180, 100, 0.9)",
                    boxShadow: "0 0 10px rgba(255, 180, 100, 0.5)"
                }} />
                <Typography sx={{
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#ffffff",
                }}>
                    {winningCreation.votes || 0} Votes
                </Typography>
            </Box>
            
            {/* Enhanced creator info bar */}
            <Box sx={{ 
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backdropFilter: "blur(12px)",
                background: "linear-gradient(to top, rgba(10,10,25,0.95) 0%, rgba(10,10,25,0.8) 80%, rgba(10,10,25,0) 100%)",
                padding: { xs: "20px 16px", md: "24px 20px" },
                zIndex: 4,
                transform: isHovered ? "translateY(0)" : "translateY(20px)",
                opacity: isHovered ? 1 : 0.85,
                transition: "all 0.4s ease",
                display: "flex",
                flexDirection: "column"
            }}>
                {/* Top section with file name and action buttons */}
                <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    mb: 1.5
                }}>
                    <Typography sx={{ 
                        color: "#ffffff",
                        fontWeight: 500,
                        fontSize: "1rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "calc(100% - 100px)"
                    }}>
                        {winningCreation.fileName}
                    </Typography>
                    
                    <Box sx={{ 
                        display: "flex", 
                        gap: 1 
                    }}>
                        {/* Additional user interaction buttons - for visual enhancement */}
                        <IconButton 
                            size="small" 
                            aria-label="download" 
                            sx={{ 
                                width: "28px", 
                                height: "28px",
                                color: "rgba(255, 255, 255, 0.8)",
                                backgroundColor: "rgba(60, 60, 100, 0.3)",
                                border: "1px solid rgba(140, 140, 255, 0.2)",
                                "&:hover": {
                                    backgroundColor: "rgba(80, 80, 130, 0.4)",
                                }
                            }}
                        >
                            <Box component="span" 
                                sx={{ 
                                    fontSize: "0.9rem", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center" 
                                }}
                            >
                                ↓
                            </Box>
                        </IconButton>
                        
                        <IconButton 
                            size="small" 
                            aria-label="share" 
                            sx={{ 
                                width: "28px", 
                                height: "28px",
                                color: "rgba(255, 255, 255, 0.8)",
                                backgroundColor: "rgba(60, 60, 100, 0.3)",
                                border: "1px solid rgba(140, 140, 255, 0.2)",
                                "&:hover": {
                                    backgroundColor: "rgba(80, 80, 130, 0.4)",
                                }
                            }}
                        >
                            <Box component="span" 
                                sx={{ 
                                    fontSize: "0.9rem", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center" 
                                }}
                            >
                                ⤴
                            </Box>
                        </IconButton>
                    </Box>
                </Box>
                
                {/* Bottom section with creator info */}
                <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between"
                }}>
                    <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 1.5
                    }}>
                        <Avatar 
                            sx={{ 
                                width: 36, 
                                height: 36,
                                border: "2px solid rgba(140, 140, 255, 0.3)",
                                backgroundColor: "rgba(30, 30, 60, 0.6)",
                                color: "#fff",
                                fontSize: "1rem",
                                fontWeight: 600
                            }}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        
                        <Box>
                            <Typography sx={{ 
                                color: "#ffffff",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                lineHeight: 1.3
                            }}>
                                {user.name}
                            </Typography>
                            <Typography sx={{ 
                                color: "rgba(180, 180, 255, 0.9)",
                                fontSize: "0.75rem",
                                fontWeight: 400,
                                lineHeight: 1.2
                            }}>
                                Winner • Challenge #{challengeId}
                            </Typography>
                        </Box>
                    </Box>
                    
                    {/* View profile button that appears on hover */}
                    <Box sx={{
                        padding: "6px 12px",
                        backgroundColor: "rgba(100, 100, 255, 0.15)",
                        color: "rgba(180, 180, 255, 1)",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        border: "1px solid rgba(140, 140, 255, 0.3)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateX(0)" : "translateX(10px)",
                        "&:hover": {
                            backgroundColor: "rgba(120, 120, 255, 0.2)",
                            border: "1px solid rgba(140, 140, 255, 0.4)",
                        }
                    }}>
                        View Profile
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

export default WinningCreation;