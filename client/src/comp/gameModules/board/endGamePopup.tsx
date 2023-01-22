import { useContext, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { boardContext } from "../../../context/boardContext";
import { boardType } from "../../../hooks/types/boardType";
import { modalObsType } from "../../../hooks/types/modalObsType";
import { ModalObsContext } from "../../../context/modalObsContext";

export function EndGamePopup(): JSX.Element {
  const [show, setShow] = useState(false);
  const { showGameEndPopup, winOrLose, setResetGame, rendered }: boardType = useContext(boardContext) as boardType;
  const { setModalObs }: modalObsType = useContext(ModalObsContext) as modalObsType;

  useEffect(() => {
    showGameEndPopup ? handleShow() : handleClose();
    // setModalObs(showGameEndPopup);
  }, [showGameEndPopup, setModalObs])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePlayAgain = () => {
    handleClose();
    setResetGame(true);
    setModalObs(false);
    rendered.current = false;
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