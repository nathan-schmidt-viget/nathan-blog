"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = {
  "/": {
    name: "Home",
  },
  "/blog": {
    name: "Blog",
  },
  "/projects": {
    name: "Projects",
  },
  // "/code": {
  //   name: "Code",
  // },
};

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className='-ml-[8px] mb-16 tracking-tight'>
      <div className='lg:sticky lg:top-20'>
        <nav
          className='flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative'
          id='nav'
        >
          <ul className='flex flex-row gap-2'>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <li>
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      "transition-all hover:text-neutral-800 hover:underline focus-visible:underline dark:hover:text-neutral-200 flex align-middle relative py-1 px-2",
                      pathname === path && "underline"
                    )}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
