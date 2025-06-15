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
            Manage website contents
          </CardTitle>
          <CardContent className="!mt-6 !space-y-6 grid grid-cols-2 gap-6">
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/about">Manage About Us</Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/data-privacy">
                Manage Data Privacy
              </Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/faq">Manage FAQ</Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/how-it-works">
                Manage How it Works
              </Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/imprint">Manage Imprint</Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/jobs">Manage Jobs</Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/seller">Manage Seller</Link>
            </Button>
            <Button className="w-full text-sm" variant="outline" asChild>
              <Link href="/admin/content/tnc">Manage Terms and Conditions</Link>
            </Button>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
