import React from 'react';

const NewReview = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-fit gap-10 bg- bg- rounded">
      <h2 className="border-4 rounded p-4 w-full text-center bg-indigo-400 border-black">
        How was your experience?
      </h2>
      <form>
        <div className="flex flex-col items-center">
          <div className="flex gap-6">
            <p className="w-">Your Name :</p>
            <input className="p-1" type="text" placeholder="your name.." />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewReview;
