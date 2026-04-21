import React from "react";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
import { Button, Box, Text, Flex, HStack, VStack, Grid, IconButton } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
import { useQuery } from "react-query";
import { fetchProductList } from "../../api";

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  const { data: products } = useQuery("products-nav", () => fetchProductList({ pageParam: 1 }));
  const recommendedItems = products?.slice(0, 1) || [];
  const popularItems = products?.slice(1, 7) || [];

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <IconButton
          aria-label="Menu"
          icon={<span>☰</span>}
          variant="ghost"
          color="white"
          fontSize="24px"
          mr={2}
          _hover={{ bg: 'whiteAlpha.200' }}
        />
        <div className={styles.logo}>
          <Link to="/">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
              Hike
            </div>
          </Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>

      {/* Center Search Bar with Recommendations Dropdown */}
      <div style={{ flex: 1, maxWidth: '600px', margin: '0 40px', position: 'relative' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Search products..." 
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            style={{ 
              width: '100%', 
              padding: '12px 20px', 
              borderRadius: '30px', 
              border: 'none', 
              outline: 'none',
              color: '#333'
            }} 
          />
          <div style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isSearchFocused && (
          <div style={{
            position: 'absolute',
            top: '110%',
            left: '0',
            width: '600px',
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
            padding: '24px',
            zIndex: '1000',
            color: '#163F35',
            border: '1px solid #f1f5f9'
          }}>
            <Text fontWeight="700" mb="4" fontSize="md">Recommended searches</Text>
            <VStack align="stretch" spacing="3" mb="8">
              {recommendedItems.map((item) => (
                <Link key={item._id} to={`/product/${item._id}`}>
                  <HStack p="3" borderRadius="xl" bg="gray.50" _hover={{ bg: 'brand.50' }} cursor="pointer" spacing={4}>
                    <Box bg="white" w="60px" h="60px" borderRadius="lg" boxShadow="sm" overflow="hidden">
                      <img src={item.photos?.[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box flex="1">
                      <Text fontSize="sm" fontWeight="700" noOfLines={1}>{item.title}</Text>
                      <Text fontSize="xs" fontWeight="bold" color="darkGreen.500">{item.price}$</Text>
                    </Box>
                  </HStack>
                </Link>
              ))}
            </VStack>
            
            <Text fontWeight="700" mb="4" fontSize="md">Popular search</Text>
            <Grid templateColumns="1fr 1fr" gap="4">
              {popularItems.map((item) => (
                <Link key={item._id} to={`/product/${item._id}`}>
                  <HStack p="3" borderRadius="xl" bg="gray.50" _hover={{ bg: 'brand.50' }} cursor="pointer" spacing={4}>
                    <Box bg="white" w="45px" h="45px" borderRadius="lg" boxShadow="sm" overflow="hidden">
                      <img src={item.photos?.[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                    <Box flex="1">
                      <Text fontSize="xs" fontWeight="700" noOfLines={1}>{item.title}</Text>
                      <Text fontSize="xs" fontWeight="bold" color="darkGreen.500">{item.price}$</Text>
                    </Box>
                  </HStack>
                </Link>
              ))}
            </Grid>
          </div>
        )}
      </div>

      <div className={styles.right}>
        {/* Order Info Text */}
        <HStack spacing={1} mr={6} display={{ base: 'none', lg: 'flex' }}>
          <Text color="yellow.400" fontSize="sm">⚡</Text>
          <Text color="black" fontSize="xs" fontWeight="500">Order now and get it within <Text as="span" color="red.500">15 mint!</Text></Text>
        </HStack>

        {!loggedIn ? (
          <HStack spacing={3}>
            <Link to="/signin">
              <Button colorScheme="brand" variant="ghost" size="sm" _hover={{ bg: 'whiteAlpha.100' }}>Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="brand" size="sm">Signup</Button>
            </Link>
          </HStack>
        ) : (
          <HStack spacing={4}>
            {/* Cart with Badge */}
            <Link to="/cart">
              <Box position="relative">
                <Flex bg="white" p={2} borderRadius="full" boxShadow="sm" cursor="pointer" _hover={{ transform: 'scale(1.05)' }} transition="0.2s">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#163F35" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                </Flex>
                <Flex 
                  position="absolute" 
                  top="-5px" 
                  right="-5px" 
                  bg="red.500" 
                  color="white" 
                  fontSize="10px" 
                  fontWeight="bold" 
                  w="18px" 
                  h="18px" 
                  borderRadius="full" 
                  align="center" 
                  justify="center"
                  border="2px solid #163F35"
                >
                  {items.length}
                </Flex>
              </Box>
            </Link>
            
            {/* Admin Link if applicable */}
            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="brand" variant="ghost" size="sm">Admin</Button>
              </Link>
            )}

            {/* User Avatar */}
            <Link to="/profile">
              <Box borderRadius="full" overflow="hidden" w="38px" h="38px" border="2px solid" borderColor="brand.500" cursor="pointer">
                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=bde56c&color=163F35`} alt="profile" />
              </Box>
            </Link>
          </HStack>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
