-- CreateTable
CREATE TABLE "Texts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "heroTitle" TEXT NOT NULL DEFAULT 'Sur mesure',
    "heroIntro" TEXT NOT NULL DEFAULT 'Hermide Bonaventure dessine, coupe et coud chaque pièce à vos mesures : mariée, soirée, vestiaire de jour, accessoires.',
    "manifeste" TEXT NOT NULL DEFAULT 'Une seule paire de mains, quatre rendez-vous, et un vêtement qui n''ira jamais parfaitement à personne d''autre. Ici, la taille n''existe pas : il y a votre corps, et le tissu qu''on lui coupe.',
    "bio" TEXT NOT NULL DEFAULT '',
    "citation" TEXT NOT NULL DEFAULT '',
    "contact" TEXT NOT NULL DEFAULT 'Adresse à compléter, Lyon
Sur rendez-vous
bonjour@bonaventure-couture.fr
à compléter',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Look" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "caption" TEXT NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Nouvelle',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
