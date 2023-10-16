import React from 'react';
import { Box, Container, IconButton, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Cancel } from '@mui/icons-material';
import ClassInfoList from './ClassInfoList';
import ClassInfoData from './ClassInfoData';

export default function ClassInfo(props) {

    return (
        <Paper>
            <Container>
                <Box sx={{ padding: 6 }}>
                    <Grid container spacing={4} justifyContent="center">
                        {ClassInfoData.map(classObj => {
                            return <Grid key={classObj.className + ' Spec Info'} container sm={6} md={4} lg={3} style={{ width: "300px" }}>
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
