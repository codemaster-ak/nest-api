import {User, UserCreationAttributes} from '../user.model';
import {v4} from 'uuid';

export default abstract class UserRequest {
    readonly id?: string
    readonly email: string
    readonly password: string
    readonly phone?: string

    static toUser(userRequest: UserRequest): UserCreationAttributes {
        let user = {
            uuid: userRequest.id ? userRequest.id : v4(),
            email: userRequest.email,
            password: userRequest.password,
            phone: userRequest.phone,
        }
        Object.entries(userRequest).forEach(([key, value]) => {
            if (value === undefined) {
                delete userRequest[key]
            }
        })
        // console.log(user)
        return new User(user)
    }
}