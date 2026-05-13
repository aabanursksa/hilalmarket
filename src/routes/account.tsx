import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { AccountSidebar } from "@/components/AccountSidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — HilaalMarket" }] }),
  component: Account,
});

function Account() {
  return (
    <Shell>
      <PageHeader title="My Account" />
      <div className="container mx-auto flex flex-col gap-6 px-4 py-10 md:flex-row">
        <AccountSidebar />
        <div className="flex-1 rounded-lg border bg-card p-6">
          <h2 className="text-lg font-extrabold text-brand-navy">Account Settings</h2>
          <p className="text-sm text-muted-foreground">Update your personal information</p>

          <div className="mt-6 flex items-center gap-5">
            <div className="relative">
              <img src="https://i.pravatar.cc/120?img=12" alt="" className="h-24 w-24 rounded-full object-cover ring-4 ring-brand/20" />
              <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white shadow-md">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <Button variant="outline" className="border-brand text-brand hover:bg-brand hover:text-white">Choose Image</Button>
              <p className="mt-2 text-xs text-muted-foreground">JPG or PNG. Max size 2MB.</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Full Name" defaultValue="Ahmed Hassan" />
            <Field label="Email" type="email" defaultValue="ahmed@hilaal.com" />
            <div>
              <Label className="mb-2 block text-sm font-semibold">Gender</Label>
              <select className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <Field label="Date of Birth" type="date" defaultValue="1995-06-15" />
            <Field label="City" defaultValue="Mogadishu" />
            <Field label="Phone" defaultValue="+252 61 8601212" />
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-brand hover:bg-brand/90">Save Changes</Button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-semibold">{label}</Label>
      <Input {...rest} />
    </div>
  );
}
