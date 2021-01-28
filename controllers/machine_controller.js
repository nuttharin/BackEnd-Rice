// INSERT INTO "public"."tb_machine"("id_owner", "id_subdistrict", "machine_code", "date_create") 
// VALUES (1, 1, 'NO11111', '2021-01-26 11:23:05') RETURNING *




// INSERT INTO "public"."tb_machine_rice"("id_machine", "id_rice_type", "volume", "date_create") 
// VALUES (1, 1, 100, '2021-01-26 11:26:58') RETURNING *

// UPDATE "public"."tb_machine_rice" SET "volume" = 101, "date_modify" = '2021-01-26 11:30:21' WHERE "id" = 1