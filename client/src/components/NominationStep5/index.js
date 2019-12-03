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
                name: "Name of candidate",
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
            {
                name: "Occupation",
                options: {
                    display: true
                }
            },
        ]


        const outputData = rows.map(Object.values);
        const { customProps } = this.props;
        const data = outputData;
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
        };

       
        return (
            <MUIDataTable
                title={"Nomination Candidate list4"}
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

