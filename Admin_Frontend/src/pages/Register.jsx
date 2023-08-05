import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { registerFunc } from "../redux/authReducer/action.js";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((store) => store.authReducer);

  const handleFormData = () => {
    const data = {
      userName,
      email,
      password,
      confirmPassword,
    };

    if (
      userName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      toast({
        title: `Enter Your All Creditaionls`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else if (confirmPassword !== password) {
      toast({
        title: `Password & ConfirmPassword Should be same`,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    } else {
      dispatch(registerFunc(data));
    }
  };

  useEffect(() => {
    if (state.registerSuccess) {
      toast(
        {
          title: state.message,
          status: "success",
          duration: 2000,
          position: "top",
          isClosable: true,
        },
        2000
      );

      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/");
    } else if (state.isError) {
      toast({
        title: state.message,
        status: "error",
        duration: 2000,
        position: "top",
        isClosable: true,
      });
    }
  }, [state.registerSuccess, state.message, state.isError]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} py={18} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to access our beautiful website ✌️
          </Text>
        </Stack>
        <Box
          width={"27vw"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"xl"}
          p={10}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    width={"155%"}
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    name="userName"
                    value={userName}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
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

            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleFormData}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isDisabled={state.isLoading}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text display={"flex"} align={"center"} justifyContent={"center"}>
                Already a user?{" "}
                <RouterLink to="/login">
                  <Text color={"blue.400"}> Login</Text>
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
