import { useContext, MouseEvent, useRef, useEffect } from "react";
import { boardContext } from "../../../context/boardContext";
import { boardType } from "../../../hooks/types/boardType";

export type keyboardTileType = React.RefObject<HTMLButtonElement>;

export interface KeyboardTileCompProps {
  updateRef: (cell: keyboardTileType) => void,
}

export function KeyboardTile(props: KeyboardTileCompProps): JSX.Element {
  const { handleKeyDown }: boardType = useContext(boardContext) as boardType;
  const tile = useRef<HTMLButtonElement>(null);;
  const rendered = useRef(false);
  const updateRef = props.updateRef;

  useEffect(() => {
    if (!rendered.current)
      updateRef(tile);
    rendered.current = true
  }, [updateRef, tile]);


  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleKeyDown(event);
  }
  return (
    <button ref={tile} onClick={handleOnClick}></button>
  )
}


