declare module '*.png'

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
