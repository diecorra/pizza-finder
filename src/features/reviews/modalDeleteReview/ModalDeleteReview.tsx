import { Box, Button, Modal, Typography } from '@mui/material';
import useModalDeleteReview from './useModalDeleteReview';

const ModalDeleteReview = ({
  id,
  open,
  handleModal,
}: {
  id: string;
  open: boolean;
  handleModal: () => void;
}) => {
  const { handleDeleteReview } = useModalDeleteReview();
  return (
    <Modal
      open={open}
      onClose={handleModal}
      aria-labelledby="delete review"
      aria-describedby="Modal that permit at the user to delete a review selected."
    >
      <Box sx={style}>
        <div className="flex flex-col gap-10">
          <Typography variant="h6" className="!text-primary">
            Delete selected review?
          </Typography>
          <div className="flex justify-between">
            <Button
              className="!bg-secondary !text-stone-200"
              onClick={handleModal}
            >
              No
            </Button>
            <Button
              className="!bg-primary !text-stone-200"
              onClick={() => handleDeleteReview(id)}
            >
              Yes
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDeleteReview;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
