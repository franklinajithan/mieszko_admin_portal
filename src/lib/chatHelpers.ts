import { db } from "@/service/firebase.service.";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";


// Function to initialize or fetch a chat
export const startOrFetchChat = async (currentUserId: string, targetUserId: string) => {
  const chatsRef = collection(db, "chats");

  // Query to check if a chat already exists between the two users
  const chatQuery = query(
    chatsRef,
    where("participants", "array-contains", currentUserId)
  );

  const chatSnapshot = await getDocs(chatQuery);

  // Check for an existing chat where participants include both users
  const existingChat = chatSnapshot.docs.find((doc) => {
    const participants = doc.data().participants;
    return participants.includes(targetUserId);
  });

  if (existingChat) {
    // Return the existing chat ID
    return existingChat.id;
  } else {
    // Create a new chat document
    const newChatRef = await addDoc(chatsRef, {
      participants: [currentUserId, targetUserId],
      createdAt: serverTimestamp(),
    });
    return newChatRef.id; // Return the new chat ID
  }
};
