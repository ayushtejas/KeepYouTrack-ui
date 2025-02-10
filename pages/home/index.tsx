import {
  Box,
  Button,
  Container,
  Input,
  VStack,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  useColorModeValue,
  IconButton,
  Flex,
  Card,
  CardBody,
  CardHeader,
  useToast,
  Divider,
  Badge,
  AlertIcon,
  Alert,
  Stack,
  Spacer,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Grid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaPlay, FaStop, FaPlus, FaMoon, FaSun, FaInfoCircle, FaUser, FaSignOutAlt, FaAngleDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useStopwatch, useTimer } from 'react-timer-hook';
import { getUser } from '../api/auth';
import { addEvent, addTimer, getEvents, getTimers } from '../api/events';
import { BsThreeDotsVertical } from "react-icons/bs";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export function MyTimer({ expiryTimestamp }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <Box textAlign="center" py={6} fontSize="7xl" fontFamily="mono" color="purple.300">
      {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </Box>
  );
}

export default function FuturisticTracker() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  const [timerTitle, setTimerTitle] = useState('');
  const [qoutes, setQoutes] = useState('');
  const [records, setRecords] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDateTime, setEventDateTime] = useState('');
  const [countdowns, setCountdowns] = useState([]);
  const [now, setNow] = useState(new Date());
  const [runningStatus, setRunningStatus] = useState(false)
  const [userData, setUserData] = useState({})


  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,

  } = useStopwatch();



  const toast = useToast();

  const handleTimer = () => {
    setRunningStatus(!runningStatus)
    if (!runningStatus && !timerTitle) {
      toast({ title: 'Enter a timer title', status: 'error', duration: 3000, isClosable: true });
      return;
    }

    if (runningStatus) {
      setRecords([...records, { title: timerTitle, duration: totalSeconds, created_at: new Date().toLocaleString() }]);
      addTimer(timerTitle,totalSeconds).then((res)=>{
        console.log(res)
      })
      reset()
      pause()
      setTimerTitle('')
    } else {
      start();
    }
  };

  const handleAddCountdown = () => {
    if (!eventTitle || !eventDateTime) return;

    const targetDate = new Date(eventDateTime);
    setCountdowns([...countdowns, { title: eventTitle, target_date:targetDate }]);
    addEvent(eventTitle, targetDate).then((res)=>{
      console.log(res)
    })
  };

  useEffect(() => {
    setQoutes(timeQuotes[Math.floor(Math.random() *20)])
    getUser().then((res)=>{
      setUserData(res)
    })
    getEvents().then((res)=>{
      console.log(res)
      setCountdowns(res)
    })
    getTimers().then((res)=>{
      console.log(res)
      setRecords(res)
    })
  }, [])

  const logOut =()=>{
    localStorage.removeItem("token")
    window.location.href='/auth'
  }

  const timeQuotes = [
    "Time is what we want most, but what we use worst. — William Penn",
    "Lost time is never found again. — Benjamin Franklin",
    "The key is in not spending time, but in investing it. — Stephen R. Covey",
    "Your time is limited, so don’t waste it living someone else’s life. — Steve Jobs",
    "Time isn’t the main thing. It’s the only thing. — Miles Davis",
    "You may delay, but time will not. — Benjamin Franklin",
    "The bad news is time flies. The good news is you’re the pilot. — Michael Altshuler",
    "Time and tide wait for no man. — Geoffrey Chaucer",
    "A man who dares to waste one hour of time has not discovered the value of life. — Charles Darwin",
    "We must use time as a tool, not as a couch. — John F. Kennedy",
    "To do two things at once is to do neither. — Publilius Syrus",
    "Time is more valuable than money. You can get more money, but you cannot get more time. — Jim Rohn",
    "Don’t count the days, make the days count. — Muhammad Ali",
    "Time stays long enough for those who use it. — Leonardo da Vinci",
    "The way we spend our time defines who we are. — Jonathan Estrin",
    "Time is free, but it’s priceless. You can’t own it, but you can use it. — Harvey Mackay",
    "Better three hours too soon than a minute too late. — William Shakespeare",
    "An inch of time is an inch of gold, but you can’t buy that inch of time with an inch of gold. — Chinese Proverb",
    "Time is the school in which we learn, time is the fire in which we burn. — Delmore Schwartz",
    "Do not waste time, for that is what life is made of. — Bruce Lee"
  ]


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  function CountdownTimer({ title, targetDate }) {
    const time = new Date(targetDate);

    const {
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({
      expiryTimestamp: time,

    });

    return (
      <Box p={6} w="100%" borderRadius="lg" borderWidth="1px" borderColor="purple.300" bgGradient="linear(to-r, purple.100, purple.200)" boxShadow="md" textAlign="center">
        <VStack spacing={3}>
          <HStack w={'100%'} justifyContent={'space-between'}>
          <Heading size="md" fontWeight="bold" color="purple.900">{title}</Heading>
          <Menu>
          <MenuButton
            as={IconButton}
            icon={<BsThreeDotsVertical />}
            variant="ghost"
            color="purple.800"
            _hover={{ bg: "whiteAlpha.300" }}
            _active={{ bg: "whiteAlpha.400" }}
          />
          <MenuList bg="purple.900" borderColor="purple.700">
            <MenuItem _hover={{ bg: "purple.700" }} bg={''} color={'white'} onClick={() => handleUpdate(record)}>
              Update
            </MenuItem>
            <MenuItem _hover={{ bg: "red.600", color: "white" }} bg={''} color={'white'} onClick={() => handleDelete(record.id)}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu></HStack>
          <Divider borderColor="purple.300" />
          {isRunning && <Heading size="3xl" fontWeight="bold" color="purple.700">
            {days}d {hours}h {minutes}m {seconds}s
          </Heading>}
          {!isRunning &&
            <Heading size="3xl" fontWeight="bold" color="purple.700">
              {title} has passed
            </Heading>}
          {/* <Button size="sm" onClick={() => restart(new Date(targetDate))} colorScheme="purple">
            Restart
          </Button> */}
        </VStack>
      </Box>
    );
  }

  function TimeQuote({ username }) {
    return (
      <Box
        bg={useColorModeValue('purple.100', 'gray.800')}
        color={useColorModeValue('gray.900', 'white')}
        p={4}
        w="100%"
        borderWidth="1px"
        borderColor={borderColor}
        textAlign="center"
        borderRadius="lg"
        boxShadow="md"
        my={4}
        mt={8}
      >
        <VStack spacing={2}>
          <Text fontSize="xl" fontWeight="bold">
            {getGreeting()}, {userData.name || 'Guest'}! ⏳
          </Text>
          <Text fontSize="md" fontStyle="italic">
            {qoutes}
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} transition="background 0.3s ease-in-out">
      <Flex as="nav" bg="purple.400" color="white" p={4} alignItems="center">
        <Heading size="lg" pl={4}>Keep Your Track</Heading>
        <Spacer />
        <HStack spacing={4}>
          <Button leftIcon={<FaInfoCircle />} variant="ghost" colorScheme="white">About Us</Button>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaAngleDown />} variant="outline" colorScheme="white">
              <HStack><Avatar name={userData.name} size="sm" /><Text>{userData.name}</Text></HStack>
            </MenuButton>
            <MenuList><MenuItem icon={<FaSignOutAlt />} color="white" bg="purple.400" onClick={logOut}>Logout</MenuItem></MenuList>
          </Menu>
          <IconButton icon={colorMode === 'light' ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} aria-label="Toggle theme" />
        </HStack>
      </Flex>
      <Container maxW="container.md">
        <VStack spacing={6} align="center">
          <Flex justify="space-between" width="full">
            <TimeQuote username={userData.name} />
          </Flex>
          <Tabs variant="soft-rounded" colorScheme="purple" width="full">
            <TabList>
              <Tab mx={6}>Timer</Tab>
              <Tab>Events</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <MotionCard bg={cardBg} backdropFilter="blur(10px)" borderWidth="1px" borderColor={borderColor} p={5} borderRadius="lg" whileHover={{ scale: 1.02 }}>
                  <CardHeader>
                    <Heading size="md">Timer</Heading>
                    <Text fontSize="sm" color="gray.400">Track time with ease</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={5} align="stretch">
                      <Flex gap={4} width="full">
                        <Input placeholder="Enter timer title" value={timerTitle} onChange={(e) => setTimerTitle(e.target.value)} disabled={isRunning} />
                        <Button onClick={handleTimer} colorScheme={runningStatus ? 'red' : 'purple'} leftIcon={runningStatus ? <FaStop /> : <FaPlay />}>
                          {runningStatus ? 'Stop' : 'Start'}
                        </Button>
                      </Flex>
                      <VStack>
                        <Box textAlign="center" py={6} fontSize="7xl" fontFamily="mono" color="purple.300">
                          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </Box>
                        <HStack hidden={!runningStatus}><Button onClick={() => pause()}>Pause</Button><Button onClick={() => reset()}>Reset</Button></HStack>
                      </VStack>
                      {records.length > 0 && (
                        <>
                          <Divider />
                          <AnimatePresence>
                            {records.map((record, index) => (
                              <MotionCard
                                key={index}
                                bgGradient="linear(to-r, purple.800, purple.900)"
                                color="white"
                                p={6}
                                borderRadius="lg"
                                boxShadow="lg"
                                initial={{ opacity: 0, y: -15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 15 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                              >
                                <VStack align="start" spacing={3}>
                                  <HStack justifyContent={'space-between'} w={'100%'}>
                                  <Heading fontWeight="bold" fontSize="xl" letterSpacing="wide">
                                    {record.title}
                                  </Heading>
                                  <Menu>
          <MenuButton
            as={IconButton}
            icon={<BsThreeDotsVertical />}
            variant="ghost"
            color="whiteAlpha.800"
            _hover={{ bg: "whiteAlpha.300" }}
            _active={{ bg: "whiteAlpha.400" }}
          />
          <MenuList bg="purple.900" borderColor="purple.700">
            <MenuItem _hover={{ bg: "purple.700" }} bg={''} color={'white'} onClick={() => handleUpdate(record)}>
              Update
            </MenuItem>
            <MenuItem _hover={{ bg: "red.600", color: "white" }} bg={''} color={'white'} onClick={() => handleDelete(record.id)}>
              Delete
            </MenuItem>
          </MenuList>
        </Menu></HStack>
                                  <Divider borderColor="whiteAlpha.600" />
                                  <HStack spacing={2} fontSize="md" opacity={0.9}>
                                    <Text fontWeight="medium">{String(Math.floor(record.duration / 3600)).padStart(2, '0')}:{String(Math.floor((record.duration % 3600) / 60)).padStart(2, '0')}:{String(record.duration % 60).padStart(2, '0')}</Text>
                                    <Text>•</Text>
                                    <Text fontStyle="italic">{record.created_at}</Text>
                                  </HStack>
                                </VStack>
                              </MotionCard>
                            ))}
                          </AnimatePresence>
                        </>
                      )}
                    </VStack>
                  </CardBody>
                </MotionCard>
              </TabPanel>
              <TabPanel>
                <MotionCard bg={cardBg} backdropFilter="blur(10px)" borderWidth="1px" borderColor={borderColor} p={5} borderRadius="lg" whileHover={{ scale: 1.02 }}>
                  <CardHeader>
                    <Heading size="md" color={textColor}>Event Countdown</Heading>
                    <Text fontSize="sm" color="gray.400">Track event with ease</Text>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} mt={3}>
                      <Input placeholder="Enter event title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                      <Input type="datetime-local" value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)} />
                      <Button leftIcon={<FaPlus />} colorScheme="purple" onClick={handleAddCountdown}>Add Event</Button>
                      {countdowns.length > 0 && (
                        <>
                          <Divider my={4} />
                          <Grid gap={6}>
                            {countdowns.map((event, index) => (
                              <CountdownTimer key={index} title={event.title} targetDate={event.target_date} />
                            ))}
                          </Grid>
                        </>
                      )}
                    </VStack>
                  </CardBody>
                </MotionCard>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
}