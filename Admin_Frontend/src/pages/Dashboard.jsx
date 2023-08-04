import "../styles/main.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Text,
  grid,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getdata } from "../redux/authReducer/action.js";
import {
  addProduct,
  deleteProduct,
  myAllProducts,
} from "../redux/productReducer/action.js";

import "../styles/main.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const { loginUser } = useSelector((store) => store.authReducer);
  const {
    deleteSuccess,
    message,
    isError,
    myProducts,
    products,
    productAddSuccess,
  } = useSelector((store) => store.productReducer);


  useEffect(() => {
    dispatch(getdata);
  }, [loginUser]);

  function handleForm(e) {
    e.preventDefault();
    const productDetails = {
      image,
      title,
      description,
      price,
    };
    dispatch(addProduct(productDetails)).then(() => {
      dispatch(myAllProducts);
    });
    if (image == "" || title == "" || description == "" || price == "") {
      toast({
        title: `Enter All Details`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    if (productAddSuccess) {
      toast({
        title: message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
      setTitle("");
      setImage("");
      setDescription("");
      setPrice("");
    } else if (isError) {
      toast({
        title: message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  }, [isError, message, productAddSuccess]);

  useState(() => {
    dispatch(myAllProducts);
  }, [myProducts, productAddSuccess,products]);

  function handleDelete(id) {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(myAllProducts);
    });
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast({
        title: message,
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else if (isError) {
      toast({
        title: message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  }, [deleteSuccess, message, isError]);

  return (
    <div>
      <h1>Login_User:- {loginUser.userName}</h1>
      <h3>Email:- {loginUser.email}</h3>

      <hr style={{ border: "2px solid black", margin: "20px 0px" }} />

      <h1 className="titleText">ADD NEW PRODUCT</h1>

      <form className="main-form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Image_URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="normalBtn">ADD PRODUCT</button>
      </form>

      <hr style={{ border: "2px solid black", margin: "20px 0px" }} />

      {/* MY_PRODUCT_ALL_SECTION */}
      <h1 className="titleText">MY ALL PRODUCTS</h1>
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(3,1fr)"}
        margin={"auto"}
      >
        {myProducts.length > 0 &&
          myProducts?.map((el) => {
            return (
              <Card maxW="sm" key={el.title}>
                <CardBody>
                  <Image src={el.image} alt={el.title} borderRadius="lg" />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{el.title}</Heading>
                    <Text>{el.description}</Text>
                    <Text color="blue.600" fontSize="2xl">
                      {el.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => handleDelete(el._id)}
                    >
                      DELETE
                    </Button>
                    <Link to={`/edit/${el._id}`}>
                      <Button variant="ghost" colorScheme="blue">
                        EDIT
                      </Button>
                    </Link>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
      </Box>
    </div>
  );
}

export default Dashboard;
