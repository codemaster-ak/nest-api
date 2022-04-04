import {HttpException, HttpStatus} from '@nestjs/common';

export class DeleteSkipException extends HttpException {
    constructor() {
        super('Skip', HttpStatus.OK)
    }
}