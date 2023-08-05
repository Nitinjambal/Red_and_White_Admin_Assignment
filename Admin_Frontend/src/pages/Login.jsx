import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginFunction } from "../redux/authReducer/action.js";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((store) => store.authReducer);

  const handleForm = () => {
    const userData = {
      email,
      password,
      confirmPassword,
    };

    if (email == "" || password == "" || confirmPassword == "") {
      toast({
        title: `Enter Your All Creditaionls`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else if (password !== confirmPassword) {
      toast({
        title: "Password and ConfirmPassword doesn't match",
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
    dispatch(loginFunction(userData));
  };

  useEffect(() => {
    if (state.loginSuccess) {
      toast({
        title: state.message,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate(location.state, { replace: true });
      }, 1000);
    } else if (state.isError) {
      toast({
        title: state.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  }, [state.loginSuccess, state.isError]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"} width={"100%"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to access our cool <Text color={"blue.400"}> webiste</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  value={password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Conform Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirmPassword"
                  value={confirmPassword}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isDisabled={state.isLoading}
                onClick={handleForm}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
