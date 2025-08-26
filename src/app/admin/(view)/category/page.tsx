"use client";
import React, { useState, ChangeEvent } from "react";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetAllCategorysQuery } from "@/redux/features/categorys/CategoryApi";
import { imageUrl } from "@/redux/baseApi";
import { toast } from "sonner";

// Define a more specific type for your category data if you know the structure
interface Category {
    id: number;
    name: string;
    image: string;
}

interface ImageFile {
    file: File;
    url: string;
}

function Page() {
    // State for the form inputs
    const [categoryName, setCategoryName] = useState<string>("");
    const [image, setImage] = useState<ImageFile | null>(null);

    // RTK Query Hooks
    const { data: categoryData, isLoading: isFetching, refetch } = useGetAllCategorysQuery({});
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const categories: Category[] = categoryData?.data?.data || [];

    // Handle image selection and create a preview URL
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage({ file, url: imageUrl });
        }
    };

    // Handle creating a new category
    const handleAddCategory = async () => {
        if (!categoryName || !image?.file) {
            alert("Please provide both a category name and an image.");
            return;
        }

        const formData = new FormData();
        formData.append("name", categoryName);
        formData.append("image", image.file);

        try {
            const res = await createCategory(formData).unwrap();

            if (res?.success) {
                toast.success(res?.message || "Category created successfully");
                // Reset form fields on successful creation
                setCategoryName("");
                setImage(null);
                refetch();
            }
        } catch (error) {
            console.error("Failed to create category:", error);
            alert("Failed to create category. Please try again.");
        }
    };

    // Handle deleting a category
    const handleDelete = async (id: number) => {
        try {
            const resp = await deleteCategory(id).unwrap();
            if (resp?.success) {
                toast.success(resp?.message || "Category deleted successfully");
                refetch();
            }
        } catch (error) {
            console.error("Failed to delete category:", error);
            alert("Failed to delete category. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Add Category Section */}
                <div className="bg-white rounded-2xl shadow p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Add New Category</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Category Name Input */}
                        <input
                            type="text"
                            placeholder="Category Name"
                            className="border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            disabled={isCreating}
                        />

                        {/* Image Upload Input */}
                        <label className="flex items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition">
                            <Upload className="w-6 h-6 text-gray-500" />
                            <span className="ml-2 text-sm text-gray-600">
                                {image ? "Change Image" : "Upload Image"}
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                                disabled={isCreating}
                            />
                        </label>

                        {/* Add Button with Loading State */}
                        <button
                            onClick={handleAddCategory}
                            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition disabled:bg-indigo-400"
                            disabled={isCreating}
                        >
                            {isCreating ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Plus className="w-5 h-5" />
                            )}
                            {isCreating ? "Adding..." : "Add Category"}
                        </button>
                    </div>

                    {/* Image Preview */}
                    {image && (
                        <div className="mt-4 flex items-center gap-4">
                            <img
                                src={image.url}
                                alt="Preview"
                                className="w-16 h-16 rounded-lg object-cover border"
                            />
                            <span className="text-gray-600">{categoryName || "Unnamed"}</span>
                        </div>
                    )}
                </div>

                {/* Category List Section */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Category List</h2>
                    {isFetching ? (
                        <p className="text-gray-500">Loading categories...</p>
                    ) : categories.length === 0 ? (
                        <p className="text-gray-500">No categories added yet.</p>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="bg-gray-50 border rounded-xl p-4 shadow-sm relative group"
                                >
                                    <img
                                        src={imageUrl + cat.image} // Assuming the API returns a full URL
                                        alt={cat.name}
                                        className="w-full h-32 object-cover rounded-lg mb-3"
                                    />
                                    <h3 className="text-lg font-medium">{cat.name}</h3>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Page;