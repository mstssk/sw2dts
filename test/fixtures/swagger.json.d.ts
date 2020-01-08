declare interface Dummy {
    image?: Image;
    createdAt?: string; // date-time
    id?: string; // int64
    kind?: string;
    name?: string;
    note?: string;
    count?: number; // int32
    updatedAt?: string; // date-time
    ids?: string /* int64 */ [];
    status?: "placed" | "approved" | "delivered";
}
declare interface Image {
    createdAt?: string; // date-time
    fileSize?: number; // int32
    height?: number; // int32
    id?: string; // int64
    updatedAt?: string; // date-time
    url?: string;
    width?: number; // int32
}
declare interface Noop {
}
