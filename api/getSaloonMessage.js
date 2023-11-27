// 

import { kv } from "@vercel/kv";

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const { roomID, roomName } = await request.json();

    // Créer une expression régulière pour obtenir toutes les clés de conversations
    //const saloonKeyPattern = `saloon:${roomID}:${roomName}:*`;
    const saloonkey = `saloon:${roomID}:${roomName}`;

    // Récupérer toutes les clés correspondantes à l'expression régulière
    //const keys = await kv.keys(saloonKeyPattern);

    // Récupérer les messages pour chaque clé
    // const allMessages = await Promise.all(
    //   keys.map(async (key) => {
    //     const messages = await kv.lrange(key, 0, -1);
    //     return  messages ;
    //     //        return { key, messages };

    //   })
    // );
    const messages = await kv.lrange(saloonkey, 0, -1);


    return new Response(JSON.stringify(messages), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
