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
import { useState } from 'react';
import { dateFormat } from 'utils/dateFormat';

export default function ReviewCard({ dataReview }: { dataReview: Review }) {
  const { user, title, description, img, pizzeria, rate, created } = dataReview;
  const [isImgClicked, setIsImgClicked] = useState(false);

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
    </Card>
  );
}
