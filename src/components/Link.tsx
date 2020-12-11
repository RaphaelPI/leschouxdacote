import { FC, PropsWithChildren } from "react"
import NextLink, { LinkProps } from "next/link"

const Link: FC<PropsWithChildren<LinkProps>> = ({ children, ...props }) => (
  <NextLink {...props}>
    <a>{children}</a>
  </NextLink>
)

export default Link
