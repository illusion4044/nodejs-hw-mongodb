import ContactCollection from "../db/Contacts.js";

export const getAllContacts = ()=> ContactCollection.find();
export const getContactById = id => ContactCollection.findById(id);