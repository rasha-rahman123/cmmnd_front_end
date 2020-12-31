import Head from "next/head";

import styles from "../styles/Home.module.css";
import { Canvas, useFrame, useThree, extend, useLoader } from "react-three-fiber";
import Inter from "../public/Inter_Regular.json";
import * as THREE from "three";
import { Suspense, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Input, Label } from "@rebass/forms";
import { Box, Button, Image } from "rebass";
import Router from "next/router";
import { ClampToEdgeWrapping, LinearFilter, TextureLoader } from "three";

const pics = ['https://i.imgur.com/rHMyAH9.jpg','https://i.imgur.com/iaD8oK0.jpg','https://i.imgur.com/3T2VBtX.jpg','https://i.imgur.com/rv9FbOD.jpg']

function Bird({ factor = 2, i, swag, ...props }) {
  const red = swag + 1;
  //   useFrame((state, delta) => {
  //    group.current.rotation.y < 4 ? (group.current.rotation.y +=
  //  Math.sin((delta * red) / 2)) :  (group.current.rotation.y =-
  //   Math.sin((delta * red) / 2))
  //   });
  var scale = 0.6;
  useFrame(({ clock }) => {
    ;
    // group.current.rotation.x = 0.05;
    group.current.position.x  = group.current.rotation.y = 0.2 + -0.2*swag - Math.sin(clock.getElapsedTime()) * 0.1;
    // group.current.rotation.z = -0.2 + -0.2*swag - Math.sin(clock.getElapsedTime()) * 0.1;

    // group.current.scale.z =  group.current.scale.y = group.current.scale.x = scale
    group.current.position.y = 0 - 2 * swag

    group.current.position.z =+ group.current.position.z < 10 && i%3
  
  });
  const group = useRef();
  const [col, setCol] = useState(props.color);
  const texture = useLoader(TextureLoader, pics[i%3]);
 
  
  useMemo(() => {
    texture.generateMipmaps = false
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping
    texture.minFilter = LinearFilter
    texture.needsUpdate = true
    videoTexture.magFilter = LinearFilter
    videoTexture.minFilter = LinearFilter
  }, [
    texture.generateMipmaps,
    texture.wrapS,
    texture.wrapT,
    texture.minFilter,
    texture.needsUpdate,
    videoTexture.magFilter,
    videoTexture.minFilter
  ])


  
  return (
    <group ref={group} dispose={null}>
      <scene name="Scene" {...props}>
        <mesh onClick={() => setCol("blue")}>
          <boxBufferGeometry
            attach="geometry"
            args={[8,4.5, 1.125]}
           
          />
          <meshBasicMaterial
            attach="material"
            map={ i > 0 ? texture : texture}
          
    
            roughness={0.9}
            metalness={1}
          />
        </mesh>
      </scene>
    </group>
  );
}
function Birds() {
  return new Array(9).fill().map((_, i) => {

    const y = -6;

    let factor = 0.2 * (i % 3);
    return (
      <Bird
        key={i}
        i={i}
        swag={i %3}
        position={[-10 + (i%3)*10, y + (2 * i), -20]}
        rotation={[0, 0, 0]}
        factor={factor}
        color={`red`}
      />
    );
  });
}

export default function Home({ products }) {
  const font = new THREE.FontLoader().parse(Inter);

  const textOptions = {
    font,
    size: 3,
    height: 0.5,
  };

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
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
    <Image
    className="Logo__Yes"
            src="/llll.png"
            sx={{
              width: "35%",
              height: "35%",
              filter: "none",
              ":hover": { filter: "invert()" },
            }}
          />
      </Box>
      <Canvas
        colorManagement={false}
        concurrent
        camera={{
          position: [0  , 0, 0],

          // rotation: [-0.3, -1.4, -0.3],
        }}

        // camera={{
        //   position: [9, 0, 5],
        //   far: 10000,
        // }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100%",
          zIndex: -2,
          background: 'black'
        }}
      >
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />

        <Suspense fallback={null}>
        <Birds />
        </Suspense>
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
          sx={{ mb: 2, fontFamily: "Lekton", fontSize: 4, height: 30 }}
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
          <Input
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
