import { Button, Flex, IconButton, Text, Textarea } from '@chakra-ui/react'
import { useRef, useState } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';
import * as Bytescale from "@bytescale/sdk";
import axios from 'axios';
import { FaFileImage } from 'react-icons/fa';


export default function InputContent() {
    const [expanded, setExpanded] = useState(false);
    const TRANSCRIBE_API_TOKEN = process.env.REACT_APP_JIGSAWSTACK_TRANSCRIBE_API_TOKEN;

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const getAudioTranslated = async (fileUrl: string) => {
        try {
            const response = await axios.post("https://api.jigsawstack.com/v1/ai/transcribe", 
                {
                    url: fileUrl
                }, 
                {
                    headers: {
                    "x-api-key": TRANSCRIBE_API_TOKEN
                },
            });
            console.log("response", response)
        } catch(e){
            console.log("error", e)
        }
    }

    const uploadAudio = async (file: any) => {
        const uploadManager = new Bytescale.UploadManager({
            apiKey: "public_12a1z4S2bd4hucinpAuaWcScmd7W"
        });

        try {
            const { fileUrl } = await uploadManager.upload({ data: file });
            getAudioTranslated(fileUrl);
        } catch (e: any) {
            alert(`Error:\n${e.message}`);
        }
    }

    return (
        <Flex justifyContent="center" alignItems="center" flexDir="column">
            <Textarea
                placeholder="       What are you thinking about?..."
                borderRadius={40}
                bg="gray.50"
                height={expanded ? 200 : 0}
                onFocus={() => setExpanded(true)}
                onBlur={() => setExpanded(false)}
                ref={textAreaRef}
            />
                <Flex gap={2}>
                    <AudioRecorder 
                        onRecordingComplete={uploadAudio}
                        audioTrackConstraints={{
                            noiseSuppression: true,
                            echoCancellation: true,
                        }} 
                        downloadOnSavePress={false}
                        downloadFileExtension="webm"
                    />
                    <IconButton
                        aria-label="Upload img"
                        icon={ <FaFileImage fontSize={14} color='black' />}
                        variant="ghost"
                        backgroundColor="#ebebeb"
                    />
                    <Button w={20} h={10} colorScheme="blue">
                        <Text>Publicar</Text>
                    </Button>
                </Flex>
        </Flex>
    )
}