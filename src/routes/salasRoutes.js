// Rotas para gerenciar salas de reunião
import express from 'express';
import * as salasController from '../controllers/salasController.js';
import {
  validarPayloadSala,
  validarPayloadAtualizacaoSala
} from '../middlewares/validacaoSalas.js';

const router = express.Router();

/**
 * @swagger
 * /salas:
 *   get:
 *     summary: Lista todas as salas de reunião
 *     tags: [Salas]
 *     responses:
 *       200:
 *         description: Lista de salas obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                 dados:
 *                   type: array
 *                 total:
 *                   type: integer
 */
router.get('/', salasController.listarSalas);

/**
 * @swagger
 * /salas/{id}:
 *   get:
 *     summary: Obtém uma sala específica pelo ID
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sala encontrada
 *       404:
 *         description: Sala não encontrada
 */
router.get('/:id', salasController.obterSalaPorId);

/**
 * @swagger
 * /salas:
 *   post:
 *     summary: Cria uma nova sala de reunião
 *     tags: [Salas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *             required:
 *               - nome
 *               - localizacao
 *               - capacidade
 *     responses:
 *       201:
 *         description: Sala criada com sucesso
 *       400:
 *         description: Campos obrigatórios faltando ou sala duplicada
 */
router.post('/', validarPayloadSala, salasController.criarSala);

/**
 * @swagger
 * /salas/{id}:
 *   put:
 *     summary: Atualiza uma sala de reunião
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Sala atualizada com sucesso
 *       404:
 *         description: Sala não encontrada
 *       400:
 *         description: Campos inválidos ou sala duplicada
 */
router.put('/:id', validarPayloadAtualizacaoSala, salasController.atualizarSala);

/**
 * @swagger
 * /salas/{id}:
 *   delete:
 *     summary: Deleta uma sala de reunião
 *     tags: [Salas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sala deletada com sucesso
 *       404:
 *         description: Sala não encontrada
 */
router.delete('/:id', salasController.deletarSala);

export default router;
