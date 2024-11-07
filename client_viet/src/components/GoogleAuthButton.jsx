
import { useGoogleLogin } from "@react-oauth/google";
import axios from "@/configs/axios";
import { useEffect, useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import AccountInfoButton from "./AccountInfoButton";
import decode from "@/configs/jwtDecoder";



const GoogleAuthButton =() =>{
    const [user,setUser] = useState(null)
    const login = useGoogleLogin({
        onSuccess: async (response) =>{
            console.log(response);
            try {
                const result = await axios.post(`/auth/login/google`,{
                    code: response.code,
                })
                const {user,jwt,refreshToken} = result.data.data
                localStorage.setItem('jwt', JSON.stringify(jwt))
                localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
                setUser(user)
            } catch (error) {
                console.error('Login failed:', error);
            }
        },
        flow: 'auth-code'
    })

    useEffect(() =>{
        const jwtData = decode(localStorage.getItem('jwt'));
        if(jwtData==999) {
           //xử lý với refreshToken
        } else if(jwtData) {
            setUser({google_id:jwtData.google_id, ho_ten:jwtData.ho_ten})
        }
    },[]);
    
    return (
        <div className="google-login-container">
            {user ? 
            <AccountInfoButton name={user.name}/> :
            <GoogleLoginButton onClick={()=> login()}/>} 
        </div>
        
    )
}
export default GoogleAuthButton;

