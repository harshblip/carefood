import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuShortcut, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function Dropdownbtn() {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Login
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Signup
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Dropdownbtn