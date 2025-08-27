
"use client";

import ChatArea from "@/components/chat/ChatArea";
import UserList from "@/components/chat/UserList";

import { useGetChatlistQuery, useSearchuserQuery, useSendMessageMutation, useLazyGetAllmesageByidQuery } from "@/redux/features/chat/ChatApi";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { getSocket, initiateSocket, isSocketConnected } from "@/redux/service/socket";

import { Button } from "@/components/ui/button";
import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";


export default function Page() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [searchQuery, setSearchQuery] = useState(email || '');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isSearchActive, setIsSearchActive] = useState(false);



    // Chat message state
    const [page, setPage] = useState(1);
    const [allMessages, setAllMessages] = useState<any>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isSending, setIsSending] = useState(false);
    console.log('allmessages', allMessages);
    // Refs
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // API calls
    const { data: chatlistData, isLoading: chatListLoading, refetch: refetchChat } = useGetChatlistQuery();

    const { data: searchData, isLoading: isSearchLoading } = useSearchuserQuery(
        { search: searchQuery },
        { skip: searchQuery.length < 2 }
    );



    const [getMessageData, messageResults] = useLazyGetAllmesageByidQuery();
    const { data: userInfo } = useGetOwnprofileQuery({});
    const [sendMessage] = useSendMessageMutation();


    // Socket connection
    const socket = getSocket();
    useEffect(() => {
        // When search is active and we have search results
        if (isSearchActive && searchData?.data?.length > 0) {
            setSelectedUser(searchData.data[0]);
        }
        // When not searching and we have chat list
        else if (!isSearchActive && chatlistData?.data?.length > 0 && !selectedUser) {
            const firstChat = chatlistData.data[0];

            setSelectedUser({
                id: firstChat.id,
                full_name: firstChat.receiver.full_name,
                email: firstChat.receiver.email,
                profile: firstChat.receiver.profile,
                lastMessage: "", // Adjust as needed
                lastMessageTime: firstChat.created_at,
                sender_id: firstChat.sender_id
            });
        }
    }, [chatlistData, searchData, isSearchActive, selectedUser]);
    // Track when search is active
    useEffect(() => {
        setIsSearchActive(searchQuery.length >= 2);
    }, [searchQuery]);

    // Initialize socket connection
    useEffect(() => {
        window.scrollTo(0, 150);

        if (isSocketConnected() && userInfo?.data?.id) {
            socket?.emit("join", { userId: userInfo?.data?.id });

            socket?.on("sendMessage", (data) => {
                refetchChat();
                fetachMessage();
            });
        } else {
            initiateSocket();
        }

        return () => {
            socket?.off("sendMessage");
        };
    }, [selectedUser?.id, socket]);

    const fetachMessage = async () => {
        if (!selectedUser) return;

        getMessageData({
            page: 1,
            id: selectedUser?.id,
            per_page: 999999
        }).then((res) => {
            setAllMessages(res?.data?.data?.data || []);
        })
    };

    // Handle API messages
    useEffect(() => {
        if (selectedUser) {
            fetachMessage();
            setPage(2); // Start from page 2 for pagination
        }
    }, [selectedUser?.id]);

    // User selection handler
    const handleUserSelect = (user: any) => {
        if (selectedUser?.id === user.id) {
            return;
        }
        setSelectedUser(user);
        setPage(1);
        setAllMessages([]);
        setHasMore(true);
    };

    // Message sending handler
    // In your Page component

    const handleSendMessage = async (message: string) => {
        if (!selectedUser || !message.trim() || isSending) return;

        // 1. Create a temporary message object for the UI
        // This object should match the structure of your other messages
        const optimisticMessage = {
            id: Date.now(), // A temporary, unique ID for the React key
            chat_id: selectedUser.id,
            message: message,
            is_send: true, // Assuming this flag means it's from the current user
            created_at: new Date().toISOString(), // Use current time
            // Add any other properties your MessageBubble component needs
            sender: {
                id: userInfo?.data?.id,
                full_name: userInfo?.data?.full_name,
                profile: userInfo?.data?.profile,
            }
        };

        // 2. Immediately add the new message to your local state
        setAllMessages((prevMessages: any) => [...prevMessages, optimisticMessage]);

        // 3. Send the message to the server in the background
        try {
            await sendMessage({
                chat_id: selectedUser.id,
                message
            }).unwrap();

            // Optional: After success, you can refetch to sync, but it's often not needed.
            // fetachMessage(); // You can remove this line to prevent the redundant fetch.

            socket?.emit("sendMessage", {
                chat_id: selectedUser.id,
                message: message
            });

        } catch (error) {
            console.error("Error sending message:", error);
            // Handle the error: maybe show a "failed to send" icon next to the message
            // You could update the state to mark this specific message as failed.
        } finally {
            setIsSending(false);
        }
    };

    // Prepare user lists
    // Prepare user lists - transform the API response
    const chatListUsers: any = chatlistData?.data?.map((item: any) => ({
        id: item.id,
        full_name: item.receiver.full_name,
        email: item.receiver.email,
        profile: item.receiver.profile,
        lastMessage: "", // You might need to adjust this based on your actual data
        lastMessageTime: item.created_at,
        sender_id: item.sender_id,
        unread_messages_count: 0 // You might need to adjust this based on your actual data
    })) || [];

    const displayUsers = isSearchActive ? searchData?.data || [] : chatListUsers;
    const showEmptyState = displayUsers.length === 0 && !chatListLoading && !isSearchLoading;


    return (
        <div className="md:!px-[7%] !px-4 !py-12 h-screen mt-18">
            <div className="w-full h-full grid grid-cols-7 gap-6">
                <UserList
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    users={displayUsers}
                    isLoading={isSearchActive ? isSearchLoading : chatListLoading}
                    onUserSelect={handleUserSelect}
                    showSearchEmptyState={isSearchActive && !searchData?.data?.length}
                    isChatList={!isSearchActive}
                />

                {showEmptyState ? (
                    <div className="col-span-5 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="text-center p-8 max-w-md">
                            {isSearchActive ? (
                                <>
                                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>

                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                                    <p className="text-gray-500 mb-6">
                                        We couldn't find any users matching "{searchQuery}". Try a different search term.
                                    </p>

                                    <div className="flex gap-2 items-center justify-center">

                                        <Button onClick={() => setSearchQuery("")}>Clear search</Button>
                                    </div>

                                </>
                            ) : (
                                <>
                                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-indigo-50 mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12 text-indigo-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your inbox is empty</h3>
                                    <p className="text-gray-500 mb-6">
                                        Start a conversation by searching for users or sharing your profile link.
                                    </p>
                                    <Button onClick={() => document.getElementById('search-input')?.focus()} >
                                        Find someone to chat with
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                ) : selectedUser ? (
                    <ChatArea
                        user={selectedUser}
                        messages={allMessages}
                        isLoading={messageResults?.isLoading}
                        isLoadingMore={messageResults?.isFetching}
                        isSending={isSending}
                        hasMore={hasMore}
                        onSendMessage={handleSendMessage}
                        chatContainerRef={chatContainerRef}
                        messagesEndRef={messagesEndRef}
                    />
                ) : (
                    <div className="col-span-5 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center p-6">
                            <div className="text-gray-400 text-lg">
                                Select a user to start chatting
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}