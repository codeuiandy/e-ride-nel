import { useState } from "react";
import Modal from "react-responsive-modal";
import img from "../../assets/imgF/update_rider_success.png";
import { Button } from "../../components/buttons";
import "./modal.scss";

const ChangedBikeRider = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Modal open={showModal} onClose={closeModal} center>
      <div className="modal-wrapper">
        <div className="modal-container">
          <section className="modal-info success ta-c">
            <h3 className="success__heading">
              Successfully changed bike rider
            </h3>
            <div className="success__img--wrapper">
              <img
                src={img}
                alt="change rider success"
                className="success__img"
              />
            </div>
            <Button
              width="100%"
              text="Back to bike details"
              background="#0087ff"
              fontSize="14px"
              color="white"
            />
            <Button
              width="100%"
              text="Close"
              background="#61696F26"
              fontSize="14px"
              color="#00101d"
            />
          </section>
        </div>
      </div>
    </Modal>
  );
};

export default ChangedBikeRider;
