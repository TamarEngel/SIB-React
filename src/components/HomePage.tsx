import { useState } from "react"
import Login from "./user/Login"
import SignUp from "./user/SignUp"
import UpdateUser from "./user/UpdateUser"
import FileUploader from "./creation/FileUploader "


const HomePage = () =>{
    const [log, setLog] = useState(false)
    const [signUp, setSignUp] = useState(false)

    return (<>
        {!log && <Login setLog={setLog} />}
        {!signUp && !log && <SignUp setSignUp={setSignUp} />}
        {(log || signUp) && <UpdateUser/>}
        {(log || signUp) && <FileUploader/>}
    </>)
}
export default HomePage
