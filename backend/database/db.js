import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "SpotifyClone",
        });


        console.log("MondgoDb connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDb;