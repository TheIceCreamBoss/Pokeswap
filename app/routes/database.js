const express = require('express');
var router = express.Router();
const dbService = require('../service/databaseService');

router.get('/check-db-connection', async (req, res) => {
    const isConnect = await dbService.testMySQLConnection();
    if (isConnect) {
        res.send({'text' : 'connected'});
    } else {
        res.render('error', { error: 'Error' });
    }
});

module.exports = router;