import React, { useState } from 'react'

import HeaderComponents from '@/components/elements/HeaderSection'
import { Card } from '@/components/ui/card'
import { Container } from '@mui/material'
import CardTitle from '@/components/elements/CardTitle'
import { useParams } from 'react-router-dom'
import { ModeType } from '@/data/enum'
import VatForm from './VatForm'


const VatNewEntry = ({ title, icon }: any) => {
  const [isOpenBasicInfo, setIsOpenBasicInfo] = useState(false);
  const toggleBasicInfo = () => setIsOpenBasicInfo(!isOpenBasicInfo);
  const { id } = useParams();
  
  let type = id ? ModeType.Edit : ModeType.Add;
  return (

    <>
      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            <CardTitle title="Basic Information" onToggle={toggleBasicInfo} isOpen={isOpenBasicInfo} />
            <VatForm type={type} id={id}/>

          </Card>
        </div>
      </div>
    </>
  )
}
export default VatNewEntry