import React from "react";
import Cards from "../../components/Card";
import { Grid, Box, Flex, Button, VStack, Heading, Text, HStack, Divider } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api.js";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;

      if (!morePagesExist) {
        return;
      } else {
        return allGroups.length + 1;
      }
    },
  });

  if (status === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;

  return (
    <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
      {/* Hero Section */}
      <Box 
        w="100%" 
        h="300px" 
        borderRadius="3xl" 
        bgGradient="linear(to-br, #134032, #163F35, #0b2e23)" 
        mb="10" 
        position="relative" 
        overflow="hidden"
        display="flex"
        alignItems="center"
        px={{ base: 6, md: 12 }}
        boxShadow="xl"
      >
        <VStack align="flex-start" spacing="4" zIndex="1">
          <Heading color="white" size="2xl" fontWeight="800" textShadow="0 2px 4px rgba(0,0,0,0.3)">GET 10% CASHBACK</Heading>
          <Heading color="white" size="xl" fontWeight="700" textShadow="0 2px 4px rgba(0,0,0,0.3)">ON PREMIUM GEAR</Heading>
          <Text color="white" maxW="400px" fontSize="lg" fontWeight="500">
            Discover the latest MacBooks, trending T-shirts, and high-performance gear. Only at Hike.
          </Text>
          <Button colorScheme="brand" size="lg" borderRadius="full" fontWeight="bold">Learn More</Button>
        </VStack>
        {/* Mock background decorative elements */}
        <Box 
          position="absolute" 
          right="-50px" 
          top="-50px" 
          w="300px" 
          h="300px" 
          bg="brand.500" 
          opacity="0.1" 
          borderRadius="full" 
        />
      </Box>

      {/* Filters & Title */}
      <Flex justify="space-between" align="center" mb="8" wrap="wrap" gap="4">
        <Heading color="darkGreen.500" size="lg">Hike / All Categories</Heading>
        <HStack spacing="4">
          <Button variant="outline" color="darkGreen.500" borderColor="gray.200" borderRadius="full" rightIcon={<span>▼</span>}>All Categories</Button>
          <Button variant="outline" color="darkGreen.500" borderColor="gray.200" borderRadius="full" rightIcon={<span>▼</span>}>Price</Button>
          <Button variant="ghost" color="darkGreen.500" borderRadius="full" rightIcon={<span>▼</span>}>Sort by</Button>
        </HStack>
      </Flex>

      {/* Recommendations Section */}
      <Box mb="12">
        <Heading color="darkGreen.500" size="md" mb="6">Recommended for You</Heading>
        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
          {data?.pages?.[0]?.slice(0, 4).map((item) => (
            <Box w="100%" key={`rec-${item._id}`}>
              <Cards item={item} />
            </Box>
          ))}
        </Grid>
      </Box>

      <Divider mb="12" />

      <Heading color="darkGreen.500" size="md" mb="6">All Products</Heading>
      <div className="products">
        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((item) => (
                <Box w="100%" key={item._id}>
                  <Cards item={item} />
                </Box>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </div>
      <Flex mt="12" justifyContent="center">
        {hasNextPage ? (
          <Button
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
            disabled={!hasNextPage || isFetchingNextPage}
            size="lg"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
        ) : (
          <Box as="span" color="gray.500" fontSize="sm">
            You've reached the end of the catalog!
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default Products;
