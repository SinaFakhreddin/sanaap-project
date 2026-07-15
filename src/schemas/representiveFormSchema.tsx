import { z } from "zod";

export const insuranceTypeSchema = z.enum(["real", "legal"]);

export type InsuranceType = z.infer<typeof insuranceTypeSchema>;

const baseSchema = z.object({
  agencyCode: z.string().trim().min(1, "کد نمایندگی الزامی است"),
  province: z.string().trim().min(1, "استان را انتخاب کنید"),
  city: z.string().trim().min(1, "شهر را انتخاب کنید"),
  address: z.string().trim().min(5, "آدرس کوتاه است"),
  branch: z.string().trim().min(1, "شعبه را انتخاب کنید"),
  cityNumberCode: z
    .string()
    .trim()
    .min(1, "کد شهر الزامی است")
    .max(4, "کد معتبر نیست"),
  phoneNumber: z.string(),
  // .regex(/^0\d{7,}$/, "شماره تلفن باید با ۰ شروع شود و حداقل ۸ رقم باشد"),
});

const realSchema = baseSchema.extend({
  insuranceType: z.literal("real"),
});

const legalSchema = baseSchema.extend({
  insuranceType: z.literal("legal"),
  Name: z.string().trim().min(3, "نام شرکت کوتاه است").optional(),
});

export const agencySchema = z.discriminatedUnion("insuranceType", [
  realSchema,
  legalSchema,
]);

export type AgencyForm = z.infer<typeof agencySchema>;
