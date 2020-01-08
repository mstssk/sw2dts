declare interface User {
    id: number;
    name?: string;
    email: string;
}
declare interface UserResponse {
    data: User;
    updatedAt?: string;
}
declare interface UserUpdateResponse {
    data: User;
    updatedAt?: string;
}
