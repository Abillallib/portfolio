import React, { useState } from 'react';
import { Box, Stack, Avatar, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';

const SkillCard = ({ iconUrl, title, subtitle }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: 3,
        bgcolor: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(6px)',
        border: '1px solid',
        borderColor: 'rgba(255,255,255,0.12)',
        px: 2.25,
        py: 1.75,
        transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
        boxShadow: 'none',
        cursor: 'default',
        '&:hover': {
          transform: 'translateY(-2px) scale(1.02)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          borderColor: 'rgba(255,255,255,0.2)'
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px'
        }
      }}
    >
      <Avatar
        variant="rounded"
        src={imageError ? undefined : iconUrl}
        alt={title}
        onError={handleImageError}
        sx={{
          bgcolor: imageError ? 'primary.main' : '#fff',
          width: 60,
          height: 60,
          mr: 2.25,
          borderRadius: 2,
          color: imageError ? '#fff' : 'inherit',
        }}
      >
        {imageError && <CodeIcon />}
      </Avatar>
      <Stack spacing={0.25} sx={{ minWidth: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }} noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {subtitle}
        </Typography>
      </Stack>
    </Box>
  );
};

export default SkillCard;
