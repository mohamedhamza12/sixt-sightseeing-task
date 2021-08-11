import React from 'react';
import styled from 'styled-components';
import { Col, Container, Image, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEuroSign, faSuitcase, faUsers } from '@fortawesome/free-solid-svg-icons';

const OfferCardWrapper = styled.div`
    background-color: #e1e3e6;
    width: 500px;
    overflow: auto;
`;

const VR = styled.div`
    position: absolute;
    margin-top: 20px;
    width: 1px;
    height: 90%;
    background-color: #e6e6e6;
`;

const BenefitsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        padding-left: 16px;
    }

    li::before {
        content: "•";
        padding-right: 8px;
        color: #ee7f00; 
    }
`;

const OfferCard = ({ offer, i }) => (
    <OfferCardWrapper key={i} className="shadow-sm mb-3 p-2 rounded">
        <Container>
            <Row style={{ height: '100px' }}>
                <Col xs={3}>
                    <Image src={offer?.vehicleType?.images?.web} alt="Car Image" fluid />
                </Col>
                <Col className="overflow-auto h-100">
                    <BenefitsList>
                        {
                            offer?.vehicleType?.benefits ?
                                offer.vehicleType.benefits.map((benefit, i) =>
                                    <li key={i}>{benefit}</li>) : null
                        }
                    </BenefitsList>
                </Col>
            </Row>
        </Container>
        <Container>
            <Row>
                <Col>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Price ({offer?.currency})</Tooltip>}>
                        <span><FontAwesomeIcon icon={faEuroSign} size="sm" color="green" /> {offer?.amount / 100}</span>
                    </OverlayTrigger>

                </Col>
                <Col>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Number of baggage</Tooltip>}>
                        <span><FontAwesomeIcon icon={faSuitcase} size="sm" color="#0ec799" /> {offer?.vehicleType?.nrOfBaggage}</span>
                    </OverlayTrigger>
                </Col>
                <Col>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Number of passengers</Tooltip>}>
                        <span><FontAwesomeIcon icon={faUsers} size="sm" /> {offer?.vehicleType?.nrOfPassengers}</span>
                    </OverlayTrigger>
                </Col>
                <Col>
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Duration (minutes)</Tooltip>}>
                        <span><FontAwesomeIcon icon={faClock} size="sm" /> {offer?.duration}</span>
                    </OverlayTrigger>
                </Col>
            </Row>
        </Container>
    </OfferCardWrapper>
);

const OffersModal = ({ openOffersModal, setOpenOffersModal, firstClassOffers, vanOffers }) => {
    return (
        <Modal show={openOffersModal} onHide={() => setOpenOffersModal(false)} centered size="xl">
            <Modal.Header>
                <Modal.Title>Sightseeing Offers</Modal.Title>
                <button className="btn-close" onClick={() => setOpenOffersModal(false)} />
            </Modal.Header>
            <Modal.Body>
                <div className=" position-relative d-flex justify-content-evenly">
                    <div className="d-flex flex-column">
                        <h5>Limousine Offers</h5>
                        {
                            firstClassOffers.length ?
                                firstClassOffers.map((offer, i) =>
                                    <OfferCard offer={offer} i={i} />
                                ) :
                                <span style={{ width: '80%' }} className=" text-center text-muted fst-italic">There are currently no limousine offers available for the selected pickup details</span>
                        }
                    </div>
                    <VR></VR>
                    <div className="d-flex flex-column">
                        <h5>Van Offers</h5>
                        {
                            vanOffers.length ?
                                vanOffers.map((offer, i) =>
                                    <OfferCard offer={offer} i={i} />
                                ) :
                                <span style={{ width: '80%' }} className="text-center text-muted fst-italic">There are currently no van offers available for the selected pickup details</span>
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default OffersModal;