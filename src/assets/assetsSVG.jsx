import React from "react";

export const userLogo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                d="M8 0.833374C6.2511 0.833374 4.83334 2.25114 4.83334 4.00004C4.83334 5.74894 6.2511 7.16671 8 7.16671C9.7489 7.16671 11.1667 5.74894 11.1667 4.00004C11.1667 2.25114 9.7489 0.833374 8 0.833374ZM5.83334 4.00004C5.83334 2.80342 6.80339 1.83337 8 1.83337C9.19662 1.83337 10.1667 2.80342 10.1667 4.00004C10.1667 5.19666 9.19662 6.16671 8 6.16671C6.80339 6.16671 5.83334 5.19666 5.83334 4.00004Z"
                fill="#8E8E8E"
            />
            <path
                d="M8 8.16671C6.45764 8.16671 5.03662 8.5173 3.98364 9.1096C2.94632 9.69309 2.16667 10.5774 2.16667 11.6667L2.16663 11.7347C2.16587 12.5092 2.16493 13.4814 3.01761 14.1757C3.43726 14.5175 4.02432 14.7605 4.81748 14.921C5.61284 15.082 6.64949 15.1667 8 15.1667C9.35052 15.1667 10.3872 15.082 11.1825 14.921C11.9757 14.7605 12.5627 14.5175 12.9824 14.1757C13.8351 13.4814 13.8341 12.5092 13.8334 11.7347L13.8333 11.6667C13.8333 10.5774 13.0537 9.69309 12.0164 9.1096C10.9634 8.5173 9.54237 8.16671 8 8.16671ZM3.16667 11.6667C3.16667 11.0991 3.58092 10.4835 4.4739 9.98117C5.3512 9.48769 6.59685 9.16671 8 9.16671C9.40315 9.16671 10.6488 9.48769 11.5261 9.98117C12.4191 10.4835 12.8333 11.0991 12.8333 11.6667C12.8333 12.5386 12.8065 13.0294 12.3509 13.4003C12.1039 13.6015 11.691 13.7978 10.9841 13.9409C10.2795 14.0835 9.31615 14.1667 8 14.1667C6.68385 14.1667 5.7205 14.0835 5.01586 13.9409C4.30902 13.7978 3.89608 13.6015 3.64906 13.4003C3.19355 13.0294 3.16667 12.5386 3.16667 11.6667Z"
                fill="#8E8E8E"
            />
        </svg>
    );
};

