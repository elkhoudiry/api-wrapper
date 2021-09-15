import express from 'express';
import { ping, time } from '../routes-controllers';

const router = express.Router();

router.get('/time/now', time.getTimeNow);
router.get('/ping', ping.check);

router.get('/', (req, res, next) => res.status(404).json({ message: 'not found!' }));

export = router;
