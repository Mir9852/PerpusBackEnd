const router = require('express').Router();
const auth = require('../middlewares/auth');
const loanController = require('../controllers/loanController');

router.post('/borrow', auth, loanController.borrow);
router.put('/return/:id', auth, loanController.returnBook);
router.get('/my', auth, loanController.myLoans);

module.exports = router;