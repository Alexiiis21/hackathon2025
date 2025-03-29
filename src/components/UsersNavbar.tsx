"use client";

import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function UsersNavbar() {
  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Nombre */}
          <Link
            href="/"
            className="flex z-40 font-semibold"
          >
            <span className="text-xl font-bold text-emerald-600">Clear</span>
            <span className="text-xl font-bold">Route</span>
          </Link>

          {/* Enlace para trabajadores */}
          <Link
            href="/trabajadores/login"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            ¿Eres trabajador?
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}