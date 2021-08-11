import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMapMarkerAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { endLoading, resetSelectedPickup, startLoading } from './actions';
import OffersModal from './OffersModal';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';

const addTimeOffsetToDateString = dateString => {
    const timeOffsetInMinutes = -(new Date().getTimezoneOffset());
    const timeOffsetInHours = Math.floor(timeOffsetInMinutes / 60);
    const remMinutes = timeOffsetInMinutes % 60;

    let offsetString = timeOffsetInMinutes < 0 ? '-' : '+';
    offsetString += timeOffsetInHours < 10 ? '0' + timeOffsetInHours : timeOffsetInHours.toString();
    offsetString += ':';
    offsetString += remMinutes < 10 ? '0' + remMinutes : remMinutes.toString();

    return dateString + ':00' + offsetString;
};

const PickupDetails = ({ selectedPickupLocation, resetSelectedPickup, startLoading, endLoading }) => {
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');
    const [fetchResults, setFetchResults] = useState(false);
    const [firstClassOffers, setFirstClassOffers] = useState([]);
    const [vanOffers, setVanOffers] = useState([]);
    const [openOffersModal, setOpenOffersModal] = useState(false);

    useEffect(() => {
        if (fetchResults) {
            const body = {
                originPlaceId: selectedPickupLocation.googlePlaceId,
                selectedStartDate: addTimeOffsetToDateString(startTime),
                duration: duration,
                type: "DURATION"
            }
            fetch('https://www.mydriver.com/api/v5/offers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.length) {
                        setFirstClassOffers(data.filter(offer => offer.vehicleType.name === "FIRST_CLASS"));
                        setVanOffers(data.filter(offer => offer.vehicleType.name === "BUSINESS_VAN"));
                    } else {
                        setFirstClassOffers([]);
                        setVanOffers([]);
                    }

                    setOpenOffersModal(true);
                })
                .catch(e => console.error(e))
                .finally(() => {
                    endLoading();
                    setFetchResults(false);
                });
        }
    }, [fetchResults]);


    return (
        <>
            <div className="d-flex justify-content-evenly align-items-center p-4">
                <div className="d-flex flex-column">
                    <div>Pickup Location</div>
                    <div>
                        <OverlayTrigger placement="bottom" delay={500} overlay={
                            selectedPickupLocation.name ?
                                <Popover>
                                    <>
                                        <Popover.Title>
                                            Address
                                </Popover.Title>
                                        <Popover.Content>
                                            {selectedPickupLocation.address}
                                        </Popover.Content>
                                    </>
                                </Popover> :
                                <span></span>
                        }>
                            <span className="badge fs-5 bg-secondary">
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> {selectedPickupLocation.name} {selectedPickupLocation.name ? <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faTimesCircle} onClick={() => resetSelectedPickup()} /> : null}
                            </span>
                        </OverlayTrigger>

                    </div>
                </div>
                <div className="d-md-flex flex-md-column mt-md-2 d-none">
                    <div className="flex-grow-1"></div>
                    <div className="text-secondary"><FontAwesomeIcon icon={faArrowRight} size="3x" /></div>
                </div>
                <div className="d-flex flex-column">
                    <div>Start Time</div>
                    <div><input disabled={selectedPickupLocation.name === null} className="form-control" placeholder="Start Time" type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} /></div>
                </div>
                <div className="d-md-flex flex-md-column mt-md-2 d-none">
                    <div className="flex-grow-1"></div>
                    <div className="text-secondary"><FontAwesomeIcon icon={faArrowRight} size="3x" /></div>
                </div>
                <div className="d-flex flex-column">
                    <div>Duration (minutes)</div>
                    <div><input disabled={startTime === ''} value={duration} onChange={e => setDuration(e.target.value)} className="form-control" type="number" /></div>
                </div>
                <div className="d-flex flex-column mt-3">
                    <div className="flex-grow-1"></div>
                    <div><button disabled={duration === ''} className="btn btn-success"
                        onClick={() => {
                            startLoading();
                            setFetchResults(true);
                        }}>Go!</button></div>
                </div>
            </div>
            <OffersModal openOffersModal={openOffersModal} setOpenOffersModal={setOpenOffersModal}
                firstClassOffers={firstClassOffers} vanOffers={vanOffers} />
        </>
    );
}

const mapStateToProps = state => ({
    selectedPickupLocation: state.selectedPickupLocation
});

const mapDispatchToProps = dispatch => ({
    resetSelectedPickup: () => dispatch(resetSelectedPickup()),
    startLoading: () => dispatch(startLoading()),
    endLoading: () => dispatch(endLoading())
});

export default connect(mapStateToProps, mapDispatchToProps)(PickupDetails);