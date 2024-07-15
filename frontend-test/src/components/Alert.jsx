import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAlert } from '../app/alertReducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleExclamation, faInfoCircle, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const AlertComponent = ({ text, type, id }) => {
  const [checked, setChecked] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setChecked(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const deleteAlert = () => {
    setChecked(false);
  };

  useEffect(() => {
    if (!checked) {
        const timer = setTimeout(() => {
            dispatch(clearAlert(id));
        }, 300); // Time for transition to complete
        return () => clearTimeout(timer);
    }
  }, [checked, dispatch, id]);

  return (
    <div
      id="alert-component"
      className={`alert-container ${checked ? 'show' : 'hide'}`}
      onClick={deleteAlert}
    >
      <div>
        {type === "info" && (
          <dialog className="info">
            <h4>Informacja</h4>
            <p>{text}</p>
            <FontAwesomeIcon size='2x' color='#0c5460' icon={faInfoCircle} />
          </dialog>
        )}
        {type === "success" && (
          <dialog className="success">
            <h4>Sukces</h4>
            <p>{text}</p>
            <FontAwesomeIcon size='2x' color='#08b408' icon={faCircleCheck} />
          </dialog>
        )}
        {type === "warning" && (
          <dialog className="warning">
            <h4>Ostrzeżenie</h4>
            <p>{text}</p>
            <FontAwesomeIcon size='2x' color='#856404' icon={faTriangleExclamation} />
          </dialog>
        )}
        {type === "error" && (
          <dialog className="error">
            <h4>Error</h4>
            <p>{text}</p>
            <FontAwesomeIcon size='2x' color='#721c24' icon={faCircleExclamation} />
          </dialog>
        )}
      </div>
    </div>
  );
};

export default AlertComponent;