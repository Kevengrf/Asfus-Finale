// backend/routes/associados.js
import express from 'express';
import * as associadosController from '../controllers/associadosController.js';

const router = express.Router();

router.get('/:id', associadosController.getAssociado);
router.post('/:id/dependentes', associadosController.addDependente);
router.delete('/:id/dependentes/:dependenteId', associadosController.removeDependente);

export default router;
