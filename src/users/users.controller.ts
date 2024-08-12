import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUser: CreateUserDto) {
    return this.usersService.createUser(createUser);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.getAllUser();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }

  @Post(':id/profile')
  createProfile( @Param('id', ParseIntPipe) id: number, @Body() profile: CreateProfileDto){
    return this.usersService.createProfile(id, profile);
  }
}
