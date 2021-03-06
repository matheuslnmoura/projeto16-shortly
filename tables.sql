--USERS TABLE
CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()        
)

--SESSIONS TABLE 
CREATE TABLE "sessions"(
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "token" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "isValid" BOOLEAN NOT NULL DEFAULT TRUE
)

--URLs TABLE
CREATE TABLE "urls"(
    "id" SERIAL PRIMARY KEY,
    "shortUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "visitCount" INTEGER NOT NULL DEFAULT 0
)

--DELETED URLs TABLE
CREATE TABLE "deletedUrls"(
    "id" SERIAL PRIMARY KEY,
    "shortUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "visitCount" INTEGER NOT NULL DEFAULT 0
)

