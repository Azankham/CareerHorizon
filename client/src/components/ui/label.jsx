import * as React from "react"
import PropTypes from "prop-types"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  >
    {children}
  </LabelPrimitive.Root>
))
Label.displayName = LabelPrimitive.Root.displayName

// ✅ Add prop-types validation
Label.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node, // important here since <Label> wraps text or elements
}

export { Label }
