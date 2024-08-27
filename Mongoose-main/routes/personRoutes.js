import express from 'express';
import {
    createAndSavePerson,
    createManyPeople,
    findPeopleByName,
    findOneByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    removeById,
    removeManyPeople,
    queryChain
} from '../controllers/personController.js';

const router = express.Router();

router.post('/', createAndSavePerson);
router.post('/many', createManyPeople);
router.get('/:name', findPeopleByName);
router.get('/food/:food', findOneByFood);
router.get('/id/:id', findPersonById);
router.put('/id/:id/food', findEditThenSave);
router.put('/name/:name', findAndUpdate);
router.delete('/id/:id', removeById);
router.delete('/many/mary', removeManyPeople);
router.get('/query/burritos', queryChain);

export default router;
