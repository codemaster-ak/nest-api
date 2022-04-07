import {BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {AuthorizationService} from '../authorization/authorization.service';
import {DeleteSuccessException} from '../common/exceptions/delete-success.exception';
import {DeleteSkipException} from '../common/exceptions/delete-skip.exception';
import {InjectRepository} from '@nestjs/typeorm';
import {IUser, User} from './user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(forwardRef(() => AuthorizationService))
        private authorizationService: AuthorizationService,
    ) {
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find()
        if (users.length) return users
        else throw new NotFoundException({response: 'Users not found!'})
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOne(id)
        if (user) return user
        else throw new NotFoundException({response: 'User not found!'})
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({where: {email: email}})
    }

    async create(userPayload: IUser): Promise<User> {
        const user = await this.getByEmail(userPayload.email)
        if (user) {
            throw new BadRequestException({response: 'User already exist!'})
        }
        let newUser = this.userRepository.create(userPayload)
        newUser = await this.authorizationService.hashUserPassword(newUser)
        return this.userRepository.save(newUser)
    }

    async update(id: string, userPayload: IUser): Promise<User> {
        let user = await this.userRepository.findOne(id)
        if (user) {
            let updatedUser = this.userRepository.create(userPayload)
            updatedUser = await this.authorizationService.hashUserPassword(updatedUser)
            await this.userRepository.update(id, updatedUser)
            return await this.userRepository.findOne(id)
        } else {
            throw new NotFoundException({response: 'User not found!'})
        }
    }

    async delete(id: string): Promise<void> {
        const amount = await this.userRepository.delete(id)
        if (amount) throw new DeleteSuccessException()
        else throw new DeleteSkipException()
    }
}
