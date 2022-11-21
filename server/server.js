import express from 'express';
import cors from 'cors';
import users from './routes/users.js';
// import pool from './config.js';
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is running on ' + port + 'port');
});


app.use('/users', users);
export default app