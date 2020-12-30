import { Box, Button, Text } from 'rebass'
import Layout from '../components/Layout'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { API_URL } from '../utils/urls'
import AuthContext from '../context/AuthContext'

const useOrder = (session) => {
    const [order,setOrder] = useState(null)
    const [loading,setLoading] = useState(false)
    const {getToken, user} = useContext(AuthContext)
    useEffect(() => {
        const fetchOrder = async () =>  {
            setLoading(true)
            const token = await getToken()
            try{
             const res = await fetch(`${API_URL}/orders/confirm`, {
                 method: 'POST',
                 headers:{
                     'Content-type': 'application/json',
                     'Authorization': `Bearer ${token}`
                 },
                 body: JSON.stringify({checkout_session: session})
             })
             const data = await res.json()
             setOrder(data)
            } catch(err){
                setOrder(null)
            }
            setLoading(false)
        }
        fetchOrder()
       
    },[session])

    return {order, loading}
}

export default function Success(){

    const router = useRouter()
    const {session_id} = router.query

    const {order,loading} = useOrder(session_id)
    return (
        <Layout>
            <Head>
                <title>Thank you for your order</title>
            </Head>
            <Box>
                <Text>
                    Congratulations!
                </Text>
              
                {loading && <Text as="p">Loading</Text>}
                {order && <Text as="p">Your order has been confirmed, with order number: {order.id}</Text>}
            </Box>
        </Layout>
    )
}