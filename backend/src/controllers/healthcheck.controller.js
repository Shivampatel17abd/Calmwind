import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
    const dbStatus =
        mongoose.connection.readyState === 1 ? "CONNECTED" : "DISCONNECTED";

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                database: dbStatus,
                uptime: `${Math.floor(process.uptime())}s`,
                timestamp: new Date().toISOString(),
            },
            "Server is running smoothly"
        )
    );
});

export { healthcheck };
