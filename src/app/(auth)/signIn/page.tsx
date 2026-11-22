"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pizza, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const emailValue = ((formData.get("email") as string) || email).trim();
    const passwordValue = (formData.get("password") as string) || password;

    if (!emailValue || !passwordValue) {
      setError("Please enter both your email and password.");
      return;
    }

    try {
      setLoading(true);
      const { data, error: authError } = await authClient.signIn.email({
        email: emailValue,
        password: passwordValue,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      if (data) {
        toast.success("Welcome back to PizzaHub!");
      }

      setLoading(false);
      window.location.assign("/");
      router.refresh();
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred while signing in.");
      setLoading(false);
    }
  };


    const handleSignInGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: '/',
    });
  };
  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#FFFDFB] px-4 py-10">
      <Card className="w-full max-w-md rounded-3xl border-orange-200/80 bg-white shadow-lg shadow-orange-950/5">
        <CardHeader className="text-center space-y-2 pt-7">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dc2626] to-[#f97316] text-white shadow-sm">
           <Image src={'/PizzaHub.png'} height={40} width={40} alt="pizzahub-logo"/>
          </div>
          <CardTitle className="text-2xl font-extrabold text-stone-950">
            Welcome Back to Pizza<span className="text-[#dc2626]">Hub</span>
          </CardTitle>
          <CardDescription className="text-stone-500">
            Log in to order hot wood-fired pizzas and track delivery
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-6 sm:px-8">
          {error && (
            <p className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-semibold text-[#dc2626]">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-bold uppercase text-stone-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className="h-11 rounded-xl bg-[#FAF7F2] border-orange-200/70 focus-visible:border-[#dc2626]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold uppercase text-stone-700"
                >
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-[#dc2626] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  className="h-11 rounded-xl bg-[#FAF7F2] border-orange-200/70 pr-10 focus-visible:border-[#dc2626]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold cursor-pointer"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="relative py-1 flex items-center">
            <Separator className="flex-1 bg-orange-200/70" />
            <span className="px-3 text-[11px] font-bold text-stone-400">OR</span>
            <Separator className="flex-1 bg-orange-200/70" />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleSignInGoogle}
            className="w-full h-11 rounded-xl border-orange-200/80 bg-white hover:bg-[#FAF7F2] text-stone-800 font-bold cursor-pointer"
          >
            <FcGoogle /> Continue with Google
          </Button>
        </CardContent>

        <CardFooter className="justify-center pb-7 pt-2">
          <p className="text-sm text-stone-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#dc2626] hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}