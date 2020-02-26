const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "user"
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: "user created"
    })
})

module.exports = router;