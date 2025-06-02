import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon, TrashIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardDescription } from "@/components/ui/card";
import { PopoverArrow } from "@radix-ui/react-popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ListingTable() {
  const customers = [
    {
      creator: "Fatima Khan",
      service: "Meditation Coaching",
      category: "Wellness",
      date: "10/05/2025",
      reason: "Harassment",
      description:
        "Client reported repeated unwanted messages from a service provider.",
    },
    {
      creator: "David Lee",
      service: "Personal Training",
      category: "Fitness",
      date: "15/06/2025",
      reason: "Misleading Information",
      description:
        "Trainer promised specific results not delivered, contradicting initial agreement.",
    },
    {
      creator: "Sarah Chen",
      service: "Nutritional Consulting",
      category: "Health",
      date: "01/07/2025",
      reason: "Unprofessional Conduct",
      description: "Consultant made inappropriate comments during a session.",
    },
    {
      creator: "Omar Sharif",
      service: "Pilates",
      category: "Fitness",
      date: "20/07/2025",
      reason: "Breach of Privacy",
      description: "Instructor shared personal client details without consent.",
    },
    {
      creator: "Jessica Wu",
      service: "Zumba",
      category: "Fitness",
      date: "05/08/2025",
      reason: "Discrimination",
      description:
        "Client felt singled out and excluded during a class due to age.",
    },
    {
      creator: "Ahmed Rashid",
      service: "Therapy Session",
      category: "Mental Health",
      date: "12/08/2025",
      reason: "Lack of Professionalism",
      description:
        "Therapist was frequently late and appeared unprepared for sessions.",
    },
    {
      creator: "Maria Garcia",
      service: "Art Class",
      category: "Hobbies",
      date: "28/08/2025",
      reason: "Copyright Infringement",
      description:
        "Instructor used copyrighted material without proper attribution in a course.",
    },
    {
      creator: "Ben Carter",
      service: "Music Lessons",
      category: "Education",
      date: "03/09/2025",
      reason: "Financial Dispute",
      description:
        "Disagreement over billing and refund policy for cancelled lessons.",
    },
    {
      creator: "Sophie Dupont",
      service: "Cooking Class",
      category: "Hobbies",
      date: "18/09/2025",
      reason: "Unsafe Environment",
      description:
        "Client reported hazardous conditions in the kitchen during a class.",
    },
    {
      creator: "Ryan Kelly",
      service: "Language Tutoring",
      category: "Education",
      date: "01/10/2025",
      reason: "Poor Service Quality",
      description:
        "Tutor was not effective in teaching and lacked clear communication.",
    },
    {
      creator: "Linda Brown",
      service: "Career Coaching",
      category: "Professional Development",
      date: "10/10/2025",
      reason: "Conflict of Interest",
      description:
        "Coach was found to be working with a competitor of the client.",
    },
    {
      creator: "Chris Evans",
      service: "Massage Therapy",
      category: "Wellness",
      date: "25/10/2025",
      reason: "Inappropriate Behavior",
      description: "Therapist made uncomfortable remarks during a session.",
    },
    {
      creator: "Mei Ling",
      service: "Dance Class",
      category: "Fitness",
      date: "07/11/2025",
      reason: "False Advertising",
      description:
        "Class advertised as 'beginner friendly' was too advanced for new participants.",
    },
    {
      creator: "Kevin Schmidt",
      service: "Financial Planning",
      category: "Finance",
      date: "15/11/2025",
      reason: "Negligence",
      description:
        "Planner failed to provide timely advice leading to financial loss.",
    },
  ];

  return (
    <Table>
      <TableHeader className="bg-zinc-100">
        <TableRow>
          <TableHead className="w-[100px] text-center">Seller Name</TableHead>
          <TableHead className="text-center">Service</TableHead>
          <TableHead className="text-center">Category</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium text-center">
              {customer.creator}
            </TableCell>
            <TableCell className="text-center">{customer.service}</TableCell>
            <TableCell className="text-center">{customer.category}</TableCell>
            <TableCell className="text-center">{customer.date}</TableCell>
            <TableCell className="text-center !space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-amber-500"
                    size="icon"
                  >
                    <EyeIcon />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-center items-center">
                    <Avatar className="size-[140px]">
                      <AvatarImage src="https://avatar.iran.liara.run/public" />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center gap-2">
                    <h2 className="text-2xl font-bold">{customer.creator}</h2>
                    <div className="w-full flex justify-between items-center">
                      <span className="font-bold">Service name:</span>{" "}
                      <span className="text-sm">{customer.service}</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <span className="font-bold">Category</span>
                      <span className="text-sm">{customer.category}</span>
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                      <span className="font-bold">Reason:</span>
                      <Input value={customer.reason} readOnly />
                    </div>
                    <div className="w-full flex flex-col justify-start items-start gap-2">
                      <span className="font-bold">Description:</span>
                      <Textarea
                        className="resize-none h-[140px]"
                        value={customer.description}
                        readOnly
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-destructive"
                    size="icon"
                  >
                    <TrashIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="left">
                  <PopoverArrow />
                  <h3>Are you sure?</h3>
                  <CardDescription>
                    You are going to delete this user account and this can not
                    be undone
                  </CardDescription>
                  <Button variant="destructive" className="text-sm !mt-6">
                    <TrashIcon />
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
