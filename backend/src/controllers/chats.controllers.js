import mongoose from "mongoose";
import {Apiresponse} from'../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import { asyncHandler } from "../utils/asyncHandler.js";
import { Chat } from "../models/chat.model.js";

const createChat = asyncHandler(async(req,res)=>{
    const {userId,query} = req.body;
    
    if(!userId || !query){
        throw new ApiError(400, "All fields (fullName, email, username, password) are required");
    }

    const newChat = Chat.create({userId,query});

    if(!newChat){
        throw new ApiError(500, "Failed to create chat");
    }

    return res.status(201).json(new Apiresponse(201, newChat, "Chat created successfully"));
})

const getChatsByUserId = asyncHandler(async(req,res)=>{

    const {userId} = req.body;

    if(!userId){
        throw new ApiError(400,"userId is required");
    }

    const chats = await Chat.find({userId}).sort({createChat:-1});


    if(chats.length === 0){
        throw new ApiError(404,"No chats found for the give userId");

    }
    return res.status(200).json(new Apiresponse(200, chats, "Chats found successfully"));
})

export {
    createChat,
    getChatsByUserId
}