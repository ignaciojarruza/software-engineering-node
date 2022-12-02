/**
 * @file Tuit DAO for data handling.
 */
import TuitDaoI from "../interfaces/TuitDao";
import Tuit from "../models/Tuit";
import tuitModel from "../mongoose/TuitModel";

/**
 * @class DAO for Tuit functionality.
 * @property {TuitDao} tuitDao Maintains the singleton pattern
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Instantiates the Tuit DAO when called. Maintains the Singleton Pattern.
     * @return tuitDAO
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    /**
     * Handles the data from the controller and retrieves a tuit with the id provided.
     * @param id the id of the tuit
     * @return the tuit with id provided
     */
    public async findTuitById(id: string):
        Promise<Tuit> {
        const tuitMongooseModel = await tuitModel
            .findById(id).populate('postedBy').exec();
        const tuit = new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            new Date(tuitMongooseModel?.postedOn ?? (new Date())))
        return tuit;
    }

    /**
     * Handles controller calls and retrieves a list of all tuits in the database.
     * @return the list of tuits
     */
    public async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels =
            await tuitModel.find();
        /* const tuitModels = tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())))
            });
        return tuitModels; */
        /* return tuitModel.find().populate('postedBy', 'username'); */
        return tuitModel.find().populate({path: 'postedBy', select: 'username -_id'});
    }

    /**
     * Handles data from the controller and retrieves a list of tuits frpm the user id provided.
     * @param authorId the user id
     * @return the list of tuits by the Author
     */
    public async findTuitsByAuthor(authorId: string):
        Promise<Tuit[]> {
        /* const tuitMongooseModels = await tuitModel
            .find({postedBy: authorId});
        const tuitModels = tuitMongooseModels
            .map((tuitMongooseModel) => {
                return new Tuit(
                    tuitMongooseModel?._id.toString() ?? '',
                    tuitMongooseModel?.tuit ?? '',
                    new Date(tuitMongooseModel?.postedOn ?? (new Date())))
            });
        return tuitModels; */
        if (authorId === "me") {
            return [];
        }
        return tuitModel.find({postedBy: authorId}).populate({path: 'postedBy', select: 'username -_id'});
    }

    /**
     * Handles data from the controller and creates a record of a tuit in the database.
     * @param tuit the tuit details
     * @return the newly created tuit record
     */
    public async createTuit(tuit: Tuit): Promise<Tuit> {
        const tuitMongooseModel = await tuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel.tuit,
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
        )
    }

    /**
     * Handles data from the controller and deletes a record of the tuit id provided.
     * @param tuitId the id of the tuit
     * @return the deletion status
     */
    public async deleteTuit(tuitId: string): Promise<any> {
        return await tuitModel.deleteOne({_id: tuitId});
    }

    /**
     * Handles the data from the controller and updates a previously created tuit.
     * @param tuitId the id of the tuit
     * @param tuit the details of the tuit (from the BODY of the request)
     * @return the update status
     */
    public async updateTuit(tuitId: string, tuit: Tuit): Promise<any> {
        return tuitModel.updateOne(
            {_id: tuitId},
            {$set: {tuit: tuit.post}})
    }
}