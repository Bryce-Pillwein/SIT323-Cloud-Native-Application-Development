"use strict";
// Firebase 
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!firebase_admin_1.default.apps.length) {
    try {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert({
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: (_a = process.env.FIREBASE_ADMIN_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/^"|"$/g, '').replace(/\\n/g, '\n'),
                projectId: process.env.FIREBASE_PROJECT_ID,
            }),
        });
        console.log("Initalised App (Admin Credentials)");
    }
    catch (error) {
        console.error("Failed to initialize Firebase Admin SDK:", error);
    }
}
exports.db = firebase_admin_1.default.firestore();
exports.auth = firebase_admin_1.default.auth();
