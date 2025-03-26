export const getUserDataFromToken = (): { id:number | null,userId: string | null, name: string | null, email: string | null, role: string | null } => {
    const token = sessionStorage.getItem("token");
    if (!token) return { id:null,userId: null, name: null, email: null, role: null };

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
            id: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null,
            userId: payload["UserId"] || null,
            name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || null,
            email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || null,
            role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null
        };
    } catch (error) {
        console.error("Error decoding token:", error);
        return { id:null,userId: null, name: null, email: null, role: null };
    }
};

