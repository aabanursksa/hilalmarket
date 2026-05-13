import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact-us")({
  head: () => ({
    meta: [
      { title: "Contact Us — HilaalMarket" },
      { name: "description", content: "Get in touch with HilaalMarket. We're here to help." },
    ],
  }),
  component: ContactUs,
});

function ContactUs() {
  return (
    <Shell>
      <PageHeader title="Contact Us" />
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 lg:grid-cols-[1fr_480px]">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="text-2xl font-extrabold text-foreground">Get in Touch</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Have a question, feedback, or need help? Fill out the form below and we'll get back to you.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label className="mb-2 block text-sm font-semibold">Full Name</Label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <Label className="mb-2 block text-sm font-semibold">Email</Label>
              <Input type="email" placeholder="your@email.com" />
            </div>
            <div className="md:col-span-2">
              <Label className="mb-2 block text-sm font-semibold">Subject</Label>
              <Input placeholder="How can we help?" />
            </div>
            <div className="md:col-span-2">
              <Label className="mb-2 block text-sm font-semibold">Message</Label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>
          <Button className="mt-6 bg-brand hover:bg-brand/90 h-12 px-8">Send Message</Button>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-extrabold text-foreground">Contact Information</h3>
            <div className="mt-6 space-y-5">
              <InfoRow icon={MapPin} label="Address" value="Mogadishu, Somalia Street" />
              <InfoRow icon={Phone} label="Phone" value="+252 61 8601212" />
              <InfoRow icon={Mail} label="Email" value="info@hilalmarket.com" />
              <InfoRow icon={Clock} label="Working Hours" value="Daily 7:00 AM – 11:00 PM" />
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-extrabold text-foreground">WhatsApp</h3>
            <p className="mt-2 text-sm text-muted-foreground">Chat with us directly on WhatsApp for quick support.</p>
            <a
              href="https://wa.me/252618601212"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </Shell>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}
