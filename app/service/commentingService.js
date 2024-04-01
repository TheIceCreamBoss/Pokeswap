var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

async function getComments() {
    console.log('getComments'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM commentsWritesBelongsTo', function (err, results) {
            if (err) {s
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

const createComment = function(param) {
    return new Promise(function(resolve, reject) {
      const query = 'INSERT INTO commentsWritesBelongsTo (post_id, user_id, content, comment_date) VALUES (?, ?, ?, ?)';
      

      const date = new Date(param.comment_date);
      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
  
      const values = [param.post_id, param.user_id, param.content, formattedDate];
      connection.query('USE pokeswap');
      connection.query(query, values, function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };

// const updateComment = function(param) {
//     return new Promise(function(resolve, reject) {
//         const query = 
//         "UPDATE postCreates SET image_link = IFNULL(?, image_link),  content = IFNULL(?, content), post_date = IFNULL(?, post_date), user_id = IFNULL(?, user_id) WHERE post_id = ?";

//         const formattedDate = null;
//         if (param.post_date) {
//             const date = new Date(param.post_date);
//             formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
//         }
//         const values = [param.image_link, param.content, formattedDate, param.user_id, param.id];
//         connection.query('USE pokeswap');
//         connection.query(query, values, function(err, results) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }

const deleteComment = function(param) {
    return new Promise(function(resolve,reject) {
        const query = 'DELETE FROM commentsWritesBelongsTo WHERE comment_id = ?';
        connection.query('USE pokeswap');

        connection.query(query, [param.comment_id], function(err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    })
}


module.exports = {
    getComments,
    createComment,
    // updateComment,
    deleteComment
}