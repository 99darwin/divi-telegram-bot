const router = require('express').Router();
const message = require('../../db/controllers/messages');

router
    .route('/')
    .get(message.findAll);

