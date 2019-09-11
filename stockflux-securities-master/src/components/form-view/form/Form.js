import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import ToggleSwitch from '../form-controls/toggle-switch/ToggleSwitch';
import TextField from '../form-controls/text-field/TextField';
import * as action from '../../../actions/Security';
import * as service from '../../../services/SecuritiesService';
import securityReducer, { initialState } from '../../../reducers/Security';
import { AlertType } from '../../alerts/AlertType';
import './Form.css';

const Form = ({ securityId, setAlerts, setRedirect }) => {
  const [state, dispatch] = useReducer(securityReducer, initialState);

  useEffect(() => {
    if (securityId) {
      service
        .getSecurity(securityId)
        .then(security => {
          setSecurity(security);
        })
        .catch(() => {});
    }
  }, [securityId]);

  const setSecurity = security => {
    dispatch(action.setName(security.name));
    dispatch(action.setExchange(security.exchange));
    dispatch(action.setSymbol(security.symbol));
    // TODO: Change `!security.enabled` to `security.disabled` once BE is updated
    dispatch(action.setDisabled(!security.enabled));
  };

  const processResponse = async (response, successStatusCode) => {
    if (response.status === successStatusCode) {
      setRedirect(true);
    } else {
      await populateAlerts(response);
    }
  };

  const submitEdit = securityId => {
    service
      .updateSecurity(securityId, getSecurityDTO())
      .then(async response => await processResponse(response, 200));
  };

  const submitNew = () => {
    service
      .postSecurity(getSecurityDTO())
      .then(async response => await processResponse(response, 201));
  };

  const populateAlerts = async response => {
    const alerts = await response.json();
    setAlerts(
      alerts.messages.map(alertMessage => ({
        message: alertMessage,
        type: AlertType.ERROR
      }))
    );
  };

  // TODO: Remove once BE is storing enabled as disabled
  const getSecurityDTO = () => ({
    name: state.name,
    exchange: state.exchange,
    symbol: state.symbol,
    enabled: !state.disabled,
    visible: true
  });

  const submitForm = event => {
    event.preventDefault();
    if (securityId) {
      submitEdit(securityId);
    } else {
      submitNew();
    }
  };

  return (
    <>
      <form
        className={securityId ? 'edit-form' : 'add-form'}
        onSubmit={submitForm}
      >
        <TextField
          label="EXCHANGE"
          id="name"
          disabled={securityId}
          value={state.exchange}
          onChange={event => dispatch(action.setExchange(event.target.value))}
        />
        <TextField
          label="SYMBOL"
          id="name"
          disabled={securityId}
          value={state.symbol}
          onChange={event => dispatch(action.setSymbol(event.target.value))}
        />
        <TextField
          label="NAME"
          id="name"
          value={state.name}
          onChange={event => dispatch(action.setName(event.target.value))}
        />
        <ToggleSwitch
          label="DISABLED"
          id="disabled-toggle"
          checked={state.disabled || false}
          onChange={() => dispatch(action.setDisabled(!state.disabled))}
        />
        <button className="submit">{securityId ? 'SAVE' : 'CREATE'}</button>
      </form>
    </>
  );
};

Form.propTypes = {
  securityId: PropTypes.string,
  setAlerts: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired
};

export default Form;