SET FOREIGN_KEY_CHECKS = 0;
LOCK TABLES `AB_JOINMN_ROLE_USER_users` WRITE;
INSERT INTO `AB_JOINMN_ROLE_USER_users` (`created_at`, `updated_at`, `id`, `USER`, `ROLE`) VALUES (NOW(), NOW(), "6", "admin", "e32dbd38-2300-4aac-84a9-d2c704bd2a29");
INSERT INTO `AB_JOINMN_ROLE_USER_users` (`created_at`, `updated_at`, `id`, `USER`, `ROLE`) VALUES (NOW(), NOW(), "5", "admin", "7771bdb9-616c-48dc-9574-f8d167f44022");
UNLOCK TABLES;
SET FOREIGN_KEY_CHECKS = 1;