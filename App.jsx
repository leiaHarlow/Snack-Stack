import React, { useState, useEffect } from 'react';
import SnackList from './SnackList.jsx'
import axios from 'axios';
import {BsArrowDown } from 'react-icons/bs';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  Heading,
  Spacer,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
  // Center
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export default function App(props) {

  const [snacks, setSnacks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/snacks')
      .then(response =>{
        let snacksData = response.data;
        //console.log(snacksData);
        setSnacks(snacksData);
      })
      .catch(err => console.log(err));
  }, [])

  const searchChange = (e) => {
    let { value } = e;
    setSearch(value)
    console.log(e);
    console.log(search)
  }

  const searchSubmit = () => {
  //  e.preventDefault();
   // let snackCopy = snacks;
   console.log(search)
    if (search.length > 0) {
      let snackSearch = [...snacks].filter((snack) => {
        return snack.product.includes(search);
      })

      setSnacks(snackSearch);
    }
  }

  const unpopularSort = () => {
    let snackCopy = [...snacks].filter(snack => {return snack.counter === 0});
    setSnacks(snackCopy)
  }


  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <Flex justifyContent="center">
          <Box>
            <Heading>
              Snack-Stack
            </Heading>
          </Box>
          <Spacer/>
          <Box>
            <Input type="text" placeholder="Find a snack" value={search} onChange={(e) => {setSearch(e.target.value)}} >
            </Input >
          </Box>
          <Button size='sm' justifySelf="flex-end" onClick={() => {searchSubmit()}} >
              Search
            </Button>
           <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
        </Grid>
      </Box>
      <Menu>
  <MenuButton as={Button} rightIcon={<BsArrowDown />}>
    Sort By:
  </MenuButton>
  <MenuList>
    <MenuItem>Popular</MenuItem>
    <MenuItem onClick={() => {unpopularSort()}}>Unpopular</MenuItem>
  </MenuList>
</Menu>
      <Box width="90vw" borderWidth='2px' color='white' justifyContent="center">
      <SnackList snacks = {snacks}/>
      </Box>
    </ChakraProvider>
  );
}

