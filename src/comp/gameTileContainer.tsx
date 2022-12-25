

type propsType = {
  children: JSX.Element[]
}

export function GameTileContainer(props: propsType): JSX.Element {
  return (<div className="row">{props.children}</div>)
}