"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { BotIcon, SendIcon } from "lucide-react";
import { Message } from "./message";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Message {
    body: string;
    position: string;
}

export const AiChat = () => {
const [query, setQuery] = useState('');
const [response, setResponse] = useState('');
const [messages, setMessages] = useState<Message[]>([]);

const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
        const res = await fetch('/api/coze/chat', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));

        setMessages([...messages, {body: JSON.stringify({ query }), position: "right" }]);
        setMessages([...messages, {body: response, position: "left" }]);
    } catch (error) {
        console.error('Error fetching API:', error);
        setResponse('Error fetching API');
    }
  };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div role="button" onClick={() => {}} className="absolute right-8 bottom-8 bg-gradient-to-tr from-sky-400 to-violet-600 dark:from-sky-200 dark:to-violet-300 p-2 rounded-full">
                    <BotIcon className="w-8 h-8 text-white dark:text-black"/>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex flex-col gap-y-2 min-h-80 justify-between">
                    <div className="flex flex-col gap-y-2">
                        <div className="font-bold text-md">Ai helper</div>
                        <Separator/>
                        <div className="w-full flex flex-col gap-y-1">
                            {messages.map((message) =>
                                <Message
                                    key={message.body}
                                    body={message.body}
                                    position={message.position}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex gap-x-2">
                        <Textarea
                            placeholder="Write your prompt"
                            className="max-h-40 min-h-10 h-10"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button size="sm" onClick={handleSubmit}>
                            <SendIcon className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}