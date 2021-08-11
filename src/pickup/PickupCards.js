import React, { Fragment } from 'react';
import munichHofbrauhaus from '../images/munich_hofbrauhaus.webp';
import karlsplatzStachus from '../images/karlsplatz_stachus.jpg';
import olympicTower from '../images/olympic_tower.jpg';
import englishGardens from '../images/english_gardens.jpg';
import allianzArena from '../images/allianz_arena.webp';
import nymphenburgCastle from '../images/nymphenburg_castle.jpg';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setSelectedPickup } from './actions';
import { Card, Col, Container, Row } from 'react-bootstrap';

const DEFAULT_LOCATIONS = [
    {
        name: "Munich Hofbräuhaus",
        googlePlaceId: "ChIJxfxSz4t1nkcRLxq9ze1wwak",
        address: "Hofbräuhaus München, Platzl, Munich, Germany",
        image: munichHofbrauhaus
    },
    {
        name: "Stachus",
        googlePlaceId: "EhtLYXJsc3BsLiwgTcO8bmNoZW4sIEdlcm1hbnkiLiosChQKEgkfRGon93WeRxEvZKuqIIsjnxIUChIJJ8yNql7fnUcRAKU5CaQlHQU",
        address: "Stachus, Munich, Germany",
        image: karlsplatzStachus
    },
    {
        name: "Olympic Tower",
        googlePlaceId: "ChIJU-Q6JoF2nkcRdQApBoHVU8s",
        address: "Spiridon-Louis-Ring, Munich, Germany",
        image: olympicTower
    },
    {
        name: "The English Garden",
        googlePlaceId: "ChIJayv4lZd1nkcR0e_vfGLfm8k",
        address: "Englischer Garten, Munich, Germany",
        image: englishGardens
    },
    {
        name: "Allianz Arena",
        googlePlaceId: "ChIJHyWKEoVznkcRI8QyjkJgTe0",
        address: "Allianz Arena, Werner-Heisenberg-Allee, Munich, Germany",
        image: allianzArena
    },
    {
        name: "Nymphenburg Castle",
        googlePlaceId: "ChIJLWiif8x3nkcRZm0epRZWTCc",
        address: "Schloss Nymphenburg, Schloß Nymphenburg, Munich, Germany",
        image: nymphenburgCastle
    }
];

const LocationCard = styled(Card)`
    border: ${props => props.selected ? '4px solid rgb(255, 166, 0)' : null};
    border-radius: ${props => props.selected ? '6px' : null};
    cursor: pointer;

    &:hover {
        border: ${props => props.selected ? null : '4px solid rgba(255, 166, 0, 0.3)'};
        border-radius: ${props => props.selected ? null : '6px'};
    }
`;

const CardLogo = styled(Card.Img)`
    width: 100%;
    height: 15vw;
    object-fit: cover;
`;

const PickupCards = ({ selectedPickupLocation, setSelectedPickup }) => {
    return (
        <Container>
            <Row className="mb-2">
                <Col xs={12} className="display-6">Choose From Our Featured Pickup Locations: </Col>
            </Row>
            <Row>
                {DEFAULT_LOCATIONS.map((location, i) => {
                    return (
                        <Fragment key={i}>
                            <Col xs={1}></Col>
                            <LocationCard selected={selectedPickupLocation.name === location.name} sm={12} md={4} className="col-sm-12 col-md-4 mb-3 p-0 shadow"
                                onClick={() => {
                                    setSelectedPickup(location);
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: 'smooth'
                                    });
                                }}>
                                <CardLogo variant="top" src={location.image} alt={location.name + " logo"} />
                                <Card.Body>
                                    <Card.Title>{location.name}</Card.Title>
                                    <Card.Text>{location.address}</Card.Text>
                                </Card.Body>
                            </LocationCard>
                            <Col md={1}></Col>
                        </Fragment>
                    );
                })}
            </Row>
        </Container>
    );

}

const mapStateToProps = state => ({
    selectedPickupLocation: state.selectedPickupLocation
});

const mapDispatchToProps = dispatch => ({
    setSelectedPickup: (location) => dispatch(setSelectedPickup(location))
});

export default connect(mapStateToProps, mapDispatchToProps)(PickupCards);