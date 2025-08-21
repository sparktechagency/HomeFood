'use client'
import React from 'react'
import UserAvater from './UserAvater'
import { Button } from './button'
import Link from 'next/link'
import { BellIcon } from 'lucide-react'
import { useGetOwnprofileQuery } from '@/redux/features/AuthApi'

function NotificationButton() {

    const { data: user } = useGetOwnprofileQuery({});
    const ruserRole = user?.data?.role;
    return (

        <div className="flex items-center gap-2">
            <UserAvater />
            <Button className="border border-gray-400 cursor-pointer" size={"icon"} variant="ghost" asChild>
                <Link href={ruserRole === "BUYER" ? "/buyer/dashboard/notifications" : "/seller/dashboard/notifications"}>
                    <BellIcon fill="" />
                </Link>
            </Button>
        </div>

    )
}

export default NotificationButton