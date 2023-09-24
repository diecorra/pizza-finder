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
          title={pizzeria}
          subheader={created ? dateFormat(created) : dateFormat(new Date())}
          titleTypographyProps={{
            fontSize: '0.85rem',
            fontWeight: 'bold',
            overflowWrap: 'break-word',
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
          className={
            !isImgClicked
              ? 'h-24 w-full object-cover hover:cursor-pointer'
              : 'hidden absolute z-[100] top-0 left-0 max-w-sm max-w-sm bg-contain bg-no-repeat bg-center bg-black hover:cursor-pointer'
          }
          component="img"
          image={img}
          alt={pizzeria}
          onClick={() => setIsImgClicked(!isImgClicked)}
        />
      ) : null}
    </Card>
  );
}
