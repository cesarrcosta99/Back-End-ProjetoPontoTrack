import * as Yup from "yup";
import User from "../models/User";
import {v4} from 'uuid'

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      phone: Yup.string().required(),
      address: Yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const {name,email,password,phone,address}=request.body

    const userExist=await User.findOne({
        where:{email}
    })

    if(userExist){
        return response.status(409).json({error:"User already exists!"})
    }

    const user=await User.create({
        id:v4(),
        name,
        email,
        password,
        phone,
        address
    })

    return response.status(201).json({id:user.id,name,email,phone,address})

  }
}

export default new UserController()