export const crossLogo = (id, handleRemove) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            onClick={() => handleRemove(id)}
            style={{ cursor: "pointer" }}
        >
            <g clipPath="url(#clip0_415_396)">
                <path
                    d="M6.68686 5.97981C6.4916 5.78455 6.17502 5.78455 5.97975 5.97981C5.78449 6.17507 5.78449 6.49165 5.97975 6.68692L7.29287 8.00004L5.97977 9.31314C5.78451 9.50841 5.78451 9.82499 5.97977 10.0203C6.17503 10.2155 6.49161 10.2155 6.68688 10.0203L7.99998 8.70714L9.31307 10.0202C9.50834 10.2155 9.82492 10.2155 10.0202 10.0202C10.2154 9.82498 10.2154 9.50839 10.0202 9.31313L8.70709 8.00004L10.0202 6.68693C10.2155 6.49167 10.2155 6.17509 10.0202 5.97982C9.82493 5.78456 9.50835 5.78456 9.31309 5.97982L7.99998 7.29293L6.68686 5.97981Z"
                    fill="#8E8E8E"
                />
                <path
                    d="M8 0.833374C4.04195 0.833374 0.833328 4.042 0.833328 8.00004C0.833328 11.9581 4.04195 15.1667 8 15.1667C11.958 15.1667 15.1667 11.9581 15.1667 8.00004C15.1667 4.042 11.958 0.833374 8 0.833374ZM1.83333 8.00004C1.83333 4.59428 4.59424 1.83337 8 1.83337C11.4058 1.83337 14.1667 4.59428 14.1667 8.00004C14.1667 11.4058 11.4058 14.1667 8 14.1667C4.59424 14.1667 1.83333 11.4058 1.83333 8.00004Z"
                    fill="#8E8E8E"
                />
            </g>
            <defs>
                <clipPath id="clip0_415_396">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const crossLogoFeedback = (setComment) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            onClick={() => setComment("")}
            style={{ cursor: "pointer" }}
        >
            <g clipPath="url(#clip0_415_396)">
                <path
                    d="M6.68686 5.97981C6.4916 5.78455 6.17502 5.78455 5.97975 5.97981C5.78449 6.17507 5.78449 6.49165 5.97975 6.68692L7.29287 8.00004L5.97977 9.31314C5.78451 9.50841 5.78451 9.82499 5.97977 10.0203C6.17503 10.2155 6.49161 10.2155 6.68688 10.0203L7.99998 8.70714L9.31307 10.0202C9.50834 10.2155 9.82492 10.2155 10.0202 10.0202C10.2154 9.82498 10.2154 9.50839 10.0202 9.31313L8.70709 8.00004L10.0202 6.68693C10.2155 6.49167 10.2155 6.17509 10.0202 5.97982C9.82493 5.78456 9.50835 5.78456 9.31309 5.97982L7.99998 7.29293L6.68686 5.97981Z"
                    fill="#8E8E8E"
                />
                <path
                    d="M8 0.833374C4.04195 0.833374 0.833328 4.042 0.833328 8.00004C0.833328 11.9581 4.04195 15.1667 8 15.1667C11.958 15.1667 15.1667 11.9581 15.1667 8.00004C15.1667 4.042 11.958 0.833374 8 0.833374ZM1.83333 8.00004C1.83333 4.59428 4.59424 1.83337 8 1.83337C11.4058 1.83337 14.1667 4.59428 14.1667 8.00004C14.1667 11.4058 11.4058 14.1667 8 14.1667C4.59424 14.1667 1.83333 11.4058 1.83333 8.00004Z"
                    fill="#8E8E8E"
                />
            </g>
            <defs>
                <clipPath id="clip0_415_396">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const emailLogo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                d="M6.62906 2.16699H9.37094C10.5961 2.16698 11.5665 2.16697 12.326 2.26908C13.1076 2.37417 13.7403 2.59558 14.2392 3.09449C14.7381 3.5934 14.9595 4.22603 15.0646 5.00764C15.1667 5.76712 15.1667 6.73754 15.1667 7.96272V8.03793C15.1667 9.26311 15.1667 10.2335 15.0646 10.993C14.9595 11.7746 14.7381 12.4073 14.2392 12.9062C13.7403 13.4051 13.1076 13.6265 12.326 13.7316C11.5665 13.8337 10.5961 13.8337 9.37094 13.8337H6.62906C5.40388 13.8337 4.43346 13.8337 3.67398 13.7316C2.89237 13.6265 2.25974 13.4051 1.76083 12.9062C1.26192 12.4073 1.04051 11.7746 0.935423 10.993C0.833314 10.2335 0.833323 9.26311 0.833333 8.03794V7.96271C0.833323 6.73754 0.833314 5.76712 0.935423 5.00764C1.04051 4.22603 1.26192 3.5934 1.76083 3.09449C2.25974 2.59558 2.89237 2.37417 3.67399 2.26908C4.43346 2.16697 5.40388 2.16698 6.62906 2.16699ZM3.80723 3.26017C3.13651 3.35034 2.75008 3.51945 2.46794 3.80159C2.1858 4.08373 2.01668 4.47017 1.92651 5.14089C1.8344 5.826 1.83333 6.72911 1.83333 8.00033C1.83333 9.27154 1.8344 10.1747 1.92651 10.8598C2.01668 11.5305 2.1858 11.9169 2.46794 12.1991C2.75008 12.4812 3.13651 12.6503 3.80723 12.7405C4.49234 12.8326 5.39545 12.8337 6.66667 12.8337H9.33333C10.6045 12.8337 11.5077 12.8326 12.1928 12.7405C12.8635 12.6503 13.2499 12.4812 13.5321 12.1991C13.8142 11.9169 13.9833 11.5305 14.0735 10.8598C14.1656 10.1747 14.1667 9.27154 14.1667 8.00033C14.1667 6.72911 14.1656 5.826 14.0735 5.14089C13.9833 4.47017 13.8142 4.08373 13.5321 3.80159C13.2499 3.51945 12.8635 3.35034 12.1928 3.26017C11.5077 3.16805 10.6045 3.16699 9.33333 3.16699H6.66667C5.39545 3.16699 4.49234 3.16805 3.80723 3.26017ZM3.61589 5.01357C3.79267 4.80143 4.10795 4.77277 4.32009 4.94955L5.75936 6.14894C6.38133 6.66725 6.81315 7.02594 7.17772 7.26041C7.53063 7.48739 7.76995 7.56358 8 7.56358C8.23005 7.56358 8.46937 7.48739 8.82228 7.26041C9.18685 7.02594 9.61867 6.66725 10.2406 6.14893L11.6799 4.94955C11.892 4.77277 12.2073 4.80143 12.3841 5.01357C12.5609 5.22571 12.5322 5.54099 12.3201 5.71777L10.8558 6.93804C10.2649 7.43048 9.78592 7.82961 9.36322 8.10148C8.92288 8.38468 8.49405 8.56358 8 8.56358C7.50595 8.56358 7.07712 8.38468 6.63679 8.10148C6.21408 7.82961 5.73514 7.43048 5.14424 6.93805L3.67991 5.71777C3.46777 5.54099 3.43911 5.22571 3.61589 5.01357Z"
                fill="#8E8E8E"
            />
        </svg>
    );
};

