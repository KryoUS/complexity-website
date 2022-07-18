import React from 'react';
import { Grid, Container, Box, Paper } from '@material-ui/core';
import ClassInfoList from './ClassInfoList';
import ClassInfoData from './ClassInfoData';

export default function ClassInfo(props){

    return(
        <Paper style={{maxHeight: "95vh"}}>
            <Container>
                <Box sx={{padding: 12}}>
                    <Grid container spacing={4} style={{ justifyContent: "center" }}>
                            {ClassInfoData.map(classObj => {
                                return <Grid key={classObj.className + ' Spec Info'} item container sm={6} md={4} lg={3} style={{ width: "300px" }}>
                                    <ClassInfoList classObj={classObj} />
                                </Grid>
                            })}
                    </Grid>
                </Box>
            </Container>
        </Paper>
    )
}
