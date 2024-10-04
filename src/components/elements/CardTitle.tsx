import React from 'react';
import { Card, Nav, } from "react-bootstrap";
interface CardTitleProps {

    title: React.ReactNode;
    onToggle?: () => void;
    isOpen?: boolean;
}

const CardTitle: React.FC<CardTitleProps> = ({ title, onToggle, isOpen=false }) => {
    return (
        <>
            <Card.Header>
                <div className="relative inline-block">
                    <h4 className="text-black text-base font-bold">{title}</h4>
                    <div className="absolute left-0 right-0 bottom-0 border-b-4 border-custom-cyan"></div>
                </div>

                <Nav className="nav-icon ms-auto">
                    <Nav.Link href="#">
                        <i className="ri-refresh-line text-black text-6xl"></i>
                    </Nav.Link>

                    <Nav.Link href="#">
                        <i className="ri-more-2-fill text-black text-6xl"></i>
                    </Nav.Link>
                
                    <Nav.Link href="#" onClick={onToggle} className="">
                        <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-6xl`}></i>
                    </Nav.Link>
                </Nav>
            </Card.Header>

        </>
    );
};

export default CardTitle;