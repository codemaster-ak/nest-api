import {HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Test} from './test.model';
import {TestRequest} from './dto/test.request';
import {Repository} from 'sequelize-typescript';
import {DeleteSuccessException} from '../common/exceptions/delete-success.exception';
import {DeleteSkipException} from '../common/exceptions/delete-skip.exception';

@Injectable()
export class TestService {
    constructor(@InjectModel(Test) private testRepository: Repository<Test>) {
    }

    async findAll(): Promise<Test[]> {
        const tests = await this.testRepository.findAll()
        if (tests.length) return tests
        else throw new NotFoundException({response: 'Tests not found!'})
    }

    async findByPk(id: string): Promise<Test> {
        const test = await this.testRepository.findByPk(id)
        if (test) return test
        else throw new NotFoundException({response: 'Test not found!'})
    }

    async create(testRequest: TestRequest): Promise<Test> {
        return this.testRepository.create(testRequest)
    }

    async update(id: string, updatedTest: Test): Promise<Test> {
        let test = await this.testRepository.findByPk(id)
        if (test) {
            test.name = updatedTest.name
            test.age = updatedTest.age
            test.course = updatedTest.course
            return test.save()
        } else {
            throw new NotFoundException({response: 'Test not found!'})
        }
    }

    async destroy(id: string): Promise<void> {
        const amount = await this.testRepository.destroy({
            where: {uuid: id},
            force: true,
        })
        if (amount) throw new DeleteSuccessException()
        else throw new DeleteSkipException()
    }
}
