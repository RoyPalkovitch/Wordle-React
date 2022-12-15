export function KeyboardRow(props) {
  return (
    <div className={'row' + (props.currentKeysRow === 1 ? ' row-small' : '')}>{props.children}</div>
  )
}