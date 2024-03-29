import React, { useState, useEffect, JSX, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import streak from "../../assets/images/streak.png";

import "./toastService.css";
import {
  alertLogo,
  errorCross,
  primaryAlert,
  primaryCross,
  questionLogo,
  successCross,
  toastTic,
  warnCross,
} from "../../assets/images";
import { crossLogo } from "./Svg";

interface ToastProps {
  message: ReactNode;
  duration?: number;
  position?: 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left';
  remove: () => void;
}

const ToastService: React.FC<ToastProps> = ({
  message = <></>,
  duration = 30000,
  position = 'center',
  remove,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const closeToast = () => {
    setIsVisible(false);
    remove();
  };

  let topPosition = '0';

  if (position === 'center') {
    topPosition = `-${toastCounter * (43 + 10)}px`;
  } else {
    topPosition = `${toastCounter * (43 + 10)}px`;
  }

  const containerStyle = {
    transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
    top: topPosition,
  };

  const contentStyle = {
    transform: isVisible ? 'translateX(0)' : 'translateX(-100%)',
  };

  return (
    <div className={"q-toast"} onClick={closeToast}>
      <div className="q-toast-msg" style={containerStyle}>
        {message || (
          <div className="q-toast-msg-div" style={contentStyle}>
            You maintained a streak for 25 days
            {/* Add your image component here */}
          </div>
        )}
      </div>
    </div>
  );
};

let toastCounter = 0;
let toastRoot: HTMLElement | null;
if (typeof document !== 'undefined') {
  toastRoot = document.getElementById("root");
}
const toastQueue: Array<() => void> = [];
const processQueue = () => {
  if (toastQueue.length > 0) {
    const remove = toastQueue.pop()!;
    remove();
    setTimeout(processQueue, 300);
  }
};

export const showToast = (message: ReactNode, duration?: number, position = 'center'): void => {
  const toastElement = document.createElement("div");
  toastElement.className = "q-toast";
  toastRoot?.appendChild(toastElement);
  const root = createRoot(toastElement);
  const remove = () => {
    toastRoot?.removeChild(toastElement);
    toastCounter--;
  };

  toastCounter++;
  const topPosition = position === 'center' ? `-${toastCounter * (43 + 10)}px` : `${toastCounter * (43 + 10)}px`;
  toastElement.style.top = topPosition;

  root.render(
    <ToastService remove={remove} message={message} duration={duration} position={position as 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left' | undefined} />
  );
  
  toastQueue.unshift(remove);


  if (toastQueue.length === 1) {
    processQueue();
  }

  setTimeout(() => {
    processQueue();
  }, duration || 2000);
};

export const General = (
  message: ReactNode,
  duration = 2000,
  position: 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left' = 'right',
  className: "q_toast_success" | "q_toast_error" | "q_toast_warn" | "q_toast_primary"
): HTMLDivElement => {
  const toastElement = document.createElement("div");
  toastElement.className = "q-toast " + className;
  toastRoot?.appendChild(toastElement);
  const root = createRoot(toastElement);

  const remove = () => {
    toastRoot?.removeChild(toastElement);
    toastCounter--;
  };

  toastCounter++;

  let topPosition = '0';

  if (position === 'center') {
    topPosition = `${toastCounter * 83}px`;
  } else {
    topPosition = `${toastCounter * 83}px`;
  }

  if (position === 'center') {
    toastElement.style.top = topPosition;
    toastElement.style.left = '50%';
    toastElement.style.transform = 'translate(-50%, -16%)';
  } else {
    toastElement.style.top = topPosition;
  }

  if (typeof message === "string") {
    message = <div>{message}</div>;
  }

  root.render(message);

  if (duration !== undefined) {
    setTimeout(() => {
      remove();
    }, duration);
  }

  return toastElement;
};




const remove = (div: HTMLDivElement) => {
  toastRoot?.removeChild(div);
  toastCounter--;
};

type alert = { text?: string; duration?: number ; position?: 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left' } | string;

showToast.success = (prop?: alert) => {
  let text = "Completed successfully";
  let duration = 2000;
  let position: 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left' = 'right';

  if (typeof prop === "string") {
    text = prop;
  } else {
    duration = prop?.duration || duration;
    text = prop?.text || text;
    position = prop?.position || 'right';
  }

  const div = General(
    <>
      <img src={toastTic} alt="" />
      <div style={{ marginRight: "30px" }}>{text}</div>
      <img
        src={crossLogo()}
        className="q_toast_cross"
        alt=""
        onClick={() => {
          remove(div);
        }}
      />
    </>,
    duration,
    position,
    "q_toast_success"
  );
}


showToast.warn = (prop?: alert) => {
  let text = "warning";
  let duration = 2000;
  let position: 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left' = 'right';
  if (typeof prop === "string") {
    text = prop;
  } else {
    duration = prop?.duration || duration;
    text = prop?.text || text;
    position = prop?.position || 'right';
  }
  const div = General(
    <>
      <img src={questionLogo} alt="" />
      <div style={{ marginRight: "30px" }}>{text}</div>
      <img
        src={crossLogo()}
        className="q_toast_cross"
        alt=""
        width={"30px"}
        onClick={() => {
          remove(div);
        }}
      />
    </>,
    duration,
    position,
    "q_toast_warn"
  );
};

showToast.info = (prop?: alert) => {
  let text = "Alert ";
  let duration = 2000;
  let position: 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left' = 'center';
  if (typeof prop === "string") {
    text = prop;
  } else {
    duration = prop?.duration || duration;
    text = prop?.text || text;
    position = prop?.position || 'center';
  }
  console.log(position)
  const div = General(
    <>
      <img src={primaryAlert} alt="" />
      <div style={{ marginRight: "30px" }}>{text}</div>
      <img
        src={crossLogo()}
        className="q_toast_cross"
        alt=""
        onClick={() => {
          remove(div);
        }}
      />
    </>,
    duration,
    position,
    "q_toast_primary"
  );
};

showToast.primary = (prop?: alert) => {
  let text = "Alert ";
  let duration = 2000;
  let position: 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left' = 'right';
  if (typeof prop === "string") {
    text = prop;
  } else {
    duration = prop?.duration || duration;
    text = prop?.text || text;
    position = prop?.position || 'right';
  }
  const div = General(
    <>
      <img src={primaryAlert} alt="" />
      <div style={{ marginRight: "30px" }}>{text}</div>
      <img
        src={crossLogo()}
        className="q_toast_cross"
        alt=""
        onClick={() => {
          remove(div);
        }}
      />
    </>,
    duration,
    position,
    "q_toast_primary"
  );
};

showToast.error = (prop?: alert) => {
  let text = "Something went wrong";
  let duration = 2000;
  let position: 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left' = 'right';
  if (typeof prop === "string") {
    text = prop;
  } else {
    duration = prop?.duration || duration;
    text = prop?.text || text;
    position = prop?.position || 'right';
  }
  const div = General(
    <>
      <img src={alertLogo} alt="" />
      <div style={{ marginRight: "30px" }}>{text}</div>
      <img
        src={crossLogo()}
        className="q_toast_cross"
        alt=""
        onClick={() => {
          remove(div);
        }}
      />
    </>,
    duration,
    position,
    "q_toast_error"
  );
};

showToast.custom = (prop?: alert) => {
  let text = "This is a toast";
  let duration = 2000;
  let position: 'left' | 'right' | 'center' | 'bottom' | 'bottom-right' | 'bottom-left' = 'right';
  if (typeof prop === "string") {
    text = prop;
  } else {
    duration = prop?.duration || duration;
    text = prop?.text || text;
    position = prop?.position || 'right';
  }
  const div = General(
    <>
      <img src={alertLogo} alt="" />
      <div style={{ marginRight: "30px" }}>{text}</div>
      <img
        src={crossLogo()}
        className="q_toast_cross"
        alt=""
        onClick={() => {
          remove(div);
        }}
      />
    </>,
    duration,
    position,
    "q_toast_error"
  );
};

export default showToast;
