import type { Metadata } from "next";
import { ContactForm } from "@/components/layout/contact-form";
import { Legal } from "@/components/layout/legal";
import { publicConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Legal title="Contact">
      <p>
        {publicConfig.contactEmail
          ? `You can write to ${publicConfig.contactEmail}.`
          : "A public contact address has not been configured."}
      </p>
      <ContactForm email={publicConfig.contactEmail} />
    </Legal>
  );
}
