import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  IconButton,
  InputRightElement,
  InputGroup,
  useToast,
} from '@chakra-ui/react';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import { LoginUser, RegisterUser } from '../api/auth';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)

  const handleClick = () => setShow(!show)
  const handleClick2 = () => setShow2(!show2)

  const toast = useToast()
  const handleRegister =(e)=>{
    e.preventDefault()
    RegisterUser(email,password,name).then((res)=>{
      setIsLogin(true)
      toast({
        title: 'Account Created Successfully',
        status: 'success',
        duration: 3000,
        isClosable: false
      })
    })
  }
  const handleLogin =(e)=>{
    e.preventDefault()
    LoginUser(email,password).then((res)=>{
      toast({
        title: 'Logged In Successfully',
        status: 'success',
        duration: 3000,
        isClosable: false
      })
      console.log(res)
      window.location.href = '/home'
      localStorage.setItem("token" , res.access_token)
    })
  }


  return (
    <Box
      minH="100vh"
      bg={useColorModeValue('gray.50', 'gray.800')}
      py={12}
      px={4}
    >
      <Container maxW="lg">
        <Box
          bg={useColorModeValue('white', 'gray.700')}
          py={8}
          px={10}
          shadow="xl"
          borderRadius="xl"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor={useColorModeValue('gray.200', 'gray.600')}
        >
          <VStack spacing={8}>
            <VStack spacing={2}>
              <Heading fontSize="3xl">
                {isLogin ? 'Welcome back' : 'Create account'}
              </Heading>
              <Text color="gray.500" fontSize="md" textAlign="center">
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Sign up to get started with our platform'}
              </Text>
            </VStack>

            <HStack w="full" spacing={4}>
              <Button
                w="full"
                variant="outline"
                leftIcon={<FaGithub />}
              >
                Github
              </Button>
              <Button
                w="full"
                variant="outline"
                leftIcon={<FaTwitter />}
              >
                Twitter
              </Button>
            </HStack>

            <HStack w="full">
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="gray.500">
                or continue with
              </Text>
              <Divider />
            </HStack>

            <form onSubmit={(e)=>{!isLogin?handleRegister(e):handleLogin(e)}}>
            <VStack spacing={6} w="full">
              {!isLogin && (
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    size="lg"
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  size="lg"
                  onChange={(e) => { setEmail(e.target.value) }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    size="lg"
                    placeholder='Password'
                    onChange={(e) => { setPassword(e.target.value) }} type={show ? 'text' : 'password'}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button mt={2} size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {!isLogin &&
                <FormControl>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size='md'>
                    <Input
                      size="lg"
                      placeholder='Confirm Password'
                      onChange={(e) => { setConfirmPassword(e.target.value) }} type={show2 ? 'text' : 'password'}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button mt={2} size='sm' onClick={handleClick2}>
                        {show2 ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>}

              <Button
                w="full"
                size="lg"
                colorScheme="purple"
                type="submit"
                disabled={!isLogin?(password !== confirmPassword) || (name==='' || email==='' || password===''):(email==='' || password==='')}
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </Button>
            </VStack>
</form>
            <Text fontSize="md">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Button
                variant="link"
                colorScheme="purple"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}