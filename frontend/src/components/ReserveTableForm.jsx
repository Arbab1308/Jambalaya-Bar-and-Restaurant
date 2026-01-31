import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { CalendarDays, Phone, Users } from "lucide-react";

const STORAGE_KEY = "ghbk_reservations_v1";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z
    .string()
    .min(8, "Please enter a valid phone number")
    .max(16, "Please enter a valid phone number"),
  guests: z
    .string()
    .min(1, "Guests required")
    .refine((v) => Number(v) >= 1 && Number(v) <= 20, "1–20 guests"),
  date: z.date({ required_error: "Pick a date" }),
  time: z.string().min(1, "Pick a time")
});

const timeSlots = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "5:30 PM",
  "6:30 PM",
  "7:30 PM",
  "8:30 PM",
  "9:30 PM",
  "10:30 PM"
];

function saveReservation(payload) {
  const raw = localStorage.getItem(STORAGE_KEY);
  const current = raw ? JSON.parse(raw) : [];
  current.unshift(payload);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current.slice(0, 30)));
}

export default function ReserveTableForm({
  variant = "default",
  className = "",
  onSuccess
}) {
  const defaultValues = useMemo(
    () => ({
      name: "",
      phone: "",
      guests: "2",
      date: undefined,
      time: ""
    }),
    []
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues
  });

  const submit = (values) => {
    const reservation = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...values,
      dateIso: values.date.toISOString()
    };

    saveReservation(reservation);
    form.reset(defaultValues);
    onSuccess?.(reservation);
  };

  return (
    <Card
      className={cn(
        "border-black/10 bg-white/20 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.18)]",
        variant === "hero" && "bg-white/25 border-white/20",
        className
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="font-serif text-2xl tracking-tight text-slate-900">
          Reserve a Table
        </CardTitle>
        <p className="text-sm text-slate-700 leading-relaxed">
          Quick hold for the night — we’ll confirm by call/WhatsApp.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-slate-800/80">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone / WhatsApp</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
              <Input
                id="phone"
                className="pl-9"
                placeholder="+91…"
                inputMode="tel"
                {...form.register("phone")}
              />
            </div>
            {form.formState.errors.phone && (
              <p className="text-xs text-slate-800/80">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start bg-white/30 border-black/15 text-slate-900 hover:bg-white/45",
                      !form.watch("date") && "text-slate-700"
                    )}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {form.watch("date")
                      ? form.watch("date").toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("date")}
                    onSelect={(d) => form.setValue("date", d, { shouldValidate: true })}
                    disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.date && (
                <p className="text-xs text-slate-800/80">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Time</Label>
              <Select
                value={form.watch("time")}
                onValueChange={(v) => form.setValue("time", v, { shouldValidate: true })}
              >
                <SelectTrigger className="bg-white/30 border-black/15">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.time && (
                <p className="text-xs text-slate-800/80">
                  {form.formState.errors.time.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Guests</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
              <Input
                className="pl-9"
                placeholder="2"
                inputMode="numeric"
                {...form.register("guests")}
              />
            </div>
            {form.formState.errors.guests && (
              <p className="text-xs text-slate-800/80">
                {form.formState.errors.guests.message}
              </p>
            )}
          </div>

          <div className="pt-1 grid gap-2">
            <Button
              type="submit"
              className="w-full bg-slate-950 text-white hover:bg-slate-900"
            >
              Confirm Request
            </Button>
            <p className="text-xs text-slate-700 leading-relaxed">
              By submitting, you agree to receive a confirmation call/WhatsApp.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
