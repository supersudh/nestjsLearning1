# nest g module users
# nest g module reports

➜  mycv git:(main) ✗ nest g controller users
CREATE src/users/users.controller.spec.ts (485 bytes)
CREATE src/users/users.controller.ts (99 bytes)
UPDATE src/users/users.module.ts (170 bytes)
➜  mycv git:(main) ✗ nest g controller reports
CREATE src/reports/reports.controller.spec.ts (499 bytes)
CREATE src/reports/reports.controller.ts (103 bytes)
UPDATE src/reports/reports.module.ts (178 bytes)
➜  mycv git:(main) ✗ nest g service users
CREATE src/users/users.service.spec.ts (453 bytes)
CREATE src/users/users.service.ts (89 bytes)
UPDATE src/users/users.module.ts (247 bytes)
➜  mycv git:(main) ✗ nest g service reports
CREATE src/reports/reports.service.spec.ts (467 bytes)
CREATE src/reports/reports.service.ts (91 bytes)
UPDATE src/reports/reports.module.ts (261 bytes)

 npm install @nestjs/typeorm typeorm sqlite3