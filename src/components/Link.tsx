import { FC } from "react"
import NextLink, { LinkProps } from "next/link"

import { LinkButton, ButtonProps } from "src/components/Button"

interface StyledProps {
  className?: string
}

const Link: FC<LinkProps & StyledProps> = ({ children, className, ...props }) => (
  <NextLink {...props}>
    <a className={className}>{children}</a>
  </NextLink>
)

export const ButtonLink: FC<LinkProps & StyledProps & ButtonProps> = ({ children, className, $variant, ...props }) => (
  <NextLink passHref {...props}>
    <LinkButton className={className} $variant={$variant}>
      {children}
    </LinkButton>
  </NextLink>
)

export default Link
