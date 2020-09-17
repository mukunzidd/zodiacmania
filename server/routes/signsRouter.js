import express from 'express';
import Sign from '../models/sign';

const router = express.Router();

// Get all
router.get('/', async (req, res) => {
  try {
    const signs = await Sign.find();
    res.status(200).json({
      message: 'Success',
      data: signs,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get one
router.get('/:id', getSign, (req, res) => {
  res.json({
    message: 'Success',
    data: res.sign,
  });
});

// Create one
router.post('/', async (req, res) => {
  const { name, dateStart, dateEnd } = req.body;
  const sign = new Sign({
    name,
    dateStart,
    dateEnd,
  });

  try {
    const newSign = await sign.save();
    res.status(201).json({
      message: 'success',
      data: newSign,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update one
router.patch('/:id', getSign, async (req, res) => {
  const { name, dateStart, dateEnd } = req.body;
  if (name != null) {
    res.sign.name = name;
  }
  if (dateStart != null) {
    res.sign.dateStart = dateStart;
  }
  if (dateEnd != null) {
    res.sign.dateEnd = dateEnd;
  }

  try {
    const updatedSign = await res.sign.save();
    res.json({
      message: 'Success',
      data: updatedSign,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one
router.delete('/:id', getSign, async (req, res) => {
  try {
    await res.sign.remove();
    res.json({ message: 'Deleted sign' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware
async function getSign(req, res, next) {
  let sign;
  try {
    sign = await Sign.findById(req.params.id);
    if (sign == null) {
      return res.status(404).json({
        message: 'cannot find sign',
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'cannot find sign',
    });
  }
  res.sign = sign;
  next();
}

module.exports = router;
