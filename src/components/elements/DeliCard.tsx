import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import Barcode from "react-barcode";
interface DeliCardProps {
  data: Array<any>; // Replace with a more specific type if possible
  barcode: boolean;
  startDate?: string;
  endDate?: string;
}

export const DeliCard = ({ data, barcode, startDate, endDate }: DeliCardProps) => {
  const [row, setRow] = useState<Array<any>>([]); // Define the type for newRow
  const weightRegex = /(?!(\(\d*[,\.]?\d*X\d+\)))\bOK\s?\d*[,\.]?\d*\s?KG\b|\bOK\s?\d+\s?X\s?\d*[,\.]?\d+\s?KG\b|\d*[,\.]?\d+\s?KG\b|\bKG\b|\bPM\b(?!\/)/gi;

  useEffect(() => {
    const groupSize = 9;
    const nineValues: Array<any> = []; // Define the type for nineValues

    const fillDefaultValues = (group: Array<any>) => {
      return group.map((item) => {
        if (item === undefined) {
          return [0, "", "", 0]; // Default values
        }
        return item;
      });
    };

    // for (let i = 0; i < data.length; i += groupSize) {
    //     const group = data.slice(i, i + groupSize);
    //     const filledGroup = fillDefaultValues(group);

    //     // Rearranging the filledGroup as specified
    //     const reorderedGroup = [
    //         filledGroup[2],
    //         filledGroup[1],
    //         filledGroup[0],
    //         filledGroup[5],
    //         filledGroup[4],
    //         filledGroup[3],
    //         filledGroup[8],
    //         filledGroup[7],
    //         filledGroup[6],
    //     ];

    //     // Combine original and reordered groups
    //     const combinedGroup = filledGroup.concat(reorderedGroup);
    //     nineValues.push(combinedGroup);
    // }

    console.log(data);
    for (let i = 0; i < data.length; i += groupSize) {
      const chunk = data.slice(i, i + groupSize);
      if (chunk[0] == undefined) {
        chunk[0] = { barcode: 0, itemName: "", price: 0 };
      }
      if (chunk[1] == undefined) {
        chunk[1] = { barcode: 0, itemName: "", price: 0 };
      }
      if (chunk[2] == undefined) {
        chunk[2] = { barcode: 0, itemName: "", price: 0 };
      }
      if (chunk[3] == undefined) {
        chunk[3] = { barcode: 0, itemName: "", price: 0 };
      }
      if (chunk[4] == undefined) {
        chunk[4] = { barcode: 0, itemName: "", price: 0 };
      }
      if (chunk[5] == undefined) {
        chunk[5] = { barcode: 0, itemName: "", price: 0 };
      }
      if (chunk[6] == undefined) {
        chunk[6] = { barcode: 0, itemName: "", price: 0 };
      }
      if (chunk[7] == undefined) {
        chunk[7] = { barcode: 0, itemName: "", price: 0 };
      }
      if (chunk[8] == undefined) {
        chunk[8] = { barcode: 0, itemName: "", price: 0 };
      }
      const chunk2 = [chunk[2], chunk[1], chunk[0], chunk[5], chunk[4], chunk[3], chunk[8], chunk[7], chunk[6]];
      let joinArray = chunk.concat(chunk2);
      nineValues.push(joinArray);
    }

    setRow(nineValues);
  }, [data]);

  return (
    <div className="grid grid-cols-3 gap-2 ">
      {row.map((object, rowIndex) => {
        try {
          return object.map((item: any, index: any) => {
            const actualPricePerKg = Number(item?.price || 0);
            const retailPriceFor100g = actualPricePerKg / 10;

            const borderColor = item?.itemName.length !== 0 ? "border-red-600" : "border-white";

            return (
              <div className="items-center rounded-lg" key={index} style={{ marginBottom: "7px" }}>
                <div className={`border-4 ${borderColor} h-56 bg-white rounded-lg`}>
                  <div className="flex h-14">
                    {" "}
                    {/* Set a fixed height for the flex container */}
                    <div className="w-1/6 flex items-center justify-center">
                      {" "}
                      {/* Center the logo vertically and horizontally */}
                      {item?.itemName.toString().length !== 0 && <img className="mt-2 ml-1 w-85" src={logo} alt="logo" />}
                    </div>
                    <div className={`w-5/6 text-center font-bold flex items-center justify-center ${item?.itemName.toString().length > 40 ? "text-[18px]" : "text-[20px]"}`}>{item?.itemName.replace(weightRegex, "").trim().toUpperCase()}</div>
                  </div>

                  {item?.itemName.length !== 0 && (
                    <>
                      {" "}
                      {item?.itemName.toString().length !== 0 && (
                        <div className="flex">
                          <div className="w-1/2 pl-1">
                            <div className="bg-[#FFFF00] p-4 relative h-24 w-44 border-4 border-red-600 rounded-lg flex flex-col items-center justify-center">
                              <div className="text-5xl font-bold text-center">{new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(retailPriceFor100g)}</div>
                              <div className="text-lg font-bold  mt-2">
                                {" "}
                                {/* Adjust margin for spacing */}
                                100G
                              </div>
                            </div>
                          </div>
                          <div className="w-1/2">
                            <div className="relative float-right pr-1">
                              <div className="flex flex-col items-end">
                                <Barcode marginTop={0} marginLeft={0} marginBottom={0} marginRight={0} fontSize={20} value={item?.barcode} format="CODE128" width={1} height={50} background="#ffffff" displayValue={false} />
                                <div className={`${item?.barcode.toString().length <= 10 ? "text-[24px]" : item?.barcode.toString().length <= 12 ? "text-[20px]" : "text-[14px]"} font-bold`}>{item?.barcode}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {item?.itemName.length !== 0 && (
                    <div className="flex items-end mr-1 ml-1 h-18 mb-1">
                      <span className="text-[11px] border-2 border-red-600 px-1 items-end leading-[1] font-sans" style={{ paddingBottom: "2px" }}>
                        May contain traces of mustard, celery, soy, milk, egg, sulphites, gluten, sesame, crustaceans, fish, lupin, mollusks, nuts, and peanuts. <br />
                        *Please ask a member of staff for a full list of ingredients.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          });
        } catch (error) {
          console.error("Error rendering object:", error);
          return null;
        }
      })}
    </div>
  );
};
