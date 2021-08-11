import 'bootstrap/dist/css/bootstrap.min.css';
import PickupSearchBar from './pickup/PickupSearchBar';
import PickupCards from './pickup/PickupCards';
import PickupDetails from './pickup/PickupDetails';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Navbar, Spinner } from 'react-bootstrap';
import logo from './images/sixt_logo.png';

const Loading = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(207, 207, 207, 0.6);
  z-index: 10;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #ee7f00;
  }
`;

function App({ loading }) {
  return (
    <>
      {
        loading ?
          <Loading>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Loading> :
          null
      }
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand>
            <img alt="" src={logo} width="50" height="50" className="ms-2" /> Sixt Sightseeing Tours
          </Navbar.Brand>
        </Navbar>
        <PickupDetails />
        <PickupSearchBar />
        <p className="display-6 text-center">--OR--</p>
        <PickupCards />
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(App);
