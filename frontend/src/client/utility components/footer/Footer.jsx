import {Box} from '@mui/material'

import Typography from '@mui/material/Typography';

export default function Footer(){
    return (
        <>
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}} component={'div'}>
                <Typography variant="h5">Schemaless Integrated Services Ltd</Typography>
                <Typography variant="p">&copy; 2026</Typography>
            </Box> 
        </>
    )
}