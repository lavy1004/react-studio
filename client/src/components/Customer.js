import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete'
import CustomerEdit from './CustomerEdit'
import {withStyles} from '@material-ui/styles'


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
                <TableCell ><img className={classes.Max} src={this.props.image} alt={'고객이미지'}/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.contents}</TableCell>
                <TableCell>{this.props.phone}</TableCell>
                <TableCell>{this.props.email}</TableCell>
                <TableCell>{this.props.price}</TableCell>
                <TableCell>{this.props.payment}</TableCell>
                <TableCell>{this.props.note}</TableCell>
                <TableCell>{this.props.createdDate}</TableCell>
                <TableCell> 
                    <CustomerEdit   stateRefresh={this.props.stateRefresh} id={this.props.id} />
                    <CustomerDelete  stateRefresh={this.props.stateRefresh} id={this.props.id} /> 
                </TableCell>
            </TableRow>
        )
    }
}



export default withStyles(styles)(Customer)