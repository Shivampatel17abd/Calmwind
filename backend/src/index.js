// import dotenv from "dotenv";
// import connectDB from "./DB/index.js";
// import app from "./app.js";

// dotenv.config({
//     path: "./.env",
// });

// const PORT = process.env.PORT || 8000;




// connectDB()
//     .then(() => {
//         app.on("error", (err) => {
//             console.error("Server error: ", err);
//             throw err;
//         });



//         app.listen(PORT, "0.0.0.0", () => {
//             console.log(`⚙️  Server is running at port: ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error("MongoDB connection failed !!! ", err);
//     });




import dotenv from "dotenv";
import connectDB from "./DB/index.js";
import app from "./app.js";
import { initializeQdrant } from "./services/qdrant_service.js";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        // Step 1: Connect MongoDB
        await connectDB();
        console.log("MongoDB connected successfully!");

        // Step 2: Initialize Qdrant collection
        await initializeQdrant();

        // Step 3: Handle Express errors
        app.on("error", (err) => {
            console.error("Server error: ", err);
            throw err;
        });

        // Step 4: Start Express server
        app.listen(PORT, "0.0.0.0", () => {
            console.log(`⚙️ Server is running at port: ${PORT}`);
        });

    } catch (err) {
        console.error("Server startup failed:", err);
        process.exit(1);
    }
};

startServer();

