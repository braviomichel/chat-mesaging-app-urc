import { ErrorCallback,  Message, MessageInfos, SaloonInfos,SaloonMessage} from "../../model/common";
import {CustomError} from "../../model/CustomError";

export function getMessage(messageInfos : MessageInfos, onResult: (message: Message[]) => void, onError: ErrorCallback) {  
    //console.log("fff"+ messageInfos);
    fetch("/api/getMessages",
    {
        method: "POST", // ou 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageInfos),
    })
        .then(async (response) => {
            if (response.ok) {
                const messageList: Message[] = await response.json();
        
        
                onResult(messageList);
            } else {
              const error = await response.json() as CustomError;
              onError(error);
            }
        }, onError);
}



export function getSaloonMessage(saloonInfos : SaloonInfos, onResult: (saloonmessage: SaloonMessage[]) => void, onError: ErrorCallback) {  
    //console.log("fff"+ messageInfos);
    fetch("/api/getSaloonMessage",
    {
        method: "POST", // ou 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(saloonInfos),
    })
        .then(async (response) => {
            if (response.ok) {
                const messageList: SaloonMessage[] = await response.json();
        
        
                onResult(messageList);
            } else {
              const error = await response.json() as CustomError;
              onError(error);
            }
        }, onError);
}