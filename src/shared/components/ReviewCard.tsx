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
import { dateFormat } from '../dateFormat';

export default function ReviewCard(dataReview: any) {
  const { user, title, description, img, pizzeria, rate, created } = dataReview;

  return (
    <Card className="max-w-[16rem] max-h-full border-4 border-black">
      <CardHeader
        avatar={
          <Tooltip title={user}>
            <Avatar className="bg-red-500" aria-label="recipe">
              {user.charAt(0)}
            </Avatar>
          </Tooltip>
        }
        title={pizzeria}
        subheader={dateFormat(created)}
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
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardMedia
        className="h-32"
        component="img"
        image={img}
        alt={pizzeria}
        sx={{ objectFit: 'cover' }}
      />
    </Card>
  );
}
