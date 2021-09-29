import React from "react";
import { useState } from "react";
import "./newSupportEmail.scss";
import UseOwnEmail from "./UseOwnEmail";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import { httpPostMain } from "../../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";

const NewSupportEmail = () => {
  const [defaultServer, setDefaultServer] = useState(false);
  const [state, setState] = useState({
    activeRadio: "own-server",
    mailServer: "incoming",
    mailServer: "incoming-only",
    emailSystem: "gmail",
    emailConfig: {
      tls: false,
    },
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.href = "/settings/email";
  };
  const handleShow = () => setShow(true);

  const handleServerChange = (e) => {
    if (e.target.checked) {
      setState({ ...state, activeRadio: e.target.value });
    }
  };
  const handleSubmit = async () => {
    console.clear();
    const { email, port, tls, host, password } = state.emailConfig;
    const data = {
      email: email,
      password,
      host,
      port,
      tls,
    };

    console.log("data", data);

    const res = await httpPostMain("setting/email-config", data);
    if (res?.status === "success") {
      console.clear();
      console.log(res.data);
      handleShow();
      // setDashInfo({
      //   ...dashInfo,
      //   totalTickets: parseInt(res?.data?.meta?.totalItems),
      // });
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };
  return (
    <div className="new-support-email">
      <div class="card card-body bg-white border-0 ">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            <Link to="/settings/email">
              <span className="text-custom">Email</span>{" "}
            </Link>
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            <span>New Email</span>
          </h6>
        </div>

        <div className="col-md-8">
          <h5 class="mt-3 mb-2 f-16 fw-bold">Email Settings</h5>
          <div class="form-group">
            <label for="name" class="form-label f-14">
              Name
            </label>
            <input
              type="tdiv.colext"
              class="form-control form-control-sm"
              id="name"
            />
            <p class="description-text f-12 text-muted mt-1">
              Name of the email to be used in the the ticket replies
            </p>
          </div>
          <div class="form-group mt-2">
            <label for="email" class="form-label f-14">
              Your Support email <span class="text-danger">*</span>
            </label>
            <input
              type="text"
              class="form-control form-control-sm "
              id="email"
            />
            <p class="description-text f-12 text-muted mt-1">
              This serves as your Return-to address e.g bayo@yourcompany.com
            </p>
          </div>
          {/* <div class="form-group mt-2">
            <label for="group" class="form-label f-14">
              Assign to Group
            </label>
            <select id="group" class="form-select">
              <option>--</option>
              <option>--</option>
              <option>--</option>
            </select>
            <p class="description-text f-12 text-muted mt-1">
              New tickets in this email will be automaically assigned to a group
            </p>
          </div> */}
          {/* <div class="form-group mt-2">
            <label for="support" class="form-labedl f-14">
              Link support email with a product
            </label>
            <select id="support" class="form-select">
              <option>--</option>
              <option>--</option>
              <option>--</option>
            </select>
            <p class="description-text f-12 text-muted mt-1">
              if you want to link this email to a product first{" "}
              <span>
                <a href="#" class="text-custom">
                  add product
                </a>
              </span>
            </p>
          </div> */}
          <div class="card mt-4">
            <div class="card-header p-3">
              <p class="f-16 fw-bold mb-3">Mail Server</p>
              <div class="row">
                {/* <div class="col-md-5">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        id="radio-1"
                        name="mail-radio"
                        value="default-server"
                        checked={state.activeRadio === "default-server"}
                        onChange={handleServerChange}
                      />
                      <label class="form-check-label f-14" for="radio-1">
                        Default (Alphatickets)
                      </label>
                    </div>
                  </div> */}
                <div class="col-md-7">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      name="mail-radio"
                      type="radio"
                      id="radio-2"
                      value="own-server"
                      checked={state.activeRadio === "own-server"}
                      onChange={handleServerChange}
                    />
                    <label class="form-check-label f-14" for="radio-2">
                      Use your own mail server
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {state.activeRadio === "default-server" ? (
              // Default server form start
              // ...
              // ...
              // ...
              <div class="card-body d-block" id="default">
                <div class="form-group">
                  <label for="forward-mail" class="form-label f-14">
                    Forward Your Emails to
                  </label>
                  <input
                    type="text"
                    class="form-control form-control-sm w-75"
                    id="forward-mail"
                    placeholder="--"
                  />
                  <a class=" text-custom f-12 mt-1">
                    How to convert your emails into Alphaticket tickets ?
                  </a>
                </div>
              </div>
            ) : (
              // Use own server form start
              // ...
              // ...
              // ...
              <UseOwnEmail state={state} setState={setState} />
            )}
          </div>
          <div class="d-flex justify-content-end mb-1 mt-4 save-btn">
            <Link
              to="/settings/email"
              class="btn btn-sm px-4 bg-outline-custom cancel"
            >
              Cancel
            </Link>
            <a
              class="btn btn-sm px-4 bg-custom ms-3"
              id="save-changes"
              data-bs-toggle="modal"
              data-bs-target="#successModal"
              onClick={handleSubmit}
            >
              Save
            </a>
          </div>
        </div>
      </div>

      <Modal open={show} onClose={handleClose} center>
        <div
          // class="modal fade"
          id="successModal"
          tabindex="-1"
          aria-labelledby="successModal"
          aria-hidden="false"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-4 border-0">
              <div class="modal-body text-center">
                <div class="text-center">
                  {/* <object data="../assets/alphatickets/icons/sucess.svg" class="img-fluid"></object> */}
                  <h5 class="mt-4">Successful</h5>
                  <p class="text-center">Email has been edited successfully</p>
                  <Link
                    to="/settings/email"
                    class="btn btn-sm bg-at-blue text-white px-5 f-16"
                    id="continue"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewSupportEmail;
