import { kv } from "@vercel/kv";

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {


try {
   // console.log(request.body);
 
   const {senderId, receiverId} = await request.json();
 
   // {senderId, receiverId} = await request.json();
 
   const conversationKey = `conversations:${senderId}:${receiverId}`;
  
    //const messages = (await kv.get(conversationKey)) || [];

  const messages = await kv.lrange(conversationKey, 0, -1);

 // const messages = await kv.lrange("conversations:3:4", 0, -1);
//console.log(messages);
  return new Response(JSON.stringify(messages), {
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