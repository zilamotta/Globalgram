import {
  ChakraProvider,
  Box,
  theme,
  Flex,
  Center,
} from "@chakra-ui/react"
import Header from "./components/Header";
import Post from "./components/Post";
import InputContent from "./components/InputContent";

// const TOKEN = process.env.REACT_APP_JIGSAWSTACK_API_TOKEN;

export const App = () => {

  return (
    <ChakraProvider theme={theme}>
        <Flex 
          display="flex"
          flexDir="column"
          textAlign="center" 
          justifyContent="center" 
          alignItems="center"
          fontSize="xl" 
          w="100%"
          padding={8}
          >
            <Center display="flex"flexDir="column">
              <Header />
              <Box maxW="md">
                <Box mt={4}>
                  <InputContent />
                </Box>
                <Box mt={12} gap={4}>
                  <Post 
                    date="13 June of 2024"
                    content="Rebeca Andrade arrasou nas Olimpíadas desse ano! 🥇🔥 Ela conquistou o ouro e fez história na ginástica artística. Essa mulher é um fenômeno! 🌟 Orgulho do Brasil! 🇧🇷"
                    imageSrc="https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/07/26/gn-s12ruam2106q.JPG"
                  />
                  <Post 
                    date="13 June of 2024"
                    content="Rebeca Andrade arrasou nas Olimpíadas desse ano! 🥇🔥 Ela conquistou o ouro e fez história na ginástica artística. Essa mulher é um fenômeno! 🌟 Orgulho do Brasil! 🇧🇷"
                    imageSrc="https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/07/26/gn-s12ruam2106q.JPG"
                  />
                </Box>
              </Box>
            </Center>
        </Flex>
      </ChakraProvider>
    )
}
