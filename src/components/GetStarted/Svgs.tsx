

type SvgProps = {
    type: string;
    color: string | undefined;
  }
  
const GetStartedSvgs = ({ type ,color='#939393'}:SvgProps) => {
  const GetSvg = (type:string,color:string) => {
    switch (type) {

        case 'arrowRight' :
            return (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.67461 2.95369C5.88428 2.77398 6.19993 2.79826 6.37964 3.00793L10.3796 7.67459C10.5401 7.86184 10.5401 8.13814 10.3796 8.32538L6.37964 12.9921C6.19993 13.2017 5.88428 13.226 5.67461 13.0463C5.46495 12.8666 5.44067 12.5509 5.62038 12.3413L9.34147 7.99999L5.62038 3.65872C5.44067 3.44905 5.46495 3.1334 5.67461 2.95369Z" fill={color} />
            </svg>
            )
        case 'downArrowIcon' :
        return (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.95369 5.6746C3.1334 5.46494 3.44905 5.44065 3.65872 5.62037L7.99999 9.34146L12.3413 5.62037C12.5509 5.44065 12.8666 5.46494 13.0463 5.6746C13.226 5.88426 13.2017 6.19991 12.9921 6.37962L8.32538 10.3796C8.13814 10.5401 7.86184 10.5401 7.67459 10.3796L3.00793 6.37962C2.79826 6.19991 2.77398 5.88426 2.95369 5.6746Z" fill={color} />
        </svg> 
        )    
        
        case 'upArrow' :
            return(
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.67459 5.62037C7.86184 5.45988 8.13814 5.45988 8.32538 5.62037L12.9921 9.62037C13.2017 9.80008 13.226 10.1157 13.0463 10.3254C12.8666 10.5351 12.5509 10.5593 12.3413 10.3796L7.99999 6.65854L3.65872 10.3796C3.44905 10.5593 3.1334 10.5351 2.95369 10.3254C2.77398 10.1157 2.79826 9.80008 3.00793 9.62037L7.67459 5.62037Z" fill={color} />
            </svg>
            )

         default:
        return null; // or handle the case for unknown type
         
    };

   
  }
  return <>{GetSvg(type,color)}</>;
};

export default GetStartedSvgs;
