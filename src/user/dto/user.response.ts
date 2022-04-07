import {User} from '../user.entity';

export class UserResponse {
    id: string
    email: string
    phone: string

    private constructor(user: User) {
        this.id = user.id
        this.email = user.email
        if (user.phone) this.phone = user.phone
    }

    static fromUser(user: User) {
        return new this(user)
    }

    static fromUserList(userList: User[]) {
        let userListResponse = []
        for (let i = 0; i < userList.length; i++) {
            userListResponse.push(new this(userList[i]))
        }
        return userListResponse
    }
}