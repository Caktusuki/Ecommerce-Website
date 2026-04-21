import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchProduct } from "../../api";
import ImageGallery from "react-image-gallery";
import {
  Box,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <Box p="10" textAlign="center">Loading...</Box>;
  }

  if (isError) {
    return <Box p="10" textAlign="center">Error loading product.</Box>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);
  const images = data.photos.map((url) => ({ original: url, thumbnail: url }));

  return (
    <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
      <Text color="darkGreen.500" fontWeight="600" mb="6" fontSize="lg">
        All category / {data.title.substring(0, 15)}...
      </Text>
      
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={{ base: 8, md: 16 }}>
        {/* Left Side - Images */}
        <GridItem>
          <Box bg="white" borderRadius="3xl" p="4" position="relative">
            <Box position="absolute" top="4" left="4" bg="#163F35" color="white" px="4" py="1" borderRadius="full" zIndex="1" fontSize="sm" fontWeight="bold">
              Free Delivery
            </Box>
            <ImageGallery items={images} showThumbnails={true} showPlayButton={false} showNav={false} />
          </Box>
        </GridItem>

        {/* Right Side - Details */}
        <GridItem>
          <VStack align="flex-start" spacing="4" w="100%">
            <Heading color="darkGreen.500" size="xl" lineHeight="1.2">
              {data.title}
            </Heading>
            
            <Text color="darkGreen.500" fontSize="4xl" fontWeight="bold">
              {data.price}<Text as="span" fontSize="lg" verticalAlign="super">$</Text>
            </Text>

            <Divider my="2" />

            <Text mt="4" fontSize="sm" color="gray.500" lineHeight="tall">
              {data.description}
            </Text>

            {/* Action Buttons */}
            <HStack w="100%" spacing="4" mt="4">
              <Button
                flex="1"
                size="lg"
                bg={findBasketItem ? "red.50" : "brand.100"}
                color={findBasketItem ? "red.500" : "darkGreen.500"}
                _hover={{ bg: findBasketItem ? "red.100" : "brand.200" }}
                onClick={() => addToBasket(data, findBasketItem)}
              >
                {findBasketItem ? "Remove" : (
                  <>
                    <svg style={{ marginRight: '8px' }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    Add to Cart
                  </>
                )}
              </Button>
              <Button flex="1" size="lg" colorScheme="brand">
                Buy now
              </Button>
            </HStack>

          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ProductDetail;
