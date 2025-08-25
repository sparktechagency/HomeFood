"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { User } from "@/lib/types/api";
import { imageUrl } from "@/redux/baseApi";
import { useCreateAReportMutation } from "@/redux/features/Seller/SellerApi";
import { toast } from "sonner";
import { useState } from "react";
import { useLazyChatseassionCreateQuery } from "@/redux/features/chat/ChatApi";
import { useRouter } from "next/navigation";

interface ProfilePartProps {
  user: User;
  isbuyer?: boolean
}

export default function ProfilePart({ user, isbuyer }: ProfilePartProps) {
  const [createAReport, { isLoading }] = useCreateAReportMutation();
  // 1. State to hold the reason text and control modal visibility
  const [reason, setReason] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const router = useRouter();

  // 2. Handler function to log the reason and close the modal
  const handleReportSubmit = async () => {
    if (!reason.trim()) {
      alert("Please enter a reason for the report.");
      return;
    }
    const data = {
      reason
    }
    try {
      const response = await createAReport({ id: user?.id, data }).unwrap();
      console.log('response', response);

      if (response?.success) {
        toast.success(response?.message || "Report sent successfully")
        // Here you would typically send the report to your API
        setIsReportModalOpen(false); // Close the modal
        setReason(""); // Reset the textarea for next time
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong")
    }
  };

  const [triggerChatSession] = useLazyChatseassionCreateQuery();

  const handleSendMessage = async () => {
    const { data } = await triggerChatSession(user?.id);
    if (data?.success) {
      toast.success(data?.message)
      router.push(`/chat`)
    }
  };

  return (
    <>
      <Avatar className="size-[140px] !mx-auto">
        <AvatarImage src={`${imageUrl + user?.profile}`} alt={user?.full_name} />
        <AvatarFallback>{user?.full_name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="w-full !mt-2">
        <h3 className="text-2xl font-bold text-center">{user?.full_name}</h3>
        <div className="!space-y-2">
          <div className="flex flex-row justify-center items-center gap-1 text-muted-foreground">
            <MapPinIcon className="text-destructive size-4" />
            <span className="text-ellipsis line-clamp-1 text-sm">
              {user?.address}
            </span>
          </div>
        </div>
        <p className="!mt-12 text-center">
          Welcome to my kitchen! I'm excited to share my food with you.
        </p>
        <div className="!mt-12 flex flex-col justify-center items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>See Kitchen Picture</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kitchen pricture</DialogTitle>
              </DialogHeader>
              <div className="">
                <Image
                  src={`${imageUrl + user?.profile}`}
                  width={500}
                  height={500}
                  alt="icon"
                  className="w-full aspect-square"
                />
              </div>
            </DialogContent>
          </Dialog>

          <Button onClick={handleSendMessage} asChild>
            <span>
              <SendIcon /> Send Message
            </span>


          </Button>

          <Button asChild>
            <Link href={`${isbuyer ? "/buyer" : "/seller"}/food-request/${user?.id}`}>Food Request</Link>
          </Button>

          {/* --- REPORT MODAL IMPLEMENTATION --- */}
          <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="bg-zinc-700 hover:bg-zinc-600 text-background"
              >
                Report
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Report User</DialogTitle>
                <DialogDescription>
                  Please provide a reason for reporting this user. Your report is
                  anonymous.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    placeholder="Type your reason here."
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleReportSubmit}>
                  Submit Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}