import mongoose , {Connection} from "mongoose";
class db{
    private connection : Connection | null;
    constructor() {
        this.connection = null;
    }
    async Connect(url : string) : Promise<void>{
        try{
            await mongoose.connect(url);
            this.connection = mongoose.connection;
            console.log("Connection to the Database ✅✅")
        }catch(err){
            console.log(`An error has occurred ${err}`);
        }  
    }
    getConnection() : Connection | null {
        return this.connection
    }
}
export default new db();