declare interface ErrorModel {
    message: string;
    code: number;
}
declare interface ExtendedErrorModel {
    message: string;
    code: number;
    rootCause: string;
}
