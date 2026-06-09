import * as React from "react"
import PropTypes from "prop-types"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn("grid gap-2", className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// ✅ PropTypes validation
RadioGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onValueChange: PropTypes.func,
}

RadioGroupItem.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export { RadioGroup, RadioGroupItem }
