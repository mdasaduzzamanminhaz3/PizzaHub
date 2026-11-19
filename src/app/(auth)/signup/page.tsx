"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Pizza,
  ShoppingBag,
  Store,
  Lock,
  Eye,
  EyeOff,
  CloudUpload,
  Check,
  X,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

type AccountRole = "customer" | "vendor";

export default function SignUpPage() {
  const [role, setRole] = useState<AccountRole>("customer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in your full name, email address, and password.");
      return;
    }
    if (!hasMinLength || !hasUppercase || !hasLowercase) {
      setError("Password must meet all three requirements below.");
      return;
    }

    setError("");
    setLoading(true);
    // Connect registration logic here
    console.log({ role, fullName, email, password });
    setTimeout(() => setLoading(false), 600);
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#FFFDFB] px-4 py-10">
      <Card className="w-full max-w-lg rounded-3xl border-orange-200/80 bg-white shadow-lg shadow-orange-950/5">
        <CardHeader className="text-center space-y-2 pt-7">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dc2626] to-[#f97316] text-white shadow-sm">
            <Pizza className="h-6 w-6 -rotate-12" />
          </div>
          <CardTitle className="text-2xl font-extrabold text-stone-950">
            Create Your Pizza<span className="text-[#dc2626]">Hub</span> Account
          </CardTitle>
          <CardDescription className="text-stone-500">
            Join as a hungry Customer or register your Restaurant
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 px-6 sm:px-8">
          {error && (
            <p className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs font-semibold text-[#dc2626]">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selector */}
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-stone-700">
                Select Account Role
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={cn(
                    "flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all cursor-pointer",
                    role === "customer"
                      ? "border-[#dc2626] bg-red-50/40 ring-1 ring-[#dc2626]"
                      : "border-orange-200/70 bg-[#FAF7F2]/60 hover:bg-[#FAF7F2]"
                  )}
                >
                  <div
                    className={cn(
                      "mb-2 flex h-8 w-8 items-center justify-center rounded-lg",
                      role === "customer"
                        ? "bg-[#dc2626] text-white"
                        : "bg-white text-stone-500 border border-orange-200/60"
                    )}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-stone-950">Customer</span>
                  <span className="text-xs text-stone-500">Order &amp; track pizzas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("vendor")}
                  className={cn(
                    "flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all cursor-pointer",
                    role === "vendor"
                      ? "border-[#dc2626] bg-red-50/40 ring-1 ring-[#dc2626]"
                      : "border-orange-200/70 bg-[#FAF7F2]/60 hover:bg-[#FAF7F2]"
                  )}
                >
                  <div
                    className={cn(
                      "mb-2 flex h-8 w-8 items-center justify-center rounded-lg",
                      role === "vendor"
                        ? "bg-[#dc2626] text-white"
                        : "bg-white text-stone-500 border border-orange-200/60"
                    )}
                  >
                    <Store className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-stone-950">Vendor</span>
                  <span className="text-xs text-stone-500">Restaurant owner</span>
                </button>
              </div>
              <p className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-0.5">
                <Lock className="h-3 w-3 shrink-0" />
                <span>Security policy: Admin accounts cannot be created via public sign up.</span>
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-bold uppercase text-stone-700">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="e.g., Nadia Karim"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError("");
                }}
                className="h-11 rounded-xl bg-[#FAF7F2] border-orange-200/70 focus-visible:border-[#dc2626]"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-bold uppercase text-stone-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nadia@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className="h-11 rounded-xl bg-[#FAF7F2] border-orange-200/70 focus-visible:border-[#dc2626]"
              />
            </div>

            {/* Password + Live Validation Pills */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-bold uppercase text-stone-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
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
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { label: "Min 6 chars", valid: hasMinLength },
                  { label: "1 Uppercase", valid: hasUppercase },
                  { label: "1 Lowercase", valid: hasLowercase },
                ].map((rule) => (
                  <span
                    key={rule.label}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors",
                      rule.valid
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-stone-100 text-stone-500"
                    )}
                  >
                    {rule.valid && <Check className="h-3 w-3" />}
                    <span>{rule.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Profile Image Upload (Optional) */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase text-stone-700">
                Profile Image{" "}
                <span className="font-normal normal-case text-stone-400">
                  (Optional — can be skipped)
                </span>
              </Label>
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-10 rounded-xl border-orange-200/80 bg-[#FAF7F2] hover:bg-orange-50 text-stone-700 font-semibold gap-2 cursor-pointer"
                >
                  <CloudUpload className="h-4 w-4 text-[#f97316]" />
                  <span>{avatarPreview ? "Change Avatar" : "Upload Avatar"}</span>
                </Button>

                {avatarPreview && (
                  <div className="relative h-10 w-10">
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-orange-200"
                    />
                    <button
                      type="button"
                      onClick={() => setAvatarPreview(null)}
                      aria-label="Remove avatar"
                      className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-800 text-white cursor-pointer"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold mt-2 cursor-pointer"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center pb-7 pt-2">
          <p className="text-sm text-stone-500">
            Already have an account?{" "}
            <Link href="/signIn" className="font-bold text-[#dc2626] hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}