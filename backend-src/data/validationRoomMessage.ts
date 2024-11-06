import Joi from "joi";
import { ChatMessage } from "../models/RoomMessage.js";

export const RoomMessageSchema = Joi.object({
  textMessage: Joi.string().min(1).required().messages({
    "string.base": `"textMessage" should be a type of 'text'`,
    "string.empty": `"textMessage" cannot be an empty field`,
    "string.min": `"textMessage" should have a minimum length of {#limit}`,
    "any.required": `"textMessage" is a required field`,
  }),
  roomName: Joi.string().required().messages({
    "string.base": `"roomName" should be a type of 'text'`,
    "string.empty": `"roomName" cannot be an empty field`,
    "any.required": `"roomName" is a required field`,
  }),
  senderName: Joi.string().optional().messages({
    "string.base": `"senderName" should be a type of 'text'`,
  }),
  date: Joi.date().required().messages({
    "date.base": `"date" should be a valid date`,
    "any.required": `"date" is a required field`,
  }),
});

export function isValidRoomMessage(messageRoom: ChatMessage): boolean {
  const result = RoomMessageSchema.validate(messageRoom);
  return !result.error;
}
