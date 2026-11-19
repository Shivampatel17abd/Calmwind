import { Router } from "express";
import { createChat,getChatsByUserId  }  from "../controllers/chats.controllers.js";

const router = Router();

router.route("/create-chat").post(createChat);
router.route("/get-chats").get(getChatsByUserId);

export default router;
