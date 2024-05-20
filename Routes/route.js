import express from "express"
import modelController from "../Controller/controller.js"

const { createShortUrl, redirectUrl } = modelController;


const router = express.Router();

router.post('/api/v1/url', createShortUrl);
router.get('/api/v1/url/:urlId', redirectUrl);

export default router;
// module.exports = router;
