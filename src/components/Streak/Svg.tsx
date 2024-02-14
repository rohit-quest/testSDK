const createUrl = (string="") => `data:image/svg+xml,${encodeURIComponent(string)}`

export const streakIcon = (active: boolean) => createUrl(`<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.6324 19.8013C13.7584 19.1747 17.8 16.926 17.8 11.1112C17.8 5.8196 13.9267 2.29593 11.1416 0.676845C10.5236 0.317575 9.80005 0.79006 9.80005 1.50492V3.3334C9.80005 4.77526 9.19382 7.40711 7.50937 8.5018C6.64937 9.0607 5.72057 8.22419 5.61605 7.20388L5.53022 6.36604C5.43045 5.39203 4.43846 4.80075 3.66 5.3946C2.26152 6.46144 0.800049 8.3296 0.800049 11.1112C0.800049 18.2223 6.08894 20.0001 8.73338 20.0001C8.8872 20.0001 9.04884 19.9955 9.21711 19.9858C7.91136 19.8742 5.80005 19.064 5.80005 16.4442C5.80005 14.3949 7.29512 13.0085 8.43107 12.3346C8.73659 12.1533 9.09417 12.3887 9.09417 12.7439V13.3331C9.09417 13.784 9.26855 14.4889 9.68368 14.9714C10.1534 15.5174 10.843 14.9454 10.8986 14.2273C10.9161 14.0008 11.1439 13.8564 11.3401 13.9711C11.9814 14.3459 12.8 15.1465 12.8 16.4442C12.8 18.4922 11.6711 19.4343 10.6324 19.8013Z" fill="${active?'#9035FF':'#B9B9B9'}"/>
</svg>`)

