import sqlite3 from 'sqlite3';
import AbstractDbContext from '../abstracts/abstract-db-context';
import * as common from '../../types/common';

class SqliteDbContext implements AbstractDbContext {
    private _db: sqlite3.Database;
    static tableCreated = false;
    
    constructor(connectionString: string) {
        this._db = new sqlite3.Database(connectionString, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    open(): Promise<object> {
        const executor = (resolve: common.ResolvePredicate<object>, reject: common.RejectPredicate<object>): void => {
            
            if (!SqliteDbContext.tableCreated) {
                this._db.serialize(() => {
                    this._db.run('CREATE TABLE customer ( name TEXT, email TEXT)', (result: object, err: object) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                    
                });
                
                SqliteDbContext.tableCreated = true;
            } else {
                resolve({});
            }
        };
        return new Promise(executor);
    }

    /** THIS CODE NOT FOR PRODUCTION, ONLY FOR TESTING */
    executeCommand(sql: string): Promise<object> {
        
        const executor = (resolve: common.ResolvePredicate<object>, reject: common.RejectPredicate<object>): void => {
            this._db.serialize(() => {
                const stmt = this._db.prepare(sql);
                stmt.run((result: object, err: object) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
                stmt.finalize();
            });
        };
        return new Promise(executor);
    }

    executeQuery<T>(sql: string): Promise<T> {
        const executor = (resolve: common.ResolvePredicate<T>, reject: common.RejectPredicate<object>): void => {
            this._db.serialize(() => {
                this._db.all(sql, (err: unknown, result: T) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        };
        
        return new Promise(executor);
    }

    close(): Promise<object> {

        const executor = (): void => {
            this._db.serialize(() => {
                this._db.close();
            });
        };
        return new Promise(executor);
    }
}

export default SqliteDbContext;