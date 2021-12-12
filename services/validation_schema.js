const Joi = require("joi");

const registerValidation = Joi.object({
  email: Joi.string().trim().email().lowercase(),
  // phone: Joi.string()
  //   .trim()
  //   .regex(/^[0-9]{7,10}$/),
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().alphanum().min(2).required(),
  // role: Joi.string().valid("ROLE_CUSTOMER", "ROLE_ADMIN", "ROLE_EMPLOYEE"),
  // website: Joi.string().alphanum().min(2),
  // bio: Joi.string().min(2).max(1000),
  // gender: Joi.string().valid("male", "female", "others"),
});

const updateUserValidation = Joi.object({
  name: Joi.string().min(3).max(30),
  userHandle: Joi.string().min(3).max(20).required(),
  website: Joi.string().uri(),
  bio: Joi.string().min(2).max(1000),
  gender: Joi.string().valid("male", "female", "others"),
  is_private: Joi.boolean(),
});

const updateUserPrivacyValidation = Joi.object({
  is_private: Joi.boolean(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().alphanum().min(2).required(),
});

const emailValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const passwordValidation = Joi.object({
  password: Joi.string().alphanum().min(2).required(),
});

const createPostValidation = Joi.object({
  title: Joi.string(),
  body: Joi.string(),
  media: Joi.string().required(),
});

const postRatingValidation = Joi.object({
  rating: Joi.number().greater(0).less(6).required(),
});

const createMessageGroupValidation = Joi.object({
  usersList: Joi.array(),
  type: Joi.string().valid("single", "group").required(),
  name: Joi.string().min(3).max(30),
  description: Joi.string().min(2).max(1000),
});

const createFollowRequestUpdateValidation = Joi.object({
  status: Joi.string().valid("accepted", "rejected").required(),
});

const getMessageGroupValidation = Joi.object({
  sender: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  receiver: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const newMessageValidation = Joi.object({
  conversationId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  type: Joi.string().valid("image", "video", "audio", "text").required(),
  message: Joi.string().required(),
  sender: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

const newNotificationValidation = Joi.object({
  actor: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  verb: Joi.string()
    .valid("post", "rate", "comment", "follow-request", "follow-accept")
    .required(),
  object: Joi.string().required(),
  receiver: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

module.exports = {
  registerValidation,
  loginValidation,
  emailValidation,
  passwordValidation,
  postRatingValidation,
  updateUserValidation,
  createPostValidation,
  createMessageGroupValidation,
  getMessageGroupValidation,
  newMessageValidation,
  newNotificationValidation,
  createFollowRequestUpdateValidation,
  updateUserPrivacyValidation,
};
