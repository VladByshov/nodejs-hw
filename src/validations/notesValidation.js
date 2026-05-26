import { Segments, Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const objectValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message('Invalid ID format');
  }
  return value;
};

const noteIdJoiSchema = Joi.object().keys({
  noteId: Joi.string().custom(objectValidator).required(),
});

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
    search: Joi.string().allow('').optional(),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: noteIdJoiSchema,
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').optional(),
    tag: Joi.string()
      .valid(...TAGS)
      .optional(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: noteIdJoiSchema,
  [Segments.BODY]: Joi.object()
    .keys({
      title: Joi.string().min(1).optional(),
      content: Joi.string().allow('').optional(),
      tag: Joi.string()
        .valid(...TAGS)
        .optional(),
    })
    .min(1),
};
