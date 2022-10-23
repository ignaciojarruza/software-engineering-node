import User from "./User";

/**
 * Tuit class.
 */
export default class Tuit {
   private id: string;
   public tuit: string;
   public postedOn: Date;
   public postedBy: User | null;

   /**
    * Constructor : instantiates a tuit object.
    * @param id the id of the tuit
    * @param tuit the tuit content
    * @param postedOn the date the tuit was posted on
    */
   constructor(id: string, tuit: string, postedOn: Date) {
           this.id = id;
           this.tuit = tuit;
           this.postedOn = postedOn;
           this.postedBy = null;
   }

   /**
    * Setter for postedBy.
    * @param user the user id that posted the tuit
    */
   public set author(user: User | null) { this.postedBy = user; }

   /**
    * Getter for author of tuit.
    * @return the user that posted tuit
    */
   public get author(): User | null { return this.postedBy; }

   /**
    * Getter for tuit content.
    * @return the tuit
    */
   public get post(): string { return this.tuit; }
}
