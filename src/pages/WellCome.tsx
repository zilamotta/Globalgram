

import { Box, Text, Heading, List, ListItem, ListIcon, Button, Center } from '@chakra-ui/react';
import { FaGlobe, FaGlobeAmericas, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function WellCome() {
    return (
        <Box p={4} maxW="sm" mx="auto">
          <Heading as="h1" size="lg" textAlign="center" mb={4}>
            Welcome to GlobalGram
          </Heading>
          <Text mb={4}>
            Break language barriers and connect with a global audience effortlessly for free.
          </Text>
          
          <Heading as="h2" size="md" mt={6} mb={4}>
            🌍 Why Choose GlobalGram?
          </Heading>
          <List spacing={3} mb={6}>
            <ListItem>
              <ListIcon as={FaGlobe} color="green.500" />
              Craft captions in multiple languages with just a few clicks
            </ListItem>
            <ListItem>
              <ListIcon as={FaGlobeAmericas} color="green.500" />
              Connect with audiences across different cultures and languages
            </ListItem>
            <ListItem>
              <ListIcon as={FaClock} color="green.500" />
              Create diverse language captions faster than ever before
            </ListItem>
          </List>
    
          <Heading as="h2" size="md" mt={6} mb={4}>
            How it works?
          </Heading>
          <List spacing={3} mb={6}>
            <ListItem>1. Type your caption or or record your voice to automatically generate the caption</ListItem>
            <ListItem>2. Select the languages you want to translate into</ListItem>
            <ListItem>3. ⁠Our AI generates translations, which you can then fine-tune</ListItem>
            <ListItem>4. Share your multilingual captions across your social media accounts</ListItem>
          </List>
    
          <Heading as="h2" size="md" mt={6} mb={4}>
            Perfect For
          </Heading>
          <List spacing={3} mb={6}>
            <ListItem>
              🚀 Social Media Influencers
            </ListItem>
            <ListItem>
              💼 Global Businesses
            </ListItem>
            <ListItem>
              🎨 Content Creators
            </ListItem>
            <ListItem>
              🌐 International Brands
            </ListItem>
            <ListItem>
              🧳 Travel Bloggers
            </ListItem>
          </List>
          <Center>
            <Button as={Link} to="/home"
                colorScheme='blue'
                >Let's try!</Button>
          </Center>
        </Box>
    );
}