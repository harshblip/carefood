"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Kanit } from "next/font/google"

const kanit = Kanit({
    subsets: ['latin'],
    weight: ['300', '500', '600']
})

const frameworks = [
    {
        value: "rating",
        label: "Rating",
    },
    {
        value: "cost for two",
        label: "Cost for two",
    },
]

export function ComboboxDemo({ setPreference }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen} className="border-none">
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[120px] justify-between border-2 border-white -mt-2 text-white font-extrabold"
                >
                    {value
                        ? (frameworks.find((framework) => framework.value === value)?.label)
                        : "Sort"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-[200px] p-0 ml-20 text-white ${kanit.className}`}>
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setPreference(framework.value)
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    onClick={() => setPreference(framework.value)}
                                    className="hover:cursor-pointer"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
