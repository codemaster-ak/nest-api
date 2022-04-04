import {forwardRef, Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {AuthorizationModule} from '../authorization/authorization.module';
import {SequelizeModule} from '@nestjs/sequelize';
import {User} from './user.model';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        forwardRef(() => AuthorizationModule),
        SequelizeModule.forFeature([User]),
    ],
    exports: [UserService],
})
export class UserModule {
}
