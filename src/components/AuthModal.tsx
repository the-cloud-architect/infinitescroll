import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "../lib/auth-client";

type Mode = "login" | "signup";

export function AuthModal({
  trigger,
  defaultMode = "login",
}: {
  trigger: React.ReactNode;
  defaultMode?: Mode;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(defaultMode as Mode);

  /* shared form state */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "login") {
      await signIn.email(
        { email, password },
        {
          onSuccess() {
            window.location.reload();
          },
          onError(ctx) {
            setError(ctx.error?.message ?? "Login failed");
          },
        }
      );
    } else {
      await signUp.email(
        { name, email, password },
        {
          onSuccess() {
            window.location.reload();
          },
          onError(ctx) {
            setError(ctx.error?.message ?? "Sign-up failed");
          },
        }
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)} className="mb-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log in</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" className="w-full">
            {mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
