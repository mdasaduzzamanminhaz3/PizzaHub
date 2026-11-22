"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Pizza, Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Menu", href: "/menu" },
  { name: "Pizzerias", href: "/pizzerias" },
];


export default function Navbar() {
  const router = useRouter();
  // const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [activeLink, setActiveLink] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user as
  | (typeof session extends null | undefined
      ? never
      : NonNullable<typeof session>["user"] & { role?: string })
  | undefined;
  const settingsHref = user?.role ? `/dashboard/${user.role}/settings` : "/dashboard";

  const handleLogout = async () => {
    await authClient.signOut();
    setIsOpen(false);
    toast.success("Logged out successfully!");
    router.refresh();
    window.location.assign("/signIn");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-3 sm:top-4 z-50 w-full px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="flex items-center justify-between h-16 sm:h-18 px-4 sm:px-6 rounded-[1.75rem] lg:rounded-full bg-[#FFF8F3]/95 backdrop-blur-md border border-orange-200/80 shadow-lg shadow-orange-950/5">
          {/* Left: Brand Logo */}
          <Link
            href="/"
            onClick={() => setActiveLink("Home")}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dc2626] to-[#f97316] flex items-center justify-center shadow-md shadow-red-500/20">
             <Image src={'/PizzaHub.png'} height={40} width={40} alt="pizzahub-logo"/>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight leading-none text-gray-900">
                Pizza<span className="text-[#dc2626]">Hub</span>
              </span>
              <span className="text-[10px] font-semibold tracking-[0.14em] text-stone-500 uppercase mt-1">
                Artisan Pizza Delivery
              </span>
            </div>
          </Link>

          {/* Center: Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 bg-orange-100/50 p-1.5 rounded-full border border-orange-200/50">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                    isActive
                      ? "text-[#dc2626]"
                      : "text-stone-600 hover:text-gray-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 bg-white shadow-xs ring-1 ring-orange-200/70 rounded-full -z-10"
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Desktop Auth / Avatar Dropdown */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            {isPending ? (
              <div className="h-9 w-9 rounded-full bg-orange-100 animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full cursor-pointer"
                    >
                      <Avatar className="h-9 w-9 ring-2 ring-orange-200/80">
                        <AvatarImage
                          src={user.image || ""}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[#dc2626] to-[#f97316] text-white text-xs font-bold">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
<DropdownMenuContent align="end" className="w-56 rounded-2xl border-orange-200/80 bg-white p-1.5">
  <DropdownMenuGroup>
    <DropdownMenuLabel className="px-2.5 py-2 font-normal">
      <div className="flex items-center gap-2.5">
        <Avatar className="h-12 w-12 shrink-0">
          <AvatarImage src={user.image || ""} alt={user.name || "User"} />
          <AvatarFallback className="bg-[#dc2626] text-white text-xs font-bold">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-stone-900 truncate">
            {user.name}
          </span>
          <span className="text-xs font-normal text-stone-500 truncate">
            {user.email}
          </span>
        </div>
      </div>
    </DropdownMenuLabel>
  </DropdownMenuGroup>

  <DropdownMenuSeparator className="bg-orange-100" />

  <DropdownMenuItem render={<Link href="/dashboard" className="cursor-pointer rounded-xl" />}>
    Dashboard
  </DropdownMenuItem>
  <DropdownMenuItem render={<Link href={settingsHref} className="cursor-pointer rounded-xl" />}>
    Profile Settings
  </DropdownMenuItem>

  <DropdownMenuSeparator className="bg-orange-100" />

  <DropdownMenuItem
    variant="destructive"
    onClick={handleLogout}
    className="cursor-pointer rounded-xl font-semibold"
  >
    Logout
  </DropdownMenuItem>
</DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/signIn"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "text-sm font-semibold text-stone-700 hover:text-[#dc2626] hover:bg-orange-100/60 rounded-full px-4 h-10",
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants(),
                    "rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold px-6 h-10 shadow-sm",
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-stone-700 hover:bg-orange-100/70"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="w-6 h-6" />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[300px] sm:w-[360px] bg-[#FFF8F3] border-l border-orange-200/70 flex flex-col justify-between"
              >
                <div>
                  <SheetHeader className="text-left pb-6 border-b border-orange-200/70">
                    <SheetTitle className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#dc2626] to-[#f97316] flex items-center justify-center">
                        <Image src={'/PizzaHub.png'} height={40} width={40} alt="pizzahub-logo"/>
                      </div>
                      <span className="text-lg font-extrabold tracking-tight text-gray-900">
                        Pizza<span className="text-[#dc2626]">Hub</span>
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  {user && (
                    <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white p-3 border border-orange-200/70">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.image || ""}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback className="bg-[#dc2626] text-white text-xs font-bold">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-bold text-stone-900 truncate">
                        {user.name}
                      </span>
                    </div>
                  )}

                  <nav className="flex flex-col gap-2 mt-5">
                    {navLinks.map((link) => {
                      const isActive = activeLink === link.name;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => {
                            setActiveLink(link.name);
                            setIsOpen(false);
                          }}
                          className={`px-4 py-3 rounded-2xl text-base font-semibold transition-colors ${
                            isActive
                              ? "bg-white text-[#dc2626] shadow-xs ring-1 ring-orange-200/70"
                              : "text-stone-700 hover:bg-orange-100/50"
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}

                    {user && (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-3 rounded-2xl text-base font-semibold text-stone-700 hover:bg-orange-100/50"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href={settingsHref}
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-3 rounded-2xl text-base font-semibold text-stone-700 hover:bg-orange-100/50"
                        >
                          Profile Settings
                        </Link>
                      </>
                    )}
                  </nav>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-orange-200/70">
                  {user ? (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-full h-11 rounded-full font-semibold cursor-pointer"
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Link
                        href="/signIn"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full h-11 rounded-full bg-white border-orange-200/80 font-semibold text-stone-700 hover:bg-orange-50",
                        )}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          buttonVariants(),
                          "w-full h-11 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold",
                        )}
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
