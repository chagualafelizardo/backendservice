import express from 'express';
import { 
    getAllUsers, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser,
    loginUser,
    getUserByFullName,
    getUserRoles
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
router.get('/user/:fullName', getUserByFullName);
router.get('/:userId/roles', getUserRoles);

export default router;
