import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserService} from './user.service';
import {UserResponse} from './dto/user.response';
import UserRequest from './dto/user.request';

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
        const user = await this.userService.findByPk(id)
        return UserResponse.fromUser(user)
    }

    @Post('/registration')
    async registration(@Body() userRequest: UserRequest): Promise<UserResponse> {
        const user = UserRequest.toUser(userRequest)
        const newUser = await this.userService.create(user)
        return UserResponse.fromUser(newUser)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() userRequest: UserRequest): Promise<UserResponse> {
        const updatedUser = UserRequest.toUser(userRequest)
        const user = await this.userService.update(id, updatedUser)
        return UserResponse.fromUser(user)
    }

    @Delete(':id')
    destroy(@Param('id') id: string): Promise<void> {
        return this.userService.destroy(id)
    }
}
