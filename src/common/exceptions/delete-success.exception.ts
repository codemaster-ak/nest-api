import {HttpException, HttpStatus} from '@nestjs/common';

export class DeleteSuccessException extends HttpException {
    constructor() {
        super('Success', HttpStatus.OK)
    }
}