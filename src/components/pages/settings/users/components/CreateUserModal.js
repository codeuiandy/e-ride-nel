import {useState, useEffect} from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {NotificationManager} from 'react-notifications';
import {addAgent, getAgents, resetAgentCreated} from '../../../../../reduxstore/actions/agentActions';

const CreateUserModal = ({
    createModalShow,
    setCreateModalShow,
    isAgentCreated,
    groups,
    addAgent,
    getAgents,
    resetAgentCreated
}) => {
    const [modalInputs,
        setModalInputs] = useState({
        firstName: '',
        lastName: '',
        email: '',
        avater: '',
        phoneNumber: '',
        description: '',
        group: '',
        role: 'Agent'
    });
    const [creatingUser, setCreatingUser] = useState(false);

    const handleModalInput = e => {
        const {name, value} = e.target;
        setModalInputs(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleUserCreation = () => {
        const {firstName, lastName, email, group, role, description, phoneNumber} = modalInputs;

        if (!firstName || !lastName || !email || !group || !description || !phoneNumber) {
            // all field not available
            NotificationManager.error('All fields are required', 'Error');
        } else {
            setCreatingUser(true);
            // all fields are passed
            addAgent({firstName, lastName, email, groupId: group, role, phoneNumber, description});
        }
    }

    useEffect(() => {
        if (isAgentCreated) {
            resetAgentCreated();
            NotificationManager.success("User created successfully", 'Successful');
            getAgents();
            setModalInputs({
                firstName: '',
                lastName: '',
                email: '',
                avater: '',
                phoneNumber: '',
                description: '',
                group: '',
                role: 'Agent'
            });
            setCreateModalShow(false);
            setCreatingUser(false);
        } else {
            setCreatingUser(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAgentCreated]);

    //create user modal
    return (
        <Modal
            show={createModalShow}
            onHide={() => setCreateModalShow(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <div className="col-12 p-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="f-16">Create User Record</h3>
                        <div>
                            <button
                                type="button"
                                className="btn bg-outline-custom d-inline-block btn-sm px-5 f-12 text-at-blue-light">Import User</button>
                        </div>
                    </div>
                    <div>
                        <form action="">
                            <div className="d-flex flex-row w-100 justify-content-between mt-3">
                                <div className="form-group w-100 me-2">
                                    <label className="f-12" htmlFor="fullName">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control form-control-sm w-100"
                                        id="fullName"
                                        value={modalInputs.firstName}
                                        onChange={handleModalInput}/>

                                </div>
                                <div className="form-group w-100 ms-2">
                                    <label className="f-12" htmlFor="fullName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm w-100"
                                        id="fullName"
                                        name="lastName"
                                        value={modalInputs.lastName}
                                        onChange={handleModalInput}/>
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <label className="f-12" htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control form-control-sm"
                                    id="email"
                                    name="email"
                                    value={modalInputs.email}
                                    onChange={handleModalInput}/>
                            </div>
                            <div className="form-group mt-3">
                                <label className="f-12" htmlFor="email">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control form-control-sm"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={modalInputs.phonenumber}
                                    onChange={handleModalInput}/>
                            </div>
                            <div className="form-group mt-3">
                                <label className="f-12" htmlFor="email">Description</label>
                                <textarea
                                    className="form-control form-control-sm"
                                    id="description"
                                    name="description"
                                    onChange={handleModalInput}
                                    value={modalInputs.description}></textarea>
                            </div>
                            {/* <div className="form-group mt-3">
                                <label className="f-12" htmlFor="#role">Role</label>
                                <input type="text" className="form-control form-control-sm" id="role"/>
                            </div> */}
                            <div className="form-group mt-3">
                                <label className="f-12" htmlFor="level">Team</label>
                                {/* <input type="text" className="form-control form-control-sm" id="level"/> */}
                                <select
                                    name="group"
                                    className="form-select"
                                    onChange={handleModalInput}
                                    value={modalInputs.group}>
                                    <option value=""></option>
                                    {groups.map(({name, id}) => <option value={id}>{name}</option>)}
                                </select>
                            </div>
                            <div className="text-end">
                                <button
                                    type="button"
                                    className="btn btn-custom btn-sm float-end w-25 mt-4 mb-2"
                                    onClick={handleUserCreation}
                                    disabled={creatingUser}
                                    id="createUser">{creatingUser ? 'Creating...' : 'Create'}</button>
                            </div>
                        </form>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )
};

const mapStateToProps = (state, ownProps) => ({isAgentCreated: state.agent.isAgentCreated, groups: state.group.groups});

export default connect(mapStateToProps, {resetAgentCreated, addAgent, getAgents})(CreateUserModal);
