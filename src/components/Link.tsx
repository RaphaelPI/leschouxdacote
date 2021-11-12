import NextLink, { LinkProps } from "next/link"
import { AnchorHTMLAttributes, FC } from "react"
import { ButtonProps, LinkButton } from "src/components/Button"

type Props = Pick<LinkProps, "href"> & AnchorHTMLAttributes<HTMLAnchorElement>

const Link: FC<Props> = ({ children, href, ...props }) => (
  <NextLink href={href}>
    <a {...props}>{children}</a>
  </NextLink>
)

export const ButtonLink: FC<Props & ButtonProps> = ({ children, href, $variant, ...props }) => (
  <NextLink href={href} passHref>
    <LinkButton $variant={$variant} {...props}>
      {children}
    </LinkButton>
  </NextLink>
)

export default Link
