import {BadRequestException, forwardRef, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {IAuthorizationRequest} from './dto/authorization.request';
import {UserService} from '../user/user.service';
import {IUser, User} from '../user/user.entity';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {IToken} from '../common/interfaces/IToken';

@Injectable()
export class AuthorizationService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async login(authorizationRequest: IAuthorizationRequest): Promise<IToken> {
        const user = await this.validateUser(authorizationRequest)
        return this.generateToken(user)
    }

    /** registration return token */
    async registration(authorizationRequest: IAuthorizationRequest): Promise<IToken> {
        const user = await this.userService.getByEmail(authorizationRequest.email)
        if (user) {
            throw new BadRequestException('User already exist')
        }
        const hashPassword: string = await bcrypt.hash(authorizationRequest.password, 5)
        // const newUser = await this.userService.create({...authorizationRequest, password: hashPassword})
        // return this.generateToken(newUser)
        return {token: 'temp'}
    }

    async hashUserPassword(user: User): Promise<User> {
        user.password = await bcrypt.hash(user.password, 5)
        return user
    }

    private async generateToken(user: User): Promise<IToken> {
        const payload = {uuid: user.id, email: user.email, password: user.password}
        return {token: this.jwtService.sign(payload)}
    }

    private async validateUser(authorizationRequest: IAuthorizationRequest): Promise<User> {
        const user = await this.userService.getByEmail(authorizationRequest.email)
        if (user) {
            const isPasswordCorrect = await bcrypt.compare(authorizationRequest.password, user.password)
            if (isPasswordCorrect) return user
        }
        throw new UnauthorizedException({response: 'Not correct authorization data'})
    }
}
