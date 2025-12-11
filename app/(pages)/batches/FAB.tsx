"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import { on } from "events";

export default function FAB() {
  const [open, setOpen] = useState(false);

  const data = [
    {
      label: "Record Mortality",
      onClick: () => alert("Record Mortality clicked"),
    },
    {
      label: "Record Feed Usage",
      onClick: () => alert("Record Feed Usage clicked"),
    },
    {
      label: "Add Batch",
      onClick: () => alert("Add Batch clicked"),
    },
    {
      label: "Record FCR",
      onClick: () => alert("Record FCR clicked"),
    },
    {
      label: "Record Weight",
      onClick: () => alert("Record Weight clicked"),
    },
    {
      label: "Update SD",
      onClick: () => alert("Add Batch clicked"),
    },
  ];

  return (
    <>
      {/* MENU */}
      <div
        className={`fixed bottom-20 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-5 scale-0 pointer-events-none"
        }`}
      >
        {data.map((item, index) => (
          <Button
            key={index}
            className="w-36 shadow-lg" // <-- consistent size
            size="sm"
            variant="secondary"
            onClick={item.onClick}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* TOGGLE BUTTON */}
      <Button
        size="icon-lg"
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-6 rounded-full w-12 h-12 shadow-xl active:scale-95 transition"
      >
        <Plus
          className={open ? "rotate-45 duration-300" : "rotate-0 duration-300"}
        />
      </Button>
    </>
  );
}
