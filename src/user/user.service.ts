import {BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {User, UserCreationAttributes} from './user.model';
import {InjectModel} from '@nestjs/sequelize';
import {Repository} from 'sequelize-typescript';
import {AuthorizationService} from '../authorization/authorization.service';
import {IAuthorizationRequest} from '../authorization/dto/authorization.request';
import {DeleteSuccessException} from '../common/exceptions/delete-success.exception';
import {DeleteSkipException} from '../common/exceptions/delete-skip.exception';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private userRepository: Repository<User>,
        @Inject(forwardRef(() => AuthorizationService))
        private authorizationService: AuthorizationService,
    ) {
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.findAll()
        if (users.length) return users
        else throw new NotFoundException({response: 'Users not found!'})
    }

    async findByPk(id: string): Promise<User> {
        const user = await this.userRepository.findByPk(id)
        if (user) return user
        else throw new NotFoundException({response: 'User not found!'})
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({where: {email}, include: {all: true}})
    }

    async create(userPayload: UserCreationAttributes): Promise<User> {
        const user = await this.getByEmail(userPayload.email)
        if (user) {
            throw new BadRequestException('User already exist')
        }
        console.log(new User(userPayload))
        const newUser = this.authorizationService.hashUserPassword(new User(userPayload))
        return this.userRepository.create(newUser)
    }

    async update(id: string, updatedUser: UserCreationAttributes): Promise<User> {
        let user = await this.userRepository.findByPk(id)
        if (user) {
            user.email = updatedUser.email
            user.password = updatedUser.password
            user.phone = updatedUser.phone
            user = await this.authorizationService.hashUserPassword(user)
            return user.save()
        } else {
            throw new NotFoundException({response: 'User not found!'})
        }
    }

    async destroy(id: string): Promise<void> {
        const amount = await this.userRepository.destroy({
            where: {uuid: id},
        })
        if (amount) throw new DeleteSuccessException()
        else throw new DeleteSkipException()
    }
}
