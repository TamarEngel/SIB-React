import { Box, Container, Typography, Link, styled } from '@mui/material';

const FooterContainer = styled(Box)(({ }) => ({
  backgroundColor: '#020202', 
  color: 'white',
  marginTop: "52px",
  padding: '12px 0 20px',
  position: 'relative',
  left: 0,
  right: 0,
  width: '100%',
  fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
}));

const FooterLink = styled(Link)(({ }) => ({
  color: '#9094A6',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#ffffff',
  },
}));

const FooterDivider = styled(Box)(({ }) => ({
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  width: '100%',
  margin: "13px"
}));

const HorizontalDivider = styled(Box)(({ }) => ({
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  height: '20px',
  margin: '0 15px',
  display: 'inline-block',
  verticalAlign: 'middle',
}));

const MinimalFooter = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 ,marginBottom: "14px"}}>
          <Box component="img" src="/images/profile/1.1.png" alt="SIB Logo" sx={{     height: 91 ,marginLeft:"-131px"}} />
        </Box>

        <FooterDivider />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', pt: 2,marginRight: "83px" }}>
          <Typography variant="body2" sx={{ color: '#9094A6', fontSize: '12px', textAlign: 'center', mb: { xs: 2, sm: 0 } }}>
            © 2025 All Rights Reserved, SIB
          </Typography>
          
          <Box sx={{ display: 'flex', ml: { xs: 0, sm: 4 }, gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
            <FooterLink href="#" sx={{ fontSize: '12px', mx: 1 }}>Legal Notice</FooterLink>
            <HorizontalDivider sx={{ height: '14px' }} />
            <FooterLink href="#" sx={{ fontSize: '12px', mx: 1 }}>Terms</FooterLink>
            <HorizontalDivider sx={{ height: '14px' }} />
            <FooterLink href="#" sx={{ fontSize: '12px', mx: 1 }}>Privacy</FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default MinimalFooter;