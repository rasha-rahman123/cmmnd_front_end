import Head from "next/head";
import { Box, Button, Image, Text } from "rebass";
import Modal from "react-modal";

import { useContext, useEffect, useState } from "react";


import { useRouter } from "next/router";

import { ShopContext } from "../../context/ShopContext";

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
    padding: "30px 50px",
  },
};

const ButtonSize = ({ children }) => (
  <Box
    sx={{
      bg: "#FFFFFF",
      width: 50,
      textAlign: "center",
      m: 3,
      borderRadius: 6,
      boxShadow: "0px 2px 4px #00000010",
      cursor: "pointer",
      height: 20,
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {children}
  </Box>
);

const ButtonSizeChosen = ({ children }) => (
  <Box
    sx={{
      bg: "black",
      color: "white",
      fontWeight: 800,
      width: 50,
      textAlign: "center",
      m: 3,
      borderRadius: 6,
      boxShadow: "0px 2px 4px #00000010",
      cursor: "pointer",
      height: 20,
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {children}
  </Box>
);

Modal.setAppElement("#__next");

const Product = ({ client }, props) => {
  const router = useRouter();
  const productID = router.query.id;
  const [size, setSize] = useState();
  const [quantity, setQuantity] = useState(1);
  const [variant,setVariant] = useState()
  const {fetchProductWithId, product, addItemToCheckout} = useContext(ShopContext)

  useEffect(() => {
    console.log(variant)
  },[variant])
 
  useEffect(async () => {
   productID && await fetchProductWithId(productID)

  
   
  }, []);

  useEffect(() => {
    document.getElementById('swa').innerHTML = product.descriptionHtml
    product && product.variants && setVariant(product.variants[0].id)
  },[product])
  const [isCartOpen, setIsCartOpen] = useState()
  const [checkout, setCheckout] = useState({lineItems: []})
  const [products, setProducts] = useState([])
  const [shop, setShop] = useState({})
  
  
  return (
      <Box>
        <Head>
          <title>{product && product.title} - CMMND</title>
        </Head>
        <Box
          width="100%"
          sx={{ textAlign: "center", fontSize: 7, mt: 5 }}
        ></Box>
        <Box
          sx={{
            display: ["flex","grid"],
            gridTemplateColumns: "50% 50%",
            flexDirection: 'column',
            width: "80%",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              boxShadow:
                "3px 3px 29px -12px rgba(0,0,0,0.75),3px 3px 52px 21px rgba(0,0,0,0.15)",
              margin: "auto",
            }}
          >
            <Image src={product && product.images && product.images[0].src} width={[300]} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: ["center", "flex-start"],
              p: [0, 2],
              ml: [0, 5],
            }}
          >
            <Text as="h4" fontSize={24} mt={3}>
              {product && product.title}
            </Text>

            <Text
              sx={{ textAlign: "left", opacity: 0.6, mt: 2, mb: 3 }}
              fontSize={3}
            >
              ${product && product.variants && product.variants[0].price} 
            </Text>
            <Box sx={{ width: "100%", height: 2, bg: "black", mb: 3 }} />
            <Text
              id={"swa"}
              sx={{ textAlign: "left", opacity: 0.6, mt: 2 }}
              fontSize={2}
            ></Text>

            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center'
              }}
            >
              <Text fontSize={3} mr={2}>
                Size:{" "}
              </Text>
              {/* <Box> {variantSelectors}</Box> */}
              <Box width={200}> <select
    id='country'
    name='country'
    fontSize={2}
    onChange={(e) =>setVariant(e.target.value)}
   >
    { product && product.variants && (product.variants).map((x,i) => (
      <option
        key={i} value={x.id}>
        {x.title}
      </option>
    ))}
  </select></Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text fontSize={3} mr={2}>
                Quantity:{" "}
              </Text>
              <Box sx={{ display: "flex", flexDirection: "space-between" }}>
                <Button
                  onClick={() => quantity > 0 && setQuantity((c) => c - 1)}
                  width={2}
                  mr={1}
                  display="flex"
                  sx={{
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  -
                </Button>
                <Text fontSize={3}>{quantity}</Text>
                <Button
                  onClick={() => setQuantity((c) => c + 1)}
                  width={2}
                  ml={1}
                  display="flex"
                  sx={{
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </Button>
              </Box>
           
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                my: 4
              }}
              ><Button onClick={() => addItemToCheckout(variant, quantity)} width={150} height={50}><Text fontSize={2}>ADD TO CART</Text></Button></Box>
          </Box>
        </Box>
      </Box>
  );
};

export default Product;
