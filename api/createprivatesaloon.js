import { db } from '@vercel/postgres';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const { creatorID, roomName, usersList } = await request.json();

    // Vérifier que tous les champs sont bien renseignés
    if (!roomName || !creatorID || !usersList) {
      const error = { code: "BAD_REQUEST", message: "Tous les champs doivent être renseignés" };
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Début de la transaction
    await db.tx(async t => {
      // Insérer le nouveau salon dans la table rooms et récupérer l'ID généré
      const { room_id: room_id } = await t.one(
        'INSERT INTO rooms (name, created_on, created_by) VALUES ($1, NOW(), $2) RETURNING room_id',
        [roomName, creatorID]
      );

      // Ajouter chaque utilisateur autorisé dans la table SalonUtilisateurAutorise
      const insertUserPromises = usersList.map(userID =>
        t.none('INSERT INTO salonsprives (salonid, userid) VALUES ($1, $2)', [room_id, userID])
      );

      // Attendre que toutes les insertions soient terminées
      await Promise.all(insertUserPromises);
    });

    // Retourner une réponse réussie
    return new Response(null, {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
