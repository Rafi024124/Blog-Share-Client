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
        enableSorting: false,
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
    <div
      className="p-6 min-h-screen"
      style={{
        background: "#F0F0FF", // subtle very light periwinkle background
      }}
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#7F7FCC" }} // muted medium periwinkle for heading
      >
        🌟 Featured Blogs (Top 10 by Word Count)
      </h2>

      <div
        className="overflow-x-auto rounded-lg shadow-md"
        style={{ border: "1.5px solid #CCCCFF" }} // border with #CCCCFF
      >
        <table
          className="table w-full"
          style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
        >
          <thead
            style={{
              backgroundColor: "#D6D6FF", // lighter periwinkle header
              color: "#7F7FCC",
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="px-4 py-3 cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ userSelect: "none", fontWeight: "600" }}
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
              <tr
                key={row.id}
                className="rounded-lg"
                style={{
                  backgroundColor: "#CCCCFF", // your requested pastel periwinkle row background
                  color: "#4B4B80", // darker periwinkle text
                  boxShadow: "0 1px 3px rgba(204, 204, 255, 0.5)",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3"
                    style={{ borderBottom: "none" }}
                  >
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
