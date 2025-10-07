// import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Dialog, Heading, HStack, IconButton, Image, Input, Portal, Text, VStack } from "@chakra-ui/react"
import { useColorModeValue } from '../hooks/use-color-mode'
import { useProductStore } from "../store/products"
import { toaster } from '../components/ui/toaster-instance'
import { useState } from "react"

export const ProductCard = ({product}) => {
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');

    const [updatedProduct, setUpdatedProduct] = useState(product)

    const { deleteProducts, updateProducts } = useProductStore()
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProducts(pid)
        if(!success){
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
    }

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProducts(pid, updatedProduct);
        if(!success){
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
    }

    return (
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{transform: 'translateY(-5px)', shadow: 'xl'}}
            bg={bg}
            padding={5}
        >
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'} />
            <Heading as={'h3'} size={'md'} mb={2}>
                {product.name}
            </Heading>

            <HStack mb={2}>
                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor}>
                    ${product.price}
                </Text>

                <Text fontWeight={'normal'} fontSize={'5x-small'} color={textColor}>
                    Amount: {product.quantity}
                </Text>
            </HStack>

            <HStack spaceX={2}>
                <Dialog.Root size={'lg'}>
                        <Dialog.Trigger asChild>
                            <IconButton  colorPalette={'blue'} fontWeight={'Bold'} fontSize={'2xl'}>
                                +
                            </IconButton>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header>
                                        <Dialog.Title>Edit Product</Dialog.Title>
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <VStack spaceY={7}>
                                            <Input
                                            placeholder='Product Name'
                                            borderColor={"gray.500"}
                                            name='name'
                                            value={updatedProduct.name}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                            />
                                            <Input
                                            placeholder='Quantity'
                                            borderColor={"gray.500"}
                                            name='quantity'
                                            type='number'
                                            value={updatedProduct.quantity}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, quantity: e.target.value })}
                                            />
                                            <Input
                                            placeholder='Price'
                                            borderColor={"gray.500"}
                                            name='price'
                                            type='number'
                                            value={updatedProduct.price}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, pice: e.target.value })}
                                            />
                                            <Input
                                            placeholder='Image URL'
                                            borderColor={"gray.500"}
                                            name='image'
                                            value={updatedProduct.image}
                                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                            />
                                        </VStack>
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button colorPalette={'blue'} mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                                                Update
                                            </Button>
                                        </Dialog.ActionTrigger>
                                        
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Dialog.ActionTrigger>
                                    </Dialog.Footer>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                <IconButton  colorPalette={'red'} fontWeight={'Bold'} fontSize={'2xl'} onClick={() => handleDeleteProduct(product._id)}>
                    x
                </IconButton>
            </HStack>
        </Box>
    )
}
