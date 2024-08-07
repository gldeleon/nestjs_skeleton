import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private uRepository: Repository<User>) {}

  async createUser(createUser: CreateUserDto) {
    const userFound = await this.uRepository.findOne({
      where: {
        usuario: createUser.usuario,
      },
    });

    if (userFound) {
      return new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    console.log(userFound);

    const newUser = this.uRepository.create(createUser);
    return this.uRepository.save(newUser);
  }

  getAllUser() {
    return this.uRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.uRepository.findOne({
      where: {
        id_usuario: id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      return userFound;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.uRepository.findOne({
      where: {
        id_usuario: id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, updateUserDto);

    return this.uRepository.save(updateUser);
  }

  async removeUser(id: number) {
    const resultDel = await this.uRepository.delete(id);

    if (resultDel.affected === 0) {
      return new HttpException('User not found to delete', HttpStatus.NOT_FOUND);
    } else {
      return resultDel;
    }
  }
}
