import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "@/service/firebase.service.";

interface Message {
  id: string;
  text: string;
  sender: string;
  createdAt: number;
}

interface ChatWindowProps {
  chatId: string;
  currentUser: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, currentUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const messagesRef = collection(db, `messages/${chatId}/chat`);
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if (input.trim()) {
      const messagesRef = collection(db, `messages/${chatId}/chat`);
      await addDoc(messagesRef, {
        text: input,
        sender: currentUser,
        createdAt: serverTimestamp(),
      });
      setInput("");
    }
  };

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="p-4 bg-sky-500 text-white font-bold">Chat Room</div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 ${msg.sender === currentUser ? "text-right" : "text-left"}`}>
            <div className={`inline-block px-4 py-2 rounded-lg ${msg.sender === currentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="p-4 flex">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} className="flex-1 border rounded-l-lg p-2" placeholder="Type a message..." />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
