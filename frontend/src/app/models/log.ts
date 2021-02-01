export interface Log {
    timestamp: Date,
    method: string,
    endpoint: string,
    user:string,
    body: string
}