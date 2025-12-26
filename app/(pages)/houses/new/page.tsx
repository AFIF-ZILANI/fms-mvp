"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { addHouseSchema, AddHouseSchema } from "@/schemas/house.schema";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

/* ---------------------------------- */

enum HouseType {
    BROODER = "BROODER",
    GROWER = "GROWER",
    LAYER = "LAYER",
}

/* ---------------------------------- */

export default function Page() {
    const form = useForm<AddHouseSchema>({
        resolver: zodResolver(addHouseSchema),
        defaultValues: {
            name: "",
            type: undefined,
            houseNumber: 0,
        },
    });

    const onSubmit = (values: AddHouseSchema) => {
        console.log(values);
        // mutate(values)
    };

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Add new house</CardTitle>
                <CardDescription>
                    Provide details to register a new house
                </CardDescription>
            </CardHeader>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* House Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>House Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="House A" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* House Type */}
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>House Type</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select house type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(HouseType).map((val) => (
                                            <SelectItem key={val} value={val}>
                                                {val}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* House Number */}
                    <FormField
                        control={form.control}
                        name="houseNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>House Number</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <CardFooter>
                        <Button type="submit">Save</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
