/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HowItWorksStepProps {
  stepNumber: number;
  title: string;
  description: string;
  imageUrl?: string;
  last?: boolean;
}

export default function HowItWorksStep({
  stepNumber,
  title,
  description,
  imageUrl = "/image/hit.jpg", // Default value if not provided
  last,
}: HowItWorksStepProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
      {" "}
      {/* Changed items-start to items-stretch */}
      {/* Image Section */}
      <div className="w-full md:w-1/3 lg:w-1/4">
        <div className="rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={200}
            className="w-full object-cover aspect-square"
          />
        </div>
      </div>
      {/* Content Section with Vertical Line */}
      <div className="flex-1 relative !pb-4 md:pb-0">
        {" "}
        {/* Added padding-bottom to ensure content pushes div height and line extends */}
        {/* Vertical Line */}
        <div
          className={cn(
            `absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block`,
            last && "h-[150%]"
          )}
          style={{ left: "-20px" }}
        ></div>
        {/* Circle Marker */}
        <div
          className="absolute left-0 top-2 w-2 h-2 rounded-full bg-black hidden md:block"
          style={{ left: "-23px" }}
        ></div>
        {/* Text Content */}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
