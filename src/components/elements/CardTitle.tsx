// CardTitle.tsx
import React from 'react';
import { Card, Nav } from 'react-bootstrap';

interface CardTitleProps {
    title: React.ReactNode;
    onToggle?: () => void;
    isOpen?: boolean;
    onShowPopup?: () => void;  // Add this line
}

const CardTitle: React.FC<CardTitleProps> = ({ title, onToggle, isOpen = false, onShowPopup }) => {
    return (
        <>
            <Card.Header>
                <div className="relative inline-block">
                    <h4 className="text-black text-base font-bold">{title}</h4>
                    <div className="absolute left-0 right-0 bottom-0 border-b-4 border-custom-cyan"></div>
                </div>

                <Nav className="nav-icon ms-auto">
                    <Nav.Link href="#" >
                        <i className="ri-refresh-line text-black text-6xl"></i>
                    </Nav.Link>

                    <Nav.Link href="#" onClick={onShowPopup}>
                        <i className="ri-filter-3-line text-black text-6xl"></i>
                    </Nav.Link>
                
                    <Nav.Link href="#" onClick={onToggle}>
                        <i className={`ri-arrow-${isOpen ? 'up' : 'down'}-s-line text-6xl`}></i>
                    </Nav.Link>
                </Nav>
            </Card.Header>
        </>
    );
};

export default CardTitle;
