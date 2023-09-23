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

export default function ReviewCard({ dataReview }: { dataReview: Review }) {
  const { user, title, description, img, pizzeria, rate, created } = dataReview;

  return (
    <Card className="max-w-[18rem] h-full flex flex-col justify-between">
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
          titleTypographyProps={{ fontSize: '0.85rem', fontWeight: 'bold' }}
          subheaderTypographyProps={{ fontSize: '0.7rem' }}
        />
        <CardContent>
          <div className="flex justify-between">
            <h3>{title}</h3>
            <div className="flex items-center">
              <StarIcon sx={{ color: 'orange' }} />
              <p>{rate}</p>
            </div>
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
          className="h-40 w-full object-cover"
          component="img"
          image={img}
          alt={pizzeria}
        />
      ) : null}
    </Card>
  );
}
