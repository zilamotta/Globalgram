import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { FaShare, FaComment, FaHeart } from 'react-icons/fa';

interface PostProps {
  date: string;
  content: string;
  imageSrc?: string;
}

export default function Post ({ date, content, imageSrc }: PostProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      shadow="md"
      p={4}
      mb={4}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt="Post Image"
          borderRadius="lg"
          mb={4}
          objectFit="cover"
          maxH="200px"
          w="full"
        />
      )}

      <Text mb={4} fontSize={16} color="gray.600" textAlign="left">{content}</Text>

      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize={12} color="gray.600" textAlign="left">Published on {date}</Text>
        <Stack direction="row">
          <IconButton
            aria-label="Like"
            icon={<FaHeart />}
            variant="ghost"
          />
          <IconButton
            aria-label="Like"
            icon={<FaComment />}
            variant="ghost"
          />
          <IconButton
            aria-label="Share"
            icon={<FaShare />}
            variant="ghost"
          />
        </Stack>
      </Flex>
    </Box>
  );
};