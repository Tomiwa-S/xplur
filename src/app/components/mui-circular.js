import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel(props) {
    const value = Math.round(props.value);
    const color = value<40 ? 'red' : value < 65 ? 'orange' : 'green'
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" sx={{color:color}} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          
        }}
      >
        <h6 style={{mixBlendMode:'exclusion'}}>{`${value}%`}</h6>
      </Box>
    </Box>
  );
}