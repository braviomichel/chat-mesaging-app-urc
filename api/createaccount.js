import { db } from '@vercel/postgres';
import { kv } from "@vercel/kv";
import { arrayBufferToBase64, stringToArrayBuffer } from "../lib/base64";

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  try {
    const { username, email, password } = await request.json();

    // Vérifier que tous les champs sont bien renseignés
    if (!username || !email || !password) {
      const error = { code: "BAD_REQUEST", message: "Tous les champs doivent être renseignés" };
      return new Response(JSON.stringify(error), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const client = await db.connect();
    const userExistsQuery = await client.sql`SELECT * FROM users WHERE username = ${username} OR email = ${email}`;
    if (userExistsQuery.rowCount > 0) {
      const error = { code: "DUPLICATE_USER", message: "Un utilisateur avec le même nom d'utilisateur ou la même adresse e-mail existe déjà" };
      return new Response(JSON.stringify(error), {
        status: 409,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Hasher le mot de passe
    const hash = await crypto.subtle.digest('SHA-256', stringToArrayBuffer(username + password));
    const hashed64 = arrayBufferToBase64(hash);

    // Générer un external_id
    const externalId = crypto.randomUUID().toString();

    // Enregistrer le nouvel utilisateur en base de données
    const newUserQuery = await client.sql`INSERT INTO users (username, email, password,created_on, external_id) VALUES (${username}, ${email}, ${hashed64}, now(), ${externalId}) RETURNING *`;
    const newUser = newUserQuery.rows[0];

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
