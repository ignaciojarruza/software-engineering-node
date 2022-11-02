"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BookmarksSchema_1 = __importDefault(require("./BookmarksSchema"));
/**
 * @file Implements mongoose model to CRUD
 * documents in the bookmarks collection
 */
const BookmarksModel = mongoose_1.default.model('BookmarksModel', BookmarksSchema_1.default);
exports.default = BookmarksModel;
