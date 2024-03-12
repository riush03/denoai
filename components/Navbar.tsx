'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegment ,useRouter} from 'next/navigation';
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs"
import { Button } from './ui/button';
import useScroll from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';


const Header = () => {
  const router = useRouter();
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div className="relative z-10 border-b py-4 bg-gray-50">
      <div className="flex h-[47px] items-center justify-between px-6 space-y-2 ">
        <div className="flex items-center space-x-4">
        <Link href="/" className="flex gap-2 items-center text-xl text-black">
          <Image src="/images/biccas_logo.png" width="100" height="50" alt="file drive logo" />
        </Link>
        </div>

  

        <div className="flex gap-2 ">
          <OrganizationSwitcher />
          <UserButton />
          
        </div>
      </div>
    </div>
  );
};

export default Header;