import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import CustomToolbar from "./CustomToolbar";
import CustomToolbarEdit from "./CustomToolbarEdit";
import CustomToolbarDelete from "./CustomToolbarDelete";
import PropTypes from "prop-types";
import {getTeams } from './state/PartyAction';
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

    componentWillMount() {
        const { getTeams } = this.props;
        getTeams();
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
            //   width:500
            }
          }
        }
      })

    render() {
        const { classes, CandidateList,paymentList,partyList } = this.props;
        const rows = CandidateList;
        const columns = [
            {
                name: "ID",
                options: {
                    display: false
                }
            },
            {
                name: "Party Name",
                options: {
                    display: true
                }
            },
            {
                name: "Abbreviation",
                options: {
                    display: true
                }
            },
            {
                name: "Party Type",
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
                                    <CustomToolbarDelete
                                        className={classes.grid}
                                        value={value}
                                        index={tableMeta.rowData[0]}
                                        change={event => updateValue(event)}
                                        modalType="Delete"
                                    />
                                </Grid>
                            </Grid>
                        );
                    },
                }
            },
        ]

        function getParty(id){
            const partyMap = {};
            for (var j = 0; j < partyList.length; j++) {
                partyMap[partyList[j].team_id] = partyList[j]
            }
            
            return partyMap[id] ? partyMap[id].team_name : ""
        }
        function numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        let data = partyList.map(obj=>{
            return [
                obj.team_id, 
                obj.team_name, 
                obj.team_abbrevation,
                obj.team_party_type
            ]
        });
        // let data = userList.map(x => Object.values(x));

        // const data = outputData;
        // const data = [
        //     ["1", "Yujith", "ujith@gmail.com", "UPFA", "Business Analyst"],
        //     ["234", "Clemant", "clem@gmail.com", "UNP", "Business Analyst"],
        //     ["3", "Umayanga", "umayanga@gmail.com", "JVP", "Business Analyst"]]
        const options = {
            viewColumns:false,
            filter: false,
            download: false,
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
                title={"Party List"}
                data={data}
                columns={columns}
                options={options}
            />
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({  Party }) => {
    const partyList = Party.partyList;
    return { partyList };
};

const mapActionsToProps = {
    getTeams
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CustomizedTable));

