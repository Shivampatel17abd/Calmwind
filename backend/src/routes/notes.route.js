import { Router } from "express";
import {
    createNote,
    deleteNote,
    getNoteById,
    getNotesByUserId,
} from "../controllers/notes.controllers.js";

const router = Router();

router.route("/create_note").post(createNote);
router.route("/get_notes").get(getNotesByUserId);
router.route("/get_note/:noteId").get(getNoteById);
router.route("/get_note").get(getNoteById);
router.route("/delete_note").delete(deleteNote);
router.route("/delete_note/:noteId").delete(deleteNote);

export default router;
