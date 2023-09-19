import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import config from '../../config';
import QuestContext from '../QuestWrapper';
import './Badge.css';

interface BadgeProps {
  userId: string;
  token: string;
}

const Badge:React.FC<BadgeProps> = ({userId, token}) => {
  const [data, setData] = useState([]);
  const { apiKey, apiSecret } = useContext(QuestContext.Context);
  
  const badge = (
    <svg
      width="110"
      height="110"
      viewBox="0 0 103 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M47 2.59808C49.7846 0.99038 53.2154 0.990381 56 2.59808L91.6003 23.1519C94.3849 24.7596 96.1003 27.7308 96.1003 30.9462V72.0538C96.1003 75.2692 94.3849 78.2404 91.6003 79.8481L56 100.402C53.2154 102.01 49.7846 102.01 47 100.402L11.3997 79.8481C8.61508 78.2404 6.89969 75.2692 6.89969 72.0538V30.9461C6.89969 27.7308 8.61508 24.7596 11.3997 23.1519L47 2.59808Z"
        fill="#2E0E4E"
      />
      <path
        d="M47 11.5981C49.7846 9.99038 53.2154 9.99038 56 11.5981L83.8061 27.6519C86.5907 29.2596 88.3061 32.2308 88.3061 35.4462V67.5538C88.3061 70.7692 86.5907 73.7404 83.8061 75.3481L56 91.4019C53.2154 93.0096 49.7846 93.0096 47 91.4019L19.1939 75.3481C16.4093 73.7404 14.6939 70.7692 14.6939 67.5538V35.4462C14.6939 32.2308 16.4093 29.2596 19.1939 27.6519L47 11.5981Z"
        fill="#4C2277"
      />
    </svg>
  );

  const getBadges = () => {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };
    axios
      .get(`${config.BACKEND_URL}api/badges?userId=${userId}`, {
        headers: headers,
      })
      .then((res) => {
        if (res.data.success) {
            setData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getBadges();
  }, []);

  return (
    <div className="q-parent-container">
      {data.length === 0 ? (
        <div className="no-badge-q" style={{ textAlign: 'center' }}>
          No badges found
        </div>
      ) : (
        <div
          style={{ width: '460px', height: '355px'}}
          className="q-badge-container"
        >
          {data.map((e: any, i: any) => (
            <div style={{height:"110px"}} key={i}>
              <ReactTooltip
                id={`${e.data.name}`}
                place="top"
                variant="info"
                content={`${e.data.description}`}
              />
              <div
                style={{ cursor: 'pointer' }}
                data-tooltip-id={`${e.data.name}`}
                className="container-q-badge"
                key={i}
              >
                {badge}
                <div className="hexagon">
                  <div className="hex-shape">
                    <img
                      src={`https://pin.questprotocol.xyz/ipfs/${e.data.imageIPFS}`}
                      alt="img"
                      className="image-inside-hexagon"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Badge;
