import React, { useState } from 'react';
import Barcode from 'react-barcode';// Ensure you import the Barcode component
import circle from '../../assets/img/yellow-circle.png';
import logo from '../../assets/img/logo.png';
import { StringDecoder } from 'string_decoder';
import ImageProcessor from './ImageProcessor';
import { imageUrl } from '@/_config';
interface DataItem {
    date: string;
    price: number | string;
    uom: string;
    itemName: string;
    size: string;
    brand: string;
    barcode?: string; // Added barcodeValue as an optional property
    // Add more properties based on your actual data structure
}

interface PromoCardProps {
    data:any;
    barcode: boolean;
    startDate?: string | null;
    endDate?: string | null;

}
const date = new Date();
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = date.getFullYear();
const formattedDate = `${day}-${month}-${year}`;


const FruitVegCard = ({ data, barcode, startDate, endDate }: PromoCardProps) => {
 debugger;
    if (startDate == null) { startDate = formattedDate }
    if (endDate == null || endDate == "") { endDate = "Until Further Notice" }

    const imgUrl:any = imageUrl
    const [barcodeShow, setBarcodeShow] = useState(barcode);
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="text-left p-4">
                <p></p>
            </div>
        );
    }

    return (
        <div id="pdf">
            {data.map((item, index) => {
                const formattedPrice = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 }).format(Number(item.price));
                const textSizeClass = String(item.price).length <= 4 ? 'text-[100px]' : 'text-[93px]';

                return (


                    <div
                        className="border-8  border-[#c23b32] mb-2 h-[100%] w-[100%] bg-white rounded-[15px] shadow-md overflow-hidden mx-auto"
                        key={item.barcode + index}
                    >
                        <div>
                            <div className="flex flex-wrap items-center justify-between mb-2">
                                <div className="w-1/6 p-2">
                                    <img className="mt-2 w-[166px] ml-2" src={logo} alt="Logo" />
                                </div>
                                <div className="w-5/6 text-center relative">
                                  
                                    

                                        <div className="text-[#c23b32] text-[30px] font-extrabold font-sans">POLSKIE SUPERMARKETY</div>
                                        <div className="text-[#c23b32] text-[73px] font-extrabold mt-[-30px] font-serif">MIESZKO</div>


                                   
                                
                                    <div className=" border-b-4 border-[#c23b32] w-full mx-auto" />
                                </div>
                                {/* <div className="w-5/12 ">
                                    <div className="mr-2 ml-2 text-center"> 
                                        <div className="border-5 border-[#c23b32] bg-[#c23b32] mt-2 rounded-[15px] self-end">
                                            <div className="text-center text-[40px] font-bold text-white">Promotional Period</div>

                                            {(item.date == '' || item.date == null) && <div className="text-center mt-[-3px] text-[25px] font-bold text-white">
                                                {startDate} {startDate?'- ': ''}{endDate}
                                            </div>}

                                            {(item.date != '' && item.date != null) && <div className="text-center mt-[-3px] text-[30px] font-bold text-white">
                                                {item.date}
                                            </div>}

                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <div className="h-[425px] w-[550px] ml-2 flex justify-center items-center">
                                       
                                        
                                        {item.barcode && (
                                           <ImageProcessor imageUrl={imageUrl + item.image} maxHeight={475} maxWidth={550} />

                                            
                                        )}
                                    </div>
                                </div>
                                <div className="w-6/12">
                                    <div className="mt-12 relative flex flex-col items-center">
                                        <img
                                            className="image-shadow relative w-auto h-auto max-h-[87%] max-w-[96%] mt-[-26px]"
                                            src={circle}
                                            alt="Circle"
                                            style={{ filter: 'drop-shadow(5px 11px 15px #222)' }}
                                        />

                                        {!(String(item.price).toLowerCase().includes("for")) && (
                                            <div className="absolute flex flex-col items-center justify-center w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <span className={`text-black font-bold font-revert-layer ${textSizeClass}`}>
                                                    {formattedPrice}
                                                </span>
                                                <span className="text-white text-[46px] font-bold mb-6">{item.uom}</span>
                                            </div>
                                        )}

                                        {String(item.price).toLowerCase().includes("for") && (
                                            <div className="absolute text-black">
                                                <div className="text-[80px] font-bold text-center " style={{marginBottom:'-35px'}}>{(item.price).split(' ')[0]}</div>
                                                <div className="text-[51px] font-bold text-center" style={{marginBottom:'-35px'}}>{`FOR`}</div>
                                                <div className="text-[70px] font-bold text-center" >{(item.price).split(' ')[2]}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>





                            </div>
                            <div className={`bg-[#ffffff] self-end`}>
                                <div className="flex">
                                   
                                    <div className={`w-9/12 self-end  `}>
                                        <div className="mt-0 mr-4">
                                            <div
                                                className={`text-[#000] ml-5 font-bold whitespace-nowrap text-left text-[60px]`}
                                            >
                                                {item.itemName}
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="w-3/12 self-end mr-5">
                                        {barcode && item.barcode && (
                                            <div className="float-right">
                                                <Barcode
                                                            marginTop={0}
                                                            marginLeft={0}
                                                            marginBottom={0}
                                                            marginRight={0}
                                                            fontSize={20}
                                                            value={item.barcode}
                                                            format="CODE128"
                                                            width={2}
                                                            height={70}
                                                            background="#ffffff"
                                                            displayValue={false}
                                                        />
                                                        <div className={`text-[40px] font-bold`}>
                                                            {item.barcode}
                                                        </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default FruitVegCard;
