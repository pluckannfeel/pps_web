import { useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { createStyles, Button, Progress } from '@mantine/core';

const useStyles = createStyles(() => ({
  button: {
    position: 'relative',
    transition: 'background-color 150ms ease',
  },

  progress: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    left: -1,
    top: -1,
    height: 'auto',
    backgroundColor: 'transparent',
    zIndex: 0,
  },

  label: {
    position: 'relative',
    zIndex: 1,
  },
}));

// button progress props
interface ButtonProgressProps {
    loaded: boolean;
    onClick: () => void;
    progress: number;
    disabled: boolean;
}

export function ButtonProgress(attr: ButtonProgressProps) {
  const { classes, theme } = useStyles();
//   const [progress, setProgress] = useState(0);
//   const [loaded, setLoaded] = useState(false);

  return (
    <Button
      fullWidth
      disabled={attr.disabled}
      className={classes.button}
    //   onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
        onClick={attr.onClick}
      color={attr.loaded ? 'teal' : theme.primaryColor}
    >
      <div className={classes.label}>
        {attr.progress !== 0 ? 'Uploading file' : attr.loaded ? 'Photo uploaded' : 'Upload'}
      </div>
      {attr.progress !== 0 && (
        <Progress
          value={attr.progress}
          className={classes.progress}
          color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
          radius="sm"
        />
      )}
    </Button>
  );
}