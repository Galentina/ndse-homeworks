# Домашнее задание к занятию «2.6. База данных и хранение данных»

## Правила выполнения домашней работы:
- выполняйте домашнее задание в отдельной ветке проекта на GitHub,
- в поле для сдачи работы прикрепите ссылку на ваш проект в Git,
- присылать на проверку можно каждую задачу по отдельности или все задачи вместе,
- во время проверки по частям ваша домашняя работа будет обозначаться статусом «На доработке»,
- любые вопросы по решению задач задавайте в канале вашей группы.

## Задание 1
Чтобы в будущем вам было легче работать с ***MongoDB***, изучите раздел документации об использовании [CRUD Operations](https://www.mongodb.com/docs/manual/crud/)

## Задание 2
В файле ***README.md*** написать следующие запросы для ***MongoDB***:

- запрос(ы) для **вставки** данных минимум о двух книгах в коллекцию ***books***,
```javascript
db.books.insertOne(
    {
        title: "MongoDB CRUD Operations",
        description: "CRUD operations create, read, update, and delete documents.",
        authors: "Autor1, Autor2"
    }
)

db.books.insertOne(
    {
        title: "Develop Applications",
        description: "Build modern applications with MongoDB, a general purpose, document-based, distributed database built for application developers.",
        authors: "Autor3, Autor4"
    }
)
```

- запрос для **поиска** полей документов коллекции ***books*** по полю **title**,
```javascript
db.books.find(
  { title: { $regex: /^Develop/ } },
  { title: 1, description: 1, authors: 1 }
)
```

- запрос для **редактирования** полей: **description** и **authors** коллекции ***books*** по **_id** записи.
```javascript
db.books.updateOne(
  { _id: 1 },
  { $set: { authors: "Autor5" }, description: "Description 2" }
) 
```

*Каждый документ коллекции ***books*** должен содержать следующую структуру данных:
``` 
{
  title: "string",
  description: "string",
  authors: "string"
}
```