export const streakIcon2 = (active: boolean) => active?createUrl(`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.41577 6.1327L12.7546 11.56L22.1541 6.1327L12.8158 0.705872L3.41577 6.1327Z" fill="#FED57A"/>
<path d="M12.7824 23.2941L8.17014 20.6169L6.79932 19.8202L3.44402 17.8715L3.41626 6.13315L7.68261 8.61032L9.03508 9.39809L12.7551 11.5609L12.7824 23.2941Z" fill="#F1C40F"/>
<path d="M12.7645 15.6574L8.15226 12.9802L6.78191 12.1835L3.42614 10.2348L3.41626 6.13315L7.68261 8.61032L9.03508 9.39809L12.7551 11.5609L12.7645 15.6574ZM22.1843 17.8715L18.8017 19.8244L17.4308 20.6122L12.7824 23.2941L12.7551 11.5609L16.5297 9.37974L17.8911 8.59668L22.1527 6.13315L22.1843 17.8715Z" fill="#E5BD13"/>
<path d="M22.1671 10.2348L18.7841 12.1877L17.4137 12.9755L12.7648 15.6574L12.7554 11.5609L16.53 9.37974L17.8914 8.59668L22.153 6.13315L22.1671 10.2348Z" fill="#D6B218"/>
<path d="M23.0454 6.64799L18.779 9.11105L17.7319 9.7167L17.5362 9.82587L17.4176 9.89411L17.4134 9.89881L12.7508 12.5896L8.18841 9.93975L6.81806 9.14305L2.52441 6.64799L7.19124 3.95717L8.539 3.17364L12.819 0.705872L17.067 3.17364L18.4105 3.95717L23.0454 6.64799Z" fill="#ECF0F1"/>
<path d="M2.52441 6.6485L2.55688 9.12097L12.7508 15.0899V12.5916L2.52441 6.6485Z" fill="#E0E2E2"/>
<path d="M12.7505 12.5916V15.0899L23.0757 9.12097L23.0432 6.6485L12.7505 12.5916Z" fill="#D4D6D6"/>
<path d="M18.4103 3.95717L14.1529 6.42917L12.8004 7.2127L8.1882 9.88988L8.18396 9.89412L7.86961 9.7167L6.83149 9.13412L6.81785 9.1247L6.8042 9.12047L11.4484 6.42917L12.8004 5.64612L17.0668 3.17365L18.4103 3.95717Z" fill="#D8463F"/>
<path d="M8.18827 9.88986L8.18403 12.4169V12.9995L8.17038 20.6169L6.79956 19.8202L6.81321 12.2028V11.6155L6.81791 9.12469V9.12045L7.86968 9.71669L8.18827 9.88986Z" fill="#CC4444"/>
<path d="M18.7973 9.12047L18.7836 9.1247L18.77 9.13412L17.7319 9.7167L17.5361 9.82588L17.4175 9.89412L17.4133 9.88988L12.8006 7.2127L11.4486 6.42917L7.19116 3.95717L8.53893 3.17365L12.8006 5.64612L14.153 6.42917L18.7789 9.11106L18.7973 9.12047Z" fill="#D8463F"/>
<path d="M18.8018 19.8245L17.431 20.6122L17.4131 9.88986L17.7317 9.71669L18.7834 9.12045V9.12469L18.8018 19.8245Z" fill="#CC4444"/>
<path d="M18.7834 11.6019V12.1892L17.4131 12.977L17.4173 12.3939L18.7834 11.6019Z" fill="#CC4444"/>
<path d="M8.1843 12.4169V12.9995L6.81348 12.2028V11.6155L8.1843 12.4169Z" fill="#C14242"/>
<path d="M16.2119 5.12332L12.866 7.05885L11.5818 6.31203L14.9281 4.3765C15.6114 3.52474 15.8571 2.39532 15.4928 1.79909C15.4302 1.68643 15.3373 1.59352 15.2246 1.53085L16.5084 2.27768C16.6176 2.33697 16.7041 2.42827 16.7766 2.54215C17.1413 3.14309 16.8952 4.27203 16.2119 5.12332Z" fill="#D8463F"/>
<path d="M12.6975 7.15432L10.1201 8.64327C10.0371 8.63488 9.95666 8.61008 9.88337 8.57032L8.59961 7.8235C8.66784 7.86444 8.74973 7.88703 8.83632 7.89644L11.418 6.4075L12.6975 7.15432Z" fill="#E74C3C"/>
<path d="M15.2911 1.41174L16.5749 2.15715C16.3975 2.05362 16.1782 2.02538 15.9316 2.07856C15.7609 2.11717 15.5974 2.18227 15.4469 2.2715C15.1984 2.41456 14.9518 2.62491 14.7255 2.89174C14.0723 3.65785 13.0685 6.2795 12.7819 7.04562L12.7396 7.15997L11.4563 6.41362L11.4987 6.29974C11.7848 5.53315 12.789 2.9115 13.4417 2.14585C13.6685 1.87903 13.9147 1.66868 14.1636 1.52515C14.3139 1.43596 14.4773 1.37086 14.6478 1.33221C14.8949 1.27997 15.1137 1.30868 15.2911 1.41174Z" fill="#CC4444"/>
<path d="M16.8612 2.44472C17.2565 3.08331 16.9859 4.29696 16.2495 5.20707L16.24 5.2226L12.784 7.2179L12.7026 7.26496L12.7403 7.16002L12.7826 7.04566C13.0688 6.27955 14.0725 3.65743 14.7257 2.89178C14.952 2.62496 15.1986 2.4146 15.4471 2.27107C15.5976 2.18184 15.7612 2.11674 15.9318 2.07813C16.3365 1.99202 16.6655 2.12331 16.8617 2.44519L16.8612 2.44472ZM16.2137 5.12425C16.896 4.27202 17.1431 3.14213 16.7775 2.54355C16.593 2.24237 16.281 2.12096 15.9026 2.1986C15.7446 2.23486 15.5931 2.29551 15.4537 2.37837C15.2179 2.51437 14.9836 2.71437 14.7695 2.9666C14.1365 3.70684 13.1022 6.41884 12.865 7.05743L16.2137 5.12425Z" fill="#C14242"/>
<path d="M10.1943 5.04469L11.4781 5.7901C11.7925 5.97269 12.2127 6.4414 12.6993 7.1534L11.4155 6.40704C10.9294 5.69551 10.5087 5.22681 10.1943 5.04422V5.04469Z" fill="#CC4444"/>
<path d="M12.7824 7.04563L12.7401 7.15998L12.7024 7.26493L10.0949 8.77081L10.0831 8.76751C9.50337 8.72375 9.28878 8.01787 9.59231 7.16375C9.81349 6.54351 10.2507 6.00846 10.702 5.74728C10.8921 5.6381 11.0845 5.57693 11.2648 5.57881C11.693 5.58587 12.318 6.36798 12.7824 7.04563ZM10.1208 8.64187L12.6991 7.1534C12.0648 6.22446 11.542 5.7101 11.2215 5.70398C11.0554 5.70163 10.877 5.7581 10.701 5.85928C10.2855 6.09928 9.8822 6.59246 9.67984 7.16328C9.39937 7.94728 9.59325 8.59481 10.1208 8.64187Z" fill="#D8463F"/>
<path d="M9.98149 4.83293C10.069 4.83434 10.165 4.86822 10.2653 4.92658L11.549 5.67246C11.4483 5.6141 11.3528 5.58022 11.2653 5.57881C11.085 5.57693 10.8925 5.6381 10.7024 5.74775C10.2507 6.00846 9.81443 6.54352 9.59278 7.16375C9.34243 7.86822 9.44455 8.47199 9.81349 8.6861L8.52972 7.94022C8.16125 7.7261 8.05914 7.12234 8.30902 6.41787C8.53067 5.79763 8.96737 5.2621 9.41867 5.0014C9.60878 4.89175 9.80125 4.83105 9.98149 4.83293Z" fill="#E74C3C"/>
</svg>
`):createUrl(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g style="mix-blend-mode:luminosity">
<path d="M2.61572 6.1327L11.9545 11.56L21.3541 6.1327L12.0157 0.705872L2.61572 6.1327Z" fill="#FED57A"/>
<path d="M11.9823 23.2941L7.37009 20.6169L5.99927 19.8202L2.64398 17.8715L2.61621 6.13315L6.88256 8.61032L8.23503 9.39809L11.955 11.5609L11.9823 23.2941Z" fill="#F1C40F"/>
<path d="M11.9644 15.6574L7.35221 12.9802L5.98186 12.1835L2.62609 10.2348L2.61621 6.13315L6.88256 8.61032L8.23503 9.39809L11.955 11.5609L11.9644 15.6574ZM21.3842 17.8715L18.0016 19.8244L16.6308 20.6122L11.9823 23.2941L11.955 11.5609L15.7296 9.37974L17.091 8.59668L21.3527 6.13315L21.3842 17.8715Z" fill="#E5BD13"/>
<path d="M21.3671 10.2348L17.984 12.1877L16.6137 12.9755L11.9647 15.6574L11.9553 11.5609L15.7299 9.37974L17.0913 8.59668L21.353 6.13315L21.3671 10.2348Z" fill="#D6B218"/>
<path d="M22.2453 6.64799L17.979 9.11105L16.9319 9.7167L16.7361 9.82587L16.6175 9.89411L16.6133 9.89881L11.9507 12.5896L7.38836 9.93975L6.01801 9.14305L1.72437 6.64799L6.39119 3.95717L7.73895 3.17364L12.019 0.705872L16.267 3.17364L17.6105 3.95717L22.2453 6.64799Z" fill="#ECF0F1"/>
<path d="M1.72437 6.6485L1.75684 9.12097L11.9507 15.0899V12.5916L1.72437 6.6485Z" fill="#E0E2E2"/>
<path d="M11.9504 12.5916V15.0899L22.2756 9.12097L22.2431 6.6485L11.9504 12.5916Z" fill="#D4D6D6"/>
<path d="M17.6103 3.95717L13.3529 6.42917L12.0004 7.2127L7.38815 9.88988L7.38392 9.89412L7.06956 9.7167L6.03144 9.13412L6.0178 9.1247L6.00415 9.12047L10.6484 6.42917L12.0004 5.64612L16.2667 3.17365L17.6103 3.95717Z" fill="#D8463F"/>
<path d="M7.38822 9.88986L7.38398 12.4169V12.9995L7.37034 20.6169L5.99951 19.8202L6.01316 12.2028V11.6155L6.01786 9.12469V9.12045L7.06963 9.71669L7.38822 9.88986Z" fill="#CC4444"/>
<path d="M17.9972 9.12047L17.9836 9.1247L17.9699 9.13412L16.9318 9.7167L16.7361 9.82588L16.6175 9.89412L16.6132 9.88988L12.0005 7.2127L10.6485 6.42917L6.39111 3.95717L7.73888 3.17365L12.0005 5.64612L13.353 6.42917L17.9789 9.11106L17.9972 9.12047Z" fill="#D8463F"/>
<path d="M18.0017 19.8245L16.6309 20.6122L16.613 9.88986L16.9316 9.71669L17.9834 9.12045V9.12469L18.0017 19.8245Z" fill="#CC4444"/>
<path d="M17.9834 11.6019V12.1892L16.613 12.977L16.6173 12.3939L17.9834 11.6019Z" fill="#CC4444"/>
<path d="M7.38425 12.4169V12.9995L6.01343 12.2028V11.6155L7.38425 12.4169Z" fill="#C14242"/>
<path d="M15.4119 5.12332L12.066 7.05885L10.7817 6.31203L14.1281 4.3765C14.8114 3.52474 15.057 2.39532 14.6928 1.79909C14.6301 1.68643 14.5372 1.59352 14.4246 1.53085L15.7083 2.27768C15.8175 2.33697 15.9041 2.42827 15.9766 2.54215C16.3413 3.14309 16.0952 4.27203 15.4119 5.12332Z" fill="#D8463F"/>
<path d="M11.8974 7.15432L9.32003 8.64327C9.23708 8.63488 9.15661 8.61008 9.08333 8.57032L7.79956 7.8235C7.8678 7.86444 7.94968 7.88703 8.03627 7.89644L10.6179 6.4075L11.8974 7.15432Z" fill="#E74C3C"/>
<path d="M14.4911 1.41174L15.7748 2.15715C15.5974 2.05362 15.3781 2.02538 15.1315 2.07856C14.9609 2.11717 14.7973 2.18227 14.6468 2.2715C14.3984 2.41456 14.1518 2.62491 13.9254 2.89174C13.2722 3.65785 12.2685 6.2795 11.9819 7.04562L11.9395 7.15997L10.6562 6.41362L10.6986 6.29974C10.9847 5.53315 11.989 2.9115 12.6417 2.14585C12.8685 1.87903 13.1146 1.66868 13.3635 1.52515C13.5139 1.43596 13.6773 1.37086 13.8478 1.33221C14.0948 1.27997 14.3137 1.30868 14.4911 1.41174Z" fill="#CC4444"/>
<path d="M16.0612 2.44472C16.4565 3.08331 16.1859 4.29696 15.4494 5.20707L15.44 5.2226L11.984 7.2179L11.9026 7.26496L11.9402 7.16002L11.9826 7.04566C12.2687 6.27955 13.2725 3.65743 13.9256 2.89178C14.152 2.62496 14.3986 2.4146 14.6471 2.27107C14.7976 2.18184 14.9611 2.11674 15.1318 2.07813C15.5365 1.99202 15.8654 2.12331 16.0616 2.44519L16.0612 2.44472ZM15.4136 5.12425C16.096 4.27202 16.3431 3.14213 15.9774 2.54355C15.7929 2.24237 15.4809 2.12096 15.1026 2.1986C14.9445 2.23486 14.7931 2.29551 14.6536 2.37837C14.4179 2.51437 14.1835 2.71437 13.9694 2.9666C13.3365 3.70684 12.3021 6.41884 12.0649 7.05743L15.4136 5.12425Z" fill="#C14242"/>
<path d="M9.39429 5.04469L10.6781 5.7901C10.9924 5.97269 11.4126 6.4414 11.8992 7.1534L10.6155 6.40704C10.1293 5.69551 9.70864 5.22681 9.39429 5.04422V5.04469Z" fill="#CC4444"/>
<path d="M11.9824 7.04563L11.94 7.15998L11.9024 7.26493L9.29485 8.77081L9.28309 8.76751C8.70332 8.72375 8.48874 8.01787 8.79226 7.16375C9.01344 6.54351 9.45062 6.00846 9.90191 5.74728C10.092 5.6381 10.2845 5.57693 10.4647 5.57881C10.893 5.58587 11.5179 6.36798 11.9824 7.04563ZM9.32074 8.64187L11.8991 7.1534C11.2647 6.22446 10.7419 5.7101 10.4214 5.70398C10.2553 5.70163 10.077 5.7581 9.90097 5.85928C9.48544 6.09928 9.08215 6.59246 8.87979 7.16328C8.59932 7.94728 8.79321 8.59481 9.32074 8.64187Z" fill="#D8463F"/>
<path d="M9.18144 4.83293C9.26897 4.83434 9.36497 4.86822 9.46521 4.92658L10.749 5.67246C10.6483 5.6141 10.5527 5.58022 10.4652 5.57881C10.285 5.57693 10.0925 5.6381 9.90238 5.74775C9.45062 6.00846 9.01438 6.54352 8.79274 7.16375C8.54238 7.86822 8.6445 8.47199 9.01344 8.6861L7.72968 7.94022C7.36121 7.7261 7.25909 7.12234 7.50897 6.41787C7.73062 5.79763 8.16732 5.2621 8.61862 5.0014C8.80873 4.89175 9.00121 4.83105 9.18144 4.83293Z" fill="#E74C3C"/>
</g>
</svg>
`)