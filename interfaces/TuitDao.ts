import Tuit from "../models/Tuit";

/**
 * Interface for the Tuit DAO.
 */
export default interface TuitDao {
    /**
     * Handles controller calls and retrieves a list of all tuits in the database.
     * @return the list of tuits
     */
    findAllTuits(): Promise<Tuit[]>;

    /**
     * Handles the data from the controller and retrieves a tuit with the id provided.
     * @param id the id of the tuit
     * @return the tuit with id provided
     */
    findTuitById(id: string): Promise<Tuit>;

    /**
     * Handles data from the controller and retrieves a list of tuits frpm the user id provided.
     * @param authorId the user id
     * @return the list of tuits by the Author
     */
    findTuitsByAuthor(authorId: string): Promise<Tuit[]>;

    /**
     * Handles data from the controller and creates a record of a tuit in the database.
     * @param tuit the tuit details
     * @return the newly created tuit record
     */
    createTuit(tuit: Tuit): Promise<Tuit>;

    /**
     * Handles the data from the controller and updates a previously created tuit.
     * @param tuitId the id of the tuit
     * @param tuit the details of the tuit (from the BODY of the request)
     * @return the update status
     */
    updateTuit(tuitId: string, tuit: Tuit): Promise<any>;

    /**
     * Handles data from the controller and deletes a record of the tuit id provided.
     * @param tuitId the id of the tuit
     * @return the deletion status
     */
    deleteTuit(tuitId: string): Promise<any>; 
}
