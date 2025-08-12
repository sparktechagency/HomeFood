"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Minus, Plus, X, MapPin } from "lucide-react"
import Image from "next/image"

interface CartItem {
    id: number
    name: string
    price: number
    originalPrice: number
    quantity: number
    image: string
    selected: boolean
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Hyderabadi Biryani",
            price: 30,
            originalPrice: 40,
            quantity: 1,
            image: "/hyderabadi-biryani.png",
            selected: false,
        },
        {
            id: 2,
            name: "Hyderabadi Biryani",
            price: 30,
            originalPrice: 40,
            quantity: 1,
            image: "/hyderabadi-biryani.png",
            selected: false,
        },
    ])

    const [selectAll, setSelectAll] = useState(false)

    const handleSelectAll = (checked: boolean) => {
        setSelectAll(checked)
        setCartItems((items) => items.map((item) => ({ ...item, selected: checked })))
    }

    const handleItemSelect = (id: number, checked: boolean) => {
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, selected: checked } : item)))

        // Update select all state
        const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, selected: checked } : item))
        setSelectAll(updatedItems.every((item) => item.selected))
    }

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    const removeItem = (id: number) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const serviceFee = 35
    const total = subtotal + serviceFee

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Cart Section */}
                    <div className="lg:col-span-2 bg-white rounded-lg p-6">
                        {/* Select All Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <Checkbox
                                checked={selectAll}
                                onCheckedChange={handleSelectAll}
                                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                            />
                            <span className="font-medium">Select All ({cartItems.length} Items)</span>
                        </div>

                        {/* Cart Items */}
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                    <Checkbox
                                        checked={item.selected}
                                        onCheckedChange={(checked) => handleItemSelect(item.id, checked as boolean)}
                                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                    />

                                    <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-medium text-lg">{item.name}</h3>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="font-semibold text-green-600 text-lg">${item.price}/-</div>
                                            <div className="text-gray-400 line-through text-sm">${item.originalPrice}</div>
                                        </div>

                                        <div className="flex items-center gap-2 bg-green-50 rounded-lg p-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="h-8 w-8 p-0 hover:bg-green-100"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>

                                            <Input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                                                className="w-12 h-8 text-center border-0 bg-transparent p-0"
                                                min="1"
                                            />

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="h-8 w-8 p-0 hover:bg-green-100"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeItem(item.id)}
                                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="bg-white rounded-lg p-6 h-fit">
                        {/* Location Section */}
                        <div className="mb-6">
                            <h3 className="font-medium mb-3">Location</h3>
                            <div className="flex items-center gap-2 text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span className="text-sm">Add Shipping Address</span>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Order Summary</h3>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                                    <span>${subtotal}/-</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Service Fee</span>
                                    <span className="text-green-600">${serviceFee}/-</span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>${total}/-</span>
                                </div>
                            </div>

                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-6">Confirm Order</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
