import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import * as dotenv from "dotenv";
import passport from "passport";
import pool from "../config.js"
dotenv.config();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async function (jwt_payload, done) {
    try {
        console.log('payload', jwt_payload)
        const res = await pool.query(`SELECT * FROM test WHERE uid = $1;`, [jwt_payload.uid])
        const user = res.rows[0]
        console.log('user', user)
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);

    }
});

export const passportConfig = () => {
    passport.use(jwtStrategy);
};

export const jwtAuth = passport.authenticate("jwt", { session: false });