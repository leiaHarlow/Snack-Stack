import React, { useState, useEffect } from 'react';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import axios from 'axios';

import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  // Heading,
  // Spacer,
  Button,
  // Input
  Image,
  IconButton,
  Text,
  Input
} from '@chakra-ui/react';

export default function SnackListEntry({product, description, counter, image, stores}) {

  const [vote, setVote] = useState(counter);
  const [bool, setBool] = useState(false);
  const [add, setAdd] = useState('');

  let count = vote;
  let storeCopy = stores;

  const voteCount = () => {
    count++
    axios.put(`http://localhost:3001/snacks`, {counter: count, name: product, store: storeCopy})
    .then((response) => {
      setVote(count)
    })
    .catch((err) => console.log(err))
  }

  const voteDec = () => {
    count--
    axios.put(`http://localhost:3001/snacks`, {counter: count, name: product, store: storeCopy})
    .then((response) => {
      setVote(count)
    })
    .catch((err) => console.log(err))
  }

  const addStore = (newStore) => {
    storeCopy.push(newStore)
    axios.put(`http://localhost:3001/snacks`, {counter: count, name: product, store: storeCopy})
    .then((response) => {
      setAdd(storeCopy)
    })
    .catch((err) => console.log(err))
  }

  const iterate = () => {
    let each = stores.join(', ')
    return each;
  }

  const showForm = () => {
    setBool(!bool)
  }



  return (
    <ChakraProvider theme={theme}>
    <Box fontSize="xl">
    <Grid p={3}>
      <Flex flexDirection='row'>
        <Box width="80vw" height="30vh" borderRadius='lg' borderWidth='2px' color='white'>
        <Box>
        {product}
        </Box>
        <Box>
        <u>Found at:</u> {iterate()}
        <Button onClick={() => showForm()}>
          Add Store
        </Button>
        </Box>
        <Box>
          {bool ? (
        <Box>
        <Input type='text' placeholder='Add a store' width='20vw' onChange={(e) => setAdd(e.target.value)}>
        </Input>
        <Button onClick={() => (addStore(add))}>
          Add
        </Button>
        </Box>) : (null)}
        </Box>
        <Flex>

        <Flex flexDirection='column' alignItems='center'>
        <Box display='flex' padding="10px">
        <IconButton icon={<BsArrowUp />} onClick={() => {
          voteCount();
          window.location.reload()}}>
          Upvote
        </IconButton>
        </Box>
        {counter}
        <Box display='flex' padding="10px">
        <IconButton icon={<BsArrowDown />} onClick={() => {
          voteDec();
          window.location.reload()}}>
          Downvote
        </IconButton>
        </Box>
        </Flex>

        <Box>
        <Image src={`${image}`} boxSize ='110px' objectFit='cover' alt="img not found" justifyContent="center" margin="10px" />
        </Box>
        <Box height='2vh' width='40vw' paddingLeft='200px'>
          <Text fontSize='xs'>
          {description}
          </Text>
        </Box>
        </Flex>
        </Box>

      </Flex>
    </Grid>
    </Box>
    </ChakraProvider>
  );
}