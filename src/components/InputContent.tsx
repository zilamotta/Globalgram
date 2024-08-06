import { Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Select, Text, Textarea } from '@chakra-ui/react'
import { useRef, useState } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';
import * as Bytescale from "@bytescale/sdk";
import axios from 'axios';
import { FaLanguage } from 'react-icons/fa';
import FullScreenLoader from './FullScreenLoader';
import UploadInput from './UploadInput';

export default function InputContent({ posts, setPosts }: { posts: any; setPosts: any }) {
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const TRANSCRIBE_API_TOKEN = process.env.REACT_APP_JIGSAWSTACK_TRANSCRIBE_API_TOKEN;
    const TRANSLATE_API_TOKEN = process.env.REACT_APP_JIGSAWSTACK_TRANSLATE_API_TOKEN;
    const STORAGE_API_TOKEN = process.env.REACT_APP_JIGSAWSTACK_STORAGE_API_TOKEN;

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const getAudioTranslated = async (fileUrl: string) => {
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'https://api.jigsawstack.com/v1/ai/transcribe';
        try {
            const response = await axios.post(`${corsProxy}${apiUrl}`, 
                {
                    url: fileUrl
                }, 
                {
                    headers: {
                    'Content-Type': 'application/json',
                    "x-api-key": TRANSCRIBE_API_TOKEN
                },
            });

            const { data } = response;
            const transcriptedText = data.text;
            if(textAreaRef && textAreaRef.current) {
                textAreaRef.current.value = transcriptedText;
            }
            
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
            return fileUrl;
        } catch (e: any) {
            alert(`Error:\n${e.message}`);
            return null;
        }
    }

    const handleTranscrible = async (file: any) => {
        setLoadingText('Transcribing audio...');
        setLoading(true);
        const url = await uploadAudio(file)
        if(url) {
            await getAudioTranslated(url);
        }
        setLoading(false)
    }

    const translateTo = async (language: string) => {
        setCurrentLanguage(language);
        try {
            setLoadingText('Translating text...');
            setLoading(true);
            const response = await axios.post("https://api.jigsawstack.com/v1/ai/translate", 
                {
                    current_language: currentLanguage,
                    target_language: language,
                    text: textAreaRef?.current?.value ? textAreaRef.current.value : '',
                }, 
                {
                    headers: {
                    'Content-Type': 'application/json',
                    "x-api-key": TRANSLATE_API_TOKEN
                    },
                }
            );
            const { data } = response
            if(textAreaRef.current) {
                textAreaRef.current.value = data.translated_text;
            }
        } catch(e) {
            console.log("error", e);
        } finally {
            setLoading(false);
        }
    }

    const handleCreatePost = async () => {
        try {
            setLoadingText('Creating post...');
            setLoading(true);
            const i = await fetch(selectedImage!);
            const blobImg = await i.blob();
            
            const response = await axios.post("https://api.jigsawstack.com/v1/store/file", 
                blobImg, 
                {
                    headers: {
                    'Content-Type': "image/png",
                    "x-api-key": STORAGE_API_TOKEN
                    },
                }
            );
            const { data } = response;
            const { url, key } = data;
            setPosts([...posts, {
                date: new Date().toLocaleDateString(),
                content: textAreaRef?.current?.value ?? '',
                imageSrc: url,
                imgContent: selectedImage,
                imgKey: key
            }]);
        } catch (e) {
            console.log("e", e);
        } finally {
            setLoadingText('');
            setLoading(false);
            if(textAreaRef.current) {
                textAreaRef.current.value = '';
            }
            setSelectedImage(null);
        }
    };

    return (
        <>
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
            <UploadInput selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            <Flex gap={2}>
                <AudioRecorder 
                    onRecordingComplete={handleTranscrible}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true,
                    }} 
                    downloadOnSavePress={false}
                    downloadFileExtension="webm"
                />
                <Menu>
                    <MenuButton> 
                        <IconButton
                            aria-label="Search button"
                            icon={<FaLanguage fontSize={22} color="black" />}
                            variant="ghost"
                        />
                    </MenuButton>
                    <MenuList>
                        {
                            [
                                {lang: "Português", acronym: "br"}, 
                                {lang: "Inglês", acronym: "en"}, 
                                {lang: "Italiano", acronym: "it"},
                                {lang: "Alemão", acronym: "de"},
                                {lang: "Espanhol", acronym: "es"},
                                {lang: "Francês", acronym: "fr"},
                                ].map(
                                (language: any, index) => (
                                    <MenuItem key={index} onClick={() => translateTo(language.acronym)}>{language.lang}</MenuItem>
                                )
                            )
                        }
                    </MenuList>
                </Menu>
            </Flex>
            <Button 
                colorScheme='blue' 
                mt={6} 
                isDisabled={textAreaRef?.current?.value === ''}
                onClick={handleCreatePost}
                >Publish post</Button>
        </Flex>
        { loading && <FullScreenLoader loadingText={loadingText} /> }
        </>
    )
}