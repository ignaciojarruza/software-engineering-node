"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tuit class.
 */
class Tuit {
    /**
     * Constructor : instantiates a tuit object.
     * @param id the id of the tuit
     * @param tuit the tuit content
     * @param postedOn the date the tuit was posted on
     */
    constructor(id, tuit, postedOn) {
        this.id = id;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = null;
    }
    /**
     * Setter for postedBy.
     * @param user the user id that posted the tuit
     */
    set author(user) { this.postedBy = user; }
    /**
     * Getter for author of tuit.
     * @return the user that posted tuit
     */
    get author() { return this.postedBy; }
    /**
     * Getter for tuit content.
     * @return the tuit
     */
    get post() { return this.tuit; }
}
exports.default = Tuit;
