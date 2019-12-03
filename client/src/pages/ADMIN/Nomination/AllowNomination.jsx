import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from '../../../components/MainMenu/MainMenu';
import Axios from 'axios';
import CheckboxTable from '../../../components/CheckboxTable/CheckboxTable';
import { Button, FormGroup, Paper, Card, CardContent, CardActionArea, CardActions } from '@material-ui/core';


const styles = theme => ({
    content: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.drawer.width,
            flexShrink: 0,
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
    }
});

class AllowNomination extends React.Component {

    state = {
        open: true,
        rowHeaders: [],
        columnHeaders: [],
    };

    componentDidMount() {
        //
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }


    render() {
        const { classes } = this.props;

        let columnHeaders = [
            {
                id: 'Division-1-id',
                name: 'Division-1'
            },
            {
                id: 'Division-2-id',
                name: 'Division-2'
            }, {
                id: 'Division-3-id',
                name: 'Division-3'
            },
            {
                id: 'Division-4-id',
                name: 'Division-4'
            }
        ];

        let rowHeaders = [{
            id: 'Party-1-id',
            name: 'Party-1'
        }, {
            id: 'Party-2-id',
            name: 'Party-2'
        }, {
            id: 'Party-3-id',
            name: 'Party-3'
        }, {
            id: 'Party-4-id',
            name: 'Party-4'
        }];

        let nomination_setup = [
            {
                'election_id': 0,
                'team_id': 'Party-2',
                'division_id': 'Division-3'
            },
            {
                'election_id': 0,
                'team_id': 'Party-3',
                'division_id': 'Division-3'
            },
            {
                'election_id': 0,
                'team_id': 'Party-4',
                'division_id': 'Division-2'
            },
            {
                'election_id': 0,
                'team_id': 'Party-1',
                'division_id': 'Division-1'
            },
        ]


        return (

            <div className={classes.root}>
                <CssBaseline />
                <MainMenu title="Election Commission of Sri Lanka" ></MainMenu>

                <div className={classes.content}>
                    <Card>
                        <CardContent>
                            {/* all the content should go here.. */}
                            <form ref="form" onSubmit={this.handleSubmit}>
                                <CheckboxTable title="Allow Nominations" data={nomination_setup} cols={columnHeaders} rows={rowHeaders}></CheckboxTable>
                                <div className={classes.buttons}>
                                    <Button variant="contained" type="small" color="primary" className={classes.button} color="primary">Cancel</Button>
                                    <Button variant="contained" type="submit" color="primary" className={classes.button} color="primary">Submit</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div >
        );
    }
}

AllowNomination.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllowNomination);
