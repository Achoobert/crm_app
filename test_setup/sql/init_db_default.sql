SET FOREIGN_KEY_CHECKS = 0;
UNLOCK TABLES;
LOCK TABLES `AB_JOINMN_ROLE_USER_users` WRITE;
INSERT INTO `AB_JOINMN_ROLE_USER_users` (created_at,updated_at,`USER`,`ROLE`) VALUES (NULL,NULL,'admin','e1be4d22-1d00-4c34-b205-ef84b8334b19'),(NULL,NULL,'admin','ee52974b-5276-427f-ad4c-f29af6b5caaf');
UNLOCK TABLES;
SET FOREIGN_KEY_CHECKS = 1;