import createHttpError from 'http-errors';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import * as contactServices from '../services/contacts.js';
import {parseContactsFilterParams} from '../utils/filters/parseContactsFilterParams.js';
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';
import { sortFields } from '../db/Contacts.js';

const enableCloudinary = env("ENABLE_CLOUDINARY");

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactsFilterParams(req.query);
  const {_id: userId} = req.user;
    const data = await contactServices.getContacts({
      perPage,
    page,
    sortBy,
    sortOrder,
    filter: {...filter, userId},
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data,
    });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const {_id: userId} = req.user;
  const data = await contactServices.getContact({_id: id, userId});

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Contact with ${id} successfully find`,
    data,
  });
};


export const addContactController = async(req, res)=> {
  let poster;
  if(req.file) {
    if(enableCloudinary === "true") {
      poster = await saveFileToCloudinary(req.file, "posters");
    }
    else {
      poster = await saveFileToUploadDir(req.file);
    }
  }

  const {_id: userId} = req.user;
  const data = await contactServices.createContact({...req.body, userId, poster});

  res.status(201).json({
    status: 201,
    message: 'Movie add successfully',
    data,
  });
};

export const upsertContactController = async(req, res)=> {
  const {id} = req.params;
  const {isNew, data} = await contactServices.updateContact({_id: id}, req.body, {upsert: true});

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: "Contact upsert successfully",
    data,
  });
};

export const patchContactController = async(req, res)=> {
  const {id} = req.params;
  const result = await contactServices.updateContact({_id: id}, req.body);

  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: "Contact patched successfully",
    data: result.data,
  });
};

export const deleteContactController = async(req, res)=> {
  const {id} = req.params;
  const data = await contactServices.deleteContact({_id: id});

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};