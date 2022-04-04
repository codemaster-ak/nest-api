import {Column, DataType, Model, Table} from 'sequelize-typescript'

interface TestCreationAttributes {
    name: string
    age: number
}

@Table({tableName: 'test_table'})
export class Test extends Model<Test, TestCreationAttributes> {
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    uuid: string
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string
    @Column({type: DataType.NUMBER, unique: false, allowNull: false})
    age: number
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    course: string
}