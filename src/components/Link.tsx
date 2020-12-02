import NextLink, { LinkProps } from "next/link"

const Link: React.FC<React.PropsWithChildren<LinkProps>> = ({ children, ...props }) => (
  <NextLink {...props}>
    <a>{children}</a>
  </NextLink>
)

export default Link
