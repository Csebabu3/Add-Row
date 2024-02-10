import React, { useReducer } from 'react';

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
        }
        else {
            alert('Please fill in all fields and check the checkbox before adding a row.');
        }
    };


    const handleCheckboxChange = () => {
        dispatch({ type: 'TOGGLE_CHECKBOX' });
    };

    const getStatesForCountry = (country) => {
        const stateMap = {
            India: ['Delhi', 'Mumbai', 'Chennai'],
            UK: ['London', 'Manchester', 'Birmingham'],
            USA: ['NewYork', 'LosAngeles', 'Chicago'],
            Canada: ['Toronto', 'Vancouver', 'Montreal'],
            Australia: ['Sydney', 'Melbourne', 'Brisbane'],
        };

        return stateMap[country] || [];
    };

    const getCityForState = (state) => {
        const cityMap = {
            Chennai: ['Thanjavur', 'kovai', 'selam'], Mumbai: ['m1', 'm2', 'm3'], Delhi: ['d1', 'd2', 'd3'],
            London: ['Camden', 'Fulham', 'Islington'], Manchester: ['M1', 'M2', 'M3'], Birmingham: ['b1', 'b2', 'b3'],
            Chicago: ['Bergen', 'Genesee', 'Binghamton'], LosAngeles: ['l1', 'l2', 'l3'], NewYork: ['n1', 'n2', 'n3'],
            Toronto: ['Brampton', 'Markham', 'Pickering'], Vancouver: ['v1', 'v2', 'v3'], Montreal: ['m1', 'm2', 'm3'],
            Sydney: ['Illawarra-Shoalhaven', ' Central Coast', 'Western Parkland'], Melbourne: ['m1', 'm2', 'm3'], Brisbane: ['b1', 'b2', 'b3']
        };

        return cityMap[state] || [];
    };

    const handleCountryChange = (e) => {
        dispatch({ type: 'SELECT_COUNTRY', payload: e.target.value });
    };

    const renderDropdown = () => {
        const { selectedCountry, selectedState } = state;

        return (
            <select
                value={selectedState}
                className='form-select'
                style={{ width: '100%' }}
                onChange={(e) => dispatch({ type: 'SELECT_STATE', payload: e.target.value })}
            // disabled={isChecked}
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

    const cityDropdown = () => {
        const { selectedState, selectedCity } = state;

        return (
            <select
                value={selectedCity}
                className='form-select'
                style={{ width: '100%' }}
                onChange={(e) => dispatch({ type: 'SELECT_CITY', payload: e.target.value })}
            // disabled={isChecked}
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
    const description = () => {
        return (
            <input type='text' placeholder='Description' />
        )
    }

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
                <div className='col-md-5 col-sm-12'>
                    <input
                        type='text'
                        className='form-control mt-2'
                        placeholder='Description'
                        style={{ width: '100%' }}
                        value={state.description}
                        onChange={(e) => dispatch({ type: 'DESCRIPTION', payload: e.target.value })}
                        disabled={state.isChecked}
                    />
                </div>
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
                        <tr>
                            <td>{state.showDropdown ? renderDropdown() : null}</td>
                            <td>{state.showCityDropdown ? cityDropdown() : null}</td>
                            <td>{description()}</td>
                            {/* <td><button className='btn-primary p-1 rounded'>Save</button></td> */}
                            <td><button className='btn-warning p-1 rounded'>Edit</button></td>
                            <td><button className='btn-danger p-1 rounded'>Delete</button></td>
                        </tr>
                        {state.rows.map((row) => (
                            <tr key={row.id}>
                                <td>{row.showDropdown ? renderDropdown() : row.state}</td>
                                <td>{row.showCityDropdown ? cityDropdown() : row.city}</td>
                                <td>{row.description ? description() : row.description}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}

export default AddRow;