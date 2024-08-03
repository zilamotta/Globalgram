import { Input } from "@chakra-ui/react";


export default function InputContent() {
    return (
        <Input
            type="text"
            placeholder="What are you thinking about?..."
            borderRadius={40}
            bg="gray.50"
        />
    )
}