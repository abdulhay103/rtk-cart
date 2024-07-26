/*
  Warnings:

  - You are about to drop the `appointments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blog_catagories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blogs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `massages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subscribers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `web_reviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `blog_catagories` DROP FOREIGN KEY `blog_catagories_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `blogs` DROP FOREIGN KEY `blogs_blogCatsId_fkey`;

-- DropForeignKey
ALTER TABLE `blogs` DROP FOREIGN KEY `blogs_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `web_reviews` DROP FOREIGN KEY `web_reviews_usersId_fkey`;

-- DropTable
DROP TABLE `appointments`;

-- DropTable
DROP TABLE `blog_catagories`;

-- DropTable
DROP TABLE `blogs`;

-- DropTable
DROP TABLE `jobs`;

-- DropTable
DROP TABLE `massages`;

-- DropTable
DROP TABLE `notices`;

-- DropTable
DROP TABLE `services`;

-- DropTable
DROP TABLE `subscribers`;

-- DropTable
DROP TABLE `teams`;

-- DropTable
DROP TABLE `web_reviews`;
