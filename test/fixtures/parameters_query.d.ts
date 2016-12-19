export interface ApiTestStatus {
    targets?: ("production" | "staging" | "develop")[];
    status?: "success" | "failed" | "processing";
}
