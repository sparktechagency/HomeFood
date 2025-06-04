import Image from "next/image";

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  reverseOrder?: boolean; // Optional prop for layout reversal
}

export default function FeatureCard({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt,
  reverseOrder = false, // Default to false if not provided
}: FeatureCardProps) {
  return (
    <div
      className={`flex flex-col md:flex-row gap-8 items-center ${
        reverseOrder ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1 !space-y-6">
        <h3 className="text-3xl font-semibold">{title}</h3>
        <p className="text-green-600 text-xl font-semibold">{subtitle}</p>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      <div className="w-full md:w-2/5">
        <div className="rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={350}
            height={250}
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
