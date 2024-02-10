import React, { useReducer, useState } from 'react';

const initialState = {
  rows: [],
  isChecked: false,
  selectedCountry: '',
  selectedState: '',
  selectedCity: '',
  description: '',
  showDropdown: true,
  showCityDropdown: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return {
        ...state,
        rows: [...state.rows, action.payload],
        isChecked: false,
        selectedCountry: '',
        selectedState: '',
        selectedCity: '', // Reset selectedCity when adding a row
        description: '',
      };
    case 'SELECT_COUNTRY':
      return {
        ...state,
        selectedCountry: action.payload,
        selectedState: '',
        selectedCity: '', // Reset selectedCity when changing the country
      };
    case 'SELECT_STATE':
      return {
        ...state,
        selectedState: action.payload,
      };
    case 'SELECT_CITY':
      return {
        ...state,
        selectedCity: action.payload,
      };
    case 'DESCRIPTION':
      return {
        ...state,
        description: action.payload,
      };
    case 'TOGGLE_CHECKBOX':
      return {
        ...state,
        isChecked: !state.isChecked,
      };
    default:
      return state;
  }
};

function AddRow() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [renderCount, setRenderCount] = useState(0);

  const handleAddRow = () => {
    const { isChecked, selectedCountry, selectedState, selectedCity, description } = state;

    if (isChecked && selectedCountry && selectedState && selectedCity && description) {
      const newRow = {
        id: Date.now(),
        isChecked,
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        description,
        showDropdown: true,
        showCityDropdown: true,
      };

      dispatch({ type: 'ADD_ROW', payload: newRow });
      setRenderCount(renderCount + 1);
    } else {
      alert('Please fill in all fields and check the checkbox before adding a row.');
    }
  };

  const handleCheckboxChange = () => {
    dispatch({ type: 'TOGGLE_CHECKBOX' });
  };

  const getStatesForCountry = (country) => {
    // ... (unchanged)
  };

  const getCityForState = (state) => {
    // ... (unchanged)
  };

  const handleCountryChange = (e) => {
    dispatch({ type: 'SELECT_COUNTRY', payload: e.target.value });
  };

  const renderDropdown = (row) => {
    const { selectedCountry, selectedState } = row || state;

    return (
      <select
        value={selectedState}
        className='form-select'
        style={{ width: '100%' }}
        onChange={(e) => dispatch({ type: 'SELECT_STATE', payload: e.target.value })}
      >
        <option value=''>---Select---</option>
        {getStatesForCountry(selectedCountry).map((stateOption) => (
          <option key={stateOption} value={stateOption}>
            {stateOption}
          </option>
        ))}
      </select>
    );
  };

  const cityDropdown = (row) => {
    const { selectedState, selectedCity } = row || state;

    return (
      <select
        value={selectedCity}
        className='form-select'
        style={{ width: '100%' }}
        onChange={(e) => dispatch({ type: 'SELECT_CITY', payload: e.target.value })}
      >
        <option value=''>---Select---</option>
        {getCityForState(selectedState).map((cityOption) => (
          <option key={cityOption} value={cityOption}>
            {cityOption}
          </option>
        ))}
      </select>
    );
  };

  const descriptionInput = (row) => {
    const { description } = row || state;

    return <input type='text' placeholder='Description' value={description} onChange={(e) => dispatch({ type: 'DESCRIPTION', payload: e.target.value })} />;
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-2 col-sm-12'>
          <input
            type='checkbox'
            checked={state.isChecked}
            onChange={handleCheckboxChange}
            style={{ marginRight: '5px' }}
          />
          Check me
        </div>
        <div className='col-md-5 col-sm-12'>
          <label htmlFor='country'>Select Country:</label>
          <select
            id='country'
            name='country'
            className='form-select mb-4'
            style={{ width: '100%' }}
            value={state.selectedCountry}
            onChange={handleCountryChange}
            disabled={state.isChecked}
          >
            <option value=''>---Select---</option>
            <option value='India'>India</option>
            <option value='UK'>UK</option>
            <option value='USA'>USA</option>
            <option value='Canada'>Canada</option>
            <option value='Australia'>Australia</option>
            {/* Add options for other countries as needed */}
          </select>
        </div>
        <div className='col-md-5 col-sm-12'>{descriptionInput()}</div>
      </div>
      <div className='row'>
        <button type='button' onClick={handleAddRow}>
          Add Row
        </button>
      </div>

      {/* Display the table */}
      <div className='row mt-4'>
        <table className='table'>
          <thead>
            <tr>
              <th>state</th>
              <th>city</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.rows.map((row) => (
              <tr key={row.id}>
                <td>{row.showDropdown ? renderDropdown(row) : null}</td>
                <td>{row.showCityDropdown ? cityDropdown(row) : null}</td>
                <td>{descriptionInput(row)}</td>
                <td>
                  <button className='btn-warning p-1 rounded'>Edit</button>
                </td>
                <td>
                  <button className='btn-danger p-1 rounded'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddRow;
