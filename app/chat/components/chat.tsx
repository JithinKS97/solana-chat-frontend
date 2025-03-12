import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { io } from 'socket.io-client';
import { config } from "@/app/config";
import { useEffect, useState } from "react";

const chatUrl = config.chatUrl;

const socket = io(chatUrl, {
    transports: ['websocket']
});

export const Chat = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected');
        });

        return () => {
            socket.off('connect');
        }
    }, []);

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const handleSendMessage = () => {
        socket.emit('message', message);
    }
    
    return (
      <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
        <Textarea 
          placeholder="Type your message..." 
          className="min-h-[100px] resize-none" 
          value={message}
          onChange={handleMessageChange}
        />
        <Button onClick={handleSendMessage} className="self-end">Send</Button>
      </div>
    )
  }