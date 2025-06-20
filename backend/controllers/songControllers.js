import { Album } from "../models/Album.js";
import TryCatch from "../utils/TryCatch.js";
import getDataurl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

export const createAlbum = TryCatch(async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not admin",
        });
    }

    const { title, description } = req.body;

    const file = req.file;

    const fileUrl = getDataurl(file);

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    await Album({
        title,
        description,
        thumbnail: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
    });

    res.status(201).json({
        message: "Album Added",
    });
});
