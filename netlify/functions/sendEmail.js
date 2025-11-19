const emailjs = require("@emailjs/nodejs");

exports.handler = async (event, context) => {
	const serviceId = process.env.EMAILJS_SERVICE_ID;
	const templateId = process.env.EMAILJS_TEMPLATE_ID;
	const publicKey = process.env.EMAILJS_PUBLIC_KEY;
	const privateKey = process.env.EMAILJS_PRIVATE_KEY;

	if (!serviceId || !templateId || !privateKey || !publicKey) {
		console.error(
			"ERROR: Missing one or more EmailJS environment variables."
		);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Internal server error: Configuration missing",
			}),
		};
	}

	if (event.httpMethod !== "POST") {
		return {
			statusCode: 405,
			body: JSON.stringify({ message: "Method not permitted" }),
		};
	}

	try {
		const data = JSON.parse(event.body);

		if (!data.name || !data.email || !data.message) {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: "Incomplete form data" }),
			};
		}

		const templateParams = {
			name: data.name,
			email: data.email,
			message: data.message,
		};

		const result = await emailjs.send(
            serviceId,
            templateId,
            templateParams,
            {
                privateKey: privateKey, 
                publicKey: publicKey
            }
        );

		console.log("Email sent:", result.status, result.text);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Email sent successfully" }),
		};
	} catch (error) {
		console.error("Error sending email:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: "Internal server error while sending email",
			}),
		};
	}
};
