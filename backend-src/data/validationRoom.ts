import Joi from "joi";
import { Room } from "../models/Room.js";

export const roomSchema = Joi.object({
  name: Joi.string().min(1).required(),
  unique: true,
  isActive: Joi.boolean().required(),
  imageUrl: Joi.string().uri().required(),
});

export function validateRoom(room: Room): boolean {
  const result = roomSchema.validate(room);
  return !result.error;
}
