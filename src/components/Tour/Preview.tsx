import WalkThrough from './WalkThrough'
import { QuestProvider } from '../QuestWrapper';
import OfflineComponent from './OfflineComponent';
export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'
export default function TourPreview({ online = false }) {

    if (online) return (
        <QuestProvider
            apiKey={apiKey}
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf91be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId={entityId}
            featureFlags={{}}
            apiType="STAGING"
        >
            <WalkThrough
                questId={questId}
                token={token}
                userId={userId}
                isOpen
                autoScroll
            />
        </QuestProvider >
    )
    return (<div style={{ display: "flex", height: "100%" }}>
        <div className="sidebar" style={{ position: "fixed", height: "400vh", width: "200px", background: "skyblue" }}></div>
        <div style={{width:"70vw",marginLeft:"29vw"}}>
            <div className="sel1" style={{color:"red",border:"1px solid blue",height:"30px",width:"100px",margin:"100px 0px"}}>sel1</div>
            <div className="sel2" style={{color:"red",border:"1px solid blue",height:"100px",width:"150px",margin:"405px 0px"}}>sel2</div>
            <div className="sel3" style={{color:"red",border:"1px solid blue",height:"50px",width:"60px",margin:"240px 40px"}}>sel3</div>
            <div className="sel4" style={{color:"red",border:"1px solid blue",height:"140px",width:"70px",margin:"67px 23px",paddingBottom:"100px"}}>sel4</div>
            <div className="sel5" style={{color:"red",border:"1px solid blue",height:"30px",width:"120px",margin:"10px 60px"}}>sel5</div>

            <OfflineComponent
                color=''
                offlineFormData={[
                    {
                        description: "this is description",
                        position: "left",
                        text: "text 1",
                        selector: ".sel1",
                    },
                    {
                        description: "this is description",
                        position: "top",
                        text: "text 2",
                        selector: ".sel2"
                    },
                    {
                        description: "this is description",
                        position: "right",
                        text: "text 3",
                        selector: ".sel3"
                    },
                    {
                        description: "this is description",
                        position: "left",
                        text: "text 4",
                        selector: ".sel4"
                    },
                    {
                        description: "this is description",
                        position: "left",
                        text: "text 4",
                        selector: ".sel5"
                    },
                ]}
                autoScroll
                onFinish={() => { }}
            /> </div></div>)
}
