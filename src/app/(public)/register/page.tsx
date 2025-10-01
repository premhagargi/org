"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button className="w-full" type="submit" disabled={pending}>
    {pending ? "Creating Account..." : "Create an account"}
  </Button>;
}

export default function RegisterPage() {
   const [state, formAction] = useActionState(register, undefined);

  return (
    <div className="w-full h-full flex items-center justify-center py-12">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Max Robinson" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required/>
            </div>
             {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
            <SubmitButton />
          </form>
           <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
