import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import ChatWindow from "@/apps/ChatManagement/ChatWindow";
import { startOrFetchChat } from "@/lib/chatHelpers";
import { db } from "@/service/firebase.service.";
import { getUser } from "@/service/user.service"; // Your user-fetching API

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<{ id: string; name: string }[]>([]); // Existing chats
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]); // Fetched user list
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const currentUserId: any = localStorage.getItem("user_id"); // Simulated logged-in user

  // Fetch chats
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
      const userChats = snapshot.docs
        .filter((doc) => doc.data().participants.includes(currentUserId))
        .map((doc) => ({
          id: doc.id,
          name: doc.data().participants.find((p: string) => p !== currentUserId),
        }));
      setChats(userChats);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  // Fetch user list
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getUser();
        if (result.status !== 200) {
          console.error(result.data);
          return;
        }
        const userData = result.data.data.map((user: any) => ({
          id: user.userId,
          name: user.username,
        }));
        setUsers(userData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUser();
  }, []);

  // Start a new chat dynamically with selected user
  const handleStartChat = async (targetUserId: string) => {
    const chatId = await startOrFetchChat(currentUserId, targetUserId);
    setSelectedChatId(chatId);
  };

  return (
    <div className="main main-app p-lg-1">
      <div className="min-h-screen bg-zinc-50">
        <div className="h-screen flex bg-gray-100">
          {/* Sidebar */}
          <div className="w-1/3 bg-white border-r shadow-xl flex flex-col">
            <h2 className="p-2 bg-slate-500 text-white text-lg font-semibold tracking-wider text-center">
              Your Chats
            </h2>

            {/* Existing Chats */}
            <ul className="flex-1 overflow-auto divide-y divide-gray-200">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className="p-4 hover:bg-blue-50 transition cursor-pointer flex items-center justify-between"
                  onClick={() => setSelectedChatId(chat.id)}
                >
                  <span className="text-gray-800 font-medium">{chat.name}</span>
                  <span className="text-gray-400 text-xs">Open Chat</span>
                </li>
              ))}
            </ul>

            {/* Start New Chat */}
            <div className="p-4">
              <h3 className="text-gray-700 font-semibold mb-2">Start New Chat</h3>
              <ul className="space-y-2">
                {users
                  .filter((user) => user.id !== currentUserId) // Exclude the current user
                  .map((user) => (
                    <li
                      key={user.id}
                      className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 cursor-pointer text-gray-800"
                      onClick={() => handleStartChat(user.id)}
                    >
                      {user.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Chat Window */}
          <div className="w-2/3 flex items-center justify-center bg-white shadow-lg rounded-md">
            {selectedChatId ? (
              <ChatWindow chatId={selectedChatId} currentUser={currentUserId} />
            ) : (
              <div className="text-gray-400 text-lg font-semibold">
                Select a chat or start a new conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
