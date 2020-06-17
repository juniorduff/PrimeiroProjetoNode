import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, name, password }: Request): Promise<User> {
    const UsersRepository = getRepository(User);
    const checkUserExists = await UsersRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new Error('User already exists');
    }
    const hashPassowrd = await hash(password, 8);
    const user = UsersRepository.create({
      name,
      email,
      password: hashPassowrd,
    });

    await UsersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
