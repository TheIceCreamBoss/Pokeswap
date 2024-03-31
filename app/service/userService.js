var mysql = require('mysql2');

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

//VIEW ALL USERS
async function getDB() {
    console.log('getDB'); 
    return new Promise((resolve, reject) => {

        connection.query('USE pokeswap');

        connection.query('SELECT * FROM user', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

//CREATE USER
async function createUser(req) { 
    console.log('createUser'); 
    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        //console.log(req);
        //Sanitization, ? handles escaping of special characters
        const query = 'INSERT INTO user (email, name, phone_num, profile_visibility) VALUES (?, ?, ?, ?)';
        const values = [req.email, req.name, req.phone_num, req.profile_visibility];
         connection.query(query, values, function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

//UPDATE USER
async function updateUser(req) {
    console.log('updateUser'); 
     // Parse req.body for userID and updateData
    const { user_id: user_Id, ...updateData } = req.body;
    
    // Set all blank values to n/a as if they are deleted
    // !!!Nothing on the backend is checking if phonenum is valid, email is valid, etc. Do on frontend!!!
     Object.keys(updateData).forEach(key => {
        if (updateData[key] === "") {
            updateData[key] = "N/A";
        }
    });

     // build connection query
     const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
     const query = `UPDATE user SET ${fields} WHERE user_id = ?`;
 
     // extract values from updateData
     const values = Object.values(updateData);
 
     // Add user_Id to the end of the values array to match order of query
     values.push(user_Id);

    return new Promise ((resolve, reject) => {
        connection.query('USE pokeswap');
        console.log(req.body);

        //Sanitization, ? handles escaping of special characters
         connection.query(query, values, function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

// DELETE USER
async function deleteUser(req) {
    console.log('deleteUser'); 
    return new Promise((resolve, reject) => {
       
        //obtain user_id from req body
        const user_id = req.body.user_id;

        connection.query('USE pokeswap');
        connection.query('DELETE FROM user WHERE user_id = ?', user_id, function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}

// View USER
async function viewUser(req) {
    console.log('viewUser'); 
    return new Promise((resolve, reject) => {
       
        //obtain user_id from req body
        const user_id = req.body.user_id;
        
        connection.query('USE pokeswap');
        connection.query('SELECT * FROM user WHERE user_id = ?', user_id, function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.log(results);
                resolve(results);
            }
        });
    });
}



module.exports = {
    getDB,
    createUser,
    updateUser,
    deleteUser,
    viewUser
}