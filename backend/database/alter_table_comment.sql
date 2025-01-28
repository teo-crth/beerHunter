-- Ajouter les clés étrangères à "user_comment"
ALTER TABLE "user_comment"
  ADD CONSTRAINT "user_comment_ibfk_3" FOREIGN KEY ("comment_image_id") REFERENCES "comment_image" ("id");

-- Ajouter les clés étrangères à "comment_image"
ALTER TABLE "comment_image"
  ADD CONSTRAINT "comment_image_ibfk_1" FOREIGN KEY ("user_comment_id") REFERENCES "user_comment" ("id");