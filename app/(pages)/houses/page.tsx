"use client";

import * as React from "react";
import { useMemo } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Home, PackageCheck, PackageX, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetData } from "@/lib/api-request";
import Link from "next/link";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */

type House = {
    id: string;
    houseNumber: number;
    name: string;
    type: "BROODER" | "GROWER" | "LAYER";
    runningBatch?: {
        batchId: string;
    } | null;
};

/* ---------------------------------- */
/* Page */
/* ---------------------------------- */

export default function HousesPage() {
    const { data, isFetching } = useGetData("/houses/fetch");

    const houses: House[] = (data as any)?.data ?? [];

    /* ---------- KPI ---------- */

    const total = houses.length;
    const full = houses.filter((h) => h.runningBatch).length;
    const empty = total - full;

    /* ---------- Columns ---------- */

    const columns = useMemo<ColumnDef<House>[]>(
        () => [
            {
                accessorKey: "houseNumber",
                header: "House #",
                cell: ({ row }) => (
                    <span className="font-medium">
                        {row.original.houseNumber}
                    </span>
                ),
            },
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "type",
                header: "Type",
                cell: ({ row }) => (
                    <Badge variant="outline">{row.original.type}</Badge>
                ),
            },
            {
                id: "status",
                header: "Status",
                cell: ({ row }) => {
                    const isFull = Boolean(row.original.runningBatch);
                    return (
                        <Badge variant={isFull ? "default" : "secondary"}>
                            {isFull ? "Full" : "Empty"}
                        </Badge>
                    );
                },
            },
            {
                id: "batch",
                header: "Running Batch",
                cell: ({ row }) => row.original.runningBatch?.batchId ?? "—",
            },
        ],
        []
    );

    const table = useReactTable({
        data: houses,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    /* ---------------------------------- */

    return (
        <div className="container mx-auto px-4 py-6 space-y-6">
            {/* ---------- Header ---------- */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Houses</h1>
                    <p className="text-sm text-muted-foreground">
                        Status and assignment of all houses
                    </p>
                </div>

                <Link href={"/houses/new"}>
                    <Button variant={"outline"}>
                        <Plus /> House
                    </Button>
                </Link>
            </div>

            {/* ---------- KPI Cards ---------- */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <KpiCard title="Total Houses" value={total} icon={Home} />
                <KpiCard title="Full Houses" value={full} icon={PackageCheck} />
                <KpiCard title="Empty Houses" value={empty} icon={PackageX} />
            </div>

            {/* ---------- Table ---------- */}
            <Card>
                <CardHeader>
                    <CardTitle>All Houses</CardTitle>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <TableBody>
                                {!isFetching &&
                                    table.getRowModel().rows.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="text-center text-muted-foreground"
                                            >
                                                No houses found
                                            </TableCell>
                                        </TableRow>
                                    )}

                                {table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

/* ---------------------------------- */
/* KPI Card */
/* ---------------------------------- */

function KpiCard({
    title,
    value,
    icon: Icon,
}: {
    title: string;
    value: number;
    icon: React.ElementType;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
