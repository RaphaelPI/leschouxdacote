declare module "*.svg" {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export = value
}

declare module "standard-http-error/codes" {
  const value: Record<number, string>
  export = value
}

declare module "@mapbox/mapbox-gl-language"
