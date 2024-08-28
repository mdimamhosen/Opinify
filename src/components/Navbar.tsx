"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;
  const router = useRouter();
  const handleLogOut = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };
  return (
    <nav className="p-4    bg-gray-900 text-white shadow-md   ">
      <div
        className=" max-w-6xl mx-auto flex flex-row justify-between
      items-center  "
      >
        <a href="#" className="text-xl  md:text-2xl lg:text-3xl font-bold    ">
          Opinify
        </a>
        {session ? (
          <>
            <span className="mr-4  hidden md:flex  uppercase text-[10px] sm:text-sm md:text-md lg:text-xl">
              Welcome {user?.username || user.email}
            </span>
            <Button
              onClick={handleLogOut}
              className="w-fit bg-slate-100 text-black "
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-fit bg-slate-100 text-black "
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
