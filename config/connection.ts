import knexRoot from "knex";

export const knex = knexRoot({
    client: "pg",
    connection: {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "postgres",
        database: "stripe",
    }
});