'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import {
  ChevronsUpDown,
  CreditCard,
  House,
  LogOut,
  PanelsTopLeftIcon,
} from 'lucide-react';

import { signOut, useSession } from 'next-auth/react';

import { DropdownProfileProps } from './DropdownProfile.types';
export default function DropdownProfile(props: DropdownProfileProps) {
  const { data: session } = useSession();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={session?.user.image} alt={session?.user.name} />
            <AvatarFallback className="rounded-lg  uppercase">
              {session?.user?.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{session?.user.name}</span>
            <span className="truncate text-xs">{session?.user.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={session?.user.avatar}
                alt={session?.user.name}
              />
              <AvatarFallback className="rounded-lg uppercase">
                {session?.user?.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {session?.user.name}
              </span>
              <span className="truncate text-xs">{session?.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CreditCard className="stroke-1 size-6 mr-2" />
            Gerenciar assinatura
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <House className="stroke-1 size-6 mr-2" />
            Site
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PanelsTopLeftIcon className="stroke-1 size-6 mr-2" />
            Dashboard
          </DropdownMenuItem>

          {/* <DropdownMenuItem>
                      <Bell className='stroke-1 size-6 mr-2' />
                      Notifications
                    </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="stroke-1 size-6 mr-2" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
