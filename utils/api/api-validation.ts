import { z } from 'zod';

export const SCHEMA_MUMBLE = z.object({
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

export const validateMumble = (formData: FormData) => {
  const media = formData.get('media');
  if (media instanceof File && media.size === 0) {
    formData.delete('media');
  }
  const formValues = Object.fromEntries(formData.entries());
  return SCHEMA_MUMBLE.safeParse(formValues);
};

export const SCHEMA_USER = z.object({
  firstname: z
    .string({
      required_error: 'Vorname wird benötigt',
    })
    .min(1, { message: 'Vorname wird benötigt' }),
  lastname: z
    .string({
      required_error: 'Name wird benötigt',
    })
    .min(1, { message: 'Name wird benötigt' }),
  username: z
    .string({
      required_error: 'Benutzername wird benötigt',
    })
    .min(1, { message: 'Benutzername wird benötigt' }),
});

export const validateUser = (formData: FormData) => {
  const media = formData.get('media');
  if (media instanceof File && media.size === 0) {
    formData.delete('media');
  }
  const formValues = Object.fromEntries(formData.entries());
  return SCHEMA_USER.safeParse(formValues);
};
