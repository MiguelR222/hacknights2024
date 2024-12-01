"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export function LoginButton() {
  const router = useRouter();
  const session = useSession();
  const isSignedIn = !!session;
  const user = session?.data?.user;

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const handleSignIn = () => {
    router.push("/auth/login");
  };

  const buttonClasses =
    "bg-[#FFFFFF] hover:bg-[#FFD6BA] text-[#555B6E] hover:text-black";

  if (isSignedIn && user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer">
            <Button variant="ghost" className={`${buttonClasses} flex items-center space-x-2`} >
              {user.name}
            </Button>
            <img
              src={user.image || "/default-avatar.png"}
              alt="Foto de perfil"
              className="size-12 rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button asChild className={buttonClasses}>
      <Link href="/auth/login">Iniciar sesión</Link>
    </Button>
  );
}
