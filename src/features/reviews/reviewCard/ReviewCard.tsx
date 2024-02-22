import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import {
  Avatar,
  CardHeader,
  CardMedia,
  Tooltip,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Review } from 'model/review';
import { dateFormat } from 'utils/dateFormat';
import DeleteIcon from '@mui/icons-material/Delete';
import useReviewCard from './useReviewCard';
import ModalDeleteReview from '../modalDeleteReview/ModalDeleteReview';

export default function ReviewCard({ dataReview }: { dataReview: Review }) {
  const { id, user, title, description, img, pizzeria, rate, created } =
    dataReview;
  const { isLogged, isImgClicked, setIsImgClicked, handleOpen } =
    useReviewCard();

  return (
    <>
      <Card className="min-h-[15rem] max-h-96 flex flex-col justify-between shadow-2xl ">
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
          }}
          subheaderTypographyProps={{ fontSize: '0.7rem' }}
          action={
            isLogged &&
            id && (
              <Tooltip title="Delete review?">
                <DeleteIcon className="cursor-pointer" onClick={handleOpen} />
              </Tooltip>
            )
          }
        />
        <CardContent>
          <div className="flex flex-col">
            <div className="flex items-center gap-[1px]">
              {new Array(rate).fill(0).map((_, index) => (
                <StarIcon key={index} sx={{ color: 'orange' }} />
              ))}
              {new Array(5 - rate).fill(0).map((_, index) => (
                <StarIcon key={index} sx={{ color: 'GrayText' }} />
              ))}
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
        {img && (
          <CardMedia
            className={'cursor-pointer'}
            component="img"
            image={img}
            alt={pizzeria}
            onClick={() => setIsImgClicked(!isImgClicked)}
          />
        )}
      </Card>
      {isImgClicked && (
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
      {id ? <ModalDeleteReview id={id} /> : null}
    </>
  );
}
