import {
  findAllWithDriver
} from '../controllers/veiculoController.js';
import { router } from "./veiculoRoutes";

router.get('/withdriver', findAllWithDriver);
