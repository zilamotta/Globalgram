import React from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';

interface UploadInputProps {
    selectedImage: string | null;
    setSelectedImage: (img: string | null) => void;
}
export default function UploadInput({ selectedImage, setSelectedImage }: UploadInputProps) {
    const toast = useToast();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        const imageInput = document.getElementById('imageInput');
        if (imageInput) {
            imageInput.click();
        }
    };
    const handleClearImage = () => {
        setSelectedImage(null);
        toast({
          title: 'Image cleared.',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
      };

    return (
        <Box
          p={4}
          borderWidth={2}
          borderRadius="md"
          borderColor="blue.300"
          textAlign="center"
          mx="auto"
          w="100%"
        >
          <VStack w="100%">
            {selectedImage ? (
              <VStack w="100%">
                <Image
                  src={selectedImage}
                  alt="Selected"
                  maxW="full"
                  borderRadius="md"
                  boxShadow="md"
                />
                <Button colorScheme="red" onClick={handleClearImage}>
                  Clear Image
                </Button>
              </VStack>
            ) : (
              <Text></Text>
            )}
    
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              title="Upload Image"
              style={{ display: 'none' }}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Upload Image"
              icon={<FaUpload />}
              onClick={handleUploadClick}
            />
          </VStack>
        </Box>
      );
}