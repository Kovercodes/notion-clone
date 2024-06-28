"use client";

import { cn } from "@/lib/utils";

interface MessageProps {
    position: string;
    body: string;
}

export const Message = ({position, body}: MessageProps) => {
    return (
        <div 
            className={cn("p-2 px-4 bg-neutral-300  max-w-[80%] rounded-md dark:bg-neutral-600", 
            position === "left" ? "self-start rounded-bl-none" : "self-end rounded-br-none"
        )}>
            <p className="text-sm text-left">{body}</p>
        </div>
    )
}