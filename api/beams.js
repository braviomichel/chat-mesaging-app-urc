import {getConnecterUser, triggerNotConnected} from "../lib/session";

const PushNotifications = require("@pusher/push-notifications-server");


export default async (req, res) => {

   const userIDInQueryParam = req.query["user_id"];
    const user = await getConnecterUser(req);
    console.log("PushToken : " + userIDInQueryParam + " -> " + JSON.stringify(user) + "external user id : " + user.externalId);
    if (user === undefined || user === null || userIDInQueryParam !== user.externalId) {
        console.log("Not connected");
        triggerNotConnected(res);
        return;
    }

    console.log("Using push instance : " + "14e90d90-e252-466d-a7f7-80087f6f7deb");
    const beamsClient = new PushNotifications({
        instanceId: "14e90d90-e252-466d-a7f7-80087f6f7deb",
        secretKey: "8CE36D5FF6B841C1E110EC8449D430C76125B0D2696CC4FA55EB32FCFE8B96B5",
        
    });

    const beamsToken = beamsClient.generateToken(user.externalId);

    console.log(JSON.stringify(beamsToken));
    res.send(beamsToken);

}



