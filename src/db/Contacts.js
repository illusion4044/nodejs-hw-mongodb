import {Schema, model} from "mongoose";

import { contactList } from "../constants/contacts.js";

import { handleSaveError, setUpdateOptions } from "./hooks.js";

const contactSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: true,
    },
    // contactType:{
    //     type: String,
    //     enum: ["personal", "home"],
    //     required: true,
    // },
    contactType: {
		type: String,
		enum: contactList,
		required: true,
		default: 'personal',
    },

    poster: {
        type: String,
    },


    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
    // createdAt:{
    //     type: String,
    //     match: createdAtRegexp,
    //     required: true,
    // },
    // updatedAt:{
    //     type: String,
    //     required: true,
    // }
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateOptions);

contactSchema.post("findOneAndUpdate", handleSaveError);

const ContactCollection = model("contact", contactSchema);

export const sortFields = ['name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'createdAt', 'updatedAt'];

// const ContactCollection = model("contact", contactSchemaA);

export default ContactCollection;