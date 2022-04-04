import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {TestService} from './test.service';
import {TestRequest} from './dto/test.request';
import {Test} from './test.model';
import {v4} from 'uuid';

@Controller('test')
export class TestController {
    constructor(private testService: TestService) {
    }

    @Get()
    getAll(): Promise<Test[]> {
        return this.testService.findAll()
    }

    @Get(':id')
    findByPk(@Param('id') id: string): Promise<Test> {
        return this.testService.findByPk(id)
    }

    @Post()
    create(@Body() testRequest: TestRequest): Promise<Test> {
        const req = {...testRequest, uuid: v4()}
        return this.testService.create(req)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatedTest: Test): Promise<Test> {
        return this.testService.update(id, updatedTest)
    }

    @Delete(':id')
    destroy(@Param('id') id: string): Promise<void> {
        return this.testService.destroy(id)
    }
}
