import { Router } from 'express';
import passport from 'passport';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), getAllUsers);
router.get('/:id', passport.authenticate('jwt', { session: false }), getUserById);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteUser);

export default router;