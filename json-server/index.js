const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');
app.use(cors()); // Включаем CORS для всех маршрутов
app.use(express.json());

const adapter = new FileSync(path.join(__dirname, 'db.json'));

const db = low(adapter);

// POST /comments - добавление нового комментария
app.post('/comments', (req, res) => {
  const { content, username, avatar, userId, parentId } = req.body;

  const newComment = {
    id: uuidv4(),
    content,
    username,
    avatar: avatar || '/img/default-avatar.jpg',
    userId: userId || null,
    parentId: parentId || null,
    createdAt: new Date().toISOString(),
    like: 0,
    dislike: 0,
  };
  db.get('comments').push(newComment).write();
  console.log('Добавлен новый комментарий:', newComment); // Лог добавления комментария
  res.status(201).json(newComment);
});

// GET /comments - получение всех комментариев
app.get('/comments', (req, res) => {
  const comments = db.get('comments').value(); // Получаем все комментарии из базы
  res.json(comments);
});
app.post('/comments/:id/like', (req, res) => {
  const { id } = req.params;
  const { like } = req.body; // Ожидаем поле "type" с значением "like" или "dislike"

  const comment = db.get('comments').find({ id }).value();

  if (comment) {
    comment.like = like;

    db.get('comments').find({ id }).assign(comment).write(); // Сохраняем изменения
    console.log(`Обновлена реакция для комментария с ID ${id}:`, comment);

    // Возвращаем весь массив комментариев
    const allComments = db.get('comments').value();
    res.json(allComments);
  } else {
    console.log(`Комментарий с ID ${id} не найден`);
    res.status(404).json({ error: 'Комментарий не найден' });
  }
});

app.post('/comments/:id/dislike', (req, res) => {
  const { id } = req.params;
  const { dislike } = req.body; // Expect "dislike" in the request body

  const comment = db.get('comments').find({ id }).value();

  if (comment) {
    comment.dislike = dislike; // Update the dislike count

    db.get('comments').find({ id }).assign(comment).write(); // Save changes
    console.log(`Dislike updated for comment with ID ${id}:`, comment);

    // Return all comments
    const allComments = db.get('comments').value();
    res.json(allComments);
  } else {
    console.log(`Comment with ID ${id} not found`);
    res.status(404).json({ error: 'Comment not found' });
  }
});
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Received ID for deletion: ${id}`); // Log the ID being passed

  const commentToDelete = db.get('comments').find({ id }).value();

  if (commentToDelete) {
    db.get('comments').remove({ id }).write(); // Delete comment
    console.log(`Комментарий с ID ${id} удалён`);
    res.status(200).json({ message: 'Комментарий удалён' });
  } else {
    console.log(`Комментарий с ID ${id} не найден`);
    res.status(404).json({ error: 'Комментарий не найден' });
  }
});

app.post('/comments/:parentId/reply', (req, res) => {
  const { parentId } = req.params; // ID родительского комментария
  const { content, username, avatar, userId } = req.body; // Данные нового ответа

  // Найти родительский комментарий по ID
  const parentComment = db.get('comments').find({ id: parentId }).value();

  if (!parentComment) {
    return res
      .status(404)
      .json({ error: 'Родительский комментарий не найден' });
  }

  // Создать новый ответ (комментарий с parentId)
  const reply = {
    id: uuidv4(),
    content,
    username,
    avatar: avatar || '/img/default-avatar.jpg',
    userId: userId || null,
    parentId: parentId, // Указываем ID родительского комментария
    createdAt: new Date().toISOString(),
    like: 0,
    dislike: 0,
  };

  // Добавить новый комментарий в базу
  db.get('comments').push(reply).write();

  console.log(`Добавлен новый ответ на комментарий с ID ${parentId}:`, reply);
  res.status(201).json(reply); // Возвращаем новый ответ
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
