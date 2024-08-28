"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Corrected import
import { useToast } from "@/components/ui/use-toast";

// Schema and Types
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";

// Infer the form data type from the schema
type VerifyFormData = z.infer<typeof verifySchema>;

const VerifyPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const form = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: VerifyFormData) => {
    try {
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Account verified. You can now log in.",
        });
        router.replace("/sign-in");
      } else {
        throw new Error(response.data.message || "Verification failed.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError?.response?.data?.message ||
          "An error occurred verifying account.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center    px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md drop-shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Verify Your Account
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Enter the verification code sent to your email.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
            noValidate
          >
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="code">Verification Code</FormLabel>
                  <Input
                    {...field}
                    id="code"
                    type="text"
                    placeholder="Enter your 6-digit code"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none 0 sm:text-sm"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              //   className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 rounded-md transition-colors duration-200"
            >
              Verify
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyPage;
