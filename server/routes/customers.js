import express from 'express';

import * as customers from '../controllers/customers.js';

const router = express.Router();

router.get ('/', customers.getAll);
router.get ('/:id', customers.getById);
router.post ('/', customers.add);
router.put ('/:id', customers.update);
router.delete ('/:id', customers.remove);

export default router;