import { countries, ModeType, roles, storeLocations, ukCities, ukRegions, visaStatuses, visaTypes } from "@/data/enum";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {  z } from "zod";
import SelectField from "@/components/elements/SelectField";
import InputField from "@/components/elements/InputField";
import { userSchema } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import CheckboxField from "@/components/elements/CheckboxField";
import defaultProfileImage from '../../assets/img/user.png';

import { CalendarInput } from "@/components/elements/CalendarInput";
import { getRole } from "@/service/common.service";
import { addUser, getUserById, updateUser } from "@/service/user.service";
import { formatDate } from "date-fns";
import { useToast } from "@/hooks/use-toast";


export default function UserForm({ type }: any) {
    const { id } = useParams();
    const { t } = useTranslation("global");
    const currentSkin = localStorage.getItem("skin-mode") ? "dark" : "";
    const [isLoading, setIsLoading] = useState(false);
    const [skin, setSkin] = useState(currentSkin);
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isOpenBasicInfo, setIsOpenBasicInfo] = useState(true);
    const [isOpenVisaInfo, setIsOpenVisaInfo] = useState(false);
    const [isVisaDetailsVisible, setIsVisaDetailsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null); // State for image upload
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
    const [username, setUsername] = useState("admin");

    const [isQRGenerated, setIsQRGenerated] = useState(false);
    const toggleBasicInfo = () => setIsOpenBasicInfo(!isOpenBasicInfo);
    const toggleVisaInfo = () => setIsOpenVisaInfo(!isOpenVisaInfo);
    const [role, setRole] = useState([]);

    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            employeeId: "",
            firstName: "",
            lastName: "",
            dob: undefined,
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            postcode: "",
            country: "",
            username: "",
            password: "",
            confirmPassword: "",
            roleId: "",
            assignStore: "",
            visaNumber: "",
            visaType: "",
            issueDate: null,
            expiryDate: null,
            visaIssuedBy: "",
            visaStatus: "",
            hasAccessToMobile: false,
            hasAccessToBackOffice: false,
            hasAccessToPos: false,
            passportNo: "",
            reCheckDate: null,
            workRestriction: "",
            allowedHours: "",
            isRecheckNeeded: false,
            isSponsoredByUs: false,
        },
    });

    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getRole();
                setRole(result.data.data.map((item: any) => ({
                    value: item.role_id.toString(),
                    label: item.role_name
                })));
                if (type === ModeType.Edit) {
                    const user = await getUserById(id);
                    form.reset({ ...user.data.data[0], dob: new Date(user.data.data[0].dob), roleId: user.data.data[0].roleId.toString() });
                }
            } catch (error) {
            }
        }
        fetch();
    }, [])


    const { control, handleSubmit, formState: { errors } } = form;

    const onSubmit = (values: z.infer<typeof userSchema>) => {
        
        setIsLoading(true);
        const fetch = async () => {
            try {
                if (type === ModeType.Add) {
                    const result = await addUser({ ...values, dob: formatDate(new Date(values.dob), 'yyyy-MM-dd') });
                    toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
                } else {
                    const result = await updateUser(id, { ...values, dob: formatDate(new Date(values.dob), 'yyyy-MM-dd') });
                    toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
                   
                }
                setTimeout(() => { setIsLoading(false);  }, 2000);
                setTimeout(() => { navigate(`/user/user-grid`);  }, 2000);
               
                
            } catch (error) {

            }
        }
        fetch();
      
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file)); 
        }
    };

    return (
        <>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <>
                        {isOpenBasicInfo && (
                            <CardContent>
                                <div className="flex w-full gap-3">
                                    <div className="grid grid-cols-1  w-1/6 mt-4">
                                        {/* Image Upload */}
                                        <div className="col-span-1 flex flex-col justify-center items-center h-full bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-700 p-6 rounded-lg ">
                                            <div className="relative mb-4 bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-600 p-2 rounded-full">
                                                <img
                                                    src={imagePreview || defaultProfileImage}
                                                    alt="Profile"
                                                    className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-xl transform scale-90 transition-transform duration-300 ease-in-out hover:scale-110"
                                                    style={{ position: 'relative', zIndex: 10 }}
                                                />
                                            </div>
                                            <div className="relative">
                                                <input type="file" accept="image/*" onChange={handleImageChange} id="file-input" className="hidden" />
                                                <label htmlFor="file-input" className="w-full cursor-pointer bg-gradient-to-r from-cyan-600 via-cyan-700 to-cyan-800 text-white px-4 py-2 rounded-md shadow-lg hover:bg-gradient-to-r hover:from-cyan-700 hover:via-cyan-800 hover:to-cyan-900 transition-colors duration-300 ease-in-out"
                                                    style={{ position: 'relative', zIndex: 5 }}
                                                >
                                                    Upload Profile Picture
                                                </label>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
                                    <div className="grid grid-cols-1 w-5/6 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-4">
                                        <InputField control={control} label="Employee Id" name="employeeId" type="text" placeholder="Enter your Id" />
                                        <InputField control={control} label="First Name" name="firstName" type="text" placeholder="Enter your First name" />
                                        <InputField control={control} label="Last Name" name="lastName" type="text" placeholder="Enter your last name" />
                                        <CalendarInput control={control} label="Date of Birth" name="dob" />
                                        <InputField control={control} name="email" label="Email Address" type="email" placeholder="Enter your email address" />
                                        <InputField control={control} name="phone" label="Phone Number" type="tel" placeholder="Enter your phone number" />
                                        <InputField control={control} label="Address" name="address" type="text" placeholder="Enter your address" />
                                        <SelectField control={control} label="City" name="city" options={ukCities} />
                                        <SelectField control={control} label="State/Province" name="state" options={ukRegions} />
                                        <InputField control={control} label="Post Code" name="postcode" type="text" placeholder="Enter your postal code" />
                                        <SelectField control={control} label="Country" name="country" options={countries} />
                                        
                                    </div>
                                </div>
                                <h6 className="mt-4 font-bold">Sign in Information</h6>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                                    <InputField control={control} label="Username" name="username" type="text" placeholder="Enter the username" />
                                    <InputField control={control} label="Password" name="password" type="password" placeholder="Enter your password" />
                                    <InputField control={control} label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm your password" />
                                </div>
                                <h6 className="mt-4 font-bold">Store Information</h6>
                                <div className="grid grid-cols-6 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                                    <SelectField control={control} label="Role" name="roleId" options={role} />
                                    <SelectField control={control} label="Assign Store" name="assignStore" options={storeLocations} />
                                    <CheckboxField control={control} id="hasAccessToMobile" label="Access to Mobile" name="hasAccessToMobile" />
                                    <CheckboxField control={control} id="hasAccessToBackOffice" label="Access to Back oOfice" name="hasAccessToBackOffice" />
                                    <CheckboxField control={control} id="hasAccessToPos" label="Access to Pos" name="hasAccessToPos" />

                                </div>
                                <div className="flex items-center mt-4">

                                    <h6 className="font-bold">Visa Information</h6>

                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">

                                    <CheckboxField control={control} id="hasVisaDetails" label="Visa Details" name="hasVisaDetails" onChange={() => setIsVisaDetailsVisible(!isVisaDetailsVisible)} />
                                    {isVisaDetailsVisible && (<>
                                        <SelectField control={control} label="Visa Type" name="visaType" options={visaTypes} />
                                        <CalendarInput control={control} label="Issue Date" name="issueDate" />
                                        <CalendarInput control={control} label="Expiry Date" name="expiryDate" />


                                        <InputField control={control} label="Passport No" name="passportNo" type="text" placeholder="Enter your passport number" />
                                        <SelectField control={control} label="Visa Status" name="visaStatus" options={visaStatuses} />
                                        <InputField control={control} label="Visa Issued By" name="visaIssuedBy" type="text" placeholder="Enter the issuing authority" />
                                        <CalendarInput control={control} label="Re-check Date" name="reCheckDate" />
                                        <InputField control={control} label="Work Restriction" name="workRestriction" type="text" placeholder="Enter work restriction" />
                                        <InputField control={control} label="Allowed Hours" name="allowedHours" type="text" placeholder="Enter allowed hours" />
                                        <CheckboxField control={control} label="Recheck Needed?" name="isRecheckNeeded" />
                                        <CheckboxField control={control} label="Sponsored By Us?" name="isSponsoredByUs" />



                                    </>)}
                                </div>
                                <hr className="border-t border-zinc-300 " />
                                <div className="flex justify-end space-x-4  mt-2 pr-4">
                                    <button className="btn-zinc">
                                        Cancel
                                    </button>
                                    <Button type="submit" disabled={isLoading} className='btn-cyan'>
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                            </>)
                                            : type === "Add" ? "Submit" : "Update"}
                                    </Button>
                                </div>
                            </CardContent>
                        )}
                    </>
                </form>
            </Form>


        </>
    );
}
