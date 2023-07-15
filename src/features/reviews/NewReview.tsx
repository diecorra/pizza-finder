import { Rating } from '@mui/material';
import React from 'react';

const NewReview = () => {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit gap-4 bg-indigo-900 rounded pb-4">
      <h2 className="border-4 rounded p-4 w-full text-center bg-indigo-400 border-black">
        How was your experience?
      </h2>
      <form>
        <div className="flex flex-col items-center gap-2">
          <div className="flex bg-indigo-300 rounded p-1 w-96">
            <p className="w-full">Your Name :</p>
            <input className="p-1" type="text" placeholder="your name.." />
          </div>
          <div className="flex bg-indigo-300 rounded p-1 w-96">
            <p className="w-full">Title :</p>
            <input className="p-1" type="text" placeholder="title.." />
          </div>
          <div className="flex bg-indigo-300 rounded p-1 w-96">
            <p className="w-full">Description :</p>
            <textarea
              className="p-1 h-32 w-96 text-black"
              name="Text1"
              placeholder="description.."
            ></textarea>
          </div>
          <div className="flex bg-indigo-300 rounded p-1 w-96">
            <p className="w-full">Rating :</p>
            <Rating
              name="read-only"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewReview;
