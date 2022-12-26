import Modal from 'react-bootstrap/Modal';
import { useContext, useRef, useState } from 'react';
import { gameConfigContext } from '../context/gameConfigContext';
import { gameConfigType } from "../hooks/useGameConfig";

type propsType = {
  show: boolean,
  onHide: () => void
}

export function GameConfigModal(props: propsType): JSX.Element {
  const { changeConfig, lengthOfWord, numberOfTries }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const [changed, setChanged] = useState(false);
  const wordLengthRef = useRef<HTMLInputElement>(null);
  const numberOfTriesRef = useRef<HTMLInputElement>(null);



  function gameConfigHandle() {
    if (wordLengthRef.current !== null && numberOfTriesRef.current !== null) {
      const wordLength = +wordLengthRef.current.value
      const numberOfTries = +numberOfTriesRef.current.value
      changeConfig(wordLength, numberOfTries);
      props.onHide();
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-center"
      centered>
      <Modal.Header closeButton >
        <h3>Config</h3>
      </Modal.Header>

      <Modal.Body>
        <label>Word length:{wordLengthRef.current?.value ? wordLengthRef.current?.value : lengthOfWord.current}<br />
          <input type="range" min="2" max="8" defaultValue={lengthOfWord.current ? lengthOfWord.current : '5'} ref={wordLengthRef} onChange={() => setChanged(!changed)} />
        </label><br />
        <label>Number of tries:{numberOfTriesRef.current?.value ? numberOfTriesRef.current.value : numberOfTries.current} <br />
          <input type="range" min="1" max="10" defaultValue={numberOfTries.current ? numberOfTries.current : '5'} ref={numberOfTriesRef} onChange={() => setChanged(!changed)} /></label><br />
        <input type="submit" onClick={gameConfigHandle} />
      </Modal.Body>
    </Modal>
  );
}