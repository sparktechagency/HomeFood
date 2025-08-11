import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="h-[90dvh] flex justify-center items-center">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle className="text-center text-xl font-bold">
            Manage Job Contents
          </CardTitle>
          <CardContent className="!mt-6 !space-y-6 grid grid-cols-2 gap-6">
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/jobs/add?type=operational">
                Operational Roles
              </Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/jobs/add?type=technical">
                Technical & Support Roles
              </Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/jobs/add?type=marketing">
                Marketing & Business Roles
              </Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/jobs/add?type=finance">
                Finance & Legal Roles
              </Link>
            </Button>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
