import React, { FC } from 'react';

const Loader: FC = () => {
  return (
    <>
      <div className="quest-loader fixed inset-0 flex justify-center items-center z-50">
        <div className="absolute inset-0"></div>
        <div>
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >
              Loading...
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
