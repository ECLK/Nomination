import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import CheckboxTable from '../../components/CheckboxTableElectionReview/CheckboxTable';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { getFieldOptions,getElectoratesData,getEligibilityData } from './state/ElectionAction';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

const styles = theme => ({
    content: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.drawer.width,
            flexShrink: 0,
            paddingLeft: theme.spacing.unit
        },
    },
    button: {
        marginRight: theme.spacing.unit,
        right: 0
    },
    buttons: {
        margin: theme.spacing.unit
    },
    topBottomSpace: {
        marginBottom: 15
    },
    
});

class AllowNomination extends React.Component {

    state = {
        open: true,
        rowHeaders: [],
        columnHeaders: [],
    };

    handleSubmit = (e) => {
        e.preventDefault()
    }

    componentDidMount() {
        const { getElectoratesData,getEligibilityData} = this.props;
        getElectoratesData(this.props.match.params.electionId);
        getEligibilityData(this.props.match.params.electionId);

    }

    render() {
        const { classes,electionData,errorTextElectorates ,rowData,rowHeaders} = this.props;
        const data = rowHeaders.map((record) => {
            record.id = record.team_id;
            record.name = record.team_name;
            return record;
          });

        let nomination_setup = [
            {
                'election_id': electionData.election_id,
                'team_id': 'Party-1',
                'division_id': '16ab500d-31b1-4176-bfa3-42e766e9d691'
            },
            {
                'election_id': electionData.election_id,
                'team_id': 'Party-2',
                'division_id': '1a29913e-3bc4-4a48-a35e-88f8a874e623'
            },
            {
                'election_id': electionData.election_id,
                'team_id': 'Party-3',
                'division_id': '21b9752f-8641-40c3-8205-39a612bf5244'
            },
            {
                'election_id': electionData.election_id,
                'team_id': 'Party-4',
                'division_id': '3ab3cf77-a468-41a8-821a-8aa6f38222ad'
            },
        ]

        return (

            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka" ></AdminMenu>
                {(errorTextElectorates) ? <Typography style={{color:'red'}} variant="subtitle1" gutterBottom>Select electorates before finish</Typography> : ''}
                <div style={{marginTop:-78}} className={classes.content}>
                        {/* <CardContent> */}
                            <form ref="form" onSubmit={this.handleSubmit}>
                                <CheckboxTable  data={nomination_setup}  rows={rowHeaders} rowData={rowData}></CheckboxTable>
                            </form>
                        {/* </CardContent> */}
                </div>
            </div >
        );
    }
}

AllowNomination.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election,Nomination }) => {
    const electionData = Election.electionData;
    const CallElectionData = Election.CallElectionData;
    const rowData = Election.electionElectorates;
    const rowHeaders = Nomination.partyList;

    return {  electionData,CallElectionData ,rowData,rowHeaders}
  };

const mapActionsToProps = {
    getFieldOptions,
    getElectoratesData,
    getEligibilityData
  };
  
  
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(withRouter(AllowNomination)));
