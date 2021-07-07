import { Canvas } from "react-three-fiber";
import { useRef, useState, useContext } from "react";
import { Input, Label } from "@rebass/forms";
import { Box, Button, Image } from "rebass";
import { useRouter } from "next/router";
import Scene from '../components/Scene.js';
import TopNav from '../components/TopNav.js';
import {ShopContext} from '../context/ShopContext';
import { useContentful } from 'react-contentful';


export default function Home() {

  const inputRef = useRef();
  const [password, setPassword] = useState("");

  const {isShopOpen} = useContext(ShopContext)
  const router = useRouter();

  const {data, error, fetched, loading} = useContentful({
    contentType: 'password'
  });

  if (loading || !fetched) {
      return <div className="blank">loading</div>;
  }

  if (error) {
      console.error("error", error);
      return <div className="blank">error</div>;
  }

  if (!data) {
      return <p>Error leading landing, please try again later</p>;
  } 

  const showPass = data.items[0].fields.passwordActive;


  const authSiteEnter = async (e) => {
      const open = isShopOpen(password)

      if(open) {
        router.push({
          pathname: "/shop",
          query: {
            pw: password,
          }
        })
      }

      else { 
        window.alert("incorrect password")
      }
  }

  const enterSite = (e) => [ 
    router.push({
      pathname: "/shop"
    })
  ]

    // set is shop open to open

    // set the query to password field 
    // if correct, redirect to shop page & open shop in context


//zIndex: 0
  return (
    <div>
      <Canvas shadowMap colorManagement
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 7], fov: 50, }}
        style={{
          position: "fixed",
          overflow: "hidden",
          bottom: 0,
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
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          margin: "auto auto",
          left: 0,
          width: "100%",
          justifyContent: "center",
          top: showPass ? ["30vh", "35vh", "40vh"] : ["40vh", "45vh", "50vh"],
          transition: "all 400ms ease 100ms",
        }}
      >
        <Button
          variant = 'secondary'
          sx={{ mb: 2, fontFamily: "Lekton", fontSize: 4, height: 30, border: 0, outline: 'none' }}
          onClick={() => (showPass ? authSiteEnter : enterSite())}
        >
          ENTER
        </Button>
        {showPass &&
          <>
            <form
              sx={{
                position: "fixed",
                bottom: "-50px",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                authSiteEnter(e);
              }}
            >
              <Input
                ref={inputRef}
                sx={{
                  py: 2,
                  background: "#00000015",
                  border: "none",
                  outline: "none",
                  textAlign: "center",
                  fontSize: 28,
                  transition: "all 300ms ease 500ms",
                  margin: "0 auto",
                  position: "relative",
                  bottom: showPass ? "-2vh" : "-3vh",
                  opacity: showPass? 1 : 0,
                  fontFamily: "Lekton",
                  width: ["50%", "40%", "30%"],
                }}
                value={password}
                type="password"
                placeholder="Password?"
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>

            <Box className="sub-nav"
            sx={{
              transition: "all 300ms ease 500ms",
              margin: "0 auto",
              position: "relative",
              bottom: showPass ? "-5vh" : "-6vh",
              opacity: showPass? 1 : 0
            }}>
              <TopNav splash={true}></TopNav>
            </Box>
          </>
        }
      </Box>
    </div>
  );
}
