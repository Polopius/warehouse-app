import { useProductStore } from '../store/products'
import { useColorModeValue } from '../hooks/use-color-mode'
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { toaster } from '../components/ui/toaster-instance'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    quantity: "",
    price:"",
    image:"",
  })

  const {createProduct} = useProductStore()
  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    // console.log(`Success: ${success}\nMessage: ${message}`);
    
    if(success === false){
      toaster.create({
        title:"Error",
        description: message,
        type: "error",
        closable: true,
      })
    } else {
      toaster.create({
        title:"Success",
        description: message,
        type: "success",
        closable: true,
      })
    }
    setNewProduct({name: "", quantity: "", price: "", image: ""})
  }
  
  return (<Container maxW={"container.sm"}>
    <VStack spacing={8}>
      <Heading as={'h1'} size={'5xl'} textAlign={'center'} margin={12}>
        Create New Product
      </Heading>

      <Box 
        w={'80%'} 
        bg={useColorModeValue("white", "gray.800")}
        p={6} rounded={'lg'} shadow={'md'}
      >
        <VStack spaceY={7}>
          <Input
            placeholder='Product Name'
            borderColor={"gray.500"}
            name='name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <Input
            placeholder='Quantity'
            borderColor={"gray.500"}
            name='quantity'
            type='number'
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          />
          <Input
            placeholder='Price'
            borderColor={"gray.500"}
            name='price'
            type='number'
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <Input
            placeholder='Image URL'
            borderColor={"gray.500"}
            name='image'
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />

          <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
            Add Product
          </Button>
        </VStack>
      </Box>
      
    </VStack>
  </Container>)
}

export default CreatePage