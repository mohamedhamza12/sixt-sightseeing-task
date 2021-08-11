import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import useDebounce from '../customhooks/use-debounce';
import { setSelectedPickup } from './actions';

const SearchContainer = styled.div`
    width: 100%;
    padding: 20px;
    position: relative;
`;

const SearchBarIconContainer = styled.div`
    background-color: #fff;
    border-radius: 10px 0 0 ${props => props.bottomRounded ? '10px' : '0'};
`;

const SearchBar = styled.input`
    border-left: none;
    border-radius: 0 10px ${props => props.bottomRounded ? '10px' : '0'} 0;
`;

const SearchMenu = styled.ul`
    max-height: 25vh;
    width: calc(100% - 40px);
    border-radius: 0 0 10px 10px;
    position: absolute;
    z-index: 2;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;

    li {
        cursor: pointer;
    }
    li:hover {
        background-color: #c2c2c2;
    }
`;

const PickupSearchBar = ({ selectedPickupLocation, setSelectedPickup }) => {
    const [searchBarValue, setSearchBarValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [autocompleteQuery, setAutocompleteQuery] = useState('');

    const searchMenuRef = useRef(null);

    useEffect(() => {
        if (autocompleteQuery !== '') {
            fetch(`https://www.mydriver.com/api/v5/locations/autocomplete?searchString=${autocompleteQuery}`)
                .then(res => res.json())
                .then(data => setSearchResults(data));
            setAutocompleteQuery('');
        }
    }, [autocompleteQuery]);

    const updateSearchMenu = value => {
        if (value)
            setAutocompleteQuery(value);
        else
            setSearchResults([]);
    }

    const debouncer = useDebounce(updateSearchMenu, 500);
    return (
        <div>
            <SearchContainer>
                <div className="input-group">
                    <SearchBarIconContainer className="input-group-text" bottomRounded={!searchResults.length}><FontAwesomeIcon icon={faSearch} /></SearchBarIconContainer>
                    <SearchBar className="form-control" bottomRounded={!searchResults.length} type="text" placeholder="Search for a pickup location..." value={searchBarValue}
                        onChange={e => {
                            setSearchBarValue(e.target.value);
                            debouncer(e.target.value);
                        }}
                    />
                </div>
                {searchResults.length ?
                    <SearchMenu ref={searchMenuRef} className="list-group text-start">
                        {searchResults.map((result, i) =>
                            <li className="list-group-item p-1 ps-5" key={i}
                                onClick={() => {
                                    setSearchBarValue('');
                                    setSearchResults([]);
                                    setSelectedPickup({
                                        name: result.label,
                                        googlePlaceId: result.placeId,
                                        address: result.address
                                    });
                                }}>{result.label}</li>)}
                    </SearchMenu> :
                    null}
            </SearchContainer>
        </div>
    );
}

const mapStateToProps = state => ({
    selectedPickupLocation: state.selectedPickupLocation
});

const mapDispatchToProps = dispatch => ({
    setSelectedPickup: (location) => dispatch(setSelectedPickup(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(PickupSearchBar);