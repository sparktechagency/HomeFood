import Link from 'next/link'
import React from 'react'

export default function MyCustomLogo() {
    return (
        <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-extrabold tracking-tight flex items-center space-x-1">
                <span className="text-gray-900">Home</span>
                <span className="text-[#4F986F]">Food</span>
                <span className="text-xl font-semibold text-green-400">🍽️</span> {/* Optional icon */}
            </Link>
        </div>
    )
}
