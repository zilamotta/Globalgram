
import { Box, Flex, Center } from '@chakra-ui/react';
import Header from '../components/Header';
import InputContent from '../components/InputContent';
import { useState } from 'react';
import Post, { PostProps } from '../components/Post';
export default function Home() {
    const [posts, setPosts] = useState<PostProps[]>([]);

    return (
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
            <Center display="flex"flexDir="column" w="100%">
              <Header />
              <Box maxW="md" w="100%">
                <Box mt={4}>
                  <InputContent posts={posts} setPosts={setPosts} />
                </Box>
                <Box mt={12} gap={4} w="100%">
                  {
                    posts.map((post, index) => (
                      <Post {...post} />
                    ))
                  }
                </Box>
              </Box>
            </Center>
        </Flex>
    )
}