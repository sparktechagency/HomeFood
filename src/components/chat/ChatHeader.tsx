"use client";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { imageUrl } from "@/redux/baseApi";


export default function ChatHeader({ user }: any) {


    return (
        <div className="flex flex-row justify-start items-center gap-3 !px-4 !py-3 border-b w-full">
            <Avatar className="!size-12">
                <AvatarImage src={imageUrl + user.profile || "/image/icon/user.jpeg"} />
                <AvatarFallback>
                    {user.full_name?.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="w-full">
                <h3 className="text-sm font-semibold">{user.full_name}</h3>
                <div className="flex items-center gap-2">
                    {/* <div
                        className="w-full text-sm text-green-500 font-bold flex flex-row items-center gap-2"
                        suppressHydrationWarning
                    >
                        <div className="size-3 rounded-full bg-green-500" />
                        online
                    </div> */}
                    {user.role_label && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {user.role_label}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}