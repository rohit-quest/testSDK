export const AskAiSvg = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M19 1L17.74 3.75L15 5L17.74 6.26L19 9L20.25 6.26L23 5L20.25 3.75M9 4L6.5 9.5L1 12L6.5 14.5L9 20L11.5 14.5L17 12L11.5 9.5M19 15L17.74 17.74L15 19L17.74 20.25L19 23L20.25 20.25L23 19L20.25 17.74"
        fill="#AFAFAF" />
</svg>
)

export const SearchSvg = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_205_4776)">
        <circle cx="7.66667" cy="7.66659" r="6.33333" stroke="#AFAFAF" stroke-width="1.5" />
        <path d="M13.3333 13.3333L14.6667 14.6666" stroke="#AFAFAF" stroke-width="1.5" stroke-linecap="round" />
    </g>
    <defs>
        <clipPath id="clip0_205_4776">
            <rect width="16" height="16" fill="white" />
        </clipPath>
    </defs>
</svg>

)

export const LinkIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.5" d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="white" strokeWidth="1.5" />
    <path d="M15.9775 8.71452L15.5355 8.2621C13.5829 6.26318 10.4171 6.26318 8.46447 8.2621C6.51184 10.261 6.51184 13.5019 8.46447 15.5008C10.4171 17.4997 13.5829 17.4997 15.5355 15.5008C16.671 14.3384 17.1462 12.7559 16.9611 11.242M15.9775 8.71452H13.3258M15.9775 8.71452V6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>

)

export const ChatIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.0002 5L16.1602 6.83333L14.3335 7.66667L16.1602 8.50667L17.0002 10.3333L17.8335 8.50667L19.6669 7.66667L17.8335 6.83333M10.3335 7L8.66685 10.6667L5.00018 12.3333L8.66685 14L10.3335 17.6667L12.0002 14L15.6669 12.3333L12.0002 10.6667M17.0002 14.3333L16.1602 16.16L14.3335 17L16.1602 17.8333L17.0002 19.6667L17.8335 17.8333L19.6669 17L17.8335 16.16" fill="#AFAFAF" />
</svg>
)

export const CrossIcon = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.35859 7.47479C8.11451 7.23072 7.71878 7.23072 7.4747 7.47479C7.23063 7.71887 7.23063 8.1146 7.4747 8.35868L9.11611 10.0001L7.47472 11.6415C7.23064 11.8855 7.23064 12.2813 7.47472 12.5253C7.7188 12.7694 8.11453 12.7694 8.35861 12.5253L9.99999 10.884L11.6414 12.5253C11.8854 12.7694 12.2812 12.7694 12.5252 12.5253C12.7693 12.2812 12.7693 11.8855 12.5252 11.6414L10.8839 10.0001L12.5253 8.35869C12.7693 8.11462 12.7693 7.71889 12.5253 7.47481C12.2812 7.23073 11.8855 7.23073 11.6414 7.47481L9.99999 9.11619L8.35859 7.47479Z" fill="#8E8E8E" />
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.04175C5.05245 1.04175 1.04167 5.05253 1.04167 10.0001C1.04167 14.9476 5.05245 18.9584 10 18.9584C14.9476 18.9584 18.9583 14.9476 18.9583 10.0001C18.9583 5.05253 14.9476 1.04175 10 1.04175ZM2.29167 10.0001C2.29167 5.74289 5.74281 2.29175 10 2.29175C14.2572 2.29175 17.7083 5.74289 17.7083 10.0001C17.7083 14.2573 14.2572 17.7084 10 17.7084C5.74281 17.7084 2.29167 14.2573 2.29167 10.0001Z" fill="#8E8E8E" />
</svg>
)

export interface Metadata {
    linkActionName: string;
    linkActionUrl: string;
    linkActionDescription: string;
    effort: string;
    importance: string;
    xp: number;
    frequency: string;
    icon: string
}

interface Data {
    xp: number;
    dependentCriterias: any[]; // You can define a more specific type if needed
    frequency: string;
    criteriaType: string;
    createdAt: string;
    criteriaId: string;
    questId: string;
    metadata: Metadata;
    requiresApproval: boolean;
}

interface Quest {
    data: Data;
    completed: boolean;
    isLocked: boolean;
    unfinishedCriteriaIds: string[];
}

export type QuestArray = Quest[];
