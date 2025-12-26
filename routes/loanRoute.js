const router = require('express').Router();
import auth from '../middlewares/auth';
import { borrow, returnBook, myLoans } from '../controllers/loanController';

router.post('/borrow', auth, borrow);
router.put('/return/:id', auth, returnBook);
router.get('/my', auth, myLoans);

export default router;