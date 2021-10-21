import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Get3LastMessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAthenticated";

const router = Router()

router.post("/authenticate", new AuthenticateUserController().handle)

// bate na rota de messages , vai até o MIDDLEWARE ensureAuthenticated, se der decerto, vai pro handle
router.post("/messages", ensureAuthenticated ,new CreateMessageController().handle )

router.get("/messages/last3", new Get3LastMessagesController().handle)

router.get("/profile",ensureAuthenticated , new ProfileUserController().handle)

export { router }