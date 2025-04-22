// import React, { useState, useEffect } from "react";

// import { collection, onSnapshot } from "firebase/firestore";
// import ChatList from "./ChatList";
// import ChatWindow from "./ChatWindow";
// import { db } from "@/service/firebase.service.";

// const Messenger: React.FC = () => {
//   const [chats, setChats] = useState<{ id: string; name: string }[]>([]);
//   const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
//   const currentUser:any = localStorage.getItem("user_id"); // Replace with actual user ID (e.g., from auth)

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "chats"), (snapshot) => {
//       const loadedChats = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as { id: string; name: string }[];
//       setChats(loadedChats);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className="flex h-screen">
//       <ChatList chats={chats} onSelectChat={setSelectedChatId} />
//       {selectedChatId ? <ChatWindow chatId={selectedChatId} currentUser={currentUser} /> : <div className="w-2/3 flex items-center justify-center text-gray-400">Select a chat to start messaging</div>}
//     </div>
//   );
// };

// export default Messenger;
