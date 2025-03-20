import { Router } from 'express';
import { getDiscussions, addDiscussion, getDiscussionById, addCommentaire, voteDiscussion } from '../controllers/forumController';

const router = Router();

router.get('/forum', getDiscussions);
router.post('/forum', addDiscussion);
router.get('/forum/:id', getDiscussionById);
router.post('/forum/commentaire', addCommentaire);
router.post('/forum/:id/vote/:voteType', voteDiscussion);

export default router;