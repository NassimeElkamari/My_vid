export const theme = {
  canvas: {
    width: 1080,
    height: 1920,
    fps: 30,
  },
  colors: {
    ink: "#01040A",
    navy: "#07111F",
    ocean: "#17547D",
    blue: "#24C9FF",
    blueBright: "#75CEFF",
    blueSoft: "#B6CEE2",
    warning: "#FF5266",
    warningDeep: "#FF405A",
    panel: "rgba(3, 10, 22, 0.86)",
    white: "#F6FBFF",
  },
  fontFamily: "Arial, Helvetica, sans-serif",
} as const;

export const frames = {
  hook: 5 * theme.canvas.fps,
  firstHour: 7 * theme.canvas.fps,
  finance: 10 * theme.canvas.fps,
  logistics: 13 * theme.canvas.fps,
  conclusion: 10 * theme.canvas.fps,
  preview: 45 * theme.canvas.fps,
} as const;
