"use client";

import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useCoverImage } from "@/hooks/use-cover-image";

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

export const CoverImageModal = () => {
    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone/>
            </DialogContent>
        </Dialog>
    );
};