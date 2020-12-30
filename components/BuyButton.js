import { useRouter } from "next/router"
import { useContext } from "react"
import {loadStripe} from '@stripe/stripe-js'

import { Button } from "rebass"
import AuthContext from "../context/AuthContext"
import { STRIKE_PK,API_URL } from "../utils/urls"
import axios from 'axios'
const stripePromise =  loadStripe(STRIKE_PK)

export default function BuyButton({product, address,size, quantity}) {
    
    const {user, getToken} = useContext(AuthContext)
    const router = useRouter()
    const redirectToLogin =() => {
        router.push('/login')
    }

    const handleBuy = async () => {
        const stripe = await stripePromise
        const token = await getToken()


        await fetch(`${API_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify({product,address,size,quantity}),
            headers:{
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }).then(async res => {
            const session = await res.json()
            stripe.redirectToCheckout({sessionId: session.id})
        })

    }

    return (
        <>
        {!user && <Button onClick={() => redirectToLogin()}>Login to Buy</Button>}
        {user && <Button onClick={(e) => {
            e.preventDefault();
            handleBuy();
        }}>BUY</Button>}

        </>
    )
}