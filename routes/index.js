const express = require('express');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.use('/', userRoutes);
router.use('/', taskRoutes);

module.exports = router;
