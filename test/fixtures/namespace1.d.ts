declare namespace Foo {
    export interface Dummy {
        image?: Image;
        createdAt?: string; // date-time
        id?: string; // int64
        kind?: string;
        name?: string;
        note?: string;
        count?: number; // int32
        updatedAt?: string; // date-time
        ids?: string /* int64 */ [];
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
}
