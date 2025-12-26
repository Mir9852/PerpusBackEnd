const router = require('express').Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const bookController = require('../controllers/bookController');

router.get('/', auth, bookController.getAll);
router.post('/', auth, role.adminOnly, bookController.create);

module.exports = router;