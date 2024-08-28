"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react"; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow   flex flex-col items-center min-h-screen justify-center px-4 md:px-24 py-12 bg-gray-700 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <h2 className="text-2xl font-bold my-4">About Opinify</h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Opinify - Where your identity remains a secret.
            <br />
            Opinify allows users to provide anonymous feedback, ensuring
            confidentiality and honest communication.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* About Section */}

        <p className="text-base my-4">
          Developed by{" "}
          <code className="bg-gray-600 p-1 rounded-md text-white">
            Md Imam Hosen
          </code>
        </p>
        <p className="text-base">
          Reach out at:{" "}
          <code className="bg-gray-600 p-1 rounded-md text-white">
            mdimam.cse9.bu@gmail.com
          </code>
        </p>

        {/* Contact Section */}
        <section className="mt-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-base mb-4">
            Have questions or need more information? Contact me via email.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2024 Opinify. All rights reserved.
      </footer>
    </>
  );
}
