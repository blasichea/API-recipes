"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
function verifyUser(req) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const payload = jwt.verify(token, process.env.JWT_KEY || "jwtkey");
            if (!payload) {
                throw new Error('Verify tocken failed');
            }
            return { email: payload.email, userId: payload.id };
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
exports.default = verifyUser;
