import { Button } from "@/components/ui/button"; // Assuming this component exists
import HowItWorksStep from "./steps";
import FeatureCard from "./feature-card";
import { Separator } from "@/components/ui/separator";

// Define interfaces for your data structures
interface HowItWorksStepData {
  title: string;
  description: string;
  imageUrl?: string; // Optional if you decide to customize per step later
}

interface SeamlessServiceFeatureData {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  reverseOrder?: boolean;
}

export default function Page() {
  const howItWorksSteps: HowItWorksStepData[] = [
    {
      title: "Create Your Account",
      description:
        "All you need is an email address and phone number. You can access our service from your browser or through our mobile app. Download the app from the App Store or Google Play.",
    },
    {
      title: "Set up your request",
      description:
        "Open the app and enter what you need in the request form. Confirm your details and submit to be matched with a service provider near you.",
    },
    {
      title: "Match with a Seller",
      description:
        "You'll receive confirmation when your provider is on the way. Track their arrival in real-time through the app.",
    },
    {
      title: "Verify your service",
      description:
        "For your safety and satisfaction, always verify you're working with the right provider by matching the details in your app with the person who arrives.",
    },
    {
      title: "Rate & Review",
      description:
        "After the service is completed, share your feedback to help improve the platform and guide other buyers.",
    },
    {
      title: "Enjoy the experience",
      description:
        "Payment is handled securely through the app using your preferred payment method - credit card, digital wallet, or other local options.",
    },
  ];

  const seamlessServiceFeatures: SeamlessServiceFeatureData[] = [
    {
      title: "Clear Pricing Upfront",
      subtitle: "Know your costs upfront",
      description:
        "See exactly what your meal will cost before ordering - no hidden fees or surprises. Our transparent pricing shows the full breakdown so you know what you're paying for.",
      imageUrl: "/image/about.jpg",
      imageAlt: "Clear pricing",
      reverseOrder: false,
    },
    {
      title: "Personalized Food Choices",
      subtitle: "Tailor orders to your preferences",
      description:
        "Find meals that match your taste by Browse seller profiles with their specialties and reviews. Request custom modifications to get exactly what you want.",
      imageUrl: "/image/about.jpg",
      imageAlt: "Personalized food choices",
      reverseOrder: true,
    },
    {
      title: "Real-Time Order Updates",
      subtitle: "Keep track of what you order",
      description:
        "Track your order from kitchen to doorstep with live updates. Know when your food is being prepared, when it's out for delivery, and when it arrives.",
      imageUrl: "/image/about.jpg",
      imageAlt: "Real-time order updates",
      reverseOrder: false,
    },
    {
      title: "Share Your Experience",
      subtitle: "Help us serve you better",
      description:
        "Rate your meals and leave feedback to help sellers improve. Save your favorite dishes to easily reorder them later.",
      imageUrl: "/image/about.jpg",
      imageAlt: "Share your experience",
      reverseOrder: true,
    },
  ];

  return (
    <main className="container !mx-auto !px-4 !py-8 md:!px-6 mt-12!">
      <h1 className="text-3xl font-semibold text-green-600 !mb-10">
        How It Works
      </h1>
      {/* Steps Section */}
      <div className="!mb-16">
        <div className="!space-y-12">
          {howItWorksSteps.map((step, index) => (
            <HowItWorksStep
              key={index}
              stepNumber={index + 1}
              title={step.title}
              description={step.description}
              last={howItWorksSteps.length - 1 != index}
              // imageUrl={step.imageUrl} // Uncomment if you add specific images per step
            />
          ))}
        </div>
      </div>
      <div className="!py-12">
        <Separator />
      </div>
      {/* Seamless Service Section */}
      <h2 className="text-4xl font-semibold text-green-600 !mb-[140px]">
        Seamless service from start to finish
      </h2>
      {/* Features Grid */}
      <div className="!space-y-12 !mb-12">
        {seamlessServiceFeatures.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            subtitle={feature.subtitle}
            description={feature.description}
            imageUrl={feature.imageUrl}
            imageAlt={feature.imageAlt}
            reverseOrder={feature.reverseOrder}
          />
        ))}
      </div>
      {/* Register Button */}
      <div className="flex justify-center !mt-12 !mb-16">
        <Button className="!px-12" size="lg">
          Register
        </Button>
      </div>
    </main>
  );
}
