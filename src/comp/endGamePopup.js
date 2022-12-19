import { useContext, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { boardContext } from "../context/boardContext";


export function EndGamePopup(props) {
  const [show, setShow] = useState(false);
  const { showGameEndPopup, winOrLose, setResetGame } = useContext(boardContext);
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
      onHide={handleClose}
      {...props}
      size="md"
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