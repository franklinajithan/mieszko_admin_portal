import React, { useState } from 'react'

import Header from '@/layouts/Header';
import HeaderComponents from '@/components/elements/HeaderSection';
import { Card } from '@/components/ui/card';
import { CardContent } from '@mui/material';
import { SupplierForm } from './SupplierForm';
import { ModeType } from '@/data/enum';
import { useParams } from 'react-router-dom';
const EditSupplier = ({ title, icon }: any) => {
  const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');
  const { id } = useParams();
  return (
    <div>
    <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
        <HeaderComponents icon={icon} title={title} />

            <Card className="card-one mt-2">
             
                <CardContent>
                <SupplierForm id={id} type={ModeType.Edit}/>
                </CardContent>
            </Card>
        </div>
    </div></div>
  )
}

export default EditSupplier