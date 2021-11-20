// get the client
const mysql = require('mysql2')

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SuperSecretPassword123',
    database: 'travily_db'
})

const createPost = (req, res) => {
    connection.query(
        `INSERT INTO posts (user_id, location_id, content, date, votes) VALUES('${req.body.user_id}', '${req.body.location_id}', '${req.body.content}', NOW(), 0);`,
        (err, results, fields) => {
            if(err)
               res.status(400).send(err);
            else
               res.sendStatus(200);
        }
    )
}

const listPosts = (req, res) => {
    connection.query(
      'SELECT id, user_id, location_id, content, date, update_date, votes FROM posts',
      (err, results, fields) => {
          if(err)
            res.status(500).send(err);
          else
            res.status(200).send(results);
      }
    );
}

const getPost = (req, res) => {
    connection.query(
        `SELECT id, user_id, location_id, content, date, update_date, votes FROM posts where id=${req.params.id}`,
        (err, results, fields) => {
            if(err)
               res.status(500).send(err);
            else
               res.status(200).send(results);
        }
    )
}

const deletePost = (req, res) => {
    connection.query(
        `DELETE FROM posts WHERE id=${req.params.id}`,
        (err, results, fields) => {
            if(err)
               res.status(500).send(err);
            else
               res.sendStatus(200);
        }
    )
}

const updatePost = (req, res) => {
    connection.query(`UPDATE posts SET content='${req.body.content}', update_date=NOW() WHERE id=${req.params.id}`,
    (err, results, fields) => {
        if(err)
            res.status(500).send(err);
        else
            res.sendStatus(200);
    }
    )
}

const upvote = (req, res) => {
    connection.query(`UPDATE posts SET votes=votes+1 WHERE id='${req.params.id}'`,
    (err, results, fields) => {
        if(err)
            res.status(500).send(err);
        else
            res.sendStatus(200);
    })
}

const downvote = (req, res) => {
    connection.query(`UPDATE posts SET votes=votes-1 WHERE id='${req.params.id}'`,
    (err, results, fields) => {
        if(err)
            res.status(500).send(err);
        else
            res.sendStatus(200);
    })
}

module.exports = { listPosts, getPost, deletePost, updatePost, createPost, upvote, downvote }