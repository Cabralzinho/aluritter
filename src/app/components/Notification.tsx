import { Alert, Snackbar } from "@mui/material";

type NotificationProps = {
  open: boolean;
  text: string;
  vertical: "top" | "bottom";
  horizontal: "center" | "left" | "right";
  severity: "error" | "warning" | "info" | "success";
};

export const Notification = ({
  open,
  vertical,
  horizontal,
  severity,
  text,
}: NotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      anchorOrigin={{
        vertical: vertical,
        horizontal: horizontal,
      }}
    >
      <Alert severity={severity}>{text}</Alert>
    </Snackbar>
  );
};
