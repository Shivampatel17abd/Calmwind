import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import app from "./app.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.error("Server error: ", err);
            throw err;
        });

        app.listen(PORT, () => {
            console.log(`⚙️  Server is running at port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed !!! ", err);
    });
