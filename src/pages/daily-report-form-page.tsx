import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users,
  ClipboardCheck,
  Shield,
  Pill,
} from "lucide-react";
import { toast } from "sonner";

import { getPersonalNumbers } from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReportFormDataSchema, type ReportFormData } from "@/lib/types";

export function DailyReportFormPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch soldiers
  const {
    data: personalNumbers,
    isLoading: personalNumbersLoading,
    error: personalNumbersError,
  } = useQuery({
    queryKey: ["soldiers"],
    queryFn: getPersonalNumbers,
  });

  console.log("personalNumbers", personalNumbers);

  // Form setup
  const form = useForm<ReportFormData>({
    resolver: zodResolver(ReportFormDataSchema),
    defaultValues: {
      personalNumber: "",
      equipment: {
        personalWeaponNumber: "",
        personalSightsNumber: "",
        nightVisionNumber: "",
        binocularsNumber: "",
        hasCompass: false,
      },
      medicalSupplies: {
        actiq: undefined,
        morphine: undefined,
        midazolam: undefined,
        ketamine50mg: undefined,
        ketamine10mg: undefined,
      },
    },
  });

  // Check if personal number exists
  const personalNumberValue = form.watch("personalNumber");
  const isValidPersonalNumber = personalNumbers?.some(
    (personalNumber) => String(personalNumber) === personalNumberValue
  );
  const showPersonalNumberError =
    personalNumberValue && !personalNumbersLoading && !isValidPersonalNumber;

  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: async (data: ReportFormData) => {
      console.log("data", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success("דיווח נשלח בהצלחה");
      // Reset form after a delay to show success state
      setTimeout(() => {
        form.reset();
        setIsSubmitted(false);
      }, 3000);
    },
    onError: (error) => {
      toast.error("שגיאה בשליחת הדיווח. נא לנסות שוב."); // "Error sending report. Please try again."
      console.error("Submit error:", error);
    },
  });

  const onSubmit = (data: ReportFormData) => {
    submitMutation.mutate(data);
  };

  // Error state
  if (personalNumbersError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-8 w-8 text-destructive mb-4" />
            <p
              className="text-destructive text-center"
              dir="rtl"
            >
              שגיאה בטעינת הנתונים. נא לרענן את הדף.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-green-200">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
            <h2
              className="text-2xl font-bold text-green-800 mb-2"
              dir="rtl"
            >
              תודה!
            </h2>
            <p
              className="text-green-700 text-center leading-relaxed"
              dir="rtl"
            >
              הדיווח היומי שלך נקלט בהצלחה.
              <br />
              הטופס יתאפס בעוד רגע.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ClipboardCheck className="h-8 w-8 text-blue-600" />
            <h1
              className="text-3xl font-bold text-slate-800"
              dir="rtl"
            >
              דיווח יומי
            </h1>
          </div>
          <p
            className="text-slate-600 max-w-md mx-auto leading-relaxed"
            dir="rtl"
          >
            דווח על מצב הציוד והסמים. כל השדות למעט השם אופציונליים.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle
                  className="flex items-center gap-2"
                  dir="rtl"
                >
                  <Shield className="h-5 w-5" />
                  ארמו״ן
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="equipment.personalWeaponNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">מס׳ נשק אישי</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="הכנס מספר נשק..."
                          dir="rtl"
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="equipment.personalSightsNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">מס׳ כוונות אישית</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="הכנס מספר כוונות..."
                          dir="rtl"
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="equipment.nightVisionNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">מס׳ אמר״ל</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="הכנס מספר אמר״ל..."
                          dir="rtl"
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="equipment.binocularsNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">מס׳ משקפת</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="הכנס מספר משקפת..."
                          dir="rtl"
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="equipment.hasCompass"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-end space-x-3 space-y-0 space-x-reverse">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel dir="rtl">מצפן (יש או אין)</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle
                  className="flex items-center gap-2"
                  dir="rtl"
                >
                  <Pill className="h-5 w-5" />
                  סמים
                </CardTitle>
                <CardDescription dir="rtl">הכנס כמות</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="medicalSupplies.actiq"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">אקטיק</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="כמות..."
                          dir="rtl"
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medicalSupplies.morphine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">מורפין</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="כמות..."
                          dir="rtl"
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medicalSupplies.midazolam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">מידזולם</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="כמות..."
                          dir="rtl"
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medicalSupplies.ketamine50mg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">קטאמין 50 מ״ג</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="כמות..."
                          dir="rtl"
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="medicalSupplies.ketamine10mg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">קטאמין 10 מ״ג</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="כמות..."
                          dir="rtl"
                          className="text-right"
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="relative">
              <CardHeader>
                <CardTitle
                  className="flex items-center gap-2"
                  dir="rtl"
                >
                  <Users className="h-5 w-5" />
                  פרטים אישיים
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="personalNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel dir="rtl">מס׳ אישי</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="numeric"
                          placeholder="הכנס מספר אישי..."
                          dir="rtl"
                          className="text-right"
                          disabled={personalNumbersLoading}
                        />
                      </FormControl>
                      <FormMessage dir="rtl" />
                      {showPersonalNumberError && (
                        <p
                          className="text-sm text-red-500 mt-1"
                          dir="rtl"
                        >
                          מספר אישי לא קיים במערכת
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </CardContent>

              {/* Loading Overlay */}
              {personalNumbersLoading && (
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xs flex items-center justify-center rounded-lg">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    <p
                      className="text-slate-600 font-medium"
                      dir="rtl"
                    >
                      טוען מספרים אישיים...
                    </p>
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg"
                  disabled={
                    submitMutation.isPending ||
                    personalNumbersLoading ||
                    showPersonalNumberError ||
                    !personalNumberValue
                  }
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      שולח דיווח...
                    </>
                  ) : (
                    "שלח דיווח"
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
