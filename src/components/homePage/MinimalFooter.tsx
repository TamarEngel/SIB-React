import { Box, Container, Typography, Link, Grid, styled } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

// Styled components
const FooterContainer = styled(Box)(({  }) => ({
  backgroundColor: '#0b0f17',
  color: 'white',
  padding: '20px 0 10px',
  position: 'relative',
  left: 0,
  fontFamily: '"Plus Jakarta Sans", Arial, Helvetica, sans-serif',
}));

const SocialIcon = styled(Box)(({  }) => ({
  color: '#9094A6',
  cursor: 'pointer',
  transition: 'transform 0.5s ease-in-out, color 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    color: '#ffffff',
  },
}));

const FooterLink = styled(Link)(({  }) => ({
  color: '#9094A6',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#ffffff',
  },
}));

const FooterDivider = styled(Box)(({  }) => ({
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  width: '100%',
  margin: '10px 0',
}));

const MinimalFooter = () => {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        {/* Main footer content */}
        <Grid container spacing={2} sx={{ pb: 1 }}>
          {/* Social Icons */}
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SocialIcon>
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon>
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon>
                <YouTubeIcon />
              </SocialIcon>
              <SocialIcon>
                <TwitterIcon />
              </SocialIcon>
            </Box>
          </Grid>
          
          {/* Key Links */}
          <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexWrap: 'wrap', justifyContent: 'center' }}>
              <FooterLink href="#">About</FooterLink>
              <Typography sx={{ color: '#9094A6' }}>|</Typography>
              <FooterLink href="#">Solutions</FooterLink>
              <Typography sx={{ color: '#9094A6' }}>|</Typography>
              <FooterLink href="#">Support</FooterLink>
              <Typography sx={{ color: '#9094A6' }}>|</Typography>
              <FooterLink href="#">Contact</FooterLink>
            </Box>
          </Grid>
        </Grid>
        
        <FooterDivider />
        
        {/* Footer bottom */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', pt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
            <Box component="img" src="/images/profile/1.1.png" alt="SIB Logo" sx={{ height: 40, mr: 1 }} />
            <Typography variant="body2" sx={{ color: '#9094A6', fontSize: '12px' }}>
              © 2025 All Rights Reserved, SIB
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <FooterLink href="#" sx={{ fontSize: '12px' }}>Legal Notice</FooterLink>
            <Typography sx={{ color: '#9094A6', fontSize: '12px' }}>|</Typography>
            <FooterLink href="#" sx={{ fontSize: '12px' }}>Terms</FooterLink>
            <Typography sx={{ color: '#9094A6', fontSize: '12px' }}>|</Typography>
            <FooterLink href="#" sx={{ fontSize: '12px' }}>Privacy</FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default MinimalFooter;