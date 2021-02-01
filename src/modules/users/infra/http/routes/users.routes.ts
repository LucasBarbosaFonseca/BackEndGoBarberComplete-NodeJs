import { Router, request, response } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UsersController from '../controllers/UsersController';
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();
const upload = multer(uploadConfig.multer);
import { celebrate, Segments, Joi } from 'celebrate';

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
);

export default usersRouter;
