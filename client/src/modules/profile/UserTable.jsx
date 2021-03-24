import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import CustomToolbar from "./CustomToolbar";
import CustomToolbarEdit from "./CustomToolbarEdit";
// import CustomToolbarDelete from "./CustomToolbarDelete";
import PropTypes from "prop-types";
import {getTeams } from '../nomination/state/NominationAction';
import {getUserList } from './state/ProfileAction';
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
        const { classes, CandidateList } = this.props;
        const rows = CandidateList;
        console.log("CandidateList", CandidateList);

        const columns = [
            {
                name: "ID",
                options: {
                    display: false
                }
            },
            {
                name: "User Name",
                options: {
                    display: true
                }
            },
            {
                name: "Email",
                options: {
                    display: true
                }
            },
            {
                name: "Party",
                options: {
                    display: true
                }
            },
            {
                name: "Action",
                options: {
                    filter: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <Grid container className={classes.grid} direction="row" justify="flex-start" alignItems="stretch" spacing={12}>
                                <Grid item lg={6}>
                                    <CustomToolbarEdit
                                        className={classes.grid}
                                        value={value}
                                        index={tableMeta.rowData[0]}
                                        change={event => updateValue(event)}
                                        modalType="Update"
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    {/* <CustomToolbarDelete
                                        className={classes.grid}
                                        value={value}
                                        index={tableMeta.rowData[0]}
                                        change={event => updateValue(event)}
                                        customProps={customProps}
                                        modalType="Delete"
                                    /> */}
                                </Grid>
                            </Grid>
                        );
                    },
                }
            },
        ]


        // const outputData = rows.map(Object.values);
        const { userList,partyList } = this.props;
       
        // console.log(partyMap);
        // debugger;
        function getParty(id){
            const partyMap = {};
            for (var j = 0; j < partyList.length; j++) {
                partyMap[partyList[j].team_id] = partyList[j]
            }
            
            return partyMap[id] ? partyMap[id].team_name : ""
        }

        let data = userList.map(obj=>{
            return [
                obj.id, 
                obj.name, 
                obj.email,
                getParty(obj.party),
                obj.action
            ]
        });
        // let data = userList.map(x => Object.values(x));

        // const data = outputData;
        // const data = [
        //     ["1", "Yujith", "ujith@gmail.com", "UPFA", "Business Analyst"],
        //     ["234", "Clemant", "clem@gmail.com", "UNP", "Business Analyst"],
        //     ["3", "Umayanga", "umayanga@gmail.com", "JVP", "Business Analyst"]]
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
                title={"User list"}
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

