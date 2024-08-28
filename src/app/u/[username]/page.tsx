"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";

const fetchQuestions = async () => {
  try {
    const response = await fetch("/questions.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    toast({
      title: "Error",
      description: "Failed to fetch questions",
      variant: "destructive",
    });
    return [];
  }
};

const getRandomQuestions = (questions: string[], count: number): string[] => {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function SendMessage() {
  const params = useParams();
  const username = params.username;

  const form = useForm({
    resolver: zodResolver(messageSchema),
  });

  const [questions, setQuestions] = useState<string[]>([]);
  const [displayedQuestions, setDisplayedQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      const loadedQuestions = await fetchQuestions();
      setQuestions(loadedQuestions);
      setDisplayedQuestions(getRandomQuestions(loadedQuestions, 3));
    };

    loadQuestions();
  }, []);

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = () => {
    if (questions.length > 0) {
      setDisplayedQuestions(getRandomQuestions(questions, 3));
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-lg min-h-screen max-w-4xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm sm:text-base">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-6">
        <div className="space-y-2">
          <Button
            onClick={fetchSuggestedMessages}
            className="my-2"
            disabled={isLoading}
          >
            Suggest Messages
          </Button>
          <p className="text-sm sm:text-base">
            Click on any message below to select it.
          </p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
              Messages
            </h3>
          </CardHeader>
          <CardContent className="flex flex-col  space-y-2 sm:space-y-4 p-4">
            {questions.length === 0 ? (
              <p className="text-center text-gray-500">Loading messages...</p>
            ) : (
              displayedQuestions.map((message, index) => (
                <button
                  key={index}
                  // variant="outline"
                  className="w-full text-center text-sm md:tex-base py-2 px-2 md:px-4 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4 text-sm sm:text-base">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
