import Modal from 'react-bootstrap/Modal';
import { ModalpropsType } from './navTypes';




export function InfoModalPopup(props: ModalpropsType): JSX.Element {
  return (
    <Modal
      {...props}
      size="lg"
      centered
      autoFocus={true}
      backdrop="static"
      onEscapeKeyDown={props.onHide}
      aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton >
        <h3>Wordle</h3>
      </Modal.Header>

      <Modal.Body>
        <h4>Guess the Wordle in 5 tries.</h4>
        <ul>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>The color of the tiles will change to show you how your guess did.</li>
        </ul>
        <h5><strong>Examples</strong></h5>
        <div className="guess-container">
          <div className="row">
            <div className="col game-tile correct" >W</div>
            <div className="col game-tile" >O</div>
            <div className="col game-tile" >R</div>
            <div className="col game-tile" >D</div>
            <div className="col game-tile" >S</div>
          </div>
          <p><strong>W</strong> is in the correct spot.</p>
          <div className="row">
            <div className="col game-tile" >B</div>
            <div className="col game-tile" >O</div>
            <div className="col game-tile exist" >A</div>
            <div className="col game-tile" >R</div>
            <div className="col game-tile" >D</div>
          </div>
          <p><strong>A</strong> exist in the word but it's in the wrong spot.</p>
          <div className="row">
            <div className="col game-tile" >A</div>
            <div className="col game-tile" >P</div>
            <div className="col game-tile" >P</div>
            <div className="col game-tile wrong" >L</div>
            <div className="col game-tile" >E</div>
          </div>
          <p><strong>L</strong> is not exist in the word.</p>

        </div>
      </Modal.Body>
    </Modal>
  );
}