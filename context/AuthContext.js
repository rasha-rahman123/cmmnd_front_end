import {createContext, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Magic} from 'magic-sdk'
import {MAGIC_PUBLIC_KEY} from '../utils/urls'
const AuthContext = createContext();
let magic;
export const AuthProvider = (props) => {

    const [user, setUser] = useState(null)
    const [data,setData] = useState()
    const [prot,setProt] = useState(null)
    const router = useRouter();
    const loginUser = async (email) => {
        try {
            await magic.auth.loginWithMagicLink({email})
            setUser({email})
            router.back();
        } catch(err){
            setUser(null)
        }
      

    }

    const logoutUser = async () => {
        await magic.user.logout()
        setUser(null)
        router.push('/')

    }

    const checkUserLoggedIn = async () => {
     
        try {
            const isLoggedIn = await magic.user.isLoggedIn()
            if(isLoggedIn) {
             magic.user.getMetadata().then(res => setUser({email: res['email']}))


             const token = await getToken()
          
           
            }
        } catch (err){

        }
    }

    const getToken = async () => {
        try{
          const token = await magic.user.getIdToken()
          return token
        } catch (err) {
          console.log(err)
        }
      }

    useEffect(() => {
        magic = new Magic(MAGIC_PUBLIC_KEY)
        checkUserLoggedIn()
    },[])

    return (
        <AuthContext.Provider value={{user,loginUser,logoutUser, getToken, prot, setProt}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;