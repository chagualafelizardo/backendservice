import express from 'express';
import * as roleController from '../controllers/roleController.js';

const router = express.Router();

router.get('/', roleController.getAllRoles);
router.post('/', roleController.createRole);
router.get('/:id', roleController.getRoleById);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
router.get('/:roleId/user', roleController.getUsersByRole);
router.get('/:roleName/user', roleController.getUsersByRoleName);

export default router;
