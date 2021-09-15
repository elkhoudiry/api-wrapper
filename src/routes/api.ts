import express from 'express';
import { ping } from '../routes-controllers/ping';

const router = express.Router();

router.get('/ping', ping);

router.get('/', (req, res, next) => res.status(404).json({ message: 'not found!' }));

export = router;
