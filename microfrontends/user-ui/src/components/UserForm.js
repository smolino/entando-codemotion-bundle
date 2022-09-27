import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {formValues, formTouched, formErrors} from './types/user';
import {withFormik} from 'formik';
import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Card, CardActions, CardContent, Typography} from "@material-ui/core";

const styles = () => ({
    root: {
        width: '30%',
        margin: 'auto',
    },
    textField: {
        width: '100%',
    },
    cardTitle: {
        textAlign: 'left',
    }
});

class UserForm extends PureComponent {

    render() {
        const {
            classes,
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit: formikHandleSubmit,
            isSubmitting,
        } = this.props;

        const getHelperText = (field) => (errors[field] && touched[field] ? errors[field] : '');

        const handleSubmit = (e) => {
            e.stopPropagation(); // avoids double submission caused by react-shadow-dom-retarget-events
            formikHandleSubmit(e);
        };

        return (

            <form onSubmit={handleSubmit}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2" className={classes.cardTitle}>
                           Add User
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstName"
                                    type="text"
                                    error={errors.firstName && touched.firstName}
                                    helperText={getHelperText('firstName')}
                                    className={classes.textField}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.firstName}
                                    name="firstName"
                                    label="First Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastName"
                                    type="text"
                                    error={errors.lastName && touched.lastName}
                                    helperText={getHelperText('lastName')}
                                    className={classes.textField}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastName}
                                    name="lastName"
                                    label="Last Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="age"
                                    type="number"
                                    error={errors.age && touched.age}
                                    helperText={getHelperText('age')}
                                    className={classes.textField}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.age}
                                    name="age"
                                    label="Age"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button type="submit" color="primary" disabled={isSubmitting} data-testid="submit-btn">
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </form>

        );
    }
}

UserForm.propTypes = {
    classes: PropTypes.shape({
        root: PropTypes.string,
        textField: PropTypes.string,
        cardTitle: PropTypes.string,
        submitButton: PropTypes.string,
        button: PropTypes.string,
    }),
    values: formValues,
    touched: formTouched,
    errors: formErrors,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
};

UserForm.defaultProps = {
    classes: {},
    values: {},
    touched: {},
    errors: {},
    onDelete: null,
};

const emptyUser = {
    firstName: '',
    lastName: '',
    age: 0,
};

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    age: Yup.number().required()
});


const formikBag = {
    mapPropsToValues: ({user}) => user || emptyUser,

    enableReinitialize: true,

    validationSchema,

    handleSubmit: (values, {setSubmitting, props: {onSubmit}}) => {
        onSubmit(values)
        setSubmitting(false)
    },

    displayName: 'UserForm',
};

export default compose(
    withStyles(styles, {withTheme: true}),
    withFormik(formikBag)
)(UserForm);