export const phoneLogo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.00501 2.27124C5.12505 1.15119 7.01515 1.23634 7.79503 2.63375L8.2277 3.40904C8.73698 4.32159 8.51996 5.47297 7.77442 6.22762C7.76449 6.24122 7.71187 6.31785 7.70531 6.45172C7.69695 6.6226 7.75764 7.01779 8.36992 7.63007C8.98201 8.24216 9.37714 8.303 9.54809 8.29468C9.68208 8.28817 9.75876 8.23551 9.77238 8.22557C10.527 7.48004 11.6784 7.26302 12.591 7.77229L13.3662 8.20497C14.7637 8.98485 14.8488 10.8749 13.7288 11.995C13.1297 12.5941 12.333 13.1264 11.3969 13.1619C10.0096 13.2145 7.70613 12.8562 5.42494 10.5751C3.14375 8.29387 2.78549 5.99038 2.83808 4.60309C2.87357 3.66696 3.4059 2.87035 4.00501 2.27124ZM6.92181 3.12108C6.52246 2.40552 5.44933 2.24113 4.71211 2.97835C4.19522 3.49524 3.85917 4.06579 3.83737 4.64097C3.79351 5.79787 4.07913 7.81504 6.13205 9.86795C8.18496 11.9209 10.2021 12.2065 11.359 12.1626C11.9342 12.1408 12.5048 11.8048 13.0217 11.2879C13.7589 10.5507 13.5945 9.47753 12.8789 9.07819L12.1036 8.64551C11.6214 8.37636 10.9439 8.46817 10.4684 8.9437L10.4682 8.94385C10.4215 8.99053 10.1243 9.26784 9.59668 9.2935C9.05653 9.31978 8.40271 9.07708 7.66281 8.33718C6.92268 7.59704 6.68006 6.94304 6.70651 6.40282C6.73235 5.87514 7.00983 5.57807 7.05626 5.53164L7.05628 5.53162C7.53182 5.05607 7.62363 4.37865 7.35448 3.89637L6.92181 3.12108Z"
                fill="#8E8E8E"
            />
        </svg>
    );
};

export const rightArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                d="M2.70837 10C2.70837 9.65482 2.9882 9.375 3.33337 9.375L15.1578 9.375L11.2248 5.44194C10.9807 5.19786 10.9807 4.80214 11.2248 4.55806C11.4688 4.31398 11.8646 4.31398 12.1086 4.55806L17.1086 9.55806C17.2259 9.67527 17.2917 9.83424 17.2917 10C17.2917 10.1658 17.2259 10.3247 17.1086 10.4419L12.1086 15.4419C11.8646 15.686 11.4688 15.686 11.2248 15.4419C10.9807 15.1979 10.9807 14.8021 11.2248 14.5581L15.1578 10.625L3.33337 10.625C2.9882 10.625 2.70837 10.3452 2.70837 10Z"
                fill="white"
            />
        </svg>
    );
};

export const leftArrow = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
        >
            <path
                d="M17.2916 10C17.2916 9.65482 17.0118 9.375 16.6666 9.375L4.84218 9.375L8.77523 5.44194C9.01931 5.19786 9.01931 4.80214 8.77523 4.55806C8.53116 4.31398 8.13543 4.31398 7.89135 4.55806L2.89135 9.55806C2.77414 9.67527 2.70829 9.83424 2.70829 10C2.70829 10.1658 2.77414 10.3247 2.89135 10.4419L7.89135 15.4419C8.13543 15.686 8.53116 15.686 8.77523 15.4419C9.01931 15.1979 9.01931 14.8021 8.77523 14.5581L4.84218 10.625L16.6666 10.625C17.0118 10.625 17.2916 10.3452 17.2916 10Z"
                fill="#252525"
            />
        </svg>
    );
};

