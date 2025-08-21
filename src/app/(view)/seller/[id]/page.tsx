"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfilePart from "@/components/core/profile-part";
import ProductCard from "@/components/core/prod-card";
import { useGetuserDetailsByIdQuery } from "@/redux/features/Seller/SellerApi";

// Define the base URL for your API storage to construct full image paths
const API_BASE_URL = "http://103.186.20.110:8123";

export default function Page() {
  const { id } = useParams();
  const [filter, setFilter] = useState(); // Manages tab state: 'active', 'inactive', 'all'

  // Derive the numeric status for the API call based on the selected filter.
  // RTK Query will omit the 'status' parameter if its value is undefined, which is
  // perfect for fetching 'all' items.
  const status = filter === "active" ? 1 : filter === "inactive" ? 0 : undefined;
  console.log('status', status);

  const { data, isLoading, isError } = useGetuserDetailsByIdQuery(
    { id, status },
    {
      // A good practice to prevent fetching if the ID isn't available yet.
      skip: !id,
    }
  );

  // --- Render States ---
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (isError || !data || !data.success) {
    return <div className="flex justify-center items-center h-screen">Error loading user profile.</div>;
  }


  const user = data?.data?.user;
  const food = data?.data?.food?.data;
  console.log('food', food);

  return (
    <div className="!py-12 mt-18 !px-4 md:!px-12 grid md:grid-cols-11 md:gap-6">
      <div className="md:col-span-3 border-2 rounded-lg !p-6 md:self-start">

        {user && <ProfilePart user={user} />}
      </div>

      <div className="!mt-12 md:!m-0 md:col-span-8">
        <div className="">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h2 className="text-3xl font-semibold">All Listing</h2>
            <div className="">
              {/* Set the default tab and link its state to the filter */}
              <Tabs defaultValue="active" onValueChange={(value: any) => setFilter(value)}>
                <TabsList className="">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
                {/* TabsContent is not needed here as the content is rendered outside the Tabs component */}
              </Tabs>
            </div>
          </div>

          {/* Map over the fetched food data to render ProductCards */}
          <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 gap-6 !mt-12">
            {food && food.length > 0 ? (
              food?.map((product: any) => (
                <ProductCard
                  key={product.id}
                  item={
                    {
                      id: product.id,
                      title: product.title,
                      description: product.description,
                      status: product.status,

                      delivery_option: product.delivery_option,
                      delivery_time: product.delivery_time,
                      ingredients: product.ingredients,
                      price: product.price,
                      images: product.images,
                      rating: product.rating,

                      user: {
                        full_name: user?.full_name,
                        address: user?.address,
                        city: user?.city,
                        profile: user?.profile,
                        role: user.role
                      },
                      category: {
                        name: product.category.name,

                      }
                    }
                  }

                  fromProfile
                  activable
                />



              ))
            ) : (
              // Show a message if there are no products for the selected filter
              <p className="md:col-span-3 text-center text-gray-500">
                No listings found for this filter.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}