import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { Card } from "react-bootstrap";
import HeaderComponents from "@/components/elements/HeaderSection";

import CardTitle from "@/components/elements/CardTitle";

import UserForm from "./UserForm";



export default function NewUser({ title, icon, type }: any) {
    const { id } = useParams();
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";

    const [isOpenBasicInfo, setIsOpenBasicInfo] = useState(true);
    const [isOpenVisaInfo, setIsOpenVisaInfo] = useState(false);
 
    const [isQRGenerated, setIsQRGenerated] = useState(false);
    const toggleBasicInfo = () => setIsOpenBasicInfo(!isOpenBasicInfo);
    const toggleVisaInfo = () => setIsOpenVisaInfo(!isOpenVisaInfo);

    
    return (
        <React.Fragment>

            <div className="main main-app p-lg-1">
                <div className="min-h-screen bg-zinc-50">
                    {/* Header */}
                    <HeaderComponents icon={icon} title={title} />

                    <Card className="card-one mt-2">
                        <CardTitle title="Basic Information" onToggle={toggleBasicInfo} isOpen={isOpenBasicInfo} />
                        <UserForm type={type}/>
                    </Card>
                </div>
            </div>
        </React.Fragment>
    );
}
