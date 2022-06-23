import React, { useState, useEffect } from 'react';
import SnackListEntry from './SnackListEntry.jsx'
// import axios from 'axios';

import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  // Heading,
  // Spacer,
  // Button,
  // Input
} from '@chakra-ui/react';

export default function SnackList({snacks}) {



  // const popularSort = () => {
  //   console.log(snackData);
  //   let popular = snackData.slice()
  //   popular.sort((a, b) => (a['counter'] < b['counter']) ? 1 : -1)
  //   setSnackData(popular)
  //   console.log(snackData)
  // }

  // const changeOption = (event) => {
  //   if (event.target.value === 'Popular') {
  //     popularSort()
  //   } else if (event.target.value === 'Unpopular') {
  //     unpopularSort()
  //   }
  //   setOption(event.target.value)
  //   console.log(option);
  // }

  return (
    <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
    <Grid p={3}>
      <Flex justifyContent="center">
        <Box justifyContent="center">
        {snacks.map((data, index) => (
          <SnackListEntry
          product={data.product}
          description={data.description}
          counter={data.counter}
          image={data.image}
          stores={data.stores}
          key={data._id}
          />
                ))}
        </Box>
      </Flex>
    </Grid>
    </Box>
    </ChakraProvider>
  );
}