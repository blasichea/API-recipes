import * as jwt from "jsonwebtoken";

export default function verifyUser (req: any) {
	try {
		const authHeader = req.headers.authorization;
		if (authHeader) {
			const token = authHeader.split(' ')[1];
			const payload = jwt.verify(token, process.env.JWT_KEY || "jwtkey");
			if (!payload) {
				throw new Error('Verify tocken failed');
			}
			return {email: payload.email, userId: payload.id};
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}