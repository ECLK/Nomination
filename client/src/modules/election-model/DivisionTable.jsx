import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import CustomToolbar from "./CustomToolbar";
// import CustomToolbarEdit from "./CustomToolbarEdit";
// import CustomToolbarDelete from "./CustomToolbarDelete";
import PropTypes from "prop-types";
import {getTeams } from '../../modules/nomination/state/NominationAction';
import {getUserList } from '../../modules/profile/state/ProfileAction';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    grid: {
        alignItems: "left"
    },
});



class CustomizedTable extends React.Component {

    static propTypes = {
        value: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        change: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            nominations: [],
            candidateCount: '0',
        }

    }

    componentDidMount() {
        const { getTeams,getUserList } = this.props;
        getTeams();
        getUserList();
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    getMuiTheme = () => createMuiTheme({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
              backgroundColor: "#f7f8fa",
              width:300
            }
          }
        }
      })

    render() {
        const { classes, CandidateList,electionModule } = this.props;
        const rows = CandidateList;

        const columns = [
            // {
            //     name: "ID",
            //     options: {
            //         display: false
            //     }
            // },
            {
                name: "Division Name",
                options: {
                    display: true
                }
            },
            {
                name: "Division Code",
                options: {
                    display: true
                }
            },
            {
                name: "No Of Candidates",
                options: {
                    display: true
                }
            },
        ]

        const data = electionModule.divisionConfig.map(Object.values);

        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            selectableRows: false
            // customToolbar: () => {
            //     return (
            //         <CustomToolbar customProps={customProps} modalType="Add"  />
            //     );
            // }
        };

       
        return (
            <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
                title={"Division list"}
                data={data}
                columns={columns}
                options={options}
            />
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ Profile,Nomination }) => {
    // const { getNominationCandidates } = Nomination;
    const userList = Profile.userList;
    const partyList = Nomination.partyList;
    return { userList,partyList };
};

const mapActionsToProps = {
    getTeams,
    getUserList
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CustomizedTable));

