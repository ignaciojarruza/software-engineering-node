"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @file Tuit Mongoose Schema.
 */
const TuitSchema = new mongoose_1.default.Schema({
    tuit: { type: String, required: true },
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    postedOn: Date,
}, { collection: 'tuits' });
exports.default = TuitSchema;
