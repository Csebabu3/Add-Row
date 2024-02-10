import React, { useState, useReducer } from 'react';

const initialState = {
  currentLocation: false,
  selectedCountry: '',
  selectedState: '',
  selectedCity: '',
  remarks: '',
  countries: ['USA', 'Canada', 'India'],
  states: {
    USA: ['NewYork', 'California', 'Texas'],
    Canada: ['Ontario', 'Quebec', 'BritishColumbia'],
    India: ['Delhi', 'Mumbai', 'Bangalore'],
  },
  cities: {
    NewYork: ['New York City', 'Buffalo'],
    California: ['Los Angeles', 'San Francisco'],
    Texas: ['Houston', 'Dallas'],
    Ontario: ['Toronto', 'Ottawa'],
    Quebec: ['Montreal', 'Quebec City'],
    BritishColumbia: ['Vancouver', 'Victoria'],
    Delhi: ['New Delhi', 'Old Delhi'],
    Mumbai: ['South Mumbai', 'North Mumbai'],
    Bangalore: ['Electronic City', 'Whitefield'],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHECKBOX_CHANGE':
      return {
        ...state,
        currentLocation: !state.currentLocation,
        selectedCountry: '',
        remarks: '',
      };
    case 'DROPDOWN_CHANGE':
      return {
        ...state,
        selectedCountry: action.payload,
        remarks: '',
      };
    case 'STATE_CHANGE':
      return {
        ...state,
        selectedState: action.payload,
        selectedCity: '',
      };
    case 'CITY_CHANGE':
      return {
        ...state,
        selectedCity: action.payload,
      };
    case 'REMARKS_CHANGE':
      return {
        ...state,
        remarks: action.payload,
      };
    default:
      return state;
  }
};
const FormComponents = () => {
  const [formData, dispatch] = useReducer(reducer, initialState);
  const [tableData, setTableData] = useState([]);
  const [isFormEnabled, setIsFormEnabled] = useState(true);
  const [isPreviousRowFilled, setIsPreviousRowFilled] = useState(true);


  const [editingRow, setEditingRow] = useState(null);


  const handleAddRow = () => {
    const { selectedCountry, remarks, currentLocation, selectedState, selectedCity } = formData;

    if (
      (selectedCountry || remarks || currentLocation) &&
      (!tableData.length || (selectedState && selectedCity))
    ) {
      const newRow = {
        currentLocation: currentLocation ? 'Yes' : 'No',
        selectedCountry,
        selectedState: '',
        selectedCity: '',
        remarks,
      };

      setTableData([...tableData, newRow]);
      setIsFormEnabled(false);
      setIsPreviousRowFilled(false);

      dispatch({ type: 'DROPDOWN_CHANGE', payload: selectedCountry });
      dispatch({ type: 'REMARKS_CHANGE', payload: remarks });
      dispatch({ type: 'STATE_CHANGE', payload: '' });
      dispatch({ type: 'CITY_CHANGE', payload: '' });

      // Set the editingRow to the index of the newly added row
      setEditingRow(tableData.length)

    } else {
      alert('Please fill in the required fields before adding a row.');
    }
  };


  const handleDeleteRow = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);

    if (updatedTableData.length === 0) {
      setIsFormEnabled(true);
      setIsPreviousRowFilled(true);
    }
  };
  const handleCheckboxChange = () => {
    dispatch({ type: 'CHECKBOX_CHANGE' });

    // If the checkbox is checked, set the selectedCountry to 'India' and update remarks
    if (!formData.currentLocation) {
      dispatch({ type: 'DROPDOWN_CHANGE', payload: 'India' });
      dispatch({ type: 'REMARKS_CHANGE', payload: 'India is beautiful' });
    }
  };
  const handleEditRow = (index) => {
    setEditingRow(index);

    const editedRow = tableData[index];
    dispatch({ type: 'DROPDOWN_CHANGE', payload: editedRow.selectedCountry });
    dispatch({ type: 'STATE_CHANGE', payload: editedRow.selectedState });
    dispatch({ type: 'CITY_CHANGE', payload: editedRow.selectedCity });
    dispatch({ type: 'REMARKS_CHANGE', payload: editedRow.remarks });
  };

  // const handleSaveEdit = () => {
  //   const updatedTableData = [...tableData];
  //   updatedTableData[editingRow] = {
  //     currentLocation: formData.currentLocation ? 'Yes' : 'No',
  //     selectedCountry: formData.selectedCountry,
  //     selectedState: formData.selectedState,
  //     selectedCity: formData.selectedCity,
  //     remarks: formData.remarks,
  //   };

  //   setTableData(updatedTableData);
  //   setEditingRow(null);

  // };

  const handleSaveEdit = () => {
    const { selectedState, selectedCity } = formData;

    if (selectedState && selectedCity) {
      const updatedTableData = [...tableData];
      updatedTableData[editingRow] = {
        currentLocation: formData.currentLocation ? 'Yes' : 'No',
        selectedCountry: formData.selectedCountry,
        selectedState: formData.selectedState,
        selectedCity: formData.selectedCity,
        remarks: formData.remarks,
      };

      setTableData(updatedTableData);
      setEditingRow(null);
    } else {
      alert('Please select both state and city before saving.');
    }
  };

  const handleCancelEdit = () => {
    setEditingRow(null);
    dispatch({ type: 'DROPDOWN_CHANGE', payload: '' });
    dispatch({ type: 'STATE_CHANGE', payload: '' });
    dispatch({ type: 'CITY_CHANGE', payload: '' });
    dispatch({ type: 'REMARKS_CHANGE', payload: '' });
  };


  const handleCountryChange = (e) => {
    dispatch({ type: 'DROPDOWN_CHANGE', payload: e.target.value });
  };
  return (

    <div>
      <form>
        <div className='container d-flex justify-content-around align-items-center bg-dark text-white p-5'>
          {/* <label>
          <input
            type='checkbox'
            checked={formData.currentLocation}
            onChange={() => dispatch({ type: 'CHECKBOX_CHANGE' })}
            disabled={formData.selectedCountry || !isFormEnabled}
          />
          Current Location
        </label> */}
          <label>
            <input
              type='checkbox'
              checked={formData.currentLocation}
              onChange={handleCheckboxChange}
              disabled={!isFormEnabled}
            />
            Current Location
          </label>
          <br />



          <label>
            Select Country:
            <select
              value={formData.selectedCountry}
              onChange={handleCountryChange}
              disabled={
                formData.currentLocation || !isFormEnabled
              }
            >
              {/* {formData.currentLocation ? (
                <option value='India' disabled>
                  India
                </option>
              ) : ( */}
              <>
                <option value='' disabled>
                  Select Country
                </option>
                {formData.countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </>
              {/* )} */}
            </select>
          </label>
          <br />


          {formData.currentLocation ? (

            <label>
              Remarks:
              <textarea
                disabled
                value="India is Beautiful "


              />
            </label>
          ) : (
            <>
              <label>
                Remarks:
                <textarea
                  value={formData.remarks}
                  onChange={(e) => dispatch({ type: 'REMARKS_CHANGE', payload: e.target.value })}
                  disabled={formData.currentLocation || !isFormEnabled}
                />
              </label>
            </>
          )}

          <br />
        </div>
      </form>

      <div className='container p-3'>
        <button
          type='button'
          onClick={handleAddRow}
          className='btn btn-primary float-right mb-3'
          disabled={editingRow !== null}
        >
          Add Row
        </button>
      </div>
      <table className='table text-center'>
        <thead>
          <tr>
            <th>Selected Country</th>
            <th>Selected State</th>
            <th>Selected City</th>
            <th>Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className={editingRow === index ? 'editing' : ''}>
              <td>{row.selectedCountry}</td>
              <td>
                <select
                  value={row.selectedState}
                  className={editingRow === index ? 'secondary' : 'dark'}
                  onChange={(e) => {
                    const updatedTableData = [...tableData];
                    updatedTableData[index].selectedState = e.target.value;
                    updatedTableData[index].selectedCity = ''; // Reset selectedCity when changing the state
                    setTableData(updatedTableData);
                    dispatch({ type: 'STATE_CHANGE', payload: e.target.value });
                  }}
                  disabled={editingRow === index ? false : true}
                >
                  <option value=''>Select State</option>
                  {formData.states[row.selectedCountry]?.map((state) => (
                    <option key={state} value={state} >
                      {state}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={row.selectedCity}
                  className={editingRow === index ? 'secondary' : 'dark'}
                  onChange={(e) => {
                    const updatedTableData = [...tableData];
                    updatedTableData[index].selectedCity = e.target.value;
                    setTableData(updatedTableData);
                    dispatch({ type: 'CITY_CHANGE', payload: e.target.value });
                  }}
                  disabled={editingRow === index ? false : true}
                >
                  <option value=''>Select City</option>
                  {formData.cities[row.selectedState]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </td>
              <td>{row.remarks}</td>
              <td>

                {editingRow === index ? (

                  <>
                    <button
                      className='btn btn-success me-3'
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className='btn btn-secondary'
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </>
                ) : (

                  <>
                    <button
                      className='btn btn-success me-3'
                      onClick={() => handleEditRow(index)}
                    >
                      Edit
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDeleteRow(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
};

export default FormComponents;


