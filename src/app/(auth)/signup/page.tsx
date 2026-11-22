"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Store,
  Lock,
  Eye,
  EyeOff,
  CloudUpload,
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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

type AccountRole = "customer" | "vendor";

export default function SignUpPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [role, setRole] = useState<AccountRole>("customer");
  const [showPassword, setShowPassword] = useState(false);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileImageFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRemoveAvatar = () => {
    setProfileImageFile(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      setError("Please fill in your full name, email address, and password.");
      return;
    }

    try {
      setLoading(true);
      let uploadImageUrl = "";

      if (profileImageFile) {
        setUploadingImage(true);
        const imgFormData = new FormData();
        imgFormData.append("image", profileImageFile);

        const imagebbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`;
        const res = await fetch(imagebbAPI, {
          method: "POST",
          body: imgFormData,
        });
        const result = await res.json();

        if (result.success) {
          uploadImageUrl = result.data.url;
        } else {
          setError("Failed to upload profile image. Please try again.");
          setLoading(false);
          setUploadingImage(false);
          return;
        }
        setUploadingImage(false);
      }

      const { data,error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        role,
        image: uploadImageUrl || undefined,
      });

      if (authError) {
        setError(authError.message || "Something went wrong during sign up.");
        setLoading(false);
        return;
      }
      if(data){
        toast.success("Account created Successfully!")
      }
      console.log(data);
      setLoading(false);
      router.refresh();
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
      setLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#FFFDFB] px-4 py-10">
      <Card className="w-full max-w-lg rounded-3xl border-orange-200/80 bg-white shadow-lg shadow-orange-950/5">
        <CardHeader className="text-center space-y-2 pt-7">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dc2626] to-[#f97316] text-white shadow-sm">
            <Image src={'/PizzaHub.png'} height={40} width={40} alt="pizzahub-logo"/>
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
                name="name"
                type="text"
                placeholder="e.g., Nadia Karim"
                onChange={() => {
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
                name="email"
                type="email"
                placeholder="nadia@example.com"
                onChange={() => {
                  if (error) setError("");
                }}
                className="h-11 rounded-xl bg-[#FAF7F2] border-orange-200/70 focus-visible:border-[#dc2626]"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-bold uppercase text-stone-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  onChange={() => {
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
                    <Image
                      src={avatarPreview}
                      alt="Avatar preview"
                      height={40}
                      width={40}
                      className="rounded-full object-cover ring-2 ring-orange-200"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
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
              disabled={loading || uploadingImage}
              className="w-full h-11 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold mt-2 cursor-pointer"
            >
              {uploadingImage
                ? "Uploading Image..."
                : loading
                  ? "Creating Account..."
                  : "Create Account"}
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