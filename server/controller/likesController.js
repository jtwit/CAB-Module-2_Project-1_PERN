import pool from "../config.js"

// CREATE NEW LIKE

const createNewLike = async (req, res) => {
    try {
        console.log('req.body', req.body)
        console.log('req.query', req.query)
        const userid = req.user.uid
        // const postid = req.query.pid
        console.log('userid', userid)
        const { postid } = req.body;
        const newLike = await pool.query(
            "INSERT INTO likes (userid, postid) VALUES ($1, $2) RETURNING *",
            [userid, postid]
        );
        res.json({
            info: newLike.rows,
            success: true
        })
    } catch (err) {
        console.error(err.message)
    }
}

// GET LIKES BY POSTID

const getCommentsbyLikesID = async (req, res) => {
    try {
        const { postid } = req.params
        const results = await pool.query("SELECT * FROM likes, test WHERE postid = $1 AND likes.userid = test.uid", [postid])
        console.log('results', results)
        res.status(200).json(
            results.rows
        )
    } catch (err) {
        console.error(err.message)
    }
}

// DELETE A LIKE

const deleteLike = async (req, res) => {
    try {
        const { lid } = req.params
        const deleteUserLike = await pool.query("DELETE FROM likes WHERE lid = $1", [lid])
        res.status(200).json({
            msg: "like deleted",
            success: true
        })
    } catch (err) {
        console.error(err.message)
    }
}

export { createNewLike, getCommentsbyLikesID, deleteLike }