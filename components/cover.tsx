"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageOff, ImageUp } from "lucide-react";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { remove } from "@/convex/documents";
import { toast } from "sonner";

interface CoverImageProps {
    url?: string;
    preview?: boolean;
}

export const Cover = ({
    url, preview
}: CoverImageProps) => {
    const params = useParams();
    const coverImage = useCoverImage();
    const removeCoverImage = useMutation(api.documents.removeCoverImage);

    const onRemove = () => {
        removeCoverImage({
            id: params.documentId
        });
        toast.success("Removed the cover");
    }

    return (
        <div className={cn(
            "relative w-full h-[35vh] group",
            !url && "h-[12vh]",
            url && "bg-muted",
        )}>
            {!!url && (
                <Image
                    src={url}
                    fill
                    alt="Document cover image"
                    className="object-cover"
                />
            )}
            {url && !preview && (
                <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick={coverImage.onOpen}
                        variant="secondary"
                        className="text-xs"
                        size="sm"
                    >
                        <ImageUp className="h-4 w-4 mr-2"/>
                        Change cover
                    </Button>
                    <Button
                        onClick={onRemove}
                        className="text-xs"
                        size="sm"
                    >
                        <ImageOff className="h-4 w-4 mr-2"/>
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
}