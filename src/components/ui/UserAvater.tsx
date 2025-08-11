"use client"

import { imageUrl } from '@/redux/baseApi';
import { useGetOwnprofileQuery } from '@/redux/features/AuthApi'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

export default function UserAvater() {
    const { data: userData } = useGetOwnprofileQuery({});
    console.log('user data', userData);


    return (
        <div>
            <Avatar>
                <AvatarImage className='w-10 h-10 rounded-full border border-green-500 p-[2px]' src={imageUrl + userData?.data?.profile} />

                <AvatarFallback>AV</AvatarFallback>
            </Avatar>
        </div>
    )
}
