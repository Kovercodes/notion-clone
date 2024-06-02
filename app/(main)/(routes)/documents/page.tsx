"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { toast } from "sonner";
import { ModeToggle } from "@/components/mode-toggle";

const DocumentsPage = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({title: "untitled"});

        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note. Try again later."
        });
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
                src="/empty.png"
                height="300"
                width="300"
                alt="A person looking from an empty box, half body"
                className="block dark:hidden"
            />
            <Image
                src="/empty-dark.png"
                height="300"
                width="300"
                alt="A person looking from an empty box, half body"
                className="hidden dark:block"
            />
            <h2 className="text-large font-medium">
                {user?.firstName ? `Welcome to ${user?.firstName}'s Jotion!` : `Welcome to ${user?.username}'s Jotion!`}
            </h2>
            <div className="flex items-center gap-x-4">
                <Button onClick={onCreate}>
                    <FilePlus className="w-4 h-4 mr-2"/>
                    Create a note
                </Button>
                <ModeToggle/>
            </div>
        </div>
    );
}
 
export default DocumentsPage;