import {Router} from "express";

import * as contactControllers from "../controllers/contacts.js";

import isValidId from "../middlewares/isValid.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";
import upload from "../middlewares/upload.js";

import { contactAddSchema, contactPatchSchema } from "../validation/contacts.js";



const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(contactControllers.getAllContactsController));

contactsRouter.get("/:id", isValidId, ctrlWrapper(contactControllers.getContactByIdController));

contactsRouter.post("/", ctrlWrapper(contactControllers.addContactController));

contactsRouter.post("/", upload.single("poster"), validateBody(contactAddSchema), ctrlWrapper(contactControllers.addMovieController));

contactsRouter.put("/:id", isValidId,  validateBody(contactAddSchema),  ctrlWrapper(contactControllers.upsertContactController));

contactsRouter.patch("/:id", isValidId, validateBody(contactPatchSchema),ctrlWrapper(contactControllers.patchContactController));

contactsRouter.delete("/:id", isValidId,ctrlWrapper(contactControllers.deleteContactController));

export default contactsRouter;