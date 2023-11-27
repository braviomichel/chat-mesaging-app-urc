import { ErrorCallback,  Message, SaloonMessage} from "../../model/common";
import {CustomError} from "../../model/CustomError";

export function addMessage(message : Message, onResult: (success: boolean) => void, onError: ErrorCallback) {  
    fetch("/api/addMessages",
    {
        method: "POST", // ou 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    })
        .then(async (response) => { 
            if (response.ok) { 
                onResult(true);
            } else {
              const error = await response.json() as CustomError;
              onError(error);
              onResult(false); // Signalise l'échec de la création du message
            }
        }, onError);
}

export function addSaloonMessage(saloonmessage : SaloonMessage, onResult: (success: boolean) => void, onError: ErrorCallback) {  
    fetch("/api/addSaloonMessage",
    {
        method: "POST", // ou 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(saloonmessage),
    })
        .then(async (response) => {
            if (response.ok) {  
                onResult(true);
            } else {
              const error = await response.json() as CustomError;
              onError(error);
              onResult(false); // Signalise l'échec de la création du message
            }
        }, onError);
}