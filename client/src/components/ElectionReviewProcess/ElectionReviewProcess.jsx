import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom'

const styles = {
    card: {
        width: 300,
        margin: 20,
        cursor: 'pointer',

    },

    container: {
        // backgroundColor: "red",

    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    text_a: {
        fontSize: 14,
        textAlign: 'left'
    },
    text_b: {
        fontSize: 14,
        textAlign: 'center'
    },

    pos: {
        marginBottom: 12,
    },
    paper: {
        textAlign: 'center',
    },

};



function SimpleCard(props) {
    const { classes } = props;
    const bull = <span className={classes.bullet}>•</span>;
    const allElection = [
        { noOfDevision: "09", election: "Provincial Council 2019", noOfTeams: "15" },
        // { noOfDevision: "25", election: "Local Authority 2019", noOfTeams: "08" },
        // { noOfDevision: "01", election: "Presidential Election", noOfTeams: "10" },
        // { noOfDevision: "23", election: "Parliamentary Election", noOfTeams: "07" }
    ];

    return (
        allElection.map(row => 
        <Card className={classes.card} md={3} xs={6} sm={3}>
            <Link to="/election-process-review/1" >
                <CardContent >
                    <Grid className={classes.container} container spacing={24}>
                        <Grid item >
                            <Typography className={classes.text_a} component="p">
                                <b>{row.election}</b>
                            </Typography>
                            <br />
                            <Typography className={classes.text_a} component="p">
                                No of Divisions : {row.noOfDevision}
                        </Typography>

                            <Typography className={classes.text_a} component="p">
                                No of Teams : {row.noOfTeams}

                            </Typography>
                        </Grid>

                    </Grid>

                </CardContent>
            </Link>
        </Card >
        )
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
