import { TipePakaian } from "@prisma/client";
import { db } from "../utilities/db";
import { NotFoundError } from "elysia";

type AmbigousResponse = {
  success: boolean;
};

class Lemari {
  public async ListPakaianById(id: string) {
    const existingPakaian = await db.pakaian.findUnique({
      where: {
        id,
      },
    });

    if (!existingPakaian) throw new NotFoundError("Pakaian Not Found");

    return existingPakaian;
  }

  public async ListPakaian() {
    const result = await db.pakaian.findMany({});

    return result;
  }

  public async BuatPakaian(
    name: string,
    jumlah: number,
    warna: string,
    type: TipePakaian
  ) {
    return await db.pakaian.create({
      data: {
        name,
        jumlah,
        warna,
        type,
      },
    });
  }

  public async HapusPakaian(id: string) {
    await db.pakaian.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
    } satisfies AmbigousResponse;
  }

  public async UpdatePakaian(
    id: string,
    name?: string,
    jumlah?: number,
    warna?: string,
    type?: TipePakaian
  ) {
    const existingPakaian = await db.pakaian.findUnique({
      where: {
        id,
      },
    });

    if (!existingPakaian) throw new NotFoundError("Pakaian Not Found");

    return await db.pakaian.update({
      where: {
        id,
      },
      data: {
        name: name ?? existingPakaian.name,
        jumlah: jumlah ?? existingPakaian.jumlah,
        warna: warna ?? existingPakaian.warna,
        type: type ?? existingPakaian.type,
      },
    });
  }
}

export const lemari = new Lemari();
