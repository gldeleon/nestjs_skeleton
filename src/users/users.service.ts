import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private uRepository: Repository<User>) {}

  createUser(createUser: CreateUserDto) {
    const newUser = this.uRepository.create(createUser);
    return this.uRepository.save(newUser);
  }

  getAllUser() {
    return this.uRepository.find();
  }

  getUser(id: number) {
    return this.uRepository.findOne({
      where: {
        id_usuario: id,
      },
    });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.uRepository.update(id, updateUserDto);
  }

  removeUser(id: number) {
    return this.uRepository.delete(id);
  }
}
