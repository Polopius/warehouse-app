import { ProductCard } from '../components/ProductCard'
import { useProductStore } from '../store/products'
import { Container, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore()

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  

  return (
    <Container maxW={'container.xl'} py={12}>
      <VStack spaceX={8}>
        <HStack>
        <Text
          fontSize={'5xl'}
          fontWeight={'bold'}
          bgGradient={'to-r'}
          gradientFrom="cyan.400" 
          gradientTo="blue.500"
          bgClip={'text'}
          textAlign={'center'}
        >
          Current Products
        </Text>
        <Text
          fontSize={'5xl'}
          fontWeight={'bold'}
          textAlign={'center'}
          
        >
          🗿
        </Text>
        </HStack>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2, 
            lg: 3
          }}
          gap={10}
          w={'full'}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>
        {products.legth === 0 && (
          <Text
            fontSize={'xl'}
            textAlign={'center'}
            fontWeight={'bold'}
            color={'gray.500'}
          >
            No Products Found 😭 {" "}
          </Text>
        )}

      </VStack>

    </Container>
  )
}

export default HomePage