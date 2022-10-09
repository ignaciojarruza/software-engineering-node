import User from "./User";

export default class Tuit {
   private id: string;
   public tuit: string;
   public postedOn: Date;
   public postedBy: User | null;

   constructor(id: string, tuit: string, postedOn: Date) {
           this.id = id;
           this.tuit = tuit;
           this.postedOn = postedOn;
           this.postedBy = null;
   }
   public set author(user: User | null) { this.postedBy = user; }
   public get author(): User | null { return this.postedBy; }
   public get post(): string { return this.tuit; }
}
