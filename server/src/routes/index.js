import express from 'express';
import { getTableData, addTableData, updateTableRecord, deleteTableRecord, sortTableRecord } from '../controller/index.js';
const router = express.Router();

router.get('/api/get',getTableData);
router.post('/api/add', addTableData);
router.put('/api/update/:id', updateTableRecord);
router.get('/api/get/:tablekey/:id', sortTableRecord)
router.delete('/api/delete/:id', deleteTableRecord);

export default router;