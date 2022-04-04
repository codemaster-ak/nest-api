import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'
import {TestModule} from './test/test.module'
import {ConfigModule} from '@nestjs/config'
import {Test} from './test/test.model';
import {AuthorizationModule} from './authorization/authorization.module';
import {UserModule} from './user/user.module';
import {User} from './user/user.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            models: [Test, User],
            define: {
                timestamps: false,
            },
        }),
        TestModule,
        AuthorizationModule,
        UserModule,
    ],
})
export class AppModule {
}