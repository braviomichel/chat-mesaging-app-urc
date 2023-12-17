// 
import axios from 'axios';


export default async function handler(req, res) {
  const {interest} = await req.body;
  const {message} = await req.body;
  console.log(interest.toString());
  try {
    const response = await axios.post(
      'https://14e90d90-e252-466d-a7f7-80087f6f7deb.pushnotifications.pusher.com/publish_api/v1/instances/14e90d90-e252-466d-a7f7-80087f6f7deb/publishes',
      {
        interests: [interest],
        web: {
          notification: {
            title: 'Vous avez un nouveau message',
            body: message,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 8CE36D5FF6B841C1E110EC8449D430C76125B0D2696CC4FA55EB32FCFE8B96B5',
        },
      }
    );

    console.log('Notification sent:', response.data);
    res.status(200).json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, message: 'Error sending notification', error: error.message });
  }
}
