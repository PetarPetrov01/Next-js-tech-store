import { z } from "zod";

export const ImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => /jpg|png|jpeg/.test(file.name.toLocaleLowerCase()), {
      message: "File type not allowed",
    })
    .refine(
      (file) => /image\/png|image\/jpeg|image\/gif|image\/webp/.test(file.type),
      { message: "This file is not allowed" }
    )
    .refine((file) => file.size <= 1024 * 1024 * 5, {
      message: "File is too large",
    }),
});

export const ImagesSchema = z.object({
  images: z.array(ImageSchema).nonempty("No images provided"),
});
