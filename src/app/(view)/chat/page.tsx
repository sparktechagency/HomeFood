
"use client";

import ChatArea from "@/components/chat/ChatArea";
import UserList from "@/components/chat/UserList";
import { useGetChatlistQuery, useSearchuserQuery, useSendMessageMutation, useLazyGetAllmesageByidQuery } from "@/redux/features/chat/ChatApi";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { getSocket, initiateSocket, isSocketConnected } from "@/redux/service/socket";
import { useGetOwnprofileQuery } from "@/redux/features/AuthApi";

export default function Page() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [searchQuery, setSearchQuery] = useState(email || '');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isSearchActive, setIsSearchActive] = useState(false);

    // Chat message state
    const [page, setPage] = useState(1);
    const [allMessages, setAllMessages] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isSending, setIsSending] = useState(false);

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

    // Socket instance
    const socket = getSocket();




    // Effect to set the initial selected user from chat list or search
    useEffect(() => {
        if (isSearchActive && searchData?.data?.length > 0) {
            setSelectedUser(searchData.data[0]);
        } else if (!isSearchActive && chatlistData?.data?.length > 0 && !selectedUser) {
            const firstChat = chatlistData.data[0];
            setSelectedUser({
                id: firstChat.id,
                full_name: firstChat.receiver.full_name,
                email: firstChat.receiver.email,
                profile: firstChat.receiver.profile,
                lastMessage: "",
                sender_id: firstChat.sender_id
            });
        }
    }, [chatlistData, searchData, isSearchActive, selectedUser]);

    // Effect to track when search is active
    useEffect(() => {
        setIsSearchActive(searchQuery.length >= 2);
    }, [searchQuery]);

    // Effect to initialize socket and join the user's room
    useEffect(() => {
        // First, ensure the socket object is created.
        if (!socket) {
            initiateSocket();
            // Return early because the socket is being created.
            // This effect will re-run when the socket is ready.
            return;
        }

        // Now that we know 'socket' is not null, we can proceed.
        if (isSocketConnected()) {
            // We are safely inside this block, so we can use 'socket' directly.
            socket.on(`chat:${selectedUser?.id}`, (data) => {
                fetchMessage();
                setPage(2);
            });



        }



    }, [socket,
        selectedUser?.id,]);
    // Effect to listen for incoming messages


    const fetchMessage = () => {
        if (!selectedUser) return;
        getMessageData({
            page: 1,
            id: selectedUser?.id,
            per_page: 999999
        }).then((res: any) => {
            setAllMessages(res?.data?.data?.data || []);
        });
    };

    // Effect to fetch messages when a user is selected
    useEffect(() => {

        fetchMessage();
        setPage(2);
    }, [selectedUser?.id, getMessageData]);

    // Handler to select a user from the list
    const handleUserSelect = (user: any) => {
        if (selectedUser?.id === user.id) return;
        setSelectedUser(user);
        setPage(1);
        setAllMessages([]);
        setHasMore(true);
    };

    // Handler to send a message
    const handleSendMessage = async (message: string) => {
        if (!selectedUser || !message.trim() || isSending) return;

        setIsSending(true);
        const optimisticMessage = {
            id: Date.now(),
            chat_id: selectedUser.id,
            message: message,
            is_send: true,
            created_at: new Date().toISOString(),
            sender: {
                id: userInfo?.data?.id,
                full_name: userInfo?.data?.full_name,
                profile: userInfo?.data?.profile,
            }
        };

        setAllMessages((prevMessages) => [...prevMessages, optimisticMessage]);
        try {
            await sendMessage({
                chat_id: selectedUser.id,
                message
            }).unwrap();

            // console.log(selectedUser);


            socket?.emit("message", {
                chat_id: selectedUser.id,
                message: message
            });
        } catch (error) {
            console.error("Error sending message:", error);
            // Optional: Implement logic to show message failed to send
        } finally {
            setIsSending(false);
        }
    };

    // Prepare user lists for display
    const chatListUsers = chatlistData?.data?.map((item: any) => ({
        id: item.id,
        full_name: item.receiver.full_name,
        email: item.receiver.email,
        profile: item.receiver.profile,
        lastMessage: "",
        sender_id: item.sender_id,
        receiver_id: item.receiver_id
    })) || [];

    const displayUsers = isSearchActive ? searchData?.data || [] : chatListUsers;
    const showEmptyState = !selectedUser && displayUsers.length === 0 && !chatListLoading && !isSearchLoading;

    return (
        <div className="md:!px-[7%] !px-4 !py-12 h-screen mt-18">
            <div className="w-full h-full grid grid-cols-7 gap-6">
                <UserList
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    users={displayUsers}
                    isLoading={isSearchActive ? isSearchLoading : chatListLoading}
                    onUserSelect={handleUserSelect}
                />

                {selectedUser ? (
                    <ChatArea
                        user={selectedUser}
                        messages={allMessages}
                        isLoading={messageResults?.isLoading}
                        isSending={isSending}
                        onSendMessage={handleSendMessage}
                        chatContainerRef={chatContainerRef}
                        messagesEndRef={messagesEndRef}
                    />
                ) : (
                    <div className="col-span-5 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center p-6">
                            {showEmptyState ? (
                                <h3 className="text-lg font-medium text-gray-900">Your inbox is empty</h3>
                            ) : (
                                <div className="text-gray-400 text-lg">Select a user to start chatting</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}