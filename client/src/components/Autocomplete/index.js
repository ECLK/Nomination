/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { de } from 'date-fns/locale';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 50,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    select: {
        zIndex: 10000
    }
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            // fullWidth
            style={{width:'94%',marginLeft:17}}
            margin="normal"
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

class IntegrationReactSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            party: null,
            party: []
        };
    }

    handleChange = event => value => {
        this.props.handleChange(value.label, value.value);
    };

    // componentDidMount(){
    //     const { value } = this.props;
    //     debugger;
    //     this.setState({
    //         changeInPercentage: [
    //             {
    //               value: value
    //             }
    //           ]
    //     });
    // }

    render() {
        const { classes, theme, suggestions,value,userInfo,partyList } = this.props;
        var party=[];
        // for (var i = 0; i < userList.length; i++) {
            for (var j = 0; j < partyList.length; j++) {

            if(userInfo.party===partyList[j].team_id){
                var party=[
                        {
                          label: partyList[j].team_name,
                          value: userInfo.party
                        }
                      ]
            }
        }
        // }

        // var party=[
        //     {
        //       label: event.label,
        //       value: event.value
        //     }
        //   ]
    //    console.log("hhhhhhh",this.state.party);
        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),

            menuList: (provided, state) => ({
                ...provided,
                zIndex: 100000
            })
        };

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        styles={selectStyles}
                        options={suggestions}
                        components={components}
                        value={party}
                        name='party'
                        onChange={this.props.handleChange('party')}
                        placeholder="Search party by name"
                    />
                </NoSsr>
            </div>
        );
    }
}

IntegrationReactSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);

const mapStateToProps = ({Nomination,Profile}) => {
    const partyList = Nomination.partyList;
    const userInfo = Profile.userInfo;
    return {partyList,userInfo};
  };

  const mapActionsToProps = {
    // getUserInfo,
    // handleChangeProfileData
    // getTeams
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles, { withTheme: true })(IntegrationReactSelect));