
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authReducer/action";
import { useEffect } from "react";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  let { auth, logoutSuccess, message, isLoading } = useSelector(
    (store) => store.authReducer
  );

  const handleLogout = () => {
    auth=true
      dispatch(logout);
     
    
  };

  useEffect(() => {
    if (logoutSuccess) {
      auth=false
      toast({
        title: message,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [logoutSuccess, auth]);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to="/">
            {" "}
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              Dashboard
            </Text>
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {!auth ? (
            <>
              <Link to="/login">
                <Button
                  as={"a"}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"pink.400"}
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  Log In
                </Button>
              </Link>

              <Link to="/register">
                <Button
                  as={"a"}
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"pink.400"}
                  _hover={{
                    bg: "pink.300",
                  }}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"pink.400"}
              cursor={"pointer"}
              _hover={{
                bg: "pink.300",
              }}
              disabled={isLoading}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity></Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link to={"/allProducts"}>
                <Box
                  as="a"
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "All Products",
  },
];
