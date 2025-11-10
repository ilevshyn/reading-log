import React from "react";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavigationMenu className={"w-full !max-w-full"}>
          <NavigationMenuList className={"flex flex-row justify-center"}>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={"/add"}>Add A Book</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={"/lists/currently-reading"}>Currently Reading</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={"/lists/want-to-read"}>Want To Read</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={"/lists/completed"}>Completed</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {children}
      </body>
    </html>
  );
}
