import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * User class. A user has a username, password and other fields.
 */
export default class User {
   public id: string;
   public username: string = '';
   public password: string = '';
   public firstName: string | null = null;
   public lastName: string | null = null;
   public email: string = '';
   private profilePhoto: string | null = null;
   private headerImage: string | null = null;
   private accountType: AccountType = AccountType.Personal;
   private maritalStatus: MaritalStatus = MaritalStatus.Single;
   private biography: string | null = null;
   private dateOfBirth: Date | null = null;
   private joined: Date = new Date();
   private location: Location | null = null;
   constructor(id: string, username: string, password: string) {
      this.id = id; this.username = username; this.password = password;
   }

   /**
    * Getter for username of user.
    * @return username
    */
   get uName() { return this.username; }

   /**
    * Getter for the password of user.
    * @return password
    */
   get pass() { return this.password; }
}
