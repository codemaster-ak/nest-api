import {User} from '../user.model';

export class UserResponse {
    id: string
    email: string

    private constructor(user: User) {
        this.id = user.uuid
        this.email = user.email
    }

    static fromUser(user: User) {
        return new UserResponse(user)
    }

    static fromUserList(userList: User[]) {
        let userListResponse = []
        for (let i = 0; i < userList.length; i++) {
            userListResponse.push(new UserResponse(userList[i]))
        }
        return userListResponse
    }
}