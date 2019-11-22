import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete'
import CustomerEdit from './CustomerEdit'
import {withStyles} from '@material-ui/styles'


const styles = theme => ({
    Max: {
        maxWidth: 64
    },
    tableCell: {
        padding: 0,
        paddingRight:14,
        paddingLeft:14,
    }
})

class Customer extends React.Component{
    

    render () {
        const {classes} = this.props;

        return (
            <TableRow> 
                {/* <TableCell className={classes.tableCell} ><img className={classes.Max} src={this.props.image} alt={'고객이미지'}/></TableCell> */}
                <TableCell className={classes.tableCell} >{this.props.name}</TableCell>
                <TableCell className={classes.tableCell} >{this.props.phone}</TableCell>
                <TableCell className={classes.tableCell} >{this.props.email}</TableCell>
                <TableCell className={classes.tableCell} >{this.props.contents}</TableCell>
                <TableCell className={classes.tableCell} >{this.props.price}</TableCell>
                <TableCell className={classes.tableCell} >{this.props.payment}</TableCell>
                <TableCell className={classes.tableCell} >{this.props.note}</TableCell>
                <TableCell className={classes.tableCell} >{this.props.createdDate}</TableCell>
                <TableCell className={classes.tableCell} > 
                    <CustomerEdit   stateRefresh={this.props.stateRefresh} id={this.props.id} />
                    <CustomerDelete  stateRefresh={this.props.stateRefresh} id={this.props.id} /> 
                </TableCell>
            </TableRow>
        )
    }
}



export default withStyles(styles)(Customer)