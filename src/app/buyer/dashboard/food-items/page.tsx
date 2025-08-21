// 'use client';
// import ProductCard, { ProductCardSkeleton } from "@/components/core/prod-card";
// import { Button } from "@/components/ui/button";
// import { useGetAllFoodItemsQuery, useGetsellerFooditemsQuery } from "@/redux/features/Seller/SellerApi";
// import { PlusIcon, Frown } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// export default function Page() {
//   const [page, setPage] = React.useState(1);
//   const per_page = 8;

//   // Using the RTK Query hook to fetch data
//   const { data: response, isLoading, isError, refetch } = useGetsellerFooditemsQuery({ page, per_page });
//   console.log('response', response);

//   // Extracting pagination data and items array
//   const foodData = response?.data;
//   const foodItems = foodData?.data || [];
//   console.log('foodItems', foodItems);

//   // Handler for changing pages
//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   // Loading state
//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 !pb-12">
//         {Array.from({ length: per_page }).map((_, i) => (
//           <ProductCardSkeleton key={i} />
//         ))}
//       </div>
//     );
//   }

//   // Error state
//   if (isError) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-red-500">Failed to load food items. Please try again later.</p>
//       </div>
//     )
//   }

//   return (
//     <>
//       {foodItems.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 !pb-12">
//           {foodItems.map((item: any) => (
//             <ProductCard refetch={refetch} key={item.id} item={item} control activer />
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-50 rounded-lg">
//           <Frown className="w-16 h-16 text-gray-400 mb-4" />
//           <h3 className="text-xl font-semibold text-gray-700">No Food Items Found</h3>
//           <p className="text-gray-500 mt-2">Looks like you haven't added any food items yet.</p>
//         </div>
//       )}

//       {/* Pagination Controls */}
//       {foodData && foodData.total > foodData.per_page && (
//         <div className="flex items-center justify-between mt-8">
//           <span className="text-sm text-muted-foreground">
//             Showing {foodData.from} to {foodData.to} of {foodData.total} results
//           </span>
//           <div className="flex gap-2">
//             <Button
//               onClick={() => handlePageChange(page - 1)}
//               disabled={!foodData.prev_page_url}
//               variant="outline"
//             >
//               Previous
//             </Button>
//             <Button
//               onClick={() => handlePageChange(page + 1)}
//               disabled={!foodData.next_page_url}
//               variant="outline"
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       )}

//       <Button className="fixed bottom-4 right-4" asChild>
//         <Link href={"/seller/dashboard/food-items/add"}>
//           <PlusIcon className="mr-2" /> Add Food Item
//         </Link>
//       </Button>
//     </>
//   );
// }

'use client';

import ProductCard, { ProductCardSkeleton } from "@/components/core/prod-card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useGetbuyerFooditemsQuery, useGetsellerFooditemsQuery } from "@/redux/features/Seller/SellerApi";
import { PlusIcon, Frown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  const [page, setPage] = React.useState(1);
  const per_page = 8;
  const { data: response, isLoading, refetch } = useGetsellerFooditemsQuery({ page, perPage: per_page });
  const foodData = response?.data;
  const foodItems = foodData?.data || [];
  const totalPages = foodData?.last_page || 1;

  // Handler for changing pages
  const handlePageChange = (newPage: number) => {
    // Prevent going to a non-existent page
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Loading state skeleton UI
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 !pb-12">
        {Array.from({ length: per_page }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }



  // Main component render
  return (
    <>
      {foodItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 !pb-12">
          {foodItems.map((item: any) => (
            <ProductCard isbuyer refetch={refetch} key={item.id} item={item} control activer />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-gray-50 rounded-lg">
          <Frown className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">No Food Items Found</h3>
          <p className="text-gray-500 mt-2">Looks like you haven't added any food items yet.</p>
        </div>
      )}

      {/* ============== START: PAGINATION CONTROLS ============== */}
      {foodData && totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          {/* Showing results count */}
          <span className="text-sm text-muted-foreground">
            Showing <strong>{foodData.from}</strong> to <strong>{foodData.to}</strong> of <strong>{foodData.total}</strong> results
          </span>

          {/* Pagination component */}
          <Pagination>
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page - 1);
                  }}
                  className={!foodData.prev_page_url ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>

              {/* Page Number Buttons (example for simplicity, can be made more dynamic) */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }}
                    isActive={page === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page + 1);
                  }}
                  className={!foodData.next_page_url ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
      {/* ============== END: PAGINATION CONTROLS ============== */}


      <Button className="fixed bottom-4 right-4" asChild>
        <Link href={"/buyer/dashboard/food-items/add"}>
          <PlusIcon className="mr-2" /> Add Food Item
        </Link>
      </Button>
    </>
  );
}