import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Box, Text } from "rebass";
import { log } from "three";
import Layout from "../components/Layout";
import AuthContext from "../context/AuthContext";
import { API_URL } from "../utils/urls";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const fetchOrders = () => setTimeout(async () => {
      if (user) {
        try {
            setLoading(true)
          const token = await getToken();
          const order_res = await fetch(`${API_URL}/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await order_res.json();
          setOrders(data);
          console.log(data);
        } catch (err) {
          setOrders([]);
          console.log(err);
        
        }
        setLoading(false)
      }
    },1000);
    fetchOrders();
  }, []);
  return {orders, loading}
};

const Account = () => {
  const { logoutUser, user, getToken } = useContext(AuthContext);

  const {orders,loading} = useOrders(user, getToken);
  console.log(orders)
  if (!user) {
    return (
      <Layout>
        <Box>
          <Text as="p">Please login or register</Text>
          <Link href="/">
            <a>Go Back</a>
          </Link>
        </Box>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Box>
        <Head>
          <title>Account Page</title>
        </Head>

        <Text as="h2"> Account Page</Text>
        <Text as="h4">(Logged in as {user.email})</Text>
        <Box as="a" href="#" onClick={logoutUser}>
          Log Out
        </Box>

        <Text as="h3">Your orders: {loading && '(loading orders)'}</Text>

        {/* {orders.map((x,i) => {
            <Box key={x.id}>
 <Text>{x.product.n</Text>
            </Box>})} */}
        {user && orders && orders.reverse().map((x) => <Box key={x.id} my={4}> {new Date(x.created_at).toLocaleDateString('en-EN')} <br />An order for {x.product.name} was created and <Text sx={{display: 'inline'}} fontWeight={600}>{x.status}</Text> by you. <Text>Shipping To:</Text><Text fontWeight={500}>{x.address_first_name} {x.address_last_name}</Text><Text fontWeight={500}>{x.street_name} {x.zipcode}</Text>
       
        <Text>{x.shipped ? `Item has been shipped!` :  `Item has yet to be shipped, sorry.`}</Text>
        <Text>{`Tracking Number: ${x.tracking_number}`}</Text></Box>)}
      </Box>
    </Layout>
  );
};

export default Account;
