import { FC } from "react"
import NextLink, { LinkProps } from "next/link"

interface StyledProps {
  className?: string
}

const Link: FC<LinkProps & StyledProps> = ({ children, className, ...props }) => (
  <NextLink {...props}>
    <a className={className}>{children}</a>
  </NextLink>
)

export default Link
