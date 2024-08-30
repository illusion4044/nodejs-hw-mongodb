import ContactCollection from "../db/Contact.js";

export const getAllContacts = ()=> ContactCollection.find();
export const getContactById = id => ContactCollection.findById(id);