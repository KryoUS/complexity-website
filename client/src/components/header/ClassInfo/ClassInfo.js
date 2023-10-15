import React from 'react';
import { Box, Container, IconButton, Grid, Paper } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import ClassInfoList from './ClassInfoList';
import ClassInfoData from './ClassInfoData';

export default function ClassInfo(props) {

    return (
        <Paper>
            <Container>
                <Box sx={{ padding: 12 }}>
                    <Grid container spacing={4} style={{ justifyContent: "center" }}>
                        {ClassInfoData.map(classObj => {
                            return <Grid key={classObj.className + ' Spec Info'} item container sm={6} md={4} lg={3} style={{ width: "300px" }}>
                                <ClassInfoList classObj={classObj} />
                            </Grid>
                        })}
                    </Grid>
                </Box>
                <IconButton style={{ position: 'absolute', right: '0px', top: '0px' }} onClick={() => props.drawer()}>
                    <Cancel fontSize='large' color='error' />
                </IconButton>
            </Container>
        </Paper>
    )
}
