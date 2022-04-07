import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from './user.service';
import {UserResponse} from './dto/user.response';
import {IUser, User} from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get()
    async getAll(): Promise<UserResponse[]> {
        const users = await this.userService.findAll()
        return UserResponse.fromUserList(users)
    }

    @Get(':id')
    async findByPk(@Param('id') id: string): Promise<UserResponse> {
        const user = await this.userService.findById(id)
        return UserResponse.fromUser(user)
    }

    @Post('/registration')
    async registration(@Body() userRequest: IUser): Promise<UserResponse> {
        const newUser = await this.userService.create(userRequest)
        return UserResponse.fromUser(newUser)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() userRequest: IUser): Promise<UserResponse> {
        const user = await this.userService.update(id, userRequest)
        return UserResponse.fromUser(user)
    }

    @Delete(':id')
    destroy(@Param('id') id: string): Promise<void> {
        return this.userService.delete(id)
    }
}
