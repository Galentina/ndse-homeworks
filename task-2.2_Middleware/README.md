# Домашнее задание к занятию «2.1. Express»

## Задание 1
Обновить структуру роутинга проекта с использованием **express.Router()**.

## Задание 2
Установить в проект пакет [multer](https://github.com/expressjs/multer/blob/master/doc/README-ru.md) и создать middleware для загрузки файла книги. Созданную middleware подключить и обработать в роутах создания данных о книге.
Каждый экземпляр книги должен содержать следующую структуру данных:

```javascript
{
  id: "string",
  title: "string",
  description: "string",
  authors: "string",
  favorite: "string",
  fileCover: "string",
  fileName: "string",
  fileBook: "string"
}
```
## Задание 3
Создать роут ```GET: /api/books/:id/download```. Метод отдаёт на скачиваение файл книги по её **:id**.
