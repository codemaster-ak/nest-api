import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AuthorizationModule} from './authorization/authorization.module';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user/user.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        // SequelizeModule.forRoot({
        //     dialect: 'postgres',
        //     host: process.env.POSTGRES_HOST,
        //     port: Number(process.env.POSTGRES_PORT),
        //     username: process.env.POSTGRES_USERNAME,
        //     password: process.env.POSTGRES_PASSWORD,
        //     database: process.env.POSTGRES_DATABASE,
        //     models: [Test, User],
        //     define: {
        //         timestamps: false,
        //     },
        // }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: [User],
            synchronize: true,
        }),
        // TestModule,
        AuthorizationModule,
        UserModule,
    ],
})
export class AppModule {
}