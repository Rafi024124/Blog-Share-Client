import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper();

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [sorting, setSorting] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://blog-share-server.vercel.app/blogs")
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

  const handleDetails = (id) => {
    navigate(`/blogDetails/${id}`);
  };

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
        cell: ({ row, getValue }) => (
          <span
            onClick={() => handleDetails(row.original._id)}
            className="text-[#AA98A9] hover:underline cursor-pointer font-semibold"
            title="View Blog Details"
          >
            {getValue()}
          </span>
        ),
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
      className="p-6 min-h-screen max-w-7xl mx-auto mt-2 mb-2"
      style={{
        background: "#2A2540", // dark purple background
      }}
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#AA98A9" }} // soft purple heading
      >
        🌟 Featured Blogs (Top 10 by Word Count)
      </h2>

      <div
        className="overflow-x-auto rounded-lg shadow-md"
        style={{ border: "1.5px solid #AA98A9" }} // soft purple border
      >
        <table
          className="table w-full"
          style={{ borderCollapse: "separate", borderSpacing: "0 12px" }}
        >
          <thead
            style={{
              backgroundColor: "#3B3655", // darker purple header bg
              color: "#AA98A9",
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
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                  backgroundColor: "#2E2A45", // slightly lighter dark purple rows
                  color: "#C1B8D4", // lighter soft purple text
                  boxShadow: "0 1px 3px rgba(170, 152, 169, 0.4)",
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
