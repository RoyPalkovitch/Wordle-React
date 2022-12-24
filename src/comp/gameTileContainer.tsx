

type propsType = {
  children: JSX.Element[]
}

export function GameTileContainer(props: propsType) {
  return (<div className="row">{props.children}</div>)
}