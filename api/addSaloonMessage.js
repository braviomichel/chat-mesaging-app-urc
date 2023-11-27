// createMessage.js

import { kv } from "@vercel/kv";
export const config = {
  runtime: 'edge',
};

export default async function handler (request) {
 try {
  
const {roomID, roomName, senderId,senderName , messageContent} = await request.json();

const saloonKey = `saloon:${roomID}:${roomName}`;

  
  const timestamp = new Date().toISOString();
  const newMessage = { roomID: roomID, roomName : roomName, senderId : senderId, senderName: senderName, messageContent: messageContent, timestamp: timestamp};

  await kv.lpush(saloonKey, newMessage);
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
