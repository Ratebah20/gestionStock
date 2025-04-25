// components/ui/orange-button.tsx
import { cva } from "class-variance-authority"
import { Button, ButtonProps, buttonVariants } from "./button"
import { cn } from "@/lib/utils"

// Variants pour les boutons Orange
const orangeButtonVariants = cva(
  "rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700",
        outline: "border border-orange-500 text-orange-500 hover:bg-orange-50 active:bg-orange-100",
        ghost: "text-orange-600 hover:bg-orange-50 active:bg-orange-100",
        link: "text-orange-500 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export function OrangeButton({ className, variant, size, ...props }: ButtonProps) {
  // Apply Orange styling to the button regardless of variant
  const orangeClass = variant === "default" ? "bg-orange-500 hover:bg-orange-600 text-white" : 
                    variant === "outline" ? "border-orange-500 text-orange-500 hover:bg-orange-50" :
                    variant === "ghost" ? "text-orange-600 hover:bg-orange-50" :
                    variant === "link" ? "text-orange-500 hover:underline" : "";
  
  return (
    <Button 
      className={cn(orangeClass, className)}
      variant={variant}
      size={size}
      {...props}
    />
  )
}
