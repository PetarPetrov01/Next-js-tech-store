import { validateRequestBody } from "zod-express";
import { z } from "zod";

const uploadImageBody = z.object({
  image: z
    .instanceof(File)
    .refine((file) => /jpg|png|jpeg/.test(file.name.toLocaleLowerCase()), {
      message: "File type not allowed",
    })
    .refine(
      (file) => /image\/png|image\/jpeg|image\/gif|image\/webp/.test(file.type),
      { message: "This file is not allowed" }
    )
    .refine((file) => file.size <= 1024 * 200, {
      message: "File is too large",
    }),
});

const uploadValidation = validateRequestBody(uploadImageBody, {
  sendErrors(errors, res) {
    const errs = errors[0].errors.issues.map((err) => {
      return {
        //consider adding path
        message: err.message,
      };
    });

    res.status(400).json(errs);
  },
});

export default uploadValidation;
