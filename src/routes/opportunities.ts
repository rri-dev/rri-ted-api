import { Router } from 'express';
import { authenticateApiKey } from '../middleware/auth';
import { getOpportunities } from '../controllers/opportunities';

const router = Router();

router.get('/opportunities', authenticateApiKey, getOpportunities);

export default router;