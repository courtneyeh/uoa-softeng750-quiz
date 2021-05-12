import express from 'express';

const router = express.Router();

import button from './button';
router.use('/button', button);

export default router;