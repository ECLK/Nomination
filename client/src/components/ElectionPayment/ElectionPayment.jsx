import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const paymentStatus = [
    {
      value: 'PENDING',
      label: 'PENDING',
    },
    {
      value: 'APPROVED',
      label: 'APPROVED',
    },
    {
      value: 'REJECTED',
      label: 'REJECTED',
    },
  ];
class TextFields extends React.Component {
    state = {
      open: true,
      payments: {
          
      },
    //   depositor:'test',
    //   depositAmount:'test4',
    //   depositeDate:'test',
    //   paymentStatus:'test',

    };

    // handleChange = (name) => event => {
    //     console.log(event.target.value)
    //     console.log(name);
    //     this.setState({
    //         // payments:{
    //             [name]:event.target.value,
    //         // } 
    //     });
    // };

    componentDidMount() {
        console.log(this)
        var candidateCount = localStorage.getItem('candidate');
      axios.get(`nominations/1/payments`)
        .then(res => {
          const payments = res.data;
          const depositor=res.data.depositor;
          const depositAmount=res.data.depositAmount;
          const depositeDate=res.data.depositeDate;
          const paymentStatus=res.data.paymentStatus;


          console.log("payments",payments);
          this.setState({ depositor });
          this.setState({ depositAmount });
          this.setState({ depositeDate });
          this.setState({ paymentStatus });


        })
    }

    render() {
        const { classes,values, handleChange  } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                    <Grid item lg={3}>
                    <TextField
                            // label="Deposited Amount"
                            value={this.state.depositAmount}
                            name="depositAmount"
                            // onChange={this.handleChange('depositedAmount')}
                            defaultValue={values.depositAmount}
                            onChange={handleChange('depositAmount')}

                        />  
                    </Grid>
                </Grid>
                
               

                {/* <Grid container spacing={8}>
                    <Grid item lg={3}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        Send
                    </Button>
                    </Grid>
                </Grid> */}

            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);