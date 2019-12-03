import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";
import CustomToolbarEdit from "./CustomToolbarEdit";
import CustomToolbarDelete from "./CustomToolbarDelete";
import PropTypes from "prop-types";
import { getNominationCandidates } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { de } from 'date-fns/locale';


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
        const { customProps, getNominationCandidates } = this.props;
        getNominationCandidates(customProps);
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

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
                name: "NIC",
                options: {
                    display: true
                }
            },
            {
                name: "Full Name",
                options: {
                    display: true
                }
            },
            {
                name: "Preferred Name",
                options: {
                    display: true
                }
            },
            {
                name: "Date of Birth",
                options: {
                    display: true
                }
            },
            {
                name: "Gender",
                options: {
                    display: true
                }
            },
            {
                name: "Occupation",
                options: {
                    display: true
                }
            },
            {
                name: "Address",
                options: {
                    display: true
                }
            },
            // {
            //     name: "Electoral Division",
            //     options: {
            //         display: true
            //     }
            // },
            // {
            //     name: "Electoral Division Code",
            //     options: {
            //         display: true
            //     }
            // },
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
                                        customProps={customProps}
                                        modalType="Update"
                                    />
                                </Grid>
                                <Grid item lg={6}>
                                    <CustomToolbarDelete
                                        className={classes.grid}
                                        value={value}
                                        index={tableMeta.rowData[0]}
                                        change={event => updateValue(event)}
                                        customProps={customProps}
                                        modalType="Delete"
                                    />
                                </Grid>
                            </Grid>
                        );
                    },
                }
            },
        ]


        const outputData = rows.map(Object.values);
        const { customProps } = this.props;
        const data = outputData;
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            customToolbar: () => {
                return (
                    <CustomToolbar customProps={customProps} modalType="Add"  />
                );
            }
        };

       
        return (
            <MUIDataTable
                title={"Candidates list"}
                data={data}
                columns={columns}
                options={options}
            />
        );
    }
}

const mapStateToProps = ({ Nomination }) => {
    const { getNominationCandidates } = Nomination;
    const CandidateList = Nomination.getNominationCandidates;
    return { getNominationCandidates, CandidateList };
};

const mapActionsToProps = {
    getNominationCandidates
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CustomizedTable));

