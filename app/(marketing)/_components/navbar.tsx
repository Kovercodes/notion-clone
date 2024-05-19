"use client";

import { useConvexAuth } from "convex/react";
import { SignIn, SignInButton, UserButton } from "@clerk/clerk-react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/spinner";
import Link from "next/link"

export const Navbar = () => {
    const {isAuthenticated, isLoading} = useConvexAuth();
    const scrolled = useScrollTop();

    return (
        <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-neutral-900",
            scrolled && "border-b shadow-sm dark:shadow-none"
        )}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <Spinner/>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <div className="flex gap-x-1">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/documents">See my documents</Link>
                            </Button>
                            <UserButton
                                afterSignOutUrl="/"
                            />
                        </div>
                    </>
                )}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="outline" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">
                                Get jotion for free
                            </Button>
                        </SignInButton>
                    </>
                )}
                <ModeToggle/>
            </div>
        </div>
    )
}