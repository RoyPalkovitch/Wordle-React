
type propsType = {
  key: string,
  currentKeysRow: number,
  children: JSX.Element[]
}

export function KeyboardRow(props: propsType): JSX.Element {
  return (
    <div className={'row' + (props.currentKeysRow === 1 ? ' row-small' : '')}>{props.children}</div>
  )
}