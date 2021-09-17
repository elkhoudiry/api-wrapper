import express from 'express';
import { ping, time, clients, guard } from '../routes-controllers';

const router = express.Router();

router.post('/clients/', clients.addNewClient);

router.get('/experimental/guard/*', guard.check);
router.get('/clients/email/:email', clients.getClientByEmail);
router.get('/clients/id/:id', clients.getClientById);
router.get('/clients/all', clients.getAllClients);
router.get('/time/now', time.getTimeNow);
router.get('/ping', ping.check);

export = router;
