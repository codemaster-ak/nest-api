import {Body, Controller, Post} from '@nestjs/common';
import {IAuthorizationRequest} from './dto/authorization.request';
import {AuthorizationService} from './authorization.service';
import {IToken} from '../common/interfaces/IToken';

@Controller('authorization')
export class AuthorizationController {
    constructor(private authorizationService: AuthorizationService) {
    }

    @Post('/login')
    login(@Body() authorizationRequest: IAuthorizationRequest): Promise<IToken> {
        return this.authorizationService.login(authorizationRequest)
    }

    // @Post('/registration')
    // registration(@Body() authorizationRequest: AuthorizationRequest): Promise<IToken> {
    //     return this.authorizationService.registration(authorizationRequest)
    // }
}
