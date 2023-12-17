// createMessage.js

import { kv } from "@vercel/kv";

export const config = {
  runtime: 'edge',
};

export default async function handler (request) {
 try {
  

const {senderId, receiverId, senderName, messageContent} = await request.json();


  
const conversationKey = `conversations:${senderId}:${receiverId}`;



  const timestamp = new Date().toISOString();
  const newMessage = { senderId: senderId, receiverId : receiverId, senderName: senderName, messageContent: messageContent, timestamp: timestamp};


  
  await kv.lpush(conversationKey, newMessage);







 














  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
    
 } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
        status: 500,
        headers: {'content-type': 'application/json'},
    });
}

 
    
}
