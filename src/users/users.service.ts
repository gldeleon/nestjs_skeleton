import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>
  ) {}

  async createUser(createUser: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        usuario: createUser.usuario,
      },
    });

    if (userFound) {
      return new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    console.log(userFound);

    const newUser = this.userRepository.create(createUser);
    return this.userRepository.save(newUser);
  }

  getAllUser() {
    return this.userRepository.find();
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
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
    const userFound = await this.userRepository.findOne({
      where: {
        id_usuario: id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, updateUserDto);

    return this.userRepository.save(updateUser);
  }

  async removeUser(id: number) {
    const resultDel = await this.userRepository.delete(id);

    if (resultDel.affected === 0) {
      return new HttpException('User not found to delete', HttpStatus.NOT_FOUND);
    } else {
      return resultDel;
    }
  }

  async createProfile(id: number, profile: CreateProfileDto){
    const userFound = await this.userRepository.findOne({
      where:{
        id_usuario: id
      }
    })

    if(!userFound){
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const newProfile = await this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);

    userFound.profile = savedProfile;

    return this.userRepository.save(userFound);

    // return savedProfile;
  }
}
