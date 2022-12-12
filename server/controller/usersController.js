import pool from "../config.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import { verifyPassword, encryptPassword } from "../utils/bcrypt.js";
// import { issueToken } from "../utils/jwt.js";

// CREATE NEW USER/ SIGNUP

const createNewUser = async (req, res) => {
    console.log('req.body', req.body)
    const { firstname, lastname, email, password } = req.body;
    try {
        const newUser = await pool.query(`SELECT * FROM test WHERE email= $1;`, [email]);
        const arr = newUser.rows;
        if (arr.length != 0) {
            return res.status(400).json({
                error: "This Email is already registered, try logging in instead",
                success: false
            });
        }
        else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    res.status(err).json({
                        error: "Error encrypting password",
                        success: false
                    });
                const user = {
                    firstname,
                    lastname,
                    email,
                    password: hash,
                };

                pool.query("INSERT INTO test (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
                    [user.firstname, user.lastname, user.email, user.password], (err) => {

                        if (err) {
                            console.error(err);
                            return res.status(500).json({
                                error: "Database error",
                                success: false
                            })
                        }
                        else {
                            const token = jwt.sign(
                                { // payload 
                                    email: user.email,
                                    uid: user.uid
                                },
                                process.env.SECRET_KEY
                            );
                            res.status(200).send({
                                success: true,
                                email: user.email,
                                uid: user.uid,
                                jwt: token,
                            });
                        }
                    });
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registering user!", //Database connection error
            success: false,

        });
    };
};


//         const newUser = await pool.query(
//             // INSERT INTO tableName (columnName) VALUES ($anything), [define $anything]
//             "INSERT INTO test (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
//             [firstname, lastname, email, password]
//         );
//         res.json(newUser.rows[0])
//     } catch (err) {
//         console.error(err.message)
//     }
// }

// GET ALL USERS

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM test")
        res.status(200).json(
            allUsers.rows
        )
    } catch (err) {
        console.error(err.message)
    }
}

// GET USER BY ID

const getUserbyID = async (req, res) => {
    try {
        // const usersByID = await pool.query(
        //     `SELECT * FROM test WHERE uid = $1`,
        //     [req.user.uid]
        // );
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
        });
    }
};

// UPDATE USER PROFILE

const updateUser = async (req, res) => {
    try {
        // const { uid } = req.params
        const { firstname, lastname, email } = req.body;
        const updateProfile = await pool.query("UPDATE test SET firstName = $1, lastname = $2, email = $3 WHERE uid = $4", [firstname, lastname, email, req.user.uid])
        res.status(200).json({
            msg: 'updated',
            success: true,
        });
    } catch (err) {
        console.error(err.message)
    }
}

// DELETE A USER

const deleteUser = async (req, res) => {
    try {
        const deleteUserProfile = await pool.query("DELETE FROM test WHERE uid = $1", [req.user.uid])
        // const deleteUserProfile = await pool.query("DELETE test, post FROM test INNER JOIN post ON test.uid = post.userid WHERE uid=$1", [userid])
        res.status(200).json({
            success: true,
            msg: "user deleted"
        })
    } catch (err) {
        console.error(err.message)
    }
}

// LOGIN A USER

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await pool.query(`SELECT * FROM test WHERE email= $1;`, [email]) //Verifying if the user exists in the database
        const user = data.rows[0];
        console.log('user', user)
        if (!user || user.length === 0) {
            res.status(400).json({
                error: "User is not registered, Sign Up first",
                success: false,
            });
        }
        else {
            bcrypt.compare(password, user.password, (err, result) => { //Comparing the hashed password
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) { //Checking if credentials match
                    const token = jwt.sign(
                        {
                            email: user.email,
                            uid: user.uid
                        },
                        process.env.SECRET_KEY
                    );
                    res.status(200).json({
                        success: true,
                        email: user.email,
                        uid: user.uid,
                        jwt: token
                    });
                }
                else {
                    //Declaring the errors
                    if (result != true)
                        res.status(400).json({
                            error: "Incorrect password, please try again",
                            success: false,
                        });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
            success: false,

        });
    };
};

// const getProfile = async (req, res) => {
//     console.log("req.payload", req.payload);
//     res.status(201).json(
//         `authorized request for ${req.payload.email}`
//     )
// };

const getProfile = async (req, res) => {
    try {
        // console.log("uid", req.userid);
        const profileDetails = await pool.query(
            // `SELECT avatar, username, email, name, userid FROM profiles, users WHERE profiles.userid = $1`,
            `SELECT * FROM test WHERE uid = $1`,
            [req.user.uid]
        );
        res.status(200).json(profileDetails.rows[0]);
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
        });
    }
};

export { getAllUsers, getUserbyID, createNewUser, updateUser, deleteUser, login, getProfile }