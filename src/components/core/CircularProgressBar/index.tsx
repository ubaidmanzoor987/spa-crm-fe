import { useState, useEffect } from "react";

import {
  CircularProgressProps,
  Box,
  CircularProgress,
  Typography,
  circularProgressClasses,
} from "@mui/material";

export default function CircularProgressBar(
  props: CircularProgressProps & { value: number; colors: string; Size?:number }
) {
  const [progress, setProgress] = useState(props.value);
  const [ProgressSize, setProgressSize] = useState(props.Size);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
        }}
        size={ ProgressSize ? ProgressSize:45}
        thickness={2}
        {...props}
        value={100}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>

      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          color: `${props.colors}`,
          animationDuration: "5000s",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
          
        }}
        size={ ProgressSize ? ProgressSize:45}
        thickness={2}
        {...props}
        value={props.value}
      />
    </Box>
  );
}
// function useState(arg0: number): [any, any] {
//   throw new Error("Function not implemented.");
// }

// function useEffect(arg0: () => () => void, arg1: never[]) {
//   throw new Error("Function not implemented.");
// }
