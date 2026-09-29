"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, TextArea, TextInput } from "@/components/ui/field";

export function ContactForm({ email }: { email: string }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <Field label="Name">
        <TextInput name="name" required />
      </Field>
      <Field label="Message">
        <TextArea name="message" required />
      </Field>
      <Button type="submit">Compose</Button>
      {sent ? (
        <p className="text-sm leading-6" role="status">
          {email
            ? `This form does not upload the message. Use ${email} to send it.`
            : "This form does not upload the message. No contact endpoint is configured."}
        </p>
      ) : null}
    </form>
  );
}
