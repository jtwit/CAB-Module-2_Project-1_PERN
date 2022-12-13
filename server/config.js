import pg from 'pg'
import * as dotenv from "dotenv";
dotenv.config();
const { Pool, Client } = pg

const connectionString = process.env.ELEPHANT_URL

// const pool = new Pool({
//     connectionString,
// })

const client = new Client({
    connectionString,
})

// const pool = new Pool({
//     user: 'joanneturner',
//     password: 'Joannewit2022',
//     host: 'localhost',
//     database: 'users',
//     port: '5432'
// })

// const pool = new Pool()

export default client