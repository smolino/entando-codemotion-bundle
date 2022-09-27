import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import userType from './types/user';
import {Paper, TableContainer} from "@material-ui/core";

const styles = {
    root: {
        width: '50%',
        margin: 'auto',
        marginTop: '20px'
    },
    tableRoot: {
        width: '100%',
    },
    rowRoot: {
        cursor: 'pointer',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    noItems: {
        margin: '15px',
    },
};

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#002f87",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        "&:hover": {
            backgroundColor: "#00a0df !important"
        }
    },
}))(TableRow);

class UserTable extends PureComponent {

    render() {
        const {
            classes,
            items,
        } = this.props;

        const tableRows = items.map((item) => (
            <StyledTableRow hover className={classes.rowRoot} key={item.id}>
                <StyledTableCell>
                    <span>{item.id}</span>
                </StyledTableCell>
                <StyledTableCell>
                    <span>{item.firstName}</span>
                </StyledTableCell>
                <StyledTableCell>
                    <span>{item.lastName}</span>
                </StyledTableCell>
                <StyledTableCell>
                    <span>{item.age}</span>
                </StyledTableCell>
            </StyledTableRow>
        ));

        return items.length ? (
            <TableContainer className={classes.root} component={Paper}>
                <Table className={classes.tableRoot} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <span>ID</span>
                            </StyledTableCell>
                            <StyledTableCell>
                                <span>First Name</span>
                            </StyledTableCell>
                            <StyledTableCell>
                                <span>Last Name</span>
                            </StyledTableCell>
                            <StyledTableCell>
                                <span>Age</span>
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{tableRows}</TableBody>
                </Table>
            </TableContainer>
        ) : (
            <div className={classes.noItems}>Users table is empty</div>
        );
    }
};

UserTable.propTypes = {
    items: PropTypes.arrayOf(userType).isRequired,
    classes: PropTypes.shape({
        root: PropTypes.string,
        rowRoot: PropTypes.string,
        tableRoot: PropTypes.string,
        noItems: PropTypes.string,
    }).isRequired,
    Actions: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

UserTable.defaultProps = {
    Actions: null,
};

export default withStyles(styles)((UserTable));
