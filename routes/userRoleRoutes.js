import express from 'express';
import { assignRoleToUser, getRolesByUserId, getUsersByRoleId } from '../controllers/userRoleController.js';

const router = express.Router();

router.post('/', assignRoleToUser);
router.get('/user/:userId', getRolesByUserId);
router.get('/role/:roleId', getUsersByRoleId);

export default router;
