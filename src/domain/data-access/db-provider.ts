import SqliteDbContext from './sqlite-db-context';
import AbstractDbContext from '../abstracts/abstract-db-context';

const getDbContext = (): AbstractDbContext => {
    return new SqliteDbContext(process.env.APP_DB_CONN as string);
};

export default getDbContext;