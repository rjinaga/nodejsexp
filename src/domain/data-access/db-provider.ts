import SqliteDbContext from './sqlite-db-context';
import AbstractDbContext from '../abstracts/abstract-db-context';

const getDbContext = (): AbstractDbContext => {
    return new SqliteDbContext('./test.db');
};

export default getDbContext;