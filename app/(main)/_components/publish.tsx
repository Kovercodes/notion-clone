"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { 
    PopoverTrigger ,
    Popover,
    PopoverContent
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SquareCheck, CopyIcon, GlobeIcon, SparklesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PublishProps {
    initialData: Doc<"documents">;
}

export const Publish = ({
    initialData
}: PublishProps) => {
    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true,
        }).finally(() => {
            setIsSubmitting(false);
        });

        toast.promise(promise, {
            loading: "Publishing...",
            success: `Successfully published ${initialData.title}`,
            error: "Failed to publish",
        })
    };

    const onUnpublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false,
        }).finally(() => {
            setIsSubmitting(false);
        });

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: `Now access to ${initialData.title} is closed`,
            error: "Failed to unpublish",
        })
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                    <GlobeIcon className={cn("w-4 h-4 mr-2", initialData.isPublished && ("text-violet-600 dark:text-violet-300"))}/>
                    Share
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                className="w-72"
                align="end"
                alignOffset={8}
                forceMount
            >
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <GlobeIcon className="text-violet-600 dark:text-violet-300 animate-pulse h-4 w-4"/>
                            <p className="text-xs font-medium">This note is live on web</p>
                        </div>
                        <div className="flex items-center">
                            <input 
                                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                value={url}
                                disabled
                            />
                            <Button 
                                size="sm"
                                onClick={onCopy}
                                disabled={copied}
                                className="h-8 rounded-l-none"
                            >
                                {copied ? (
                                    <SquareCheck className="h-5 w-5"/>
                                ) : (
                                    <CopyIcon className="h-5 w-5"/>
                                )}
                            </Button>
                        </div>
                        <Button
                            size="sm"
                            className="w-full text-xs"
                            variant="outline"
                            disabled={isSubmitting}
                            onClick={onUnpublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <GlobeIcon className="h-8 w-8 text-muted-foreground mb-2"/>
                        <p className="text-sm font-m mb-2">
                            Publish this note
                        </p>
                        <span className="text-xs text-muted-foreground">
                            Share your work with others.
                        </span>
                        <Button
                            disabled={isSubmitting}
                            onClick={onPublish}
                            className="w-full text-xs mt-4"
                            size="sm"
                        >
                            <SparklesIcon className="w-4 h-4 mr-2 text-violet-300 dark:text-violet-600"/>
                            Publish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}