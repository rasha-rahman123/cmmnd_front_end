import Head from "next/head";
import { Canvas } from "react-three-fiber";
import styles from "../styles/Home.module.css";
import Inter from "../public/Inter_Regular.json";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { input, Label } from "@rebass/forms";
import { Box, Button, Image } from "rebass";
import Router from "next/router";
import Scene from './Scene.js';

const pics = ['https://i.imgur.com/rHMyAH9.jpg','https://i.imgur.com/iaD8oK0.jpg','https://i.imgur.com/3T2VBtX.jpg','https://i.imgur.com/rv9FbOD.jpg']




//figure out how to disable nav menu and border
export default function Home({ products }) {

  const mesh = useRef(null);
  const loginstuff = async () => {
    const loginInfo = {
      password: password,
    };
    loginInfo.password === process.env.NEXT_PUBLIC_ENTRY_PASS &&
      Router.push({
        pathname: "/shop",
        query: {
          pw: password,
        },
      });

    console.log(process.env.NEXT_PUBLIC_ENTRY_PASS, loginInfo.password);
  };

  const inputRef = useRef();
  const [alert, setAlert] = useState();
  const [showPass, setShowPass] = useState(false);
  const [password, setPassword] = useState("");

  const authSiteEnter = () => {
    loginstuff();
  };

  return (
    <div className={styles.container} style={{cursor: `url('/cursor.png')`}}>
      <Head>
        <title>{mesh.current && mesh.current.rotation.x}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Canvas shadowMap colorManagement
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 7], fov: 50, }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          zIndex: -2,
          background: "white"
        }}
      >
      <Scene />
      </Canvas>
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          margin: "auto auto",
          left: 0,
          width: "100%",
          justifyContent: "center",
          bottom: "150px",
          transition: "all 400ms ease-in-out 100ms",
          transform: showPass ? "translateY(-50px)" : "translateY(0px)",
        }}
      >
        <Button
          variant = 'secondary'
          sx={{ mb: 2, fontFamily: "Lekton", fontSize: 4, height: 30, border: 0 }}
          onClick={() => (showPass ? authSiteEnter() : setShowPass(true))}
        >
          Enter
        </Button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authSiteEnter();
          }}
        >
          <input
            ref={inputRef}
            sx={{
              py: 2,
              background: "black",
              color: "white",
              border: "none",
              outline: "none",
              textAlign: "center",
              fontSize: 24,
              opacity: showPass ? 1 : 0,
              transition: "all 300ms ease 500ms",
              borderRadius: 15,
              alignSelf: "center",
              margin: "0 auto",
              fontFamily: "Lekton",
              width: "50%",
            }}
            value={password}
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        {alert && <Label>Incorrect Password</Label>}
      </Box>
    </div>
  );
}
