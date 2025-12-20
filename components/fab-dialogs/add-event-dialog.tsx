"use client";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus, RefreshCcw, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { AddHouseEvent, addHouseEventSchema } from "@/schemas/event.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetData, usePostData } from "@/lib/api-request";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { EventTypeArr, UnitTypeArr } from "@/types/enum";

export function AddEventDialog() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const form = useForm<AddHouseEvent>({
        resolver: zodResolver(addHouseEventSchema),
    });

    /* ---------------- Data ---------------- */

    const { data: helperData } = useGetData("/get-data/batches-and-houses");

    const {
        mutate,
        isPending: submitIsPending,
        isSuccess,
        isError,
        error,
    } = usePostData("/create/record/event");

    const batches: { id: string; label: string }[] =
        (helperData as any)?.data?.batches ?? [];

    const houses: { id: number; label: string }[] =
        (helperData as any)?.data?.houses ?? [];
    console.log(batches);
    console.log(houses);

    /* ---------------- Effects ---------------- */

    useEffect(() => {
        if (isSuccess) {
            toast.success("House event saved successfully!");
            form.reset();
            setDialogOpen(false);
        }

        if (isError && error) {
            toast.error(error.message || "Failed to save house event");
        }

        // console.log()
    }, [isSuccess, isError, error, form]);

    /* ---------------- Submit ---------------- */

    const onSubmit = (values: AddHouseEvent) => {
        mutate(values);
    };

    const onError = (errors: unknown) => {
        console.log("VALIDATION ERRORS", errors);
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    size="sm"
                    className="w-[150px] shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80"
                    role="menuitem"
                >
                    <Plus className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium">House Event</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-background">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit, onError)}
                        className="w-full"
                    >
                        <DialogHeader>
                            <DialogTitle>Record House Event</DialogTitle>
                            <DialogDescription>
                                Log an operational or measurement event for a
                                specific batch and house
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 md:space-y-4">
                            {/* Batch */}
                            <FormField
                                control={form.control}
                                name="batchId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Batch *</FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select batch" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {batches.map((b) => (
                                                    <SelectItem
                                                        key={b.id}
                                                        value={b.id}
                                                    >
                                                        {b.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Active production batch
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* House */}
                            <FormField
                                control={form.control}
                                name="houseId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>House *</FormLabel>
                                        <Select
                                            value={
                                                field.value?.toString() ?? ""
                                            }
                                            onValueChange={(v) =>
                                                field.onChange(Number(v))
                                            }
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select house" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {houses.map((h) => (
                                                    <SelectItem
                                                        key={h.id}
                                                        value={h.id.toString()}
                                                    >
                                                        {h.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Physical house location
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* EventType */}
                            <FormField
                                control={form.control}
                                name="eventType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Type *</FormLabel>
                                        <Select
                                            value={
                                                field.value
                                                    ? field.value.toString()
                                                    : ""
                                            }
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Event Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {EventTypeArr.map(
                                                    (event, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={event}
                                                        >
                                                            {event}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            House where birds were weighed
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-7 gap-4">
                                <div className="col-span-4">
                                    {/* Event Quantity */}
                                    <FormField
                                        control={form.control}
                                        name="quantity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Event Quantity
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        inputMode="numeric"
                                                        placeholder="e.g. 100"
                                                        pattern="[0-9]*"
                                                        className="pr-12"
                                                        {...field}
                                                        value={
                                                            field.value || ""
                                                        }
                                                        onChange={(e) => {
                                                            const val =
                                                                e.target.value;
                                                            // Allow only digits
                                                            if (
                                                                /^\d*$/.test(
                                                                    val
                                                                )
                                                            ) {
                                                                field.onChange(
                                                                    val === ""
                                                                        ? undefined
                                                                        : Number(
                                                                              val
                                                                          )
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Enter the quantity related
                                                    to the selected event
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="col-span-3">
                                    {/* Unit */}
                                    <FormField
                                        control={form.control}
                                        name="unit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Unit *</FormLabel>
                                                <Select
                                                    value={
                                                        field.value
                                                            ? field.value.toString()
                                                            : ""
                                                    }
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select unit" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {UnitTypeArr.map(
                                                            (unit, index) => (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={unit}
                                                                >
                                                                    {unit}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    Quantity Unit
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Tip */}
                            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
                                <strong>Tip:</strong> Record events at the time
                                they occur. Never merge multiple days into one
                                entry, and always confirm the correct batch,
                                house, unit, and quantity before saving.
                            </div>
                        </div>

                        <DialogFooter className="grid grid-cols-2 gap-4 mt-4 md:mt-6">
                            {/* Form Reset */}
                            <Button
                                variant={"outline"}
                                onClick={() => form.reset()}
                                className="cursor-pointer"
                            >
                                <RefreshCcw />
                                Reset
                            </Button>
                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={submitIsPending}
                                className="cursor-pointer"
                            >
                                {submitIsPending ? <Spinner /> : <Save />}

                                {submitIsPending ? "Saving" : "Save Event"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
