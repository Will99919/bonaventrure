-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Texts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "heroTitle" TEXT NOT NULL DEFAULT '',
    "heroIntro" TEXT NOT NULL DEFAULT '',
    "manifeste" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "citation" TEXT NOT NULL DEFAULT '',
    "contact" TEXT NOT NULL DEFAULT '',
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Texts" ("bio", "citation", "contact", "heroIntro", "heroTitle", "id", "manifeste", "updatedAt") SELECT "bio", "citation", "contact", "heroIntro", "heroTitle", "id", "manifeste", "updatedAt" FROM "Texts";
DROP TABLE "Texts";
ALTER TABLE "new_Texts" RENAME TO "Texts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
