// import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Heading, HStack, IconButton, Image, Text } from "@chakra-ui/react"
import { useColorModeValue } from '../hooks/use-color-mode'
import { useProductStore } from "../store/products"
import { toaster } from '../components/ui/toaster-instance'

export const ProductCard = ({product}) => {
    const textColor = useColorModeValue('gray.600', 'gray.200')
    const bg = useColorModeValue('white', 'gray.800')

    const { deleteProducts } = useProductStore()
    const handleDeleteProduct = async (pid) => {
        const {success, message} = await deleteProducts(pid)
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
                <IconButton  colorPalette={'blue'} fontWeight={'Bold'} fontSize={'2xl'}>
                    +
                </IconButton>
                <IconButton  colorPalette={'red'} fontWeight={'Bold'} fontSize={'2xl'} onClick={() => handleDeleteProduct(product._id)}>
                    x
                </IconButton>
            </HStack>
        </Box>
    )
}
