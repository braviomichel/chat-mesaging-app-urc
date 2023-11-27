import { db } from '@vercel/postgres';
import { kv } from "@vercel/kv";

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    try {
        // Connexion à la base de données
        const client = await db.connect();

        // Sélection de tous les utilisateurs
        const { rowCount, rows } = await client.query('SELECT room_id, name FROM rooms');

        // Fermeture de la connexion à la base de données


        // Vérification du nombre de lignes
        if (rowCount === 0) {
            const error = { code: "NOT_FOUND", message: "Aucun salon trouvé" };
            return new Response(JSON.stringify(error), {
                status: 404,
                headers: { 'content-type': 'application/json' },
            });
        }

        // Construction de la liste des utilisateurs
        const saloonList = rows.map(saloon => ({
            roomId: saloon.room_id,
            roomName: saloon.name,
        }));


        return new Response(JSON.stringify(saloonList), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ code: "INTERNAL_SERVER_ERROR", message: "Erreur interne du serveur" }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
