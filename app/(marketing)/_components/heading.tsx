"use client";

import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/spinner";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";

export const Heading = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your ideas, documents, & plans. Unified. Welcome to <span className="underline font-extrabold">Jotion</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Jotion is a connected workspace where <br /> better, faster job happens.
            </h3>
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                            Enhance your productivity
                            <ArrowRight className="h-4 w-4 ml-2"/>
                    </Button>
                </SignInButton>
            )}
            {isLoading && (
                <div className="flex w-full justify-center items-center">
                    <Spinner
                        size="lg"
                    />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter Jotion
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Link>
                </Button>
            )}
        </div>
    );
}