"use client";

import { Input } from "@/components/ui/input";
import UserItem from "./UserItem";




export default function UserList({
    searchQuery,
    onSearchChange,
    users,
    isLoading,
    onUserSelect,
    showSearchEmptyState = false,
    isChatList = false,

}: any) {



    return (
        <div className="col-span-2 border rounded-lg flex flex-col h-[calc(100vh-100px)]">
            <div className="p-4 border-b">
                <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="p-4 text-center">Loading...</div>
                ) : showSearchEmptyState ? (
                    <div className="p-4 text-center text-gray-500">No users found</div>
                ) : users.length > 0 ? (
                    users.map((user: any) => (
                        <UserItem

                            key={user.id}
                            user={user}
                            onClick={onUserSelect}
                            showLastMessage={isChatList}
                        />
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        {searchQuery.length === 0
                            ? "No recent chats available"
                            : "Type at least 2 characters to search"}
                    </div>
                )}
            </div>
        </div>
    );
}