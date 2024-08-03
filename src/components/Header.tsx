import { Avatar, Box, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement, Text, useColorModeValue } from "@chakra-ui/react"
import { SearchIcon, BellIcon } from '@chakra-ui/icons';


export default function Header () {
    return (
    <Box px={4} py={2} boxShadow="sm" maxW="lg" width="100%">
        <Flex h={16} alignItems="center" justifyContent="space-between">
            <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                GlobalGram
            </Heading>

            <Flex alignItems="center">
            <IconButton
                aria-label="Search button"
                icon={<SearchIcon boxSize={4} color="black" />}
                variant="ghost"
                ml={2}
            />

            <IconButton
                aria-label="Notifications button"
                icon={<BellIcon boxSize={5} color="black" />}
                variant="ghost"
                ml={2}
            />
            <Avatar
                size="sm"
                ml={4}
                src="https://avatars.githubusercontent.com/u/140634417?v=4&size=64"
                name="Zila Motta"
            />
            </Flex>
        </Flex>
    </Box>
    )
}