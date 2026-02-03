"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function LeftSide() {
  return (
    <div className="w-full space-y-8 pb-8">
      <div className="space-y-2">
        <h1 className="text-[26px] font-bold tracking-tight text-gray-900 leading-tight">
          Welcome Back<br />PULSE !
        </h1>
      </div>

      <form>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              required
              className="h-[42px] border-gray-200 bg-white shadow-xs rounded-[8px] focus-visible:ring-[#FCDD3E] text-sm px-4"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="**********"
                required
                className="h-[42px] border-gray-200 bg-white shadow-xs rounded-[8px] pr-10 focus-visible:ring-[#FCDD3E] text-sm px-4"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="h-3.5 w-3.5 rounded border-gray-300 text-[#FCDD3E] focus:ring-[#FCDD3E]"
              />

              <label htmlFor="remember" className="text-[11px] text-gray-500">Remember me</label>
            </div>

            <a
              href="#"
              className="text-[11px] font-bold text-[#D4AF37] hover:text-[#FCDD3E]"
            >
              Forgot Password?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full h-[42px] rounded-full bg-[#FCDD3E] text-black font-bold text-sm hover:bg-[#ebd045] mt-4 shadow-none"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  )
}
