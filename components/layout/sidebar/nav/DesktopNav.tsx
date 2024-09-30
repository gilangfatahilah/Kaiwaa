'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigation } from "@/hooks/useNavigation"
import { UserButton } from "@clerk/clerk-react";
import Link from "next/link";

const DesktopNav = () => {
  const paths = useNavigation();

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-2">
      <nav>
        <ul className="flex flex-col items-center gap-4">
          {paths.map((path, idx) => {
            return (
              <li key={idx} className="relative">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size={'icon'}
                        variant={
                          path.active ? 'default' : 'outline'
                        }
                      >
                        {path.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle />
        <UserButton />
      </div>
    </Card>
  )
}

export default DesktopNav;