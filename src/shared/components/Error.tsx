import { Alert } from '@mui/material';

export interface ServerErrorProps {
  message?: string;
}

export default function Error(props: ServerErrorProps) {
  return (
    <Alert severity="error">{props.message || 'A server error occurs!'}</Alert>
  );
}
