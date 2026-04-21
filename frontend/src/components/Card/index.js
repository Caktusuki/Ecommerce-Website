import React from "react";
import {
  Card,
  Text,
  Image,
  Stack,
  Heading,
  CardBody,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";

function Cards({ item }) {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <Card maxW="sm" bg="white" borderRadius="2xl" overflow="hidden" boxShadow="md" border="1px solid" borderColor="gray.100" transition="all 0.2s" _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}>
      <Link to={`/product/${item._id}`}>
        <CardBody p="5">
          <Image
            src={item.photos[0]}
            alt="Product"
            borderRadius="xl"
            loading="lazy"
            boxSize="250px"
            objectFit="cover"
            w="100%"
            mb="4"
          />
          <Stack mt="2" spacing="2">
            <Heading size="md" color="darkGreen.500" noOfLines={2} lineHeight="short">
              {item.title}
            </Heading>
            <Text color="gray.500" fontSize="sm">{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
            <Text color="darkGreen.500" fontSize="2xl" fontWeight="bold">
              {item.price}<Text as="span" fontSize="md" verticalAlign="super">$</Text>
            </Text>
          </Stack>
        </CardBody>
      </Link>
      <CardFooter pt="0" pb="5" px="5">
        <Button
          w="100%"
          variant={findBasketItem ? "outline" : "solid"}
          colorScheme={findBasketItem ? "red" : "brand"}
          bg={findBasketItem ? "transparent" : "brand.100"}
          color={findBasketItem ? "red.500" : "darkGreen.500"}
          _hover={{ bg: findBasketItem ? "red.50" : "brand.200" }}
          onClick={(e) => {
            e.preventDefault();
            addToBasket(item, findBasketItem);
          }}
        >
          {findBasketItem ? (
            "Remove"
          ) : (
            <>
              <svg style={{ marginRight: '8px' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Cards;
