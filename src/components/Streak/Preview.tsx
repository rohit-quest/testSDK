import { QuestProvider } from '../QuestWrapper';
import DailyStreak from './DailyStreak';
export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'
const createUrl = (string="") => `data:image/svg+xml,${encodeURIComponent(string)}`

let a1 = createUrl(`<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
`)

let a2 = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g style="mix-blend-mode:luminosity">
<path d="M3.01587 6.1327L12.3547 11.56L21.7542 6.1327L12.4159 0.705872L3.01587 6.1327Z" fill="#FED57A"/>
<path d="M12.3825 23.2941L7.77024 20.6169L6.39942 19.8202L3.04412 17.8715L3.01636 6.13315L7.28271 8.61032L8.63518 9.39809L12.3552 11.5609L12.3825 23.2941Z" fill="#F1C40F"/>
<path d="M12.3646 15.6574L7.75236 12.9802L6.382 12.1835L3.02624 10.2348L3.01636 6.13315L7.28271 8.61032L8.63518 9.39809L12.3552 11.5609L12.3646 15.6574ZM21.7844 17.8715L18.4018 19.8244L17.0309 20.6122L12.3825 23.2941L12.3552 11.5609L16.1298 9.37974L17.4912 8.59668L21.7528 6.13315L21.7844 17.8715Z" fill="#E5BD13"/>
<path d="M21.7672 10.2348L18.3842 12.1877L17.0138 12.9755L12.3649 15.6574L12.3555 11.5609L16.1301 9.37974L17.4915 8.59668L21.7531 6.13315L21.7672 10.2348Z" fill="#D6B218"/>
<path d="M22.6455 6.64799L18.3791 9.11105L17.332 9.7167L17.1363 9.82587L17.0177 9.89411L17.0135 9.89881L12.3509 12.5896L7.78851 9.93975L6.41816 9.14305L2.12451 6.64799L6.79134 3.95717L8.1391 3.17364L12.4191 0.705872L16.6671 3.17364L18.0106 3.95717L22.6455 6.64799Z" fill="#ECF0F1"/>
<path d="M2.12451 6.6485L2.15698 9.12097L12.3509 15.0899V12.5916L2.12451 6.6485Z" fill="#E0E2E2"/>
<path d="M12.3506 12.5916V15.0899L22.6758 9.12097L22.6433 6.6485L12.3506 12.5916Z" fill="#D4D6D6"/>
<path d="M18.0104 3.95717L13.753 6.42917L12.4005 7.2127L7.7883 9.88988L7.78406 9.89412L7.46971 9.7167L6.43159 9.13412L6.41794 9.1247L6.4043 9.12047L11.0485 6.42917L12.4005 5.64612L16.6669 3.17365L18.0104 3.95717Z" fill="#D8463F"/>
<path d="M7.78836 9.88986L7.78413 12.4169V12.9995L7.77048 20.6169L6.39966 19.8202L6.41331 12.2028V11.6155L6.41801 9.12469V9.12045L7.46978 9.71669L7.78836 9.88986Z" fill="#CC4444"/>
<path d="M18.3974 9.12047L18.3837 9.1247L18.3701 9.13412L17.332 9.7167L17.1362 9.82588L17.0176 9.89412L17.0134 9.88988L12.4007 7.2127L11.0487 6.42917L6.79126 3.95717L8.13902 3.17365L12.4007 5.64612L13.7531 6.42917L18.379 9.11106L18.3974 9.12047Z" fill="#D8463F"/>
<path d="M18.4019 19.8245L17.0311 20.6122L17.0132 9.88986L17.3318 9.71669L18.3835 9.12045V9.12469L18.4019 19.8245Z" fill="#CC4444"/>
<path d="M18.3835 11.6019V12.1892L17.0132 12.977L17.0174 12.3939L18.3835 11.6019Z" fill="#CC4444"/>
<path d="M7.7844 12.4169V12.9995L6.41357 12.2028V11.6155L7.7844 12.4169Z" fill="#C14242"/>
<path d="M15.812 5.12332L12.4661 7.05885L11.1819 6.31203L14.5282 4.3765C15.2115 3.52474 15.4572 2.39532 15.0929 1.79909C15.0303 1.68643 14.9374 1.59352 14.8247 1.53085L16.1085 2.27768C16.2177 2.33697 16.3042 2.42827 16.3767 2.54215C16.7414 3.14309 16.4953 4.27203 15.812 5.12332Z" fill="#D8463F"/>
<path d="M12.2976 7.15432L9.72018 8.64327C9.63722 8.63488 9.55676 8.61008 9.48347 8.57032L8.19971 7.8235C8.26794 7.86444 8.34982 7.88703 8.43641 7.89644L11.0181 6.4075L12.2976 7.15432Z" fill="#E74C3C"/>
<path d="M14.8912 1.41174L16.175 2.15715C15.9976 2.05362 15.7783 2.02538 15.5317 2.07856C15.361 2.11717 15.1975 2.18227 15.047 2.2715C14.7985 2.41456 14.5519 2.62491 14.3256 2.89174C13.6724 3.65785 12.6686 6.2795 12.382 7.04562L12.3397 7.15997L11.0564 6.41362L11.0987 6.29974C11.3849 5.53315 12.3891 2.9115 13.0418 2.14585C13.2686 1.87903 13.5147 1.66868 13.7637 1.52515C13.914 1.43596 14.0774 1.37086 14.2479 1.33221C14.495 1.27997 14.7138 1.30868 14.8912 1.41174Z" fill="#CC4444"/>
<path d="M16.4613 2.44472C16.8566 3.08331 16.586 4.29696 15.8496 5.20707L15.8401 5.2226L12.3841 7.2179L12.3027 7.26496L12.3404 7.16002L12.3827 7.04566C12.6689 6.27955 13.6726 3.65743 14.3258 2.89178C14.5521 2.62496 14.7987 2.4146 15.0472 2.27107C15.1977 2.18184 15.3613 2.11674 15.5319 2.07813C15.9366 1.99202 16.2656 2.12331 16.4618 2.44519L16.4613 2.44472ZM15.8138 5.12425C16.4961 4.27202 16.7432 3.14213 16.3776 2.54355C16.1931 2.24237 15.8811 2.12096 15.5027 2.1986C15.3447 2.23486 15.1932 2.29551 15.0538 2.37837C14.818 2.51437 14.5837 2.71437 14.3696 2.9666C13.7366 3.70684 12.7023 6.41884 12.4651 7.05743L15.8138 5.12425Z" fill="#C14242"/>
<path d="M9.79443 5.04469L11.0782 5.7901C11.3926 5.97269 11.8128 6.4414 12.2994 7.1534L11.0156 6.40704C10.5295 5.69551 10.1088 5.22681 9.79443 5.04422V5.04469Z" fill="#CC4444"/>
<path d="M12.3825 7.04563L12.3402 7.15998L12.3025 7.26493L9.695 8.77081L9.68323 8.76751C9.10347 8.72375 8.88888 8.01787 9.19241 7.16375C9.41359 6.54351 9.85076 6.00846 10.3021 5.74728C10.4922 5.6381 10.6846 5.57693 10.8649 5.57881C11.2931 5.58587 11.9181 6.36798 12.3825 7.04563ZM9.72088 8.64187L12.2992 7.1534C11.6649 6.22446 11.1421 5.7101 10.8216 5.70398C10.6555 5.70163 10.4771 5.7581 10.3011 5.85928C9.88559 6.09928 9.48229 6.59246 9.27994 7.16328C8.99947 7.94728 9.19335 8.59481 9.72088 8.64187Z" fill="#D8463F"/>
<path d="M9.58159 4.83293C9.66912 4.83434 9.76512 4.86822 9.86535 4.92658L11.1491 5.67246C11.0484 5.6141 10.9529 5.58022 10.8654 5.57881C10.6851 5.57693 10.4926 5.6381 10.3025 5.74775C9.85076 6.00846 9.41453 6.54352 9.19288 7.16375C8.94253 7.86822 9.04465 8.47199 9.41359 8.6861L8.12982 7.94022C7.76135 7.7261 7.65923 7.12234 7.90912 6.41787C8.13076 5.79763 8.56747 5.2621 9.01876 5.0014C9.20888 4.89175 9.40135 4.83105 9.58159 4.83293Z" fill="#E74C3C"/>
</g>
</svg>`

export default function SreakPreview({ online = true }) {
    if (online)
        return (<QuestProvider
            apiKey={apiKey}
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf91be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId={entityId}
            featureFlags={{}}
            apiType="PRODUCTION"
        >
            <DailyStreak
                // description=''
                // filledStreakImg={a1}
                // pendingStreakImg=''
                counter={5}
                metric=''
                token=''
                userId=''
                color=''
                stepDetails={[
                    {description:"This is the longest streak you’ve ever head1",title: "Confident reader",range: 3},
                    {description:"This is the longest streak you’ve ever head2",title: "Responsible reader",range: 2},
                    {description:"This is the longest streak you’ve ever head3",title: "Serious learner",range: 5},
                    {description:"This is the longest streak you’ve ever head4",title: "Absolute reader",range: 3},
                    // {description:"This is the longest streak you’ve ever head5",title: "Professional reader",range: 1},
                ]} 
                // description={''} 
                           />
        </QuestProvider>
        )
    return (
        <></>
    )
}