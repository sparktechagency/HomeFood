"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";
import { format } from "date-fns";



export default function MessageBubble({ message, isCurrentUser }: any) {
    const { data: ownuserprofile } = useGetOwnprofileQuery({});
    // console.log('message', message);
    const isSender = isCurrentUser;

    return (
        <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>

            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${isSender ? 'bg-gray-600 text-white' : 'bg-gray-200'}`}>
                <p>{message.message}</p>
                {/* <p className={`text-xs mt-1 ${isSender ? 'text-blue-100' : 'text-gray-500'}`}>
                    {format(new Date(message.created_at), 'HH:mm')}
                </p> */}
            </div>
        </div>
    );
}