
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Box, Text, Button, Image } from "rebass";

import Modal from "react-modal";

import { parseCookies } from "nookies";
import { ShopContext } from "../context/ShopContext";
import Cart from "./Cart";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    border: "none",
    boxShadow: "0px 0px 10px #00000070, 0px 0px 18px #00000015",
    transition: "all 300ms ease",
    width: "70vw",
    padding: 30,
  },
};


Modal.setAppElement("#__next");

const Layout = ({ children }) => {
  const {checkout, isCartOpen, closeCart, openCart} = useContext(ShopContext)
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const borderBg = "black";
  
  const cookies = parseCookies();
  const query = router.query.pw || '';


  const navi = [
    { text: "Shop", link: "/shop?pw=" + query },
    { text: "About", link: "/about?pw=" + query },
    { text: "Contact", link: "/contact?pw=" + query },
    { text: "Archive", link: "/archive?pw=" + query },
  ];

  return router.query.pw === process.env.NEXT_PUBLIC_ENTRY_PASS ? (
    <Box sx={{ width: "100%", maxHeight: "98vh" }}>
       <Box
        sx={{
          display: ["flex","none"],
          justifyContent: "center",
          alignItems: 'center',
          flexDirection: "column",
          my: 10,
          top: 0,
          left: 0,
          p: [3, 3],
          width: "98vw",
        }}
      >
        <Box  sx={{ visibility: router.pathname === "/" && "hidden", mb: 2 }}>
            <Link href="/">
              <a>
               <Image src='/llll.png' width={64} sx={{filter: 'invert()', transition: 'all 300ms ease',":hover": {transform: 'scale(1.05)'}}}/>
              </a>
            </Link>
          </Box>
              <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      

    
          {navi.map((x, i) => (
            <Box>
              <Link href={x.link}>
                <a>
                  <Text
                    sx={{ mx: 2,fontSize: [3, 2], transition: 'all 300ms ease',":hover": {fontWeight: 600} }}
                    opacity={router.pathname === x.link.substr(0,x.link.indexOf('?')) ? 1 : 0.5}
                  >
                    {x.text} 
                  </Text>
                </a>
              </Link>
            </Box>
          ))}
          {checkout && checkout.lineItems && checkout.lineItems[0] && <Box>
             
                  <Text onClick={() => isCartOpen ? closeCart() : openCart() }
                    sx={{ cursor: 'pointer',my: 1,fontSize: [3, 2], transition: 'all 300ms ease',":hover": {fontWeight: 600} }}
                    opacity={1} color={'red'}
                  >
                    CART
                  </Text>
       
            </Box>}
          </Box>
       </Box>
      <Box  display={['none','initial']}>
      <Box
        sx={{
          width: 3,
          bg: borderBg,
          top: 170,
          left: 3,
          bottom: 3,
          position: "absolute",
        }}
      ></Box>

      <Box
        sx={{
          right: 3,
          bg: borderBg,
          height: 3,
          left: 3,
          top: 3,
          position: "absolute",
        }}
      ></Box>
      <Box
        sx={{
          width: 3,
          bg: borderBg,
          top: 3,
          right: 3,
          bottom: 3,
          position: "absolute",
        }}
      ></Box>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(email);
          }}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          my: 10,
          position: "absolute",
          top: 0,
          left: 0,
          p: [3, 3],

        }}
      >
       
        <Box>
          <Box sx={{ visibility: router.pathname === "/" && "hidden", mb: 2 }}>
            <Link href="/">
              <a>
               <Image src='/llll.png' width={64} sx={{filter: 'invert()', transition: 'all 300ms ease',":hover": {transform: 'scale(1.05)'}}}/>
              </a>
            </Link>
          </Box>

          {navi.map((x, i) => (
            <Box>
              <Link href={x.link}>
                <a>
                  <Text
                    sx={{ fontSize: [3, 2], transition: 'all 300ms ease',":hover": {fontWeight: 600} }}
                    opacity={router.pathname === x.link.substr(0,x.link.indexOf('?')) ? 1 : 0.5}
                  >
                    {x.text} 
                  </Text>
                </a>
              </Link>
            </Box>
          ))}
          {checkout && checkout.lineItems && checkout.lineItems[0] && <Box>
             
                  <Text onClick={() => isCartOpen ? closeCart() : openCart() }
                    sx={{ cursor: 'pointer',my: 1,fontSize: [3, 2], transition: 'all 300ms ease',":hover": {fontWeight: 600} }}
                    opacity={1} color={'red'}
                  >
                    CART
                  </Text>
       
            </Box>}
        </Box>
      </Box>
      </Box>

      <Box p={[3,6]}>{children}</Box>
      <Cart

      
              checkout={checkout}
              isCartOpen={isCartOpen}
              handleCartClose={closeCart}
            />
    </Box>
  ) : router.pathname !== '/' ? (
    <Box>No Access</Box>
  ) : <>{children}</>;
};

export default Layout;
