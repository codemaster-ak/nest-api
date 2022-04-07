import {forwardRef, Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {AuthorizationModule} from '../authorization/authorization.module';
import {User} from './user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        forwardRef(() => AuthorizationModule),
        TypeOrmModule.forFeature([User]),
    ],
    exports: [UserService],
})
export class UserModule {
}
