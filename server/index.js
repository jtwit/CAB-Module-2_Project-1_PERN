import express from 'express';
import cors from 'cors';
import users from './routes/users.js';
import posts from './routes/posts.js'
import comments from './routes/comments.js'
import likes from './routes/likes.js'
// import pool from './config.js';
import * as dotenv from "dotenv";
import { passportConfig } from './middleware/passport.js';
import passport from "passport";
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

app.use(passport.initialize());
passportConfig(passport);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server is running on ' + port + 'port');
});


app.use('/users', users);
app.use('/posts', posts);
app.use('/comments', comments);
app.use('/likes', likes);
export default app