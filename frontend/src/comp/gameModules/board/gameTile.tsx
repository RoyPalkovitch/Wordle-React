import { useEffect, useRef } from "react";

export type cellRef = React.RefObject<HTMLDivElement>;

export interface gameTileCompProps {
  updateRef: (cell: cellRef) => void,
  classInit: string
}

export function GameTile(props: gameTileCompProps): JSX.Element {
  const updateRef = props.updateRef;
  const tile = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  useEffect(() => {
    if (!rendered.current)
      updateRef(tile);
    rendered.current = true
  }, [updateRef, tile]);

  return (<div ref={tile}></div>)
}
