import { gameTileType } from "../../../hooks/useBoard"


export function GameTile({ classState, letter }: gameTileType): JSX.Element {
  return (<div className={classState}>{letter} </div>)
}