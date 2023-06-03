import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceItem.css';

const PlaceItem = props => {
  // Access the auth context and HTTP client hook
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // Manage state for showing the map and delete confirmation modal
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Event handler for opening the map
  const openMapHandler = () => {
    setShowMap(true);
  };

  // Event handler for closing the map
  const closeMapHandler = () => {
    setShowMap(false);
  };

  // Event handler for showing the delete confirmation modal
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  // Event handler for canceling the delete operation
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  // Event handler for confirming the delete operation
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        'DELETE'
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  console.log(props.image);

  return (
    <React.Fragment>
      {/* Render the error modal */}
      <ErrorModal error={error} onClear={clearError} />

      {/* Render the map modal */}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          {/* Render the map */}
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      {/* Render the delete confirmation modal */}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>

      {/* Render the place item */}
      <li className="place-item">
        <Card className="place-item__content">
          {/* Render the loading spinner */}
          {isLoading && <LoadingSpinner asOverlay />}

          <div className="place-item__image">
            {/* Render the place item's image */}
            <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>

          <div className="place-item__info">
            {/* Render the place item's title, address, and description */}
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>

          <div className="place-item__actions">
            {/* Render the action buttons */}
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>

            {/* Render the edit button for the creator */}
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}

            {/* Render the delete button for the creator */}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
