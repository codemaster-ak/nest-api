import {forwardRef, Module} from '@nestjs/common';
import {AuthorizationService} from './authorization.service';
import {AuthorizationController} from './authorization.controller';
import {UserModule} from '../user/user.module';
import {JwtModule} from '@nestjs/jwt';

@Module({
    providers: [AuthorizationService],
    controllers: [AuthorizationController],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: process.env.SECRET || 'SECRET_KEY',
            signOptions: {
                expiresIn: '48h',
            },
        }),
    ],
    exports: [
        AuthorizationService,
        JwtModule,
    ],
})
export class AuthorizationModule {
}
