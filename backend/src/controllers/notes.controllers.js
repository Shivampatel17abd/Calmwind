import { notes } from "../models/notes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js"

const createNote = asyncHandler(async (req,res)=>{
   
    const {userId,note} = req.body


    console.log(userId,note);

    if(!userId || !note){
        throw new ApiError(400, "All fields  are required");
    }
    

    const newNote = await notes.create({userId,note});

    if(!newNote){
        throw new ApiError(500, "Failed to create note");
    }
    

    return res.status(200).json(new ApiResponse(200,newNote,"new Note created successfully"))

})


const getNotesByUserId = asyncHandler(async(req,res)=>{

    const{userId} = req.query;

    if(!userId){
        throw new ApiError(300,"userID required");
    }

    const userNotes = await notes.find({userId}).sort({createChat:-1});


    if(userNotes.length === 0){
        throw new ApiError(404,"No notes find with this userID");
    }
    
    return res.status(200).json(new ApiResponse(200,userNotes,"Notes succesfully get"));

})


const deleteNote = asyncHandler(async(req,res)=>{
     
    const {noteId} = req.body;

    if(!req.body){
        throw new ApiError("note id is required");
    }

    const note = await notes.findById(noteId);

    if(!note){
        throw new ApiError("there is no note exist with this noteID");
    }

     const deletednote = await notes.findByIdAndDelete(noteId);

     if(!deletednote){
        throw new ApiError(500,"there is error while deleting the note")
     }
     return res.status(200).json(new ApiResponse(200,deletednote,"note deleted successfully"));
})


export {
  createNote,
  getNotesByUserId,
  deleteNote
}