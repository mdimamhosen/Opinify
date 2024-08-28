"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { signInSchema } from "@/schemas/signInSchema";

const SignInPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const [isSingingIn, setIsSigningIn] = useState(false);
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSigningIn(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          toast({
            title: "Login Failed",
            description: "Incorrect email or password",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        }
      } else if (result?.url) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in",
          variant: "default",
        });
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error("Error logging in user", error);
      toast({
        title: "Error",
        description: "Error logging in user",
        variant: "destructive",
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex items-center justify-center   p-4  min-h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-2xl drop-shadow-2  sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl mb-4">
            Welcome Back to Opinify
          </h1>
          <p className="mb-4 text-sm sm:text-base md:text-lg">
            Sign in to continue your secret conversations
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full py-2 text-lg" type="submit">
              {isSingingIn ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="text-sm sm:text-base">
            Not a member yet?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
