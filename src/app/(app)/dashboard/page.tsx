"use client";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "next-auth";
import { Input } from "@/components/ui/input";
import { Comment } from "react-loader-spinner";

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { toast } = useToast();
  const handleDeleteMessage = async (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
    try {
      await axios.delete(`/api/delete-message/${messageId}`);
      toast({
        title: "Message deleted",
        description: "Message has been deleted",
      });
    } catch (error) {
      console.error("Error deleting message:", error);
      const AxiosError = error as AxiosError;

      toast({
        title: "Error deleting message",
        description: "An error occurred while deleting message",
        variant: "destructive",
      });
    }
  };
  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });
  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");
  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get(`/api/accept-messages`);
      setValue(`acceptMessages`, response.data.isAcceptingMessage);
    } catch (error) {
      console.error("Error fetching messages:", error);
      const AxiosError = error as AxiosError;

      toast({
        title: "Error fetching messages",
        description: "An error occurred while fetching messages",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);
      try {
        const response = await axios.get(`/api/get-messages`);
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Messages refreshed",
            description: "Messages have been refreshed",
          });
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        const AxiosError = error as AxiosError;

        toast({
          title: "Error fetching messages",
          description: "An error occurred while fetching messages",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );
  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        return;
      }
      await fetchMessages();
      await fetchAcceptMessages();
    };
    fetchData();
  }, [session, setIsLoading, setValue, fetchMessages, fetchAcceptMessages]);
  // handle switch change
  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post(`/api/accept-messages`, {
        acceptMessages: !acceptMessages,
      });
      setValue(`acceptMessages`, !acceptMessages);
      toast({
        title: "User status updated",
        description: response.data.message,
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      const AxiosError = error as AxiosError;

      toast({
        title: "Error updating user status",
        description: "An error occurred while updating user status",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  };
  if (!session || !session.user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div>
          <Comment
            visible={true}
            height="80"
            width="80"
            ariaLabel="comment-loading"
            wrapperStyle={{}}
            wrapperClass="comment-wrapper"
            color="#fff"
            backgroundColor="black"
          />
        </div>
      </div>
    );
  }
  const { username } = session?.user as User;
  console.log("username", session);
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "Link copied",
      description: "Your profile link has been copied to the clipboard",
    });
  };

  return (
    <div>
      <div className="my-8 mx-4 md:mx-8 lg:mx-auto  bg-white rounded  max-w-6xl ">
        <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
          <div className="flex items-center">
            <Input
              type="text"
              value={profileUrl}
              disabled
              className="input input-bordered w-full p-2 mr-2"
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>

        <div className="mb-4">
          <Switch
            {...register("acceptMessages")}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="ml-2">
            Accept Messages: {acceptMessages ? "On" : "Off"}
          </span>
        </div>
        <Separator />

        <Button
          className="mt-4"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessages(true);
          }}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </Button>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <MessageCard
                key={message._id}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p>No messages to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
