import { db } from '@vercel/postgres';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const {  creatorID, roomName } = await request.json();

    // Vérifier que tous les champs sont bien renseignés
    if (!roomName || !creatorID) {
      const error = { code: "BAD_REQUEST", message: "Tous les champs doivent être renseignés" };
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

  

    // Hasher le mot de passe
   

    // Enregistrer le nouvel utilisateur en base de données
    const newSaloonQuery = await client.sql`INSERT INTO rooms (name, created_on,created_by) VALUES (${roomName}, now(), ${creatorID}) RETURNING *`;
    const newUser = newSaloonQuery.rows[0];

   // Rediriger vers la page de login
   return new Response(null, {
    status: 200,
    headers: { 'content-type': 'application/json'},
  });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
