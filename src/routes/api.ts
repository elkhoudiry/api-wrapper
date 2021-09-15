import express from 'express';
import { ping, time, database, guard } from '../routes-controllers';

const router = express.Router();

router.post('/clients/', database.addNewClient);

router.get('/experimental/guard/*', guard.check);
router.get('/clients/email/:email', database.getClientByEmail);
router.get('/clients/id/:id', database.getClientById);
router.get('/clients/all', database.getAllClients);
router.get('/time/now', time.getTimeNow);
router.get('/ping', ping.check);

export = router;
