import express from 'express';
import { 
    assignRoleToUser, 
    getRolesByUserId, 
    getUsersByRoleId,
    getAllUsersWithRoles,
    getAllDrivers,
    getAllClients
} from '../controllers/userRoleController.js';

const router = express.Router();

router.post('/', assignRoleToUser);
router.get('/user/:userId', getRolesByUserId);
router.get('/role/:roleId', getUsersByRoleId);
router.get('/user', getAllUsersWithRoles);
router.get('/drivers', getAllDrivers);
router.get('/clients', getAllClients);

export default router;