export const calenderIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                d="M11.3334 9.33329C11.7016 9.33329 12 9.03482 12 8.66663C12 8.29844 11.7016 7.99996 11.3334 7.99996C10.9652 7.99996 10.6667 8.29844 10.6667 8.66663C10.6667 9.03482 10.9652 9.33329 11.3334 9.33329Z"
                fill="#8E8E8E"
            />
            <path
                d="M11.3334 12C11.7016 12 12 11.7015 12 11.3333C12 10.9651 11.7016 10.6666 11.3334 10.6666C10.9652 10.6666 10.6667 10.9651 10.6667 11.3333C10.6667 11.7015 10.9652 12 11.3334 12Z"
                fill="#8E8E8E"
            />
            <path
                d="M8.66671 8.66663C8.66671 9.03482 8.36823 9.33329 8.00004 9.33329C7.63185 9.33329 7.33337 9.03482 7.33337 8.66663C7.33337 8.29844 7.63185 7.99996 8.00004 7.99996C8.36823 7.99996 8.66671 8.29844 8.66671 8.66663Z"
                fill="#8E8E8E"
            />
            <path
                d="M8.66671 11.3333C8.66671 11.7015 8.36823 12 8.00004 12C7.63185 12 7.33337 11.7015 7.33337 11.3333C7.33337 10.9651 7.63185 10.6666 8.00004 10.6666C8.36823 10.6666 8.66671 10.9651 8.66671 11.3333Z"
                fill="#8E8E8E"
            />
            <path
                d="M4.66671 9.33329C5.0349 9.33329 5.33337 9.03482 5.33337 8.66663C5.33337 8.29844 5.0349 7.99996 4.66671 7.99996C4.29852 7.99996 4.00004 8.29844 4.00004 8.66663C4.00004 9.03482 4.29852 9.33329 4.66671 9.33329Z"
                fill="#8E8E8E"
            />
            <path
                d="M4.66671 12C5.0349 12 5.33337 11.7015 5.33337 11.3333C5.33337 10.9651 5.0349 10.6666 4.66671 10.6666C4.29852 10.6666 4.00004 10.9651 4.00004 11.3333C4.00004 11.7015 4.29852 12 4.66671 12Z"
                fill="#8E8E8E"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.66671 1.16663C4.94285 1.16663 5.16671 1.39048 5.16671 1.66663V2.17511C5.60804 2.16662 6.09426 2.16662 6.62901 2.16663H9.37098C9.90575 2.16662 10.392 2.16662 10.8334 2.17511V1.66663C10.8334 1.39048 11.0572 1.16663 11.3334 1.16663C11.6095 1.16663 11.8334 1.39048 11.8334 1.66663V2.21802C12.0067 2.23123 12.1708 2.24784 12.3261 2.26872C13.1077 2.3738 13.7403 2.59521 14.2392 3.09412C14.7381 3.59303 14.9595 4.22566 15.0646 5.00728C15.1667 5.76675 15.1667 6.73716 15.1667 7.96232V9.3709C15.1667 10.5961 15.1667 11.5665 15.0646 12.326C14.9595 13.1076 14.7381 13.7402 14.2392 14.2391C13.7403 14.738 13.1077 14.9595 12.3261 15.0645C11.5666 15.1666 10.5962 15.1666 9.37101 15.1666H6.6291C5.40394 15.1666 4.4335 15.1666 3.67403 15.0645C2.89241 14.9595 2.25978 14.738 1.76087 14.2391C1.26196 13.7402 1.04055 13.1076 0.935464 12.326C0.833355 11.5665 0.833364 10.5961 0.833374 9.3709V7.96235C0.833364 6.73717 0.833355 5.76675 0.935464 5.00728C1.04055 4.22566 1.26196 3.59303 1.76087 3.09412C2.25978 2.59521 2.89241 2.3738 3.67403 2.26872C3.82931 2.24784 3.99341 2.23123 4.16671 2.21802V1.66663C4.16671 1.39048 4.39057 1.16663 4.66671 1.16663ZM3.80727 3.2598C3.13655 3.34998 2.75012 3.51909 2.46798 3.80123C2.18584 4.08337 2.01672 4.4698 1.92655 5.14052C1.91128 5.25412 1.89851 5.3737 1.88783 5.49996H14.1123C14.1016 5.3737 14.0888 5.25412 14.0735 5.14053C13.9834 4.4698 13.8142 4.08337 13.5321 3.80123C13.25 3.51909 12.8635 3.34998 12.1928 3.2598C11.5077 3.16769 10.6046 3.16663 9.33337 3.16663H6.66671C5.39549 3.16663 4.49238 3.16769 3.80727 3.2598ZM1.83337 7.99996C1.83337 7.43062 1.83359 6.93511 1.8421 6.49996H14.158C14.1665 6.93511 14.1667 7.43062 14.1667 7.99996V9.33329C14.1667 10.6045 14.1656 11.5076 14.0735 12.1927C13.9834 12.8635 13.8142 13.2499 13.5321 13.532C13.25 13.8142 12.8635 13.9833 12.1928 14.0735C11.5077 14.1656 10.6046 14.1666 9.33337 14.1666H6.66671C5.39549 14.1666 4.49238 14.1656 3.80727 14.0735C3.13655 13.9833 2.75012 13.8142 2.46798 13.532C2.18584 13.2499 2.01672 12.8635 1.92655 12.1927C1.83444 11.5076 1.83337 10.6045 1.83337 9.33329V7.99996Z"
                fill="#8E8E8E"
            />
        </svg>
    );
};

