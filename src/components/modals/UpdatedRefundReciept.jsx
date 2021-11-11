import { useState } from "react";
import Modal from "react-responsive-modal";
import successImg from "../../assets/imgF/update_rider_success.png";
import "./modal.scss";
import { Button } from "../buttons";
import styles from "./modal.scss";

const UpdatedRefundReceipt = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(!showModal);
  const closeModal = () => setShowModal(!openModal);

  return (
    <Modal open={!openModal} onClose={closeModal} center>
      <div className="modal-wrapper">
        <div className="modal-container">
          <section className="modal-info success update-refund">
            <h3 className="success__heading">
              Successfully updated refund receipt
            </h3>
            <p className="success__note">
              An email has been sent to the accounting department for further
              processing
            </p>
            <div className="success__img--wrapper">
              <img
                src={successImg}
                alt="new rider added"
                className="success__img"
              />
            </div>
            <Button
              width="100%"
              text="Create another refund receipt"
              background="#0087ff"
              fontSize="14px"
              color="white"
            />
            <Button
              width="100%"
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

export default UpdatedRefundReceipt;
