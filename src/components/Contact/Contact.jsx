import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  Stack,
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AnimatedTitle from '../AnimatedTitle/AnimatedTitle';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Name is required';
    if (!formData.email.trim()) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) next.email = 'Enter a valid email';
    if (!formData.subject.trim()) next.subject = 'Subject is required';
    if (!formData.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send message');
      setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Something went wrong.', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar((s) => ({ ...s, open: false }));
  };

  return (
    <Box id="contact" sx={{ width: '100%', py: 8 }}>
      <Container maxWidth="lg">
        {/* Title - matches About and Projects */}
        <Box sx={{ textAlign: 'center', mb: 5, px: { xs: 2, sm: 3 } }}>
          <AnimatedTitle
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              letterSpacing: 1,
              color: 'common.white',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            }}
          >
            Get In Touch
          </AnimatedTitle>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              color: 'text.secondary',
              mt: 1,
              px: { xs: 2, sm: 3 },
              maxWidth: '760px',
              mx: 'auto',
            }}
          >
            I'm always open to discussing new projects and opportunities. Feel free to reach out!
          </Typography>
        </Box>

        {/* Form Card with curved edges and bottom-up gradient (starts ~40% from bottom) */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'rgba(255,255,255,0.12)',
            background: 'linear-gradient(to top, rgba(6, 13, 23, 0.85) 0%, rgba(8, 18, 32, 0.75) 40%, rgba(10, 25, 41, 0.55) 60%, rgba(10, 25, 41, 0.45) 100%)',
            backdropFilter: 'blur(6px)',
            maxWidth: 760,
            mx: 'auto'
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Name Field */}
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: 1 } }}
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: 1 } }}
                />

                {/* Subject Field */}
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: 1 } }}
                />

                {/* Message Field */}
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  variant="outlined"
                  multiline
                  rows={6}
                  InputProps={{ sx: { borderRadius: 1 } }}
                />

                {/* Button Row: aligned right below Message */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    startIcon={<ChevronRightIcon fontSize="small" />}
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: 'primary.main',
                      color: '#0A1929',
                      fontWeight: 600,
                      px: 3,
                      py: 1.25,
                      borderRadius: 1,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      gap: 1,
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    {isSubmitting ? 'SENDING…' : 'SEND MESSAGE'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
        
        {/* Moved the 'or reach out to me directly' section here */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography 
            variant="subtitle1"
            sx={{
              color: 'text.secondary',
              px: { xs: 2, sm: 3 },
              maxWidth: '760px',
              mx: 'auto',
              mb: 2
            }}
          >
            or reach out to me directly on:
          </Typography>
          <Button
            variant="outlined"
            size="large"
            startIcon={<LinkedInIcon sx={{ fontSize: '1.5rem' }} />}
            href="https://www.linkedin.com/in/adjaynae-billings"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#FFFFFF',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              fontSize: '1.1rem',
              px: 3,
              py: 1,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
                color: 'primary.main',
              },
            }}
          >
            LinkedIn
          </Button>
        </Box>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} elevation={6} variant="filled" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
