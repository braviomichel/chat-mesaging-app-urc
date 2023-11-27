import { ErrorCallback, Account } from "../model/common";
import { CustomError } from "../model/CustomError";


export function createUser(account: Account, onResult: (success: boolean) => void, onError: ErrorCallback) {
  fetch("/api/createaccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  })
    .then(async (response) => {
      if (response.ok) {
        // Si la réponse est un succès (200 OK), procédez normalement
        onResult(true);
      } else {
        const error = await response.json() as CustomError;
        onError(error);
        onResult(false); // Signalise l'échec de la création du compte
      }
    }, onError);
    
}
