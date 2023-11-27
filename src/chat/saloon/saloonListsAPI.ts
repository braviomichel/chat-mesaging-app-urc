import { ErrorCallback,  SaloonInfos} from "../../model/common";
import {CustomError} from "../../model/CustomError";

export function getAllSaloon( onResult: (saloonList: SaloonInfos[]) => void, onError: ErrorCallback) {  
      fetch("/api/saloon",
        {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(async (response) => {
            if (response.ok) {
                const saloonList: SaloonInfos[] = await response.json();
        
              
                onResult(saloonList);
              } else {
                const error = await response.json() as CustomError;
                onError(error);
              }
        }, onError);
}