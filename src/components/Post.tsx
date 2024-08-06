import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  Stack,
  Button,
} from '@chakra-ui/react';
import { FaShare, FaComment, FaHeart, FaRegFileAudio, FaSpinner } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

export interface PostProps {
  date: string;
  content: string;
  imageSrc?: string;
  imgContent?: string;
  imgKey?: string;
}

export default function Post ({ date, content, imageSrc, imgContent, imgKey }: PostProps) {
  const [loading, setLoading] = useState(false);
  const [imageDesc, setImageDesc] = useState("");
  const [show, setShow] = useState(false);

  const IMG_API_TOKEN = process.env.REACT_APP_JIGSAWSTACK_IMG_API_TOKEN;
  const PROMPT_API_TOKEN = process.env.REACT_APP_JIGSAWSTACK_PROMPT_API_TOKEN;
  const STORAGE_API_TOKEN = process.env.REACT_APP_JIGSAWSTACK_STORAGE_API_TOKEN;

  const handleDescriptionImage = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://api.jigsawstack.com/v1/ai/object_detection", {
        url: `${imageSrc}?x-api-key=${STORAGE_API_TOKEN}`,
        key: imgKey
      }, {
        headers: {
          "x-api-key": IMG_API_TOKEN
        },
      });
      const words = response?.data?.tags.join(",");

      const newPromptResponse = await axios.post("https://api.jigsawstack.com/v1/prompt_engine", {
        "prompt": "Hello prompt, can you do a describe of an image with this words? {words}", 
        "inputs": [
          {
            "key": "words",
            "optional": false,
            "initial_value": words
          }
        ], 
        "return_prompt": "Return just the result in a string format"
      }, {
        headers: {
          "x-api-key": PROMPT_API_TOKEN
        },
      });

      const { data } = newPromptResponse;
      const { prompt_engine_id } = data;

      const promptResponse = await axios.post(`https://api.jigsawstack.com/v1/prompt_engine/${prompt_engine_id}`, {
        "input_values": {
          "words": words
        }
      }, {
        headers: {
          "x-api-key": PROMPT_API_TOKEN
        },
      });

      const imageDescription = promptResponse.data.result;
      setImageDesc(imageDescription);
      setShow(true);

    } catch(e) {
      console.log("error", e)
    } finally {
      setLoading(false);
    }
  }

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
      {imgContent && (
        <>
          <Flex flexDir="column" alignItems="flex-end">
            <Image
              src={imgContent}
              alt="Post Image"
              borderRadius="lg"
              mb={4}
              objectFit="cover"
              maxH="200px"
              w="full"
            />
            <IconButton
              onClick={handleDescriptionImage}
              aria-label="Like"
              isLoading={loading}
              icon={
                loading ?  <FaSpinner fontSize={14} color='black' />  : <FaRegFileAudio fontSize={14} color='black' />
              }
              variant="ghost"
              backgroundColor="gray.300"
              mt={-14}
              borderRadius={40}
            />
          </Flex>
          {imageDesc.length > 0 && (
            <Box mt={2} mb={2} display="flex" flexDir="column" alignItems="flex-end">
              <Button w={14} h={8} size="small" mb={2} onClick={() => setShow(!show)}>
                <Text fontSize={12}>
                  {show ? "Hide" : "Show"}
                </Text>
              </Button>
              <Text display={show ? "flex" : "none"} textAlign="left" fontSize={12}>Image description: {imageDesc}</Text>
            </Box>
          )}
        </>
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