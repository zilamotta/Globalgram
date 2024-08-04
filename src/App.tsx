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
                    date="12 June of 2024"
                    content="🇧🇷✈️ Atenção, galera! Se você é brasileiro e está no Líbano, a Embaixada recomenda que considerem dar um “tchauzinho” 👋 ao país por agora. Prioridade total na segurança!

Para mais infos, falem com a Embaixada. Fiquem seguros e cuidem-se! 💚💛"
                    imageSrc="https://s2-g1.glbimg.com/CXv9xWjYu8EKC9cKeLrqg1H24nc=/0x0:7206x4805/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/N/0/bOB838Qc2UOKL1k5k2rw/2024-08-01t171551z-1448924352-rc2379ay8cpk-rtrmadp-3-israel-palestinians-lebanon-hezbollah-funeral.jpg"
                  />
                </Box>
              </Box>
            </Center>
        </Flex>
      </ChakraProvider>
    )
}