export const textAreaIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.39946 1.5941C10.4138 0.579798 12.0583 0.579798 13.0726 1.5941C14.0869 2.60841 14.0869 4.25292 13.0726 5.26722L8.0099 10.3299C7.72457 10.6153 7.55032 10.7895 7.3561 10.941C7.12728 11.1195 6.8797 11.2725 6.61774 11.3974C6.39539 11.5033 6.16159 11.5812 5.77875 11.7088L3.99698 12.3028L3.5692 12.4453C3.1863 12.573 2.76415 12.4733 2.47876 12.1879C2.19336 11.9025 2.0937 11.4804 2.22134 11.0975L2.95785 8.88794C3.08544 8.50509 3.16336 8.27129 3.26933 8.04894C3.39417 7.78698 3.54719 7.5394 3.72566 7.31058C3.87715 7.11636 4.05142 6.94211 4.33679 6.65677L9.39946 1.5941ZM3.97391 11.2563L3.41033 10.6928L3.89595 9.23593C4.03734 8.81176 4.09573 8.6393 4.17205 8.47916C4.26565 8.28276 4.38037 8.09715 4.51417 7.9256C4.62327 7.78572 4.75141 7.65636 5.06757 7.34021L8.99488 3.41289C9.15699 3.81955 9.43127 4.31036 9.89379 4.77289C10.3563 5.23541 10.8471 5.50969 11.2538 5.6718L7.32647 9.59911C7.01032 9.91527 6.88096 10.0434 6.74108 10.1525C6.56953 10.2863 6.38392 10.401 6.18752 10.4946C6.02738 10.5709 5.85492 10.6293 5.43076 10.7707L3.97391 11.2563ZM12.0506 4.87498C11.9681 4.85685 11.8648 4.82959 11.7475 4.78887C11.4248 4.67692 11.0003 4.46523 10.6009 4.06578C10.2015 3.66633 9.98976 3.24188 9.87781 2.9192C9.83709 2.80184 9.80983 2.69862 9.7917 2.61607L10.1066 2.30121C10.7303 1.67743 11.7417 1.67743 12.3655 2.30121C12.9893 2.92499 12.9893 3.93634 12.3655 4.56012L12.0506 4.87498ZM2.16664 14.6667C2.16664 14.3906 2.3905 14.1667 2.66664 14.1667H13.3333V15.1667H2.66664C2.3905 15.1667 2.16664 14.9429 2.16664 14.6667Z"
                fill="#8E8E8E"
            />
        </svg>
    );
};

export const backButton = (handleBackClick) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            onClick={handleBackClick}
            style={{cursor: "pointer"}}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.77529 4.55806C9.01936 4.80214 9.01936 5.19786 8.77529 5.44194L4.84223 9.375H16.6667C17.0119 9.375 17.2917 9.65482 17.2917 10C17.2917 10.3452 17.0119 10.625 16.6667 10.625H4.84223L8.77529 14.5581C9.01936 14.8021 9.01936 15.1979 8.77529 15.4419C8.53121 15.686 8.13548 15.686 7.8914 15.4419L2.8914 10.4419C2.64732 10.1979 2.64732 9.80214 2.8914 9.55806L7.8914 4.55806C8.13548 4.31398 8.53121 4.31398 8.77529 4.55806Z"
                fill="#AFAFAF"
            />
        </svg>
    );
};