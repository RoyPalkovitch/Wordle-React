import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

type propsData = {
  winOrLose: React.MutableRefObject<string>,
  endGamePopup: boolean,
  setGameEndPopup: React.Dispatch<React.SetStateAction<boolean>>,
  setResetGame: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EndGamePopup({ winOrLose, endGamePopup, setResetGame, setGameEndPopup }: propsData): JSX.Element {
  const [show, setShow] = useState(false);

  useEffect(() => {
    endGamePopup ? handleShow() : handleClose();
  }, [endGamePopup])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePlayAgain = () => {
    handleClose();
    setResetGame(true);
    setGameEndPopup(false);
  }

  return (
    <Modal show={show}
      onHide={handlePlayAgain}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      variant={winOrLose.current === 'Win' ? 'success' : 'danger'}
    >

      <Modal.Body>
        <h2>You {winOrLose.current} The Game!</h2>
        <Button onClick={handlePlayAgain}>Play Again</Button>
      </Modal.Body>
    </Modal>
  );
}