import { useState } from "react";
import Modal from "react-responsive-modal";
import successImg from "../../assets/imgF/update_profile_success.png";
import "./modal.scss";
import { Button } from "../../components/buttons";
import styles from "./modal.scss";

const CreatedNewRider = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <Modal open={!showModal} onClose={closeModal} center>
      <div className="modal-wrapper">
        <div className="modal-container">
          <section className="modal-info success">
            <h3 className="success__heading">Successfully created new rider</h3>
            <p className="success-note">An email will be sent to update them</p>
            <div className="success__img--wrapper">
              <img
                src={successImg}
                alt="profile update success"
                className="success__img"
              />
            </div>
            <Button
              className="modal-btn"
              text="Create another rider"
              background="#0087ff"
              fontSize="14px"
              color="white"
            />
            <Button
              className="modal-btn"
              text="Cancel"
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

export default CreatedNewRider;
