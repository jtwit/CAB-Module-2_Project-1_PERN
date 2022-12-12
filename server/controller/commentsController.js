import pool from "../config.js"

// CREATE NEW COMMENT

const createNewComment = async (req, res) => {
    try {
        console.log('req.body', req.body)
        console.log('req.query', req.query)
        const userid = req.user.uid
        // const postid = req.params
        console.log('userid', userid)
        const { comment, postid } = req.body;
        const newComment = await pool.query(
            // INSERT INTO tableName (columnName) VALUES ($anything), [define $anything]
            "INSERT INTO comments (comment, userid, postid) VALUES ($1, $2, $3) RETURNING *",
            [comment, userid, postid]
        );
        // res.json(newComment.rows[0])
        res.status(200).json({
            info: newComment.rows[0],
            success: 'Your comment had been posted'
        })

    } catch (err) {
        console.error(err.message)
    }
}


// GET ALL COMMENTS

const getAllComments = async (req, res) => {
    try {
        const allComments = await pool.query("SELECT * FROM comments, test WHERE comments.userid = test.uid")
        res.status(200).json(
            allComments.rows
        )
    } catch (err) {
        console.error(err.message)
    }
}

// GET COMMENTS BY POST ID
const getCommentsbyPostID = async (req, res) => {
    try {
        const { postid } = req.params
        console.log('postid', postid)
        const results = await pool.query("SELECT * FROM comments, test WHERE postid = $1 AND comments.userid = test.uid", [postid])
        console.log('results', results)
        res.status(200).json(results.rows)
    } catch (err) {
        console.error(err.message)
    }
}

// DELETE A COMMENT

const deleteComment = async (req, res) => {
    try {
        const { cid } = req.params
        const deleteUserPost = await pool.query("DELETE FROM comments WHERE cid = $1", [cid])
        res.status(200).json({
            msg: "comment deleted",
            success: true
        })
    } catch (err) {
        console.error(err.message)
    }
}

export { createNewComment, getAllComments, getCommentsbyPostID, deleteComment }