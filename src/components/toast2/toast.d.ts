declare module './toast' {
    interface ToastOptions {
      autoClose?: number;
      position?: string;
      onClose?: () => void;
      canClose?: boolean;
      showProgress?: boolean;
      // Add more specific types for other options as needed
    }
  
    class Toast {
      constructor(options: ToastOptions);
  
      static success(options: ToastOptions): Toast;
      static error(options: ToastOptions): Toast;
      static info(options: ToastOptions): Toast;
      static warning(options: ToastOptions): Toast;
  
      autoClose: number | false;
      position: string;
      image: string | null;
      text: string;
      canClose: boolean;
      showProgress: boolean;
      pauseOnHover: boolean;
      pauseOnFocusLoss: boolean;
  
      update(options: ToastOptions): void;
      background: string | undefined;
      borderColor: string | undefined;
      remove(): void;
    }
  
    export default Toast;
  }
  