import mongoose from "mongoose";
const connectDB = async (DATABASE_URL, dbName) =>{
try {
    const DB_Name = dbName;
    await mongoose.connect(`${DATABASE_URL}/${DB_Name}`)
    console.log(`DB has beeen connected successfully `);
} catch (error) {
    console.log("error found: ", error.message)
}
};

export default connectDB;