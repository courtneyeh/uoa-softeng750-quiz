import express from 'express';
import { retrieveButton, updateButton } from "../../database/button-dao";

const router = express.Router();

const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

// Retrieve single button
router.get('/', async (req, res) => {
  const button = await retrieveButton();

  if (button) {
    res.json(button);
  } else {
    // Make a button
    await updateButton({pressed: false});
  }
});

// Update article
router.put('/', async (req, res) => {
  const button = req.body;
  const success = await updateButton(button);
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

export default router;