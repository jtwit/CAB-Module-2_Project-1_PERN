import pool from "../config.js"

// CREATE NEW POST

const createNewPost = async (req, res) => {
    console.log('req.user', req.user)
    try {
        console.log('req.body', req.body)
        const userid = req.user.uid
        console.log('user', userid)
        const { comment, topic, location, image } = req.body;
        const newPost = await pool.query(
            // INSERT INTO tableName (columnName) VALUES ($anything), [define $anything]
            "INSERT INTO post (comment, topic, location, image, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [comment, topic, location, image, userid]
        );
        res.json({
            info: newPost.rows[0],
            success: true
        })
    } catch (err) {
        console.error(err.message)
    }
}

// GET ALL POSTS

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT email , firstname , lastname , comment, topic, location, image, userid, timestamp, pid FROM test, post WHERE post.userid = test.uid")

        res.status(200).json(
            allPosts.rows
        )
    } catch (err) {
        console.error(err.message)
    }
}

// GET POSTS BY USER ID



const getPostsbyID = async (req, res) => {
    try {
        // console.log("uid", req.userid);
        const postsByID = await pool.query(
            // `SELECT avatar, username, email, name, userid FROM profiles, users WHERE profiles.userid = $1`,
            `SELECT * FROM post, test WHERE userid = $1 and userid = test.uid`,
            [req.user.uid]
        );
        res.status(200).json(postsByID.rows);
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
        });
    }
};

// DELETE ALL POSTS BY USER ID

const deleteUsersPosts = async (req, res) => {
    try {
        const deleteAllPosts = await pool.query(
            "DELETE FROM post WHERE userid = $1",
            [req.user.uid]
        );
        res.status(200).json({
            msg: "posts deleted",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            error: error,
            success: false,
        });
    }
};

// GET POSTS BY POSTID

const getPostsbyPostID = async (req, res) => {
    try {
        const { pid } = req.params
        const results = await pool.query("SELECT * FROM post WHERE pid = $1", [pid])
        console.log('results', results)
        res.status(200).json({
            info: results.rows
        })
    } catch (err) {
        console.error(err.message)
    }
}

// DELETE A POST

const deletePost = async (req, res) => {
    try {
        const { pid } = req.params
        const deleteUserPost = await pool.query("DELETE FROM post WHERE pid = $1", [pid])
        res.status(200).json({
            msg: "post deleted",
            success: true
        })
    } catch (err) {
        console.error(err.message)
    }
}

// UPDATE A POST

const updateUsersPost = async (req, res) => {
    try {
        const userid = req.user.uid
        const { comment, topic, location, image } = req.body;
        const updatePost = await pool.query("UPDATE post SET comment = $1, topic = $2, location = $3, image = $4 WHERE pid = $5 AND userid = post.userid ",
            [comment, topic, location, image, req.query.pid])
        res.status(200).json({
            msg: "updated",
            success: true
        })
    } catch (err) {
        console.error(err.message)
    }
}


export { createNewPost, getAllPosts, getPostsbyID, deletePost, getPostsbyPostID, updateUsersPost, deleteUsersPosts }