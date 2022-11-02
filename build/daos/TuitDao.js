"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tuit_1 = __importDefault(require("../models/Tuit"));
const TuitModel_1 = __importDefault(require("../mongoose/TuitModel"));
/**
 * @class DAO for Tuit functionality.
 * @property {TuitDao} tuitDao Maintains the singleton pattern
 */
class TuitDao {
    /**
     * Handles the data from the controller and retrieves a tuit with the id provided.
     * @param id the id of the tuit
     * @return the tuit with id provided
     */
    findTuitById(id) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModel = yield TuitModel_1.default
                .findById(id).populate('postedBy').exec();
            const tuit = new Tuit_1.default((_a = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.tuit) !== null && _b !== void 0 ? _b : '', new Date((_c = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.postedOn) !== null && _c !== void 0 ? _c : (new Date())));
            return tuit;
        });
    }
    /**
     * Handles controller calls and retrieves a list of all tuits in the database.
     * @return the list of tuits
     */
    findAllTuits() {
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModels = yield TuitModel_1.default.find();
            const tuitModels = tuitMongooseModels
                .map((tuitMongooseModel) => {
                var _a, _b, _c;
                return new Tuit_1.default((_a = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.tuit) !== null && _b !== void 0 ? _b : '', new Date((_c = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.postedOn) !== null && _c !== void 0 ? _c : (new Date())));
            });
            return tuitModels;
        });
    }
    /**
     * Handles data from the controller and retrieves a list of tuits frpm the user id provided.
     * @param authorId the user id
     * @return the list of tuits by the Author
     */
    findTuitsByAuthor(authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModels = yield TuitModel_1.default
                .find({ postedBy: authorId });
            const tuitModels = tuitMongooseModels
                .map((tuitMongooseModel) => {
                var _a, _b, _c;
                return new Tuit_1.default((_a = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', (_b = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.tuit) !== null && _b !== void 0 ? _b : '', new Date((_c = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.postedOn) !== null && _c !== void 0 ? _c : (new Date())));
            });
            return tuitModels;
        });
    }
    /**
     * Handles data from the controller and creates a record of a tuit in the database.
     * @param tuit the tuit details
     * @return the newly created tuit record
     */
    createTuit(tuit) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const tuitMongooseModel = yield TuitModel_1.default.create(tuit);
            return new Tuit_1.default((_a = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel._id.toString()) !== null && _a !== void 0 ? _a : '', tuitMongooseModel.tuit, new Date((_b = tuitMongooseModel === null || tuitMongooseModel === void 0 ? void 0 : tuitMongooseModel.postedOn) !== null && _b !== void 0 ? _b : (new Date())));
        });
    }
    /**
     * Handles data from the controller and deletes a record of the tuit id provided.
     * @param tuitId the id of the tuit
     * @return the deletion status
     */
    deleteTuit(tuitId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TuitModel_1.default.deleteOne({ _id: tuitId });
        });
    }
    /**
     * Handles the data from the controller and updates a previously created tuit.
     * @param tuitId the id of the tuit
     * @param tuit the details of the tuit (from the BODY of the request)
     * @return the update status
     */
    updateTuit(tuitId, tuit) {
        return __awaiter(this, void 0, void 0, function* () {
            return TuitModel_1.default.updateOne({ _id: tuitId }, { $set: { tuit: tuit.post } });
        });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Instantiates the Tuit DAO when called. Maintains the Singleton Pattern.
 * @return tuitDAO
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
