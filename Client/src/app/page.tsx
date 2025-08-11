"use client";

import Header from "@/components/Header";
import InputBar from "@/components/InputBar";
import MessageArea from "@/components/MessageArea";
import React, { useState } from "react";

interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[];
}

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there, how can I help you?",
      isUser: false,
      type: "message",
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [checkpointId, setCheckpointId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // 1) push user message
    const newMessageId =
      messages.length > 0 ? Math.max(...messages.map((m) => m.id)) + 1 : 1;

    setMessages((prev) => [
      ...prev,
      {
        id: newMessageId,
        content: currentMessage,
        isUser: true,
        type: "message",
      },
    ]);

    const userInput = currentMessage;
    setCurrentMessage("");

    try {
      // 2) create AI placeholder
      const aiResponseId = newMessageId + 1;
      setMessages((prev) => [
        ...prev,
        {
          id: aiResponseId,
          content: "",
          isUser: false,
          type: "message",
          isLoading: true,
          searchInfo: { stages: [], query: "", urls: [] },
        },
      ]);

      // 3) build SSE url (env first, fallback to local)
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      let url = `${baseUrl}/chat_stream/${encodeURIComponent(userInput)}`;
      if (checkpointId) {
        url += `?checkpoint_id=${encodeURIComponent(checkpointId)}`;
      }

      // 4) open EventSource
      const eventSource = new EventSource(url);
      let streamedContent = "";
      let searchData: any = null;

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === "checkpoint") {
            setCheckpointId(data.checkpoint_id);
          } else if (data.type === "content") {
            streamedContent += data.content ?? "";
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiResponseId
                  ? { ...msg, content: streamedContent, isLoading: false }
                  : msg
              )
            );
          } else if (data.type === "search_start") {
            const newSearchInfo = {
              stages: ["searching"],
              query: data.query,
              urls: [],
            };
            searchData = newSearchInfo;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiResponseId
                  ? {
                      ...msg,
                      content: streamedContent,
                      searchInfo: newSearchInfo,
                      isLoading: false,
                    }
                  : msg
              )
            );
          } else if (data.type === "search_results") {
            try {
              const urls =
                typeof data.urls === "string"
                  ? JSON.parse(data.urls)
                  : data.urls;
              const newSearchInfo = {
                stages: searchData ? [...searchData.stages, "reading"] : ["reading"],
                query: searchData?.query || "",
                urls,
              };
              searchData = newSearchInfo;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiResponseId
                    ? {
                        ...msg,
                        content: streamedContent,
                        searchInfo: newSearchInfo,
                        isLoading: false,
                      }
                    : msg
                )
              );
            } catch (err) {
              console.error("Error parsing search results:", err);
            }
          } else if (data.type === "search_error") {
            const newSearchInfo = {
              stages: searchData ? [...searchData.stages, "error"] : ["error"],
              query: searchData?.query || "",
              error: data.error,
              urls: [],
            };
            searchData = newSearchInfo;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiResponseId
                  ? {
                      ...msg,
                      content: streamedContent,
                      searchInfo: newSearchInfo,
                      isLoading: false,
                    }
                  : msg
              )
            );
          } else if (data.type === "end") {
            if (searchData) {
              const finalSearchInfo = {
                ...searchData,
                stages: [...searchData.stages, "writing"],
              };
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === aiResponseId
                    ? { ...msg, searchInfo: finalSearchInfo, isLoading: false }
                    : msg
                )
              );
            }
            eventSource.close();
          }
        } catch (err) {
          console.error("Error parsing event data:", err, event.data);
        }
      };

      eventSource.onerror = (error) => {
        console.error("EventSource error:", error);
        eventSource.close();

        // Only show error if nothing streamed yet
        if (!streamedContent) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === aiResponseId
                ? {
                    ...msg,
                    content:
                      "Sorry, there was an error processing your request.",
                    isLoading: false,
                  }
                : msg
            )
          );
        }
      };

      // extra safety: close when 'end' dispatched
      eventSource.addEventListener("end", () => {
        eventSource.close();
      });
    } catch (err) {
      console.error("Error setting up EventSource:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: newMessageId + 1,
          content: "Sorry, there was an error connecting to the server.",
          isUser: false,
          type: "message",
          isLoading: false,
        },
      ]);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen py-8 px-4">
      <div className="w-[70%] bg-white flex flex-col rounded-xl shadow-lg border border-gray-100 overflow-hidden h-[90vh]">
        <Header />
        <MessageArea messages={messages} />
        <InputBar
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
