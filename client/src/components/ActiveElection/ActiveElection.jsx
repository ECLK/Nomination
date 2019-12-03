import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    text_a: {
        fontSize: 14,
        textAlign:'left'
    },
    text_b: {
        fontSize: 14,
        textAlign:'center'
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

    return (
        <Card className={classes.card}>
            <CardContent>
                <Grid container spacing={24}>
                    <Grid item xs={6} sm={3}>
                        <Typography className={classes.text_a}  component="p">
                            Parliamentary All Island
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography className={classes.text_b}  component="p">
                            Created By: Mr.Abc
                        </Typography>
                    </Grid>

                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={6} sm={3}>

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography className={classes.text_b}  component="p">
                            Last Modify : 2018-05-12 04.30.22
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Typography className={classes.text_a}  component="p">
                            Pending Approval
                            <Button size="small">Edit</Button>
                        </Typography>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
