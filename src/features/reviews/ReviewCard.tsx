import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import {
  Alert,
  AlertColor,
  Avatar,
  Box,
  Button,
  CardHeader,
  CardMedia,
  Modal,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Review } from 'model/review';
import { useState } from 'react';
import { dateFormat } from 'utils/dateFormat';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeReview } from 'services/auth/reviews.api';
import { selectAuthIsLogged, useAuth } from 'services/auth';

export default function ReviewCard({ dataReview }: { dataReview: Review }) {
  const { id, user, title, description, img, pizzeria, rate, created } =
    dataReview;
  const [isImgClicked, setIsImgClicked] = useState(false);
  const isLogged = useAuth(selectAuthIsLogged);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteReview = async (id: string) => {
    if (isLogged && id) {
      try {
        await removeReview(id);
      } catch (error) {
        console.log('Error on deleting review: ', error);
      }
    }
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
                onClick={handleOpen}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-10">
            <Typography variant="h6" className="!text-primary">
              Delete selected review?
            </Typography>
            <div className="flex justify-between">
              <Button
                className="!bg-primary !text-stone-200"
                onClick={() => handleDeleteReview(id || '')}
              >
                Yes
              </Button>
              <Button
                className="!bg-secondary !text-stone-200"
                onClick={handleClose}
              >
                No
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </Card>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
