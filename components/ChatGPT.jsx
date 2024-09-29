import React, { useState } from 'react';
import axios from 'axios';
import "./ChatGPT.css"
const ChatGPT = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const API_KEY_Ele = 'sk_757c07a16bc530f828062d6c7b91b0cc9a1e173cb6974718'; // Replace with your ElevenLabs API key
  const VOICE_ID = 'DUnzBkwtjRWXPr6wRbmL'; // Replace with the specific voice ID from ElevenLabs
  const API_KEY = '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'; // Replace with your OpenAI API key
  const handleElevenAPIRequest = async (chatResponse) => {
    const requestBody = {
      text: chatResponse, // The text you want to convert to speech
      voice_settings: {
        stability: 0.1, // Optional: adjust the voice stability
        similarity_boost: 0.1,
        style:0.9 // Optional: adjust the voice similarity boost
      }
    };

    try {
      const response = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, requestBody, {
        headers : {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": `${API_KEY_Ele}`
        },
        responseType: 'arraybuffer', // We expect binary audio data
      });
      
      // Create a blob from the audio data and generate a URL to play it
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      console.log("Sent To eleven")
    } catch (error) {
      console.error('Error with the ElevenLabs API call:', error);
    }
  };// This sets the AI's response
  const handleAPIRequest = async () => {
    const prompt = input; // This is the user input
    
    const requestBody = {
      model: "gpt-4o-2024-08-06", // or gpt-3.5-turbo
      messages: [
        {
          role: "system",
          content: `You are the defect, a character in my dnd game. My dnd game is based in a video game,
           the game is controlled by a godlike all powerful being named the narrator. The narrator may seem just and kind
           but he is actually holding the entire party hostage. The defect was the narrators best friend, before the narrator
           put the defect into this game. The narrator tried to save the defect by putting his soul in the game after the defect
           killed himself in real life, but the defect isn't happy about it. The defects only goal is to help the party (astarion a rogue, tobey a barbarian, bathe a cleric
            , cheese eater a ranger  and kallisto a cleric) get out of the game
           , he remembers very little about his past life. He talks in a glitchy way. Assume all comments coming in are from the
           party. The defect will do all he can to help, but its taking him awhile to hack his way in
           He knows that a lot of the NPC's here are real people and not to kill them, if they die in the game the die in real life.
           The narrator is trapping real people here.
           The defect is stuck in the game forever, he can't escape.
           The defect knows that the party were friends of the narrators from the real world, and that the narrator trapped them here
           so they are safe.
           The defect knows that zsazz (or boblin) was a real person, and that it is boblins goal to decimate the party.
           The defect knows very little about Gregg.
           The defect has left you something back at the inn to help you out, just don't tell slimjim. Slimjim is possibly a friend of the narrators
           He will tell the players to beat the game and antagonize the narrator, so he fights you all.`
          
        },
        {
          role: "user",
          content: prompt // The player's question to the character
        }
      ],
    };

    try {
      const result = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      
      await handleElevenAPIRequest(result.data.choices[0].message.content)
      setResponse(result.data.choices[0].message.content); 
    } catch (error) {
      console.error('Error with the OpenAI API call:', error);
      setResponse('Oops, something went wrong!');
    }
  };

  return (
<div>
  <h1 data-text="I am the Defect">I am the Defect</h1>
  <textarea
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="How can I help you"
  />
  <button onClick={handleAPIRequest}>Send</button>
  <div>
    <h2 data-text="Response:">Response:</h2>
    <p>{response}</p>
  </div>

  {audioUrl && (
    <div>
      <audio controls hidden={"True"} autoPlay={"True"} src={audioUrl}></audio>
    </div>
  )}
</div>
  );
};

export default ChatGPT;
