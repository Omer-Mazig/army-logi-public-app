import { z } from "zod";

// Equipment section schema
export const EquipmentSchema = z.object({
  personalWeaponNumber: z.string().optional(),
  personalSightsNumber: z.string().optional(),
  nightVisionNumber: z.string().optional(),
  binocularsNumber: z.string().optional(),
  hasCompass: z.boolean().optional(),
});
export type Equipment = z.infer<typeof EquipmentSchema>;

// Medical supplies schema
export const MedicalSuppliesSchema = z.object({
  actiq: z.number().min(0).optional(),
  morphine: z.number().min(0).optional(),
  midazolam: z.number().min(0).optional(),
  ketamine50mg: z.number().min(0).optional(),
  ketamine10mg: z.number().min(0).optional(),
});
export type MedicalSupplies = z.infer<typeof MedicalSuppliesSchema>;

// Full report schema for submission
export const ReportSchema = z.object({
  id: z.string().optional(),
  personalNumber: z.string(),
  equipment: EquipmentSchema,
  medicalSupplies: MedicalSuppliesSchema,
  timestamp: z.date(),
  submittedAt: z.date().optional(),
});
export type Report = z.infer<typeof ReportSchema>;

export const ReportFormDataSchema = z.object({
  personalNumber: z.string(),
  equipment: EquipmentSchema,
  medicalSupplies: MedicalSuppliesSchema,
});
export type ReportFormData = z.infer<typeof ReportFormDataSchema>;
