import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, deleteProduct } from "../redux/productReducer/action";

// import "../styles/main.css"
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
  Box,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function AllProducts() {
  const dispatch = useDispatch();
  const toast = useToast();

  const { products, deleteSuccess, message, isError, myProducts } = useSelector(
    (store) => store.productReducer
  );
  useEffect(() => {
    dispatch(allProducts);
  }, [products, myProducts, deleteSuccess]);

  function handleDelete(id) {
    dispatch(deleteProduct(id));
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
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(3,1fr)"}
      margin={"auto"}
      textAlign={"center"}
    >
      {products.length > 0 &&
        products?.map((el) => {
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
                    {" "}
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
  );
}

export default AllProducts;
