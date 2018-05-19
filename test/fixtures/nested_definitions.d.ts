export interface User {
    id: number;
    name?: string;
    email: string;
}
export interface UserResponse {
    data: User;
    updatedAt?: string;
}
export interface UserUpdateResponse {
    data: User;
    updatedAt?: string;
}
