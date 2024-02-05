import { z } from 'zod';

export const SCHEMA_CREATE_MUMBLE = z.object({
  text: z
    .string({
      required_error: 'Text wird benötigt',
    })
    .min(1, { message: 'Text wird benötigt' }),
  media: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: 'Bild ist zu gross',
    })
    .optional(),
});

export const validateCreateMumble = (formData: FormData) => {
  const media = formData.get('media');
  if (media instanceof File && media.size === 0) {
    formData.delete('media');
  }
  const formValues = Object.fromEntries(formData.entries());
  return SCHEMA_CREATE_MUMBLE.safeParse(formValues);
};
