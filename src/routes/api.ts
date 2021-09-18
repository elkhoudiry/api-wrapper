import express from 'express';
import { ping, time, clients, guard } from '../routes-controllers';

const router = express.Router();

router.delete('/clients/delete/latest/', clients.deleteLatestClient);
router.delete('/clients/delete/:id', clients.deleteClientById);

router.post('/clients/', clients.addNewClient);

router.get('/clients/email/:email', clients.getClientByEmail);
router.get('/clients/id/:id', clients.getClientById);
router.get('/clients/all', clients.getAllClients);

router.get('/experimental/guard/*', guard.check);

router.get('/time/now', time.getTimeNow);

router.get('/ping', ping.check);

export = router;
