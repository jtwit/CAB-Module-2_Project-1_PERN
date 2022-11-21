import pg from 'pg'
import * as dotenv from "dotenv";
dotenv.config();
const { Pool } = pg

// const pool = new Pool({
//     user: 'joanneturner',
//     password: 'Joannewit2022',
//     host: 'localhost',
//     database: 'users',
//     port: '5432'
// })

const pool = new Pool()

export default pool