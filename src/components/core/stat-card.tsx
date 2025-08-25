/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface StatCardProps {
  data: {
    id: string;
    icon: string;
    value: string;
    title: string;
    description: string;
  };
  className?: string;
}

export function StatCard({ data, className }: StatCardProps) {
  const { icon, value, title, description } = data;

  // Dynamically get the icon component
  const IconComponent = ((Icons as any)[icon] as LucideIcon) || Icons.BarChart3;



  return (
    <Card
      className={`py-0! transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 ${className}`}
      role="article"
      aria-labelledby={`stat-title-${data.id}`}
      aria-describedby={`stat-desc-${data.id}`}
    >
      <CardContent className="!p-6 h-full flex flex-col justify-between  space-y-4!">
        <div className="flex items-center justify-between">
          <div className="p-2! bg-green-100 rounded-lg" aria-hidden="true">
            <IconComponent className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="space-y-2!">
          <div className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {value}
          </div>
          <div>
            <h3
              id={`stat-title-${data.id}`}
              className="text-sm font-medium text-gray-900"
            >
              {title}
            </h3>
            <p
              id={`stat-desc-${data.id}`}
              className="text-xs text-gray-500 mt-1!"
            >
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
