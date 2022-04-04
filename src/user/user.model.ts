import {Column, DataType, Model, Table} from 'sequelize-typescript'

export class UserCreationAttributes {
    uuid: string
    email: string
    password: string
    phone?: string
}

@Table({tableName: 'user'})
export class User extends Model<User, UserCreationAttributes> {
    @Column({type: DataType.UUID, unique: true, primaryKey: true})
    uuid: string
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    password: string
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    phone: string
}