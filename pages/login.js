import Head from "next/head";
import { useContext, useState } from "react";
import { Box, Text, Button } from "rebass";
import { Form, Input } from "@rebass/forms";
import AuthContext from '../context/AuthContext'
export default function Login() {
  const [email, setEmail] = useState("");
  const {loginUser} = useContext(AuthContext)
  return (
    <Box>
      <Head>
        <title>Login x Cmmnd</title>
        <meta name="description" content="Login here to make your purchase" />
      </Head>

      <Text>Login</Text>
      <Box as="form" onSubmit={(e) => {
          e.preventDefault();
          loginUser(email)
      }} >
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address"/>
        <Button type="submit">Login</Button>
      </Box>
    </Box>
  );
}
