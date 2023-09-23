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
    <Card className="max-w-[18rem] h-80 border-4 border-black">
      <CardHeader
        avatar={
          <Tooltip title={user}>
            <Avatar className="bg-red-500" aria-label="recipe">
              {user?.charAt(0)}
            </Avatar>
          </Tooltip>
        }
        title={pizzeria}
        subheader={created ? dateFormat(created) : dateFormat(new Date())}
        titleTypographyProps={{ fontSize: '1rem', fontWeight: 'bold' }}
        subheaderTypographyProps={{ fontSize: '0.7rem' }}
      />
      <CardContent>
        <div className="flex justify-between mb-3">
          <h3>{title}</h3>
          <div className="flex">
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
      {img ? (
        <CardMedia
          className="h-60 w-full object-cover"
          component="img"
          image={img}
          alt={pizzeria}
        />
      ) : null}
    </Card>
  );
}
