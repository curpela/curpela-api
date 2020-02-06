# Migration `20200114015333`

This migration has been generated by Skyelar Carroll at 1/14/2020, 1:53:33 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."PostLike" DROP COLUMN "post",
ADD COLUMN "post" text NOT NULL  REFERENCES "public"."Post"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."PostComment" DROP COLUMN "post",
ADD COLUMN "post" text NOT NULL  REFERENCES "public"."Post"("id") ON DELETE RESTRICT;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200114000942..20200114015333
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource postgresql {
     provider = "postgresql"
-    url = "***"
+    url      = env("DB_URL")
 }
 generator photon {
     provider = "photonjs"
@@ -52,14 +52,16 @@
 model PostLike {
     id      String @default(cuid()) @id
     likedBy User
+    post    Post
 }
 model PostComment {
     id      String @default(cuid()) @id
     comment String
     author  User
+    post    Post
 }
 model Follower {
     id        String @default(cuid()) @id
```

