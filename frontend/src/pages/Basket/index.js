import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Image,
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
  Grid,
  GridItem,
  Heading,
  VStack,
  HStack,
  Flex,
  Divider,
  Radio,
  RadioGroup,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api.js";

function Basket() {
  const [address, setAddress] = useState("Dhaka, Banasree, Block B, Road: 3, California, USA");
  const { isOpen: isOrderOpen, onOpen: onOrderOpen, onClose: onOrderClose } = useDisclosure();
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure();
  const { isOpen: isKlarnaOpen, onOpen: onKlarnaOpen, onClose: onKlarnaClose } = useDisclosure();
  
  const initialRef = useRef(null);
  const { items, removeFromBasket, emptyBasket } = useBasket();
  
  const subtotal = items.reduce((acc, obj) => acc + obj.price, 0);
  const deliveryFee = items.length > 0 ? 15.00 : 0;
  const tax = subtotal * 0.1; // 10% tax mock
  const total = subtotal + deliveryFee + tax;

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    await postOrder(input);
    onConfirmOpen();
    emptyBasket();
  };

  if (items.length < 1 && !isConfirmOpen) {
    return (
      <Box maxW="1200px" mx="auto" p={{ base: 4, md: 10 }}>
        <VStack spacing={6} align="center" py={20}>
          <Box bg="gray.50" p={8} borderRadius="full">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#163F35" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </Box>
          <Heading color="darkGreen.500">Your cart is empty</Heading>
          <Text color="gray.500">Looks like you haven't added anything to your cart yet.</Text>
          <Link to="/">
            <Button colorScheme="brand" size="lg" px={10}>Start Shopping</Button>
          </Link>
        </VStack>
      </Box>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p={{ base: 4, md: 8 }}>
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={10}>
        
        {/* Left Column: Delivery & Items */}
        <GridItem>
          <VStack spacing={8} align="stretch">
            
            {/* Delivery Info */}
            <Box bg="white" p={6} borderRadius="2xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading size="md" color="darkGreen.500">Delivery information</Heading>
                <Button variant="ghost" size="sm" color="orange.400" onClick={onOrderOpen}>Edit</Button>
              </Flex>
              <HStack spacing={4}>
                <Flex bg="gray.50" p={3} borderRadius="xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#163F35" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </Flex>
                <Box>
                  <Text fontWeight="bold" color="darkGreen.500">Delivery to</Text>
                  <Text color="gray.500" fontSize="sm">{address}</Text>
                </Box>
              </HStack>
            </Box>

            {/* Review Items */}
            <Box bg="white" p={6} borderRadius="2xl" boxShadow="sm" border="1px solid" borderColor="gray.100">
              <Flex justify="space-between" align="center" mb={6}>
                <Heading size="md" color="darkGreen.500">Review items</Heading>
                <Text color="gray.400" fontSize="sm">Delivery in 15-20 minutes</Text>
              </Flex>
              
              <VStack spacing={6} align="stretch">
                {items.map((item) => (
                  <Box key={item._id} p={4} bg="gray.50" borderRadius="xl">
                    <Flex justify="space-between" align="center">
                      <HStack spacing={4}>
                        <Image src={item.photos[0]} w="80px" h="80px" borderRadius="lg" objectFit="cover" bg="white" p={1} />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="bold" color="darkGreen.500">{item.title}</Text>
                          <Text color="gray.500" fontSize="sm">Standard Unit</Text>
                          <Text fontWeight="800" color="darkGreen.500" mt={1}>{item.price}$</Text>
                        </VStack>
                      </HStack>
                      <HStack spacing={4}>
                        <Button size="xs" variant="outline" borderRadius="full" onClick={() => removeFromBasket(item._id)}>✕</Button>
                        <HStack bg="white" borderRadius="full" px={2} py={1} boxShadow="xs">
                           <Button size="xs" variant="ghost" borderRadius="full">-</Button>
                           <Text fontWeight="bold" fontSize="sm">1</Text>
                           <Button size="xs" variant="ghost" borderRadius="full">+</Button>
                        </HStack>
                      </HStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </GridItem>

        {/* Right Column: Order Summary */}
        <GridItem>
          <Box bg="white" p={6} borderRadius="2xl" boxShadow="md" border="1px solid" borderColor="gray.100" position="sticky" top="100px">
            <Heading size="md" color="darkGreen.500" mb={6}>Order summary</Heading>
            
            <RadioGroup defaultValue="1" mb={8}>
              <VStack align="stretch" spacing={3}>
                <Radio value="1" colorScheme="brand">Online Payment</Radio>
                <Radio value="2" colorScheme="brand">Cash on delivery</Radio>
                <Radio value="3" colorScheme="brand">Pos on delivery</Radio>
              </VStack>
            </RadioGroup>

            <InputGroup mb={8}>
              <Input placeholder="Add Promo" borderRadius="full" bg="gray.50" border="none" />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" colorScheme="darkGreen" bg="#163F35" color="white" borderRadius="full">Apply</Button>
              </InputRightElement>
            </InputGroup>

            <VStack spacing={3} align="stretch" mb={8}>
              <Flex justify="space-between"><Text color="gray.500">Subtotal</Text><Text fontWeight="bold">${subtotal.toFixed(2)}</Text></Flex>
              <Flex justify="space-between"><Text color="gray.500">Delivery fee</Text><Text fontWeight="bold">${deliveryFee.toFixed(2)}</Text></Flex>
              <Flex justify="space-between"><Text color="gray.500">Taxes</Text><Text fontWeight="bold">${tax.toFixed(2)}</Text></Flex>
              <Divider />
              <Flex justify="space-between" pt={2}><Text fontWeight="bold" fontSize="lg" color="darkGreen.500">Total</Text><Text fontWeight="800" fontSize="xl" color="darkGreen.500">${total.toFixed(2)}</Text></Flex>
            </VStack>

            <Button w="100%" size="lg" colorScheme="brand" variant="outline" mb={4} onClick={onKlarnaOpen}>
               Continue with <Text as="span" ml={2} fontWeight="bold" bg="#ffb3c7" color="#000" px={2} py={0.5} borderRadius="md" fontSize="xs">Klarna.</Text>
            </Button>
            <Button w="100%" size="lg" colorScheme="brand" onClick={handleSubmitForm}>Confirm order</Button>
          </Box>
        </GridItem>
      </Grid>

      {/* Address Edit Modal */}
      <Modal initialFocusRef={initialRef} isOpen={isOrderOpen} onClose={onOrderClose}>
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader>Update Delivery Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full Address</FormLabel>
              <Textarea
                ref={initialRef}
                placeholder="Enter your street address, city, and zip..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onOrderClose}>Save Address</Button>
            <Button onClick={onOrderClose} variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Order Confirmed Modal */}
      <Modal isOpen={isConfirmOpen} onClose={onConfirmClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent borderRadius="3xl" p={6}>
          <ModalBody>
            <VStack spacing={6} py={6}>
               <Flex bg="brand.100" p={6} borderRadius="full">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#163F35" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
               </Flex>
               <VStack spacing={2}>
                  <Heading size="lg" color="darkGreen.500">Order Confirmed</Heading>
                  <Text textAlign="center" color="gray.500" fontSize="sm">We have received your order. You'll get a confirmation email shortly.</Text>
               </VStack>
               <VStack w="100%" spacing={3}>
                  <Button w="100%" variant="outline" borderRadius="full" borderColor="darkGreen.500" color="darkGreen.500">View order details</Button>
                  <Link to="/" style={{ width: '100%' }}>
                    <Button w="100%" colorScheme="brand">Continue shopping</Button>
                  </Link>
               </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Klarna Payment Modal */}
      <Modal isOpen={isKlarnaOpen} onClose={onKlarnaClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="3xl" p={4}>
          <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
             <Text fontWeight="bold" bg="#ffb3c7" color="#000" px={2} py={0.5} borderRadius="md" fontSize="md">Klarna.</Text>
             <Text fontSize="lg" fontWeight="800">${total.toFixed(2)}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             <VStack spacing={6} align="stretch">
                <Box p={4} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100">
                   <Text fontSize="xs" color="gray.400" mb={1}>Delivery address</Text>
                   <Text fontSize="sm" fontWeight="bold" color="darkGreen.500" noOfLines={1}>{address}</Text>
                </Box>
                <Box p={4} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100">
                   <Text fontSize="xs" color="gray.400" mb={1}>Split in 4 Instalments</Text>
                   <Text fontSize="sm" fontWeight="bold" color="darkGreen.500">${(total/4).toFixed(2)} USD / Month</Text>
                </Box>
                <Flex align="center" p={4} bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100">
                   <Box bg="black" color="white" p={2} borderRadius="md" mr={3} fontSize="xs">VISA</Box>
                   <Box flex="1">
                      <Text fontSize="sm" fontWeight="bold" color="darkGreen.500">•••• •••• •••• 2345</Text>
                      <Text fontSize="xs" color="gray.400">Valid until 09/28</Text>
                   </Box>
                   <Button size="xs" variant="outline">Change</Button>
                </Flex>
                <Button w="100%" size="lg" bg="black" color="white" _hover={{ bg: 'gray.800' }} borderRadius="full" onClick={handleSubmitForm}>
                   Confirm to Pay
                </Button>
             </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

    </Box>
  );
}

export default Basket;
