"use client";
import React from "react";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Message } from "@/model/User";
import { useToast } from "@/components/ui/use-toast";
import { on } from "events";
type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();
  const handleDeleteConfirm = async () => {
    // const response = await fetch(`/api/delete-message/${message._id}`);
    toast({
      title: "Message Deleted",
      description: "The message has been deleted successfully",
    });
    onMessageDelete(message._id);
  };
  return (
    <div>
      <Card className="card-bordered h-32">
        <CardHeader className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base md:text-lg lg:text-xl">
              {message.content}
            </CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <X className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this message.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="text-sm">
            {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default MessageCard;
