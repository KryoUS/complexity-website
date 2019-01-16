import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class InfoModal extends React.Component {

    modalClose = () => {
        this.props.infoModal(false, '', '', '');
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.modalOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.modalClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                    {this.props.modalTitle}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {this.props.modalMessage}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.modalClose} color="primary">
                        {this.props.modalButton}
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        modalOpen: state.modalOpen,
        modalTitle: state.modalTitle,
        modalMessage: state.modalMessage,
        modalButton: state.modalButton
    }
}

export default connect( mapStateToProps, {infoModal} )( InfoModal );