const router = require('express').Router();
import auth from '../middlewares/auth';
import { adminOnly } from '../middlewares/role';
import { getAll, create } from '../controllers/bookController';

router.get('/', auth, getAll);
router.post('/', auth, adminOnly, create);

export default router;