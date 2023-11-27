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
        const { rowCount, rows } = await client.query('SELECT user_id, username,last_login FROM users');

        // Fermeture de la connexion à la base de données
     

        // Vérification du nombre de lignes
        if (rowCount === 0) {
            const error = { code: "NOT_FOUND", message: "Aucun utilisateur trouvé" };
            return new Response(JSON.stringify(error), {
                status: 404,
                headers: { 'content-type': 'application/json' },
            });
        }

        // Construction de la liste des utilisateurs
        const userList = rows.map(user => ({
            userId: user.user_id,
            username: user.username,
            last_login : user.last_login
        }));
        

        return new Response(JSON.stringify(userList), {
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
