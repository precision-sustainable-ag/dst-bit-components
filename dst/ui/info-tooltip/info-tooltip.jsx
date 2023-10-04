import React from 'react';
import {
  Typography,
  Tooltip,
} from '@mui/material';
import { Info } from '@mui/icons-material';

export const InfoTooltip = ({
  url, source, type, content, hasLink, title,
}) => {
  const sourceURL = url;
  const sourceName = source;
  const sourceType = type || 'link';
  const sourceContent = content || '';
  const link = hasLink;
  return sourceType === 'link' ? (
    <Tooltip
      title={(
        <div>
          Source
          {': '}
          <a href={sourceURL} target="_blank" rel="noopener noreferrer">
            {sourceName}
          </a>
        </div>
      )}
      arrow
    >
      <Info fontSize="small" />
    </Tooltip>
  ) : sourceType === 'html' ? (
    <Tooltip arrow dangerouslySetInnerHTML={content}>
      {' '}
      <Info fontSize="small" />
    </Tooltip>
  ) : link ? (
    <Tooltip title={title} placement="right" arrow>
      <Info fontSize="small" />
    </Tooltip>
  ) : (
    <Tooltip
      title={(
        <div>
          <Typography variant="body1">{sourceContent}</Typography>
        </div>
      )}
      placement="right"
      arrow
    >
      <Info fontSize="small" />
    </Tooltip>
  );
};
