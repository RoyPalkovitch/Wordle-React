import Modal from 'react-bootstrap/Modal';
import { useContext, useRef, useState } from 'react';
import { gameConfigContext } from '../../../context/gameConfigContext'
import { gameConfigType } from '../../../hooks/types/gameConfigType';
import { ModalpropsType } from '../../navbarModules/navTypes';


export function GameConfigModal(props: ModalpropsType): JSX.Element {
  const { changeConfig, lengthOfWord, numberOfTries }: gameConfigType = useContext(gameConfigContext) as gameConfigType;
  const [changed, setChanged] = useState(false);
  const wordLengthRef = useRef<HTMLInputElement>(null);
  const numberOfTriesRef = useRef<HTMLInputElement>(null);

  const gameConfigHandle = () => {
    if (wordLengthRef.current !== null && numberOfTriesRef.current !== null) {
      const wordLength = +wordLengthRef.current.value;
      const numberOfTries = +numberOfTriesRef.current.value;
      changeConfig(wordLength, numberOfTries);
      props.onHide();
    }
  }

  const resetConfig = () => {
    changeConfig(5, 5);
    props.onHide();
  }

  return (
    <Modal
      centered
      size="lg"
      {...props}
      backdrop="static"
      onEscapeKeyDown={props.onHide}
      aria-labelledby="contained-modal-title-center"
    >
      <Modal.Header closeButton >
        <h3>Config</h3>
      </Modal.Header>

      <Modal.Body>
        <label>Word length:
          {wordLengthRef.current?.value ?
            wordLengthRef.current?.value : lengthOfWord.current}
          <br />
          <input type="range" min="2" max="8" defaultValue=
            {lengthOfWord.current ? lengthOfWord.current : '5'}
            ref={wordLengthRef}
            onChange={() => setChanged(!changed)} />
        </label>
        <br />
        <label>Number of tries:
          {numberOfTriesRef.current?.value ?
            numberOfTriesRef.current.value : numberOfTries.current}
          <br />
          <input type="range" min="1" max="10"
            defaultValue={numberOfTries.current ? numberOfTries.current : '5'}
            ref={numberOfTriesRef}
            onChange={() => setChanged(!changed)} />
        </label>
        <br />
        <input type="submit" value="SUBMIT" onClick={gameConfigHandle} />
        <input type="submit" value='RESET' onClick={resetConfig} />
      </Modal.Body>
    </Modal>
  );
}