import { Body, Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument, UserSchema } from '../../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

    async create(@Body() createUserDto: CreateUserDto) {
        await this.userModel.create(createUserDto);
        return 'This action adds a new user';
    }

    findAll() {
        return this.userModel.find();
    }

    async findOne(@Param('id') id: number) {
        return this.userModel.findById(id);
    }

    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        await this.userModel.findByIdAndUpdate(id, updateUserDto);
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        this.userModel.findByIdAndDelete(id);
        return `This action removes a #${id} user`;
    }
}
