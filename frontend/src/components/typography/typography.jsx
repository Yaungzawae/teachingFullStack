export function H1(props) {
    return (
      <h1 className={"scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl " + props.className}>
        {props.children}
      </h1>
    )
  }

export function P(props) {
  return (
    <p className={"leading-7 [&:not(:first-child)]:mt-3 " + props.className}>
      {props.children}
    </p>
  )
}

export function H3(props) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {props.children}
    </h3>
  )
}

export function H4(props) {
  return (
    <h4 className={"scroll-m-20 text-xl font-semibold tracking-tight " + props.className}>
{props.children}
  </h4>
  )
}

export function Muted(props) {
  return (
    <p className={"text-sm text-muted-foreground " + props.className}>{props.children}</p>
  )
}