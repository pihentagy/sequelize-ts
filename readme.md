This repo demonstrates how direct field access (which is
[the preferred methdod to access fields](https://sequelize.org/master/class/lib/model.js~Model.html)
does not work. The output of the program is:


```text
~/prg/seq-ts ⌚ 21:42:05
$ npm run dev

> seq-ts@1.0.0 dev
> tsnd --inspect=0.0.0.0:9229 --respawn --log-error -r tsconfig-paths/register ./index.ts

[INFO] 21:43:43 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.4.3)
Debugger listening on ws://0.0.0.0:9229/db3b4e28-a8d2-45cb-86fc-c7ab04be3b15
For help, see: https://nodejs.org/en/docs/inspector
running sequelize
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): DROP TABLE IF EXISTS `Users`;
Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `firstName` VARCHAR(255) NOT NULL, `last-name` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
Executing (default): PRAGMA INDEX_LIST(`Users`)
Connection has been established successfully.
Executing (default): INSERT INTO `Users` (`id`,`firstName`,`last-name`,`createdAt`,`updatedAt`) VALUES (NULL,$1,$2,$3,$4);
Executing (default): SELECT `id`, `firstName`, `last-name` AS `lastName`, `createdAt`, `updatedAt` FROM `Users` AS `User`;
Lastname: undefined, with get: your hello
main ended
```

However, when you remoe the lastName field from the model, it appears.

---

Update: the solution is to change the target from ESNext to anything else.
