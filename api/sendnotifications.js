//
import axios from "axios";

export default async function handler(req, res) {
	const { interest } = await req.body;
	const { message } = await req.body;
	console.log(interest.toString());
	try {
		const response = await axios.post(
			"YOUR OUSHER INSTANCE AND URL",
			{
				interests: [interest],
				web: {
					notification: {
						title: "Vous avez un nouveau message",
						body: message,
					},
				},
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer token",
				},
			}
		);

		console.log("Notification sent:", response.data);
		res
			.status(200)
			.json({ success: true, message: "Notification sent successfully" });
	} catch (error) {
		console.error("Error sending notification:", error);
		res
			.status(500)
			.json({
				success: false,
				message: "Error sending notification",
				error: error.message,
			});
	}
}
