import howl from "@/lib/howl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const token = (await cookies()).get("token")?.value;
  const call = await howl({ link: `/profile`, token });

  if (call.data.role === "SELLER") {
    redirect("/seller/dashboard");
  } else {
    redirect("/buyer/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Redirecting...</p>
    </div>
  );
}
