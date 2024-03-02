import { success, error, warning, info } from './svg';

interface DefaultImages {
  [key: string]: string; 
  success: string;
  warning: string;
  error: string;
  info: string;
}

interface ToastOptions {
  autoClose?: number;
  position?: string;
  onClose?: () => void;
  canClose?: boolean;
  // showProgress?: boolean;
  defaultImages?: DefaultImages;
  className?: string;
  text?: string;
  pauseOnHover?: boolean;
  background?: string;
  // progressColor?: string;
  image?: string;
  borderColor?:string
}

const DEFAULT_OPTIONS: ToastOptions = {
  autoClose: 5000,
  position: "top-right",
  onClose: () => {},
  canClose: true,
  // showProgress: true,
  defaultImages: {
    success: success(),
    warning: warning(),
    error: error(),
    info: info(),
  } as DefaultImages,
};

class Toast {
  #toastElem: HTMLDivElement;
  #autoCloseInterval: number | undefined;
  #progressInterval: number | undefined;
  #removeBinded: () => void;
  #timeVisible = 0;
  #autoCloseValue: any | undefined;
  #isPaused = false;
  #unpause: () => void;
  #pause: () => void;
  #visibilityChange: () => void;
  #shouldUnPause: boolean | undefined;
  onClose?: () => void;
  #background: string | undefined;
  #borderColor: string | undefined;
  #progressColor: string | undefined;

  constructor(options: ToastOptions) {
    this.#toastElem = document.createElement("div");
    this.#toastElem.classList.add("qt_toast");
    requestAnimationFrame(() => {
      this.#toastElem.classList.add("qt_show");
    });

    this.#removeBinded = this.remove.bind(this);
    this.#unpause = () => (this.#isPaused = false);
    this.#pause = () => (this.#isPaused = true);
    this.#visibilityChange = () => {
      this.#shouldUnPause = document.visibilityState === "visible";
    };
    this.update({ ...DEFAULT_OPTIONS, ...options });
    this.image = options.image;
  }

  static success(options: ToastOptions): Toast {
    return new Toast({ ...options, className: "success" });
  }

  static error(options: ToastOptions): Toast {
    return new Toast({ ...options, className: "error" });
  }

  static info(options: ToastOptions): Toast {
    return new Toast({ ...options, className: "info" });
  }

  static warning(options: ToastOptions): Toast {
    return new Toast({ ...options, className: "warning" });
  }

  set autoClose(value: boolean | undefined) {
    this.#autoCloseValue = value;
    this.#timeVisible = 0;
    if (value === false) return;

    let lastTime: number | null = null;
    const func = (time: number) => {
      if (this.#shouldUnPause) {
        lastTime = null;
        this.#shouldUnPause = false;
      }
      if (lastTime == null) {
        lastTime = time;
        this.#autoCloseInterval = requestAnimationFrame(func);
        return;
      }
      if (!this.#isPaused) {
        this.#timeVisible += time - lastTime;
        if (
          typeof this.#autoCloseValue === "number" &&
          this.#timeVisible >= this.#autoCloseValue
        ) {
          this.remove();
          return;
        }
      }

      lastTime = time;
      this.#autoCloseInterval = requestAnimationFrame(func);
    };

    this.#autoCloseInterval = requestAnimationFrame(func);
  }

  set position(value: string | undefined) {
    const currentContainer = this.#toastElem.parentElement;
    const selector = `.qt_toast-container[data-position="${value}"]`;
    const container =
      document.querySelector(selector) || this.createContainer(value!);
    container.append(this.#toastElem);
    if (currentContainer == null || currentContainer.hasChildNodes()) return;
    currentContainer.remove();
  }

  set image(src: string | undefined) {
    if (!src) {
      const img = document.createElement("img");
      const classNameWithoutToast = this.#toastElem.className.replace(
        "qt_toast ",
        ""
      );
      img.src =
        DEFAULT_OPTIONS.defaultImages![classNameWithoutToast] ||
        DEFAULT_OPTIONS.defaultImages!.info;
      this.#toastElem.insertBefore(img, this.#toastElem.firstChild);
    } else {
      const img = this.#toastElem.querySelector("img");
      if (img) {
        img.remove();
      }
      const customImg = document.createElement("img");
      customImg.src = src;
      this.#toastElem.insertBefore(customImg, this.#toastElem.firstChild);
    }
  }

  set text(value: string) {
    this.#toastElem.textContent = value;
  }

  set canClose(value: boolean | undefined) {
    this.#toastElem.classList.toggle("can-close", value);
    if (value) {
      this.#toastElem.addEventListener("click", this.#removeBinded);
    } else {
      this.#toastElem.removeEventListener("click", this.#removeBinded);
    }
  }

  set showProgress(value: boolean | undefined) {
    this.#toastElem.classList.toggle("progress", value);
    this.#toastElem.style.setProperty("--progress", "1");

    if (value && typeof this.#autoCloseValue === "number") {
      const func = () => {
        if (!this.#isPaused) {
          this.#toastElem.style.setProperty(
            "--progress",
            (1 - this.#timeVisible / this.#autoCloseValue).toString()
          );
          if (this.#progressColor) {
            this.#toastElem.style.setProperty(
              "--progress-color",
              this.#progressColor
            );
          }
        }
        this.#progressInterval = requestAnimationFrame(func);
      };

      this.#progressInterval = requestAnimationFrame(func);
    }
  }

  set pauseOnHover(value: boolean | undefined) {
    if (value) {
      this.#toastElem.addEventListener("mouseover", this.#pause);
      this.#toastElem.addEventListener("mouseleave", this.#unpause);
    } else {
      this.#toastElem.removeEventListener("mouseover", this.#pause);
      this.#toastElem.removeEventListener("mouseleave", this.#unpause);
    }
  }

  set pauseOnFocusLoss(value: boolean | undefined) {
    if (value) {
      document.addEventListener("visibilitychange", this.#visibilityChange);
    } else {
      document.removeEventListener("visibilitychange", this.#visibilityChange);
    }
  }

  update(options: ToastOptions & { className?: string }) {
    Object.entries(options).forEach(([key, value]) => {
      if (key !== "className") {
        (this as any)[key] = value;
      }
    });

    if ((options as any).image && options.className) {
      const imageSrc =
        DEFAULT_OPTIONS.defaultImages?.[options.className] ||
        DEFAULT_OPTIONS.defaultImages?.info;
      (this as any).image = imageSrc || null;
    }

    if (options.className) {
      this.#toastElem.className = `qt_toast ${options.className}`;
    } else {
      this.#toastElem.className = "qt_toast";
    }
  }

  set background(value: string | undefined) {
    this.#background = value;
    this.#toastElem.style.background = value!;
  }

  set borderColor(value: string | undefined) {
    this.#borderColor = value;
    this.#toastElem.style.borderColor = value!;
  }

  remove() {
    cancelAnimationFrame(this.#autoCloseInterval!);
    cancelAnimationFrame(this.#progressInterval!);
    const container = this.#toastElem.parentElement;
    this.#toastElem.classList.remove("qt_show");
    this.#toastElem.addEventListener("transitionend", () => {
      this.#toastElem.remove();
      if (container!.hasChildNodes()) return;
      container!.remove();
    });
    (this.onClose as () => void)();
  }

  private createContainer(
    position: string,
    className?: string
  ): HTMLDivElement {
    const container = document.createElement("div");
    container.classList.add("qt_toast-container");
    container.classList.add(className!);
    container.dataset.position = position;
    document.body.append(container);
    return container;
  }
}

export default Toast;
