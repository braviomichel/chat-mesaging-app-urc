import { ErrorCallback,  NewSaloon} from "../../model/common";
import {CustomError} from "../../model/CustomError";

export function createSaloon(newsaloon : NewSaloon, onResult: (success: boolean) => void, onError: ErrorCallback) {  
      fetch("/api/createsaloon",
        {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newsaloon}),

        })
        .then(async (response) => {
            if (response.ok) {
               
              
                onResult(true);
              } else {
                const error = await response.json() as CustomError;
                onError(error);
                onResult(false); 

              }
        }, onError);
}