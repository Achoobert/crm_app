//
// This builds on the existing db_default AND db_balances
//
// the goal here is to make a few permissionses
//
//
const fs = require('fs');

function generatepermissionsSQL(permissionsData) {
   const output = [];
   output.push(`SET FOREIGN_KEY_CHECKS = 0;`);
   for (const table in permissionsData) {
      output.push(`LOCK TABLES \`AB_${table}\` WRITE;`);
      permissionsData[table].forEach((record) => {
         const leftSide = ["`uuid`", "`created_at`", "`updated_at`"];
         const rightSide = ["UUID()", "NOW()", "NOW()"];
         for (const field in record) {
            if (field === "uuid") {
               if (!record.uuid) {
                  leftSide.shift();
                  rightSide.shift();
               } else {
                  rightSide[0] = `"${record[field]}"`;
               }
               continue;
            }
            leftSide.push(`\`${field}\``);
            let rightValue = `"${record[field]}"`;
            if (record[field] === "NOW()") {
               rightValue = "NOW()";
            }
            rightSide.push(rightValue);
         }
         const line = `INSERT INTO \`AB_${table}\` (${leftSide.join(
            ", "
         )}) VALUES (${rightSide.join(", ")});`;
         output.push(line);
      });
      output.push("UNLOCK TABLES;");
   }
   output.push(`SET FOREIGN_KEY_CHECKS = 1;`);
   return output.join("\n");
}

const permissionsData = {
  JOINMN_ROLE_USER_users:[
   {
      "uuid": false,
      "id":6,
      "USER":"admin",
      "ROLE":"e32dbd38-2300-4aac-84a9-d2c704bd2a29" // core finance
    },{
      "uuid": false,
      "id":4,
      "USER":"admin",
      "ROLE":"6cc04894-a61b-4fb5-b3e5-b8c3f78bd331"
    },{
      "uuid": false,
      "id":5,
      "USER":"admin",
      "ROLE":"7771bdb9-616c-48dc-9574-f8d167f44022"
    },
  ]
};

console.log(generatepermissionsSQL(permissionsData));
fs.writeFileSync('./init_db_permissions.sql', generatepermissionsSQL(permissionsData));
