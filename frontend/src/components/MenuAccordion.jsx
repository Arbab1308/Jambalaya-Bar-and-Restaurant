import React, { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { Leaf, Search } from "lucide-react";

const formatINR = (value) => {
  if (!value) return "Market / Ask";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
};

export default function MenuAccordion({ categories }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;

    return categories
      .map((c) => {
        const items = c.items.filter((i) => i.name.toLowerCase().includes(q));
        return { ...c, items };
      })
      .filter((c) => c.items.length > 0);
  }, [categories, query]);

  const totalItems = useMemo(
    () => categories.reduce((acc, c) => acc + c.items.length, 0),
    [categories]
  );

  return (
    <div className="grid gap-5">
      <Card className="p-4 border-black/10 bg-white/20 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div>
            <p className="font-serif text-2xl text-slate-900">Full Menu</p>
            <p className="text-sm text-slate-700">
              Search {totalItems} dishes across categories.
            </p>
          </div>

          <div className="relative md:w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: pizza, cafreal, noodles…"
              className="pl-9 bg-white/30 border-black/15"
            />
          </div>
        </div>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {filtered.map((cat) => (
          <AccordionItem
            key={cat.id}
            value={cat.id}
            className="border-black/10"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-col items-start text-left">
                <span className="font-serif text-xl text-slate-900">
                  {cat.title}
                </span>
                <span className="text-sm text-slate-700">{cat.subtitle}</span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="grid gap-3 pb-3">
                {cat.items.map((item, idx) => (
                  <div
                    key={`${cat.id}-${idx}-${item.name}`}
                    className={cn(
                      "flex items-start justify-between gap-4 rounded-lg",
                      "bg-white/25 border border-black/10 px-4 py-3",
                      "transition-colors duration-200 hover:bg-white/40"
                    )}
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium text-slate-900 truncate">
                          {item.name}
                        </p>
                        {item.veg && (
                          <Badge
                            variant="secondary"
                            className="bg-black text-white border-black"
                          >
                            <Leaf className="mr-1 h-3.5 w-3.5" />
                            Veg
                          </Badge>
                        )}
                      </div>
                      {item.meta && (
                        <p className="text-xs text-slate-700 mt-1">
                          {item.meta}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-slate-950">
                        {formatINR(item.price)}
                      </p>
                    </div>
                  </div>
                ))}

                {cat.items.length === 0 && (
                  <p className="text-sm text-slate-700">
                    No matching items in this category.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-black/10 bg-white/25 p-6">
            <p className="font-medium text-slate-900">No results</p>
            <p className="text-sm text-slate-700 mt-1">
              Try a different keyword (example: “goan”, “pizza”, “prawn”).
            </p>
          </div>
        )}
      </Accordion>

      <p className="text-xs text-slate-700">
        Prices shown as listed. Availability may vary. Vegetarian items are marked.
      </p>
    </div>
  );
}
