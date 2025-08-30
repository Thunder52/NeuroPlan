import express from 'express';
import { getSchedule,PostSchedule,editTimetable } from '../controllers/scheduleController.js';
import  authMiddleware  from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/schedule',authMiddleware, PostSchedule);
router.get('/schedule',authMiddleware,getSchedule)
router.put('/editSchedule',authMiddleware,editTimetable);
export default router;
