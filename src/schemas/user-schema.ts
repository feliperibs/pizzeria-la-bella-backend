import mongoose, { InferSchemaType, Schema } from "mongoose";
import { IUser } from "../models/user";
import * as bcrypt from "bcrypt";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  creation_date: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, required: true },
  address: {
    type: {
      street: { type: String, required: true },
      number: { type: Number, required: true },
      POST_CODE: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    required: true,
  },
}, {collection: 'user'});

userSchema.pre('save', async function (this:IUser, next) {
  const user = this;

  try {
    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(user.password, salt);
    next();
  } catch (error) {
    return next(error as any);
  }
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  console.log('SENHAS', password, this.password);
  return bcrypt.compareSync(password, this.password);
};

export const UserModel = mongoose.model('User', userSchema);
