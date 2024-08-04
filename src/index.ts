import { Elysia, t } from "elysia";
import { lemari } from "./handlers/lemari";
import { TipePakaian } from "@prisma/client";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/pakaian", async () => await lemari.ListPakaian())
  .get("/pakaian/:id", async ({ params }) => {
    if (params.id) {
      return await lemari.ListPakaianById(params.id!);
    }
  })
  .post(
    "/pakaian",
    async ({ body }) =>
      await lemari.BuatPakaian(
        body.name,
        body.jumlah,
        body.warna,
        body.type as TipePakaian
      ),
    {
      body: t.Object({
        name: t.String(),
        type: t.String({ examples: ["FORMAL", "NONFORMAL"] }),
        jumlah: t.Number(),
        warna: t.String(),
      }),
    }
  )
  .put(
    "/pakaian/:id",
    async ({ params, body }) => {
      return await lemari.UpdatePakaian(
        params.id,
        body.name!,
        body.jumlah!,
        body.warna!,
        body.type as TipePakaian
      );
    },
    {
      body: t.Object({
        name: t.String(),
        type: t.String({ examples: ["FORMAL", "NONFORMAL"] }),
        jumlah: t.Number(),
        warna: t.String(),
      }),
    }
  )
  .delete(
    "/pakaian/:id",
    async ({ params }) => await lemari.HapusPakaian(params.id)
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
