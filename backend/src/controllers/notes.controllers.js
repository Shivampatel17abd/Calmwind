import { notes } from "../models/notes.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNote = asyncHandler(async (req, res) => {
    const { userId, note } = req.body;

    if (!userId || !note) {
        throw new ApiError(400, "userId and note are required");
    }

    console.log(note)

    const newNote = await notes.create({ userId, note });

    if (!newNote) {
        throw new ApiError(500, "Failed to create note");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, newNote, "Note created successfully"));
});

const getNotesByUserId = asyncHandler(async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        throw new ApiError(400, "userId is required");
    }

    const userNotes = await notes.find({ userId }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, userNotes, "Notes fetched successfully"));
});

const getNoteById = asyncHandler(async (req, res) => {
    const noteId = req.params?.noteId || req.query?.noteId || req.body?.noteId;

    if (!noteId) {
        throw new ApiError(400, "noteId is required");
    }

    const note = await notes.findById(noteId);

    if (!note) {
        throw new ApiError(404, "No note exists with this noteId");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note fetched successfully"));
});

const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.body?.noteId || req.query?.noteId || req.params?.noteId;

    if (!noteId) {
        throw new ApiError(400, "noteId is required");
    }

    const note = await notes.findById(noteId);

    if (!note) {
        throw new ApiError(404, "No note exists with this noteId");
    }

    const deletednote = await notes.findByIdAndDelete(noteId);

    if (!deletednote) {
        throw new ApiError(500, "There was an error while deleting the note");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletednote, "Note deleted successfully"));
});

export {
    createNote,
    getNotesByUserId,
    getNoteById,
    deleteNote,
};
