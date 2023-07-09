import PropTypes from 'prop-types';
import PopUp from "reactjs-popup";
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/PopUp.css';

export const DeletePopUp = ({ onConfirm, message }) => {
  return (
    <PopUp
      trigger={
        <DeleteIcon className='deleteIcon' />
      }
      modal
      closeOnDocumentClick
    >
      {(close) => (
        <div className='modal'>
          <h3>Confirmación</h3>
          <p>{message}</p>
          <button onClick={() => { onConfirm(); close(); }}>Eliminar</button>
          <button onClick={close}>Cancelar</button>
        </div>
      )}
    </PopUp>
  )
}


DeletePopUp.propTypes = {
  onConfirm: PropTypes.func,
  message: PropTypes.string,
}