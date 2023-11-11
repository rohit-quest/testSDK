import React, { FC } from 'react';

const Loader: FC = () => {
  return (
    <div className="questLabs quest-loader">
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 50,
        }}
      >
        <div
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        ></div>
        <div>
          <div
            style={{
              display: 'inline-block',
              width: '3rem',
              height: '3rem',
              animation: 'spin 1.5s linear infinite',
              border: '0.25rem solid currentColor',
              borderRight: '0.25rem solid transparent',
              borderRadius: '50%',
              transform: 'translateZ(0)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '0',
                height: '0',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                border: '0',
                padding: '0',
                clip: 'rect(0,0,0,0)',
                display: "inline"
              }}
            >
              Loading...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
