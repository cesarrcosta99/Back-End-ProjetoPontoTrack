import * as Yup from "yup";
import User from "../models/User";
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'
import Vehicle from '../models/Vehicle'

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const userEmailOrPasswordIncorrect = () => {
      response
        .status(400)
        .json({ error: "Make sure your password or email are correct" });
    };

    const isValid = await schema.isValid(request.body);

    if (!isValid) {
      return userEmailOrPasswordIncorrect();
    }

    const { email, password } = request.body;

    const userExist = await User.findOne({
      where: { email },
    });

    if (!userExist) {
      return userEmailOrPasswordIncorrect();
    }

    if (!(await userExist.verificationSenha(password))) {
      return userEmailOrPasswordIncorrect();
    }

    const userVehicles = await Vehicle.findAll({
      where: { user_id: userExist.id },
    });

    return response
      .status(201)
      .json({
        id: userExist.id,
        name: userExist.name,
        email,
        phone: userExist.phone,
        address: userExist.address,
        token:jwt.sign({id:userExist.id},authConfig.secret,{expiresIn:authConfig.expiresIn}),
        vehicles: userVehicles,
      });
  }
}

export default new SessionController();
