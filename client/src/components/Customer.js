import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete'
import {withStyles} from '@material-ui/core/Styles'


const styles = theme => ({
    Max: {
        maxWidth: 64
    }
})

class Customer extends React.Component{
    

    render () {
        const {classes} = this.props;

        return (
            <TableRow> 
                <TableCell >{this.props.id}</TableCell>
                <TableCell ><img className={classes.Max} src={this.props.image}/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.gender}</TableCell>
                <TableCell>{this.props.job}</TableCell>
                <TableCell> <CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} /></TableCell>
            </TableRow>
        )
    }
}



export default withStyles(styles)(Customer)