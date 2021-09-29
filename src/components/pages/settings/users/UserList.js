import {useState, useEffect} from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import {Dropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {TablePagination} from '@material-ui/core';
import {getPaginatedUsers} from '../../../../reduxstore/actions/userActions';
import CreateUserModal from './components/CreateUserModal';
import ImportUserModal from './components/ImportUserModal';
import InviteUserModal from './components/InviteUserModal';
import {ReactComponent as DotSvg} from '../../../../assets/icons/dots.svg';
import {ReactComponent as DeleteSvg} from '../../../../assets/icons/Delete.svg';
import {ReactComponent as DeleteGreySvg} from '../../../../assets/icons/Delete-grey.svg';
import {ReactComponent as ArrowDownSvg} from '../../../../assets/icons/arrow-down.svg';
import {Link} from 'react-router-dom';
// import moment from 'moment';,
// import {ReactComponent as CardDesignSvg} from '../../../../assets/icons/Card-Design.svg';
import Swal from 'sweetalert2';
import {wordCapitalize} from '../../../../helper';


import '../../../../styles/Setting.css';
const UserList = ({users, meta, getPaginatedUsers, isUsersLoaded, agents, isAgentsLoaded, groups}) => {
    const [createModalShow,
        setCreateModalShow] = useState(false);
    const [inviteModalShow,
        setInviteModalShow] = useState(false);
    const [importModalShow, setImportModalShow] = useState(false);
    const [changingRow, setChangingRow] = useState(false);
    const [userLoading, setUserLoading] = useState(false);

    /* useEffect(() => {
            setUserLoading(!isUsersLoaded);
            if (isUsersLoaded) {
                setChangingRow(false);
            }
    }, [isUsersLoaded]); */

    useEffect(() => {
        setUserLoading(!isAgentsLoaded);
        if (isAgentsLoaded) {
            setChangingRow(false);
        }
}, [isAgentsLoaded]);


    const AlphacxMTPagination = props => {
        const {
            ActionsComponent,
            onChangePage,
            onChangeRowsPerPage,
            ...tablePaginationProps
        } = props;
        
        return (
        <TablePagination
            {...tablePaginationProps}
            rowsPerPageOptions={[10, 20, 30]}
            rowsPerPage={meta?.itemsPerPage || 5}
            count={Number(meta?.totalItems || 20)}
            page={(meta?.currentPage || 1) - 1}
            onPageChange={onChangePage}
            // when the number of rows per page changes
            onRowsPerPageChange={event => {
                        setChangingRow(true);
                        getPaginatedUsers(event.target.value, 1);
                        }}
            ActionsComponent={(subprops) => {
                const { onPageChange, ...actionsComponentProps } = subprops;
                return (
                    <ActionsComponent
                    {...actionsComponentProps}
                    onChangePage={(event, newPage) => {
                        // fetch tickets with new current page
                        getPaginatedUsers(meta.itemsPerPage, newPage + 1);
                        }}
                    onRowsPerPageChange={event => {
                        // fetch tickets with new rows per page
                        getPaginatedUsers(event.target.value, meta.currentPage);
                    }}
                    />
                );
                }}
        />
    )}


    const tableTheme = createTheme({
        palette: {
            primary: {
            main: 'rgba(0, 98, 152)',
            },
            secondary: {
                main: 'rgba(0, 98, 152)',
            },
        },
    });

    function handleActiveChange () {
        const {name, isActivated} = this;

        Swal.fire({
            title: isActivated ? 'Deactivate?' : 'Activate?',
            text: `Do you want to ${isActivated ? 'deactivate' : 'activate'} ${wordCapitalize(name)}`,
            showCancelButton: true,
            confirmButtonColor: '#006298',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
                console.log('Deactivate or  user');
            } else {
                console.log('Do nothing');
            }
          })
    }

    return (
        <div>
            {userLoading && <div className="cust-table-loader"><ScaleLoader loading={userLoading} color={"#006298"}/></div>}
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <div id="mainContentHeader">
                    <span className="text-muted f-14">
                        <Link to="/settings">Settings</Link>&nbsp;&nbsp;&nbsp;
                        <i className="bi bi-chevron-right"></i>&nbsp;&nbsp;&nbsp;
                        <span>Users</span>
                    </span>
                </div>

                <h5 className="my-3 f-16 fw-500 text-dark">User Management</h5>
                <div className="d-flex justify-content-between align-items-center flex-row">
                    <div>
                        <p className="w-50 text-custom-gray f-12">Service level Agreement(SLA) Policies
                            help you setup and maintain targets for the duration within which your teams
                            respond and resolve rickets. Learn more</p>
                        <p className="text-custom-gray f-12">
                            <i className="bi bi-info-circle"></i>The first matching SLA policy will be
                            applied to tickets with matching conditions</p>
                    </div>
                    <div>
                        <Dropdown className="new-user-dropdown" id="new-user-dropdown">
                            <Dropdown.Toggle
                                id="dropdown-basic"
                                className="btn btn-custom btn-sm dropdown-toggle px-3 bg-at-blue-light">
                                <span>New User</span> <ArrowDownSvg />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="f-12">
                                <Dropdown.Item as="button" onClick={() => setCreateModalShow(true)}><span className="black-text">New User</span></Dropdown.Item>
                                <Dropdown.Item
                                    className="text-muted"
                                    as="button"
                                    onClick={() => setInviteModalShow(true)}>Invite User</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className="form-group">
                    {/* <input
                        type="search"
                        className="form-control search-bar form-control-sm w-50 ps-5 f-12"
                        placeholder="Search agents"/> */}
                </div>

                <div id="alphacxMTable" className="mb-3 acx-user-table">
                    {(agents && !changingRow) && <MuiThemeProvider theme={tableTheme}>
                        <MaterialTable
                            title = ""
                            icons = {
                                tableIcons
                            }
                            columns = {
                                [
                                    {
                                        title: 'Name',
                                        field: 'name',
                                        render: rowData => <Link to={`/settings/profile/${rowData.contact.id}`} style={{ textTransform: 'capitalize' }}>{`${rowData.name}`}</Link>,
                                        width: '10%'
                                    }, {
                                        title: 'Email Address',
                                        field: 'emailAddress'
                                    }, {
                                        title: 'Role',
                                        field: 'role'
                                    }, {
                                        title: 'Team',
                                        field: 'group'
                                    }, {
                                        title: 'Created',
                                        field: 'created'
                                    }, {
                                        title: 'Active',
                                        field: 'action',
                                        render: rowData => (<div class="form-check form-switch">
                                                <input className="form-check-input form-check-input-lg mt-1" checked={rowData.isActivated} onChange={handleActiveChange.bind({name: rowData.name, isActivated: rowData.isActivated})} readOnly={true} type="checkbox"/>
                                            </div>)
                                    }, {
                                    title: '',
                                    field: 'dropdownAction',
                                    render: rowData => (<div><DeleteGreySvg /></div>)
                                    // render: rowData => (<Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                                    //                             <Dropdown.Toggle variant="transparent" size="sm">
                                    //                                 <span className="cust-table-dots"><DotSvg/></span>
                                    //                             </Dropdown.Toggle>
                                    //                             <Dropdown.Menu>
                                    //                                 <Dropdown.Item eventKey="1"><Link to="/settings/users/personal-info-settings"><span className="black-text">Edit</span></Link></Dropdown.Item>
                                    //                                 <Dropdown.Item eventKey="2"><span className="black-text">Delete</span></Dropdown.Item>
                                    //                             </Dropdown.Menu>
                                    //                         </Dropdown>)
                // render: rowData => (<div><span className="cust-table-dots"><DotSvg/></span></div>)
            }
                                ]
                            }
                            data = {agents.map(({firstname,
                                lastname,
                                role,
                                company,
                                email,
                                group,
                                created_at,
                                isActivated,
                                id,
                                group_id
                                }) => ({
                                name: `${firstname} ${lastname}`,
                                emailAddress: email,
                                role,
                                // group: 'Head Office',
                                group: groups.filter(x => x.id === group_id)[0]?.name ? groups.filter(x => x.id === group_id)[0]?.name : 'Head Office',
                                // created: moment(created_at).format('DD MMM, YYYY'),
                                created: '13 Apr 2021',
                                contact: {firstname, lastname, id},
                                isActivated
                            }))
                            }
                            options = {{
                                search: false,
                                selection: true,
                                // exportButton: true,
                                tableLayout: 'auto',
                                paging: true,
                                pageSize: meta?.itemsPerPage || 10,
                                headerStyle: {
                                    backgroundColor: '#f8f9fa'
                                },
                                rowStyle: {
                                    // backgroundColor: '#f8f9fa'
                                }
                                // filtering: true
                            }}
                            components={{ 
                                // Pagination: AlphacxMTPagination
                            }}
                        />
                    </MuiThemeProvider>}
                </div>

                {/* <div className="text-center empty-state" id="agent-empty">
                    <CardDesignSvg/>
                    <p className="text-center f-16">
                        You currently have no Agent record at
                        <br/>
                        the moment
                    </p>
                    <button
                        className="btn btn-sm px-5 btn-custom"
                        onClick={() => setCreateModalShow(true)}>
                        New User
                    </button>
                </div> */}
            </div>

        <CreateUserModal createModalShow={createModalShow} setCreateModalShow={setCreateModalShow} />
        <InviteUserModal inviteModalShow={inviteModalShow} setInviteModalShow={setInviteModalShow} />
        <ImportUserModal importModalShow={importModalShow} setImportModalShow={setImportModalShow} />

        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    users: state.user.users,
    meta: state.user.meta,
    isUsersLoaded: state.user.isUsersLoaded,
    agents: state.agent.agents,
    isAgentsLoaded: state.agent.isAgentsLoaded,
    groups: state.group.groups
})

export default connect(mapStateToProps, {getPaginatedUsers})(UserList);