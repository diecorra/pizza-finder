import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import {
  Alert,
  AlertColor,
  Avatar,
  CardHeader,
  CardMedia,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Review } from 'model/review';
import { SyntheticEvent, useState } from 'react';
import { dateFormat } from 'utils/dateFormat';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeReview } from 'services/auth/reviews.api';
import { selectAuthIsLogged, useAuth } from 'services/auth';

export default function ReviewCard({ dataReview }: { dataReview: Review }) {
  const { id, user, title, description, img, pizzeria, rate, created } =
    dataReview;
  const [isImgClicked, setIsImgClicked] = useState(false);
  const isLogged = useAuth(selectAuthIsLogged);
  const [snackbarData, setSnackbarData] = useState<{
    color: AlertColor | undefined;
    message: string;
    open: boolean;
  }>({ color: 'error', message: '', open: false });

  const handleDeleteReview = async (id: string) => {
    if (isLogged && id) {
      try {
        await removeReview(id);
        setSnackbarData({
          color: 'success',
          message: 'Review deleted succesfully!',
          open: true,
        });
      } catch (error) {
        setSnackbarData({
          color: 'error',
          message: 'ERROR: Review not deleted!',
          open: true,
        });
        console.log('Error on deleting review: ', error);
      }
    }
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarData({
      color: 'error',
      message: '',
      open: false,
    });
  };

  return (
    <Card className="min-h-[15rem] max-h-96 flex flex-col justify-between">
      <div>
        <CardHeader
          avatar={
            <Tooltip title={user?.replace(/\s/g, '')}>
              <Avatar style={{ backgroundColor: '#130F49' }}>
                {user?.charAt(0).toUpperCase().replace(/\s/g, '')}
              </Avatar>
            </Tooltip>
          }
          title={pizzeria.replaceAll('_', ',')}
          subheader={created ? dateFormat(created) : dateFormat(new Date())}
          titleTypographyProps={{
            fontSize: '0.85rem',
            fontWeight: 'bold',
            //overflowWrap: 'break-word',
          }}
          subheaderTypographyProps={{ fontSize: '0.7rem' }}
          action={
            <Tooltip
              title={isLogged ? 'Delete review?' : 'Login to delete review'}
            >
              <DeleteIcon
                className={isLogged ? 'cursor-pointer' : 'text-gray-400'}
                onClick={() => handleDeleteReview(id || '')}
              />
            </Tooltip>
          }
        />
        <CardContent>
          <div className="flex flex-col">
            <div className="flex items-center">
              <StarIcon sx={{ color: 'orange' }} />
              <p>{rate}</p>
            </div>
            <h3>{title}</h3>
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            className="break-words"
          >
            {description}
          </Typography>
        </CardContent>
      </div>
      {img ? (
        <CardMedia
          className="cursor-pointer"
          component="img"
          image={img}
          alt={pizzeria}
          onClick={() => setIsImgClicked(!isImgClicked)}
        />
      ) : null}
      {isImgClicked && img && (
        <div
          className="fixed z-50 bg-slate-900/50 inset-0"
          onClick={() => setIsImgClicked(!isImgClicked)}
        >
          <div className="absolute z-[100] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-3/4 md:w-auto max-h-full md:max-h-[80vh] bg-center bg-no-repeat">
            <img
              className="bg-contain max-h-[inherit] bg-right-top"
              draggable={false}
              src={img}
              alt={pizzeria}
              onClick={(e) => e.stopPropagation()}
            />
            <CloseIcon
              fontSize={'large'}
              className="fixed top-1 right-1 text-white cursor-pointer"
              onClick={() => setIsImgClicked(!isImgClicked)}
            />
          </div>
        </div>
      )}
      <Snackbar
        open={snackbarData.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarData.color}
          sx={{ width: '100%' }}
        >
          {snackbarData.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}
