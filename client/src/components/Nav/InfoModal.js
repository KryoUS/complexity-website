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
import Prettyjson from '../Utils/PrettyJson';

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
                    id="site-error-modal"
                    open={this.props.modalOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.modalClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth='md'
                    fullWidth={true}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <div className="modal-title">{this.props.modalTitle}</div>
                    </DialogTitle>
                    <DialogContent>
                        {typeof this.props.modalMessage === 'object' ?
                            <Prettyjson jsonData={this.props.modalMessage} />
                        :
                            <div className="modal-description">{ this.props.modalMessage }</div>
                        }
                    </DialogContent>
                    <DialogActions id="alert-dialog-slide-actions">
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