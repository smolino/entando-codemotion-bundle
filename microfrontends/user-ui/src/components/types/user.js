import PropTypes from 'prop-types';

export default PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
});

export const formValues = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
});

export const formTouched = PropTypes.shape({
  firstName: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  lastName: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  age: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

export const formErrors = PropTypes.shape({
  firstName: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  lastName: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
});
