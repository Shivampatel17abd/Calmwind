import { Router } from "express";
import { createNote, deleteNote,getNotesByUserId } from "../controllers/notes.controllers.js";


const router = Router();

router.route('/create_note').post(createNote);
router.route('/get_notes').get(getNotesByUserId);
router.route('/delete_note').delete(deleteNote);

export default router
