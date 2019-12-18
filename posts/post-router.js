const express = require('express');
const db = require('../data/db-config'); // database access using knex

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const post = await db('posts');
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const post = await db('posts').where('id', id);
    res.json(post);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = {
      title: req.body.title,
      contents: req.body.contents,
    };
    const [id] = await db('posts').insert(payload);
    const newPost = await db('posts')
      .where('id', id)
      .first();
    res.json(newPost);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = {
      title: req.body.title,
      contents: req.body.contents,
    };
    const id = Number.parseInt(req.params.id);
    await db('posts')
      .where('id', id)
      .update(payload);
    const updatedPost = await db('posts')
      .where('id', id)
      .first();
    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id);
    const lines = await db('posts')
      .where('id', id)
      .del();
    res.status(202).json({ 'records deleted': lines });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
