import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Text, Grid, GridItem, Heading, Flex, HStack, VStack } from "@chakra-ui/react";

function AdminHome() {
  const location = useLocation();

  const NavLink = ({ to, children }) => (
    <Link to={to}>
      <Text
        px={4}
        py={2}
        borderRadius="full"
        bg={location.pathname === to ? "brand.100" : "transparent"}
        color={location.pathname === to ? "darkGreen.500" : "gray.500"}
        fontWeight={location.pathname === to ? "bold" : "medium"}
        _hover={{ bg: "gray.100" }}
        transition="all 0.2s"
      >
        {children}
      </Text>
    </Link>
  );

  return (
    <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
      {/* Admin Sub-Navbar */}
      <Flex bg="white" p={2} borderRadius="full" boxShadow="sm" mb={8} display="inline-flex">
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
      </Flex>

      <Box bg="white" borderRadius="3xl" p={{ base: 6, md: 10 }} boxShadow="md">
        <Heading color="darkGreen.500" size="xl" mb={2}>
          Welcome Back, Admin
        </Heading>
        <Text color="gray.500" fontSize="lg" mb={10}>
          Here's what's happening with your store today.
        </Text>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          
          {/* Orders Card */}
          <Link to="/admin/orders">
            <GridItem bg="gray.50" p={6} borderRadius="2xl" border="1px solid" borderColor="gray.100" _hover={{ borderColor: "brand.500", bg: "brand.50", transform: "translateY(-4px)" }} transition="all 0.2s" cursor="pointer">
              <HStack spacing={4}>
                <Flex bg="white" p={4} borderRadius="xl" boxShadow="sm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163F35" strokeWidth="2"><line x1="16" y1="4" x2="16" y2="20"/><line x1="8" y1="4" x2="8" y2="20"/><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
                </Flex>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize="xl" color="darkGreen.500">Manage Orders</Text>
                  <Text color="gray.500">View and process customer orders</Text>
                </VStack>
              </HStack>
            </GridItem>
          </Link>

          {/* View Products Card */}
          <Link to="/admin/products">
            <GridItem bg="gray.50" p={6} borderRadius="2xl" border="1px solid" borderColor="gray.100" _hover={{ borderColor: "brand.500", bg: "brand.50", transform: "translateY(-4px)" }} transition="all 0.2s" cursor="pointer">
              <HStack spacing={4}>
                <Flex bg="white" p={4} borderRadius="xl" boxShadow="sm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163F35" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                </Flex>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize="xl" color="darkGreen.500">Inventory</Text>
                  <Text color="gray.500">See all your currently listed products</Text>
                </VStack>
              </HStack>
            </GridItem>
          </Link>

          {/* Edit/Delete Card */}
          <Link to="/admin/products">
            <GridItem bg="gray.50" p={6} borderRadius="2xl" border="1px solid" borderColor="gray.100" _hover={{ borderColor: "brand.500", bg: "brand.50", transform: "translateY(-4px)" }} transition="all 0.2s" cursor="pointer">
              <HStack spacing={4}>
                <Flex bg="white" p={4} borderRadius="xl" boxShadow="sm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163F35" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </Flex>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize="xl" color="darkGreen.500">Edit & Delete</Text>
                  <Text color="gray.500">Modify existing product details or remove them</Text>
                </VStack>
              </HStack>
            </GridItem>
          </Link>

          {/* Add New Product Card */}
          <Link to="/admin/products/new">
            <GridItem bg="gray.50" p={6} borderRadius="2xl" border="1px solid" borderColor="gray.100" _hover={{ borderColor: "brand.500", bg: "brand.50", transform: "translateY(-4px)" }} transition="all 0.2s" cursor="pointer">
              <HStack spacing={4}>
                <Flex bg="brand.500" p={4} borderRadius="xl" boxShadow="sm">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163F35" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </Flex>
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize="xl" color="darkGreen.500">Add New Product</Text>
                  <Text color="gray.500">Upload and list a new item to the store</Text>
                </VStack>
              </HStack>
            </GridItem>
          </Link>

        </Grid>
      </Box>
    </Box>
  );
}

export default AdminHome;
