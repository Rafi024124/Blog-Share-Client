import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a, b) => {
            const aCount = a.longDescription?.split(/\s+/).length || 0;
            const bCount = b.longDescription?.split(/\s+/).length || 0;
            return bCount - aCount;
          })
          .slice(0, 10);
        setBlogs(sorted);
      });
  }, []);

  const data = useMemo(() => blogs, [blogs]);

  const columns = useMemo(
    () => [
      columnHelper.accessor((row, index) => index + 1, {
        id: "index",
        header: "#",
        cell: (info) => info.getValue(),
        enableSorting: false, // index column shouldn't be sortable
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("author", {
        header: "Author",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor(
        (row) => row.longDescription?.split(/\s+/).length || 0,
        {
          id: "wordCount",
          header: "Word Count",
          cell: (info) => info.getValue(),
          enableSorting: true,
        }
      ),
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🌟 Featured Blogs (Top 10 by Word Count)</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="px-4 py-2 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {isSorted === "asc" && " 🔼"}
                      {isSorted === "desc" && " 🔽"}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
