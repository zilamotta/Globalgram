import { Box, Spinner, Text } from '@chakra-ui/react';


interface FullScreenLoaderProps {
    loadingText: string;
}
export default function FullScreenLoader ({ loadingText }: FullScreenLoaderProps) {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex="9999"
      flexDir="column"
      padding={8}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text color="white">{loadingText}</Text>
    </Box>
  );
};