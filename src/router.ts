import { Router } from "express";


const router = Router();

// Main
router.get('/', (req, res) => {
    res.json('All the users');
});


export default router;