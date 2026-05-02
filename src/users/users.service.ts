import { Injectable, NotFoundException, ForbiddenException, BadRequestException, HttpException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find(
      //puedo hacer consultas con where en el metodo
      // {
      //   where: {email: 'martin@gmail.com'},
      // },
      {
        relations: ['profile'], //para traer el profile asociado al user
      },
    );
    return users;
  }

  async getUserById(id: number) {
    const user = await this.findOne(id);
    if (user!.id === 1) {
      throw new ForbiddenException(`User with id ${id} no tiene acceso`);
    }
    return user;
  }

  async getProfileByUserId(id: number) {
    const user = await this.findOne(id);
    return user!.profile;
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save(body); //existe el metodo create pero no hace el insert a la base de datos, solo crea la instancia del objeto, con save se hace el insert a la base de datos
      return newUser;
    } catch {
      throw new BadRequestException(`Error creating user`);
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      //console.log(changes);
      const updatedUser = this.usersRepository.merge(user, changes);
      // console.log(updatedUser);
      const savedUser = await this.usersRepository.save(updatedUser);
      return savedUser;
    } catch {
      throw new BadRequestException(`Error updating user`);
    }
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user!.id);
    return { message: 'User deleted' };
  }

  private async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['profile'], //para traer el profile asociado al user
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
