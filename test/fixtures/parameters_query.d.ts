export interface ApiTestStatus {
    name: string;
    targets?: ("production" | "staging" | "develop")[];
    status?: "success" | "failed" | "processing";
}
