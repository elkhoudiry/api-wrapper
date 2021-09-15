import express from 'express';
import { ping, time, database } from '../routes-controllers';

const router = express.Router();

router.get('/clients/email/:email', database.getClientByEmail);
router.get('/clients/id/:id', database.getClientById);
router.get('/clients/all', database.getAllClients);
router.get('/time/now', time.getTimeNow);
router.get('/ping', ping.check);

router.get('/', (req, res, next) => res.status(404).json({ message: 'not found!' }));

export = router;
