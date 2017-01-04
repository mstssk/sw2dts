export interface Dummy {
    count?: number; // int32
    createdAt?: string; // date-time
    id?: string; // int64
    ids?: string /* int64 */ [];
    image?: Image;
    kind?: string;
    name?: string;
    note?: string;
    status?: "placed" | "approved" | "delivered";
    updatedAt?: string; // date-time
}
export interface Image {
    createdAt?: string; // date-time
    fileSize?: number; // int32
    height?: number; // int32
    id?: string; // int64
    updatedAt?: string; // date-time
    url?: string;
    width?: number; // int32
}
export interface Noop {
}
