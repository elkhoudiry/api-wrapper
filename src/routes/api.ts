import express from 'express';
import { ping, time, clients, guard, tables } from '../routes-controllers';

const router = express.Router();

router.delete('/clients/delete/latest/', clients.deleteLatestClient);
router.delete('/clients/delete/:id', clients.deleteClientById);

router.post('/clients/', clients.addNewClient);

router.get('/clients/email/:email', clients.getClientByEmail);
router.get('/clients/id/:id', clients.getClientById);
router.get('/clients/all', clients.getAllClients);

router.post('/experimental/tables/create/:name', tables.createTable);
router.post('/experimental/tables/create-check/:name', tables.createTableIfNoExist);

router.delete('/experimental/tables/drop/:name', tables.dropTable);
router.delete('/experimental/tables/drop-check/:name', tables.dropTableIfExist);

router.get('/experimental/guard/*', guard.check);

router.get('/time/now', time.getTimeNow);

router.get('/ping', ping.check);

export = router;
