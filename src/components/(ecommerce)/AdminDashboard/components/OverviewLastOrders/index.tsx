"use client";
"use no memo";
// TODO: delete use no memo after Tanstack react-table bump to react 19

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { stringify } from "qs-esm";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Order } from "@/payload-types";

export const columns: ColumnDef<Order>[] = [
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString();
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.orderDetails.status}</div>;
    },
  },
  {
    id: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-base hover:bg-payload-elevation-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown width={20} height={20} className="ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.original.shippingAddress.email}</div>,
  },
  {
    id: "amount",
    header: () => <div className="text-right hover:bg-payload-elevation-0">Amount</div>,
    cell: ({ row }) => {
      const amount = row.original.orderDetails.totalWithShipping;

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-payload-elevation-50">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-payload-elevation-0 bg-payload-elevation-0" />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/collections/orders/${order.id}`} className="no-underline">
                View order
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const select = {
  id: true,
  createdAt: true,
  orderDetails: {
    status: true,
    totalWithShipping: true,
  },
  shippingAddress: {
    email: true,
  },
};

export const OverviewLastOrders = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handlePaginationChange = (page: number) => {
    router.push(`?${createQueryString("page", page.toString())}`, { scroll: false });
  };

  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const stringifiedQuery = stringify(
      {
        select,
        limit: 5,
        page: currentPage,
        sort: "-createdAt",
      },
      { addQueryPrefix: true },
    );

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get<{ docs: Order[] }>(`/api/orders${stringifiedQuery}`, {
          withCredentials: true,
        });
        console.log(data);
        setData(data.docs);
      } catch (error) {
        console.log(error);
      }
    };
    void fetchOrders();
  }, [currentPage]);

  console.log(data);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <Card className="twp rounded-xl border border-payload-elevation-150 bg-transparent lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription className="text-base text-payload-elevation-900 opacity-75">
          You made 265 sales this month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="flex items-center py-4">
            <div className="no-twp field-type text">
              <input
                placeholder="Filter emails..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) => {
                  table.getColumn("email")?.setFilterValue(event.target.value);
                }}
                className="h-10 max-w-sm placeholder:text-payload-elevation-900 placeholder:opacity-75"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto border-payload-elevation-150 bg-payload-elevation-50 text-base hover:bg-payload-backgroundColor"
                >
                  Columns <ChevronDown className="ml-2" width={20} height={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-payload-elevation-50">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="cursor-pointer text-base capitalize hover:bg-payload-elevation-0"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-lg border border-payload-elevation-150">
            <Table className="text-base">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    className="border-payload-elevation-150 hover:bg-transparent"
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="text-payload-elevation-900 opacity-75">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      className="border-payload-elevation-150 hover:bg-payload-elevation-50"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-payload-elevation-150 hover:bg-payload-elevation-50">
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-base text-payload-elevation-900 opacity-75">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{" "}
              row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                className="border border-payload-elevation-150 bg-payload-elevation-50 text-base hover:bg-payload-elevation-0"
                size="sm"
                onClick={() => handlePaginationChange(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="border border-payload-elevation-150 bg-payload-elevation-50 text-base hover:bg-payload-elevation-0"
                size="sm"
                onClick={() => handlePaginationChange(currentPage + 1)}
                disabled={data.length < 5}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
