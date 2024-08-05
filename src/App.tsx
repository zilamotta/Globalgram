import {
  Box,
  ChakraProvider,
  Text,
  theme,
} from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WellCome from "./pages/WellCome";
import Home from "./pages/Home";
// import Post from "./components/Post";

export const App = () => {

  return (
      <ChakraProvider theme={theme}>
        <Box minH="calc(100vh - 50px)">
          <Router>
              <Routes>
                <Route path="/" element={<WellCome />} />
                <Route path="/home" element={<Home />} />
              </Routes>
          </Router>
        </Box>
        <Box as="footer" py={4} textAlign="center" bg="gray.800" color="white">
          <Text>© 2024 GlobalGram. All rights reserved.</Text>
        </Box>
      </ChakraProvider>
    )
}
