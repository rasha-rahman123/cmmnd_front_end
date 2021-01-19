import Head from "next/head";
import { Canvas } from "react-three-fiber";
import styles from "../styles/Home.module.css";
import Inter from "../public/Inter_Regular.json";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Input, Label } from "@rebass/forms";
import { Box, Button, Image } from "rebass";
import { Router, useRouter } from "next/router";
import Link from "next/link";
import Scene from '../components/Scene.js';
import Layout from '../components/Layout.js';

const pics = ['https://i.imgur.com/rHMyAH9.jpg','https://i.imgur.com/iaD8oK0.jpg','https://i.imgur.com/3T2VBtX.jpg','https://i.imgur.com/rv9FbOD.jpg']


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

  const router = useRouter();
  const query = router.query.pw || '';

  //subnav copy pasted from Layout
  const navi = [
      { text: "Home", link: "/" + query},
      { text: "Shop", link: "/shop" + query, under_construction: true },
      { text: "Archive", link: "/archive" + query, under_construction: true },
      { text: "About", link: "/about" + query },
      { text: "Contact", link: "mailto:contact@cmmnd.com" + query },
      { text: "Stickers", link: "/stickerform" + query },
    ];

  const nav = navi.map((page) => (
      page.under_construction ?
      <h2><strike>{page.text}</strike></h2>
      : <Link href={page.link}>
          <a>
          <h2>{page.text}</h2>
          </a>
      </Link>
  ))

//zIndex: 0
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
          bottom: showPass ? "50vh" : "40vh",
          transition: "all 400ms ease-in-out 100ms",
        }}
      >
        <Button
          variant = 'secondary'
          sx={{ mb: 2, fontFamily: "Lekton", fontSize: 4, height: 30, border: 0 }}
          onClick={() => (showPass ? authSiteEnter() : setShowPass(true))}
        >
          ENTER
        </Button>
        <form
          sx={{
            position: "fixed",
            bottom: "-50px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            authSiteEnter();
          }}
        >
          <Input
            ref={inputRef}
            sx={{
              py: 2,
              background: "#00000015",
              color: "white",
              border: "none",
              outline: "none",
              textAlign: "center",
              fontSize: 24,
              transition: "all 300ms ease 500ms",
              borderRadius: 15,
              margin: "0 auto",
              position: "relative",
              bottom: showPass ? "-2vh" : "-3vh",
              opacity: showPass? 1 : 0,
              fontFamily: "Lekton",
              width: "50%",
            }}
            value={password}
            type="password"
            placeholder="Password?"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        {alert && <Label>Incorrect Password</Label>}
        <Box className="sub-nav"
        sx={{
          transition: "all 300ms ease 500ms",
          margin: "0 auto",
          position: "relative",
          bottom: showPass ? "-5vh" : "-6vh",
          opacity: showPass? 1 : 0
        }}>
          {nav}
        </Box>
      </Box>
    </div>
  );
}
