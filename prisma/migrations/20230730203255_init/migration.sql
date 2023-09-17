-- CreateTable
CREATE TABLE "Laboratory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "coordinates" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "social_network" TEXT NOT NULL,
    "link_website" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "add_info" TEXT NOT NULL,
    "working_hours" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "types_users" TEXT NOT NULL,

    CONSTRAINT "Laboratory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Laboratory_name_key" ON "Laboratory"("name");
