import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary';


dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
});

const app = express();

//using middlewares
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

//importing routers
import userRouters from './routes/userRoutes.js';
import songRoutes from './routes/songRoutes.js';


//using routes
app.use("/api/user", userRouters);
app.use("/api/song", songRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
});