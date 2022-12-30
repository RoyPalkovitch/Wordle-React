import { useContext, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { boardContext } from "../../../context/boardContext";
import { boardType } from "../../../hooks/useBoard";

export function EndGamePopup(): JSX.Element {
  const [show, setShow] = useState(false);
  const { showGameEndPopup, winOrLose, setResetGame }: boardType = useContext(boardContext) as boardType;
  useEffect(() => {
    showGameEndPopup ? handleShow() : handleClose();

  }, [showGameEndPopup])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handlePlayAgain() {
    handleClose();
    setResetGame(true);
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