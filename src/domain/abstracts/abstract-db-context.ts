
interface AbstractDbContext {
    open(): Promise<object>;
    executeCommand(sql: string): Promise<object>;
    executeQuery<T>(sql: string): Promise<T>;
    close(): Promise<object>;
}

export default AbstractDbContext;
