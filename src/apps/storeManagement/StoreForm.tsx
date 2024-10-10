import InputField from '@/components/elements/InputField'
import SelectField from '@/components/elements/SelectField'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { status } from '@/data/constants'
import { countries, ModeType } from '@/data/enum'
import { toast } from '@/hooks/use-toast'
import { storeFormSchema } from '@/lib/utils'
import { addCompany, addStore, getCompanyById, updateCompany, updateStore } from '@/service/store.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const StoreForm = ({ type, id }: any) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [companyDetails, setCompanyDetails] = useState<any>([]);
    const form = useForm<z.infer<typeof storeFormSchema>>({
        resolver: zodResolver(storeFormSchema),
        defaultValues: {
            ownerName: '',
            taxNo: '',
            companyName: '',
            companyCode: '',
            address: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
            phone: '',
            email: '',
            website: '',
            logo: null,
            status: true,
        },
    });
    const { handleSubmit, formState, reset, setValue } = form;
    useEffect(() => {

        const fetch = async () => {
            try {

                const result = await getCompanyById(id);
                setCompanyDetails(result.data.data)
                reset(result.data.data)
                if (result.status !== 200) {
                    console.error(result.data);
                    return;
                }
            } catch (e) {
                console.error(e);
            }
        };
        if (type == ModeType.Edit) {
            fetch();
        }
    }, [])


    const onSubmit = async (data: z.infer<typeof storeFormSchema>) => {

        setIsLoading(true);

        let result :any
        try {
            if (type == ModeType.Edit) {
                result = await updateStore(id, data);
            } else {
                result = await addStore(data);
            }


            if (result.status === 201 || result.status === 200) {
                toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
            } else {
                toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800 });
            }
            setTimeout(() => { setIsLoading(false); }, 2000);
            setTimeout(() => { navigate(`/store/company-list`); }, 2000);
        } catch (e: any) {
            toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800 });
        } 

    };

    return (
        <div>


            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-4">
                            <InputField control={form.control} label="Owner Name" name="ownerName" type="text" placeholder='Enter owner name' />
                            <InputField control={form.control} label="Tax Number" name="taxNo" type="text" placeholder='Enter tax number' />
                            <InputField control={form.control} label="Company Name" name="companyName" type="text" placeholder='Enter company name' />
                            <InputField control={form.control} label="Company Code" name="companyCode" type="text" placeholder='Enter company code' />
                            <InputField control={form.control} label="Address" name="address" type="text" placeholder='Enter address' />
                            <InputField control={form.control} label="City" name="city" type="text" placeholder='Enter city' />
                            <InputField control={form.control} label="State" name="state" type="text" placeholder='Enter state' />
                            <InputField control={form.control} label="Postcode" name="postcode" type="text" placeholder='Enter postcode' />
                            <SelectField control={form.control} label="Country" name="country" options={countries} />
                            <InputField control={form.control} label="Phone" name="phone" type="text" placeholder='Enter phone number' />
                            <InputField control={form.control} label="Email" name="email" type="email" placeholder='Enter email' />
                            <InputField control={form.control} label="Website" name="website" type="url" placeholder='Enter website' />
                            <InputField control={form.control} label="Logo" name="logo" type="text" placeholder='Enter logo URL' />
                            <SelectField control={form.control} label="Status" name="status" options={status} />


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
                                    : "Submit"}
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Form>


        </div >
    )
}

export default StoreForm