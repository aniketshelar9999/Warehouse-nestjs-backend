import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ) { }

    //login
    async findByEmail(email: string) {
        return await this.userRepo.findOne({ where: { email } });
    }

    //refresh token
    async findOne(id: number) {
        console.log("FINDING USER WITH ID:", id);
        return await this.userRepo.findOne({ where: { id } });
    }

    async create(dto: CreateUserDto) {
        try {

            const user = this.userRepo.create(dto);
            return await this.userRepo.save(user);

        } catch (error: any) {
            if (error.code === '23505') {
                throw new BadRequestException('Email already exists');
            }
            throw error;
        }
    }

    findAll() {
        return this.userRepo.find();
    }

    async update(id: number, dto: UpdateUserDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id } });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            // If password is being updated, hash it
            if (dto.password) {
                dto.password = await bcrypt.hash(dto.password, 10);
            }

            Object.assign(user, dto);

            return await this.userRepo.save(user);
        } catch (error: any) {
            if (error.code === '23505') {
                throw new BadRequestException('Email already exists');
            }
            throw error;
        }
    }

    remove(id: number) {
        return this.userRepo.delete(id);
    }
}