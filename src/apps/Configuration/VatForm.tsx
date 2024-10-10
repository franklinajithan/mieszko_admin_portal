import { CalendarInput } from '@/components/elements/CalendarInput';
import InputField from '@/components/elements/InputField';
import SelectField from '@/components/elements/SelectField';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { status } from '@/data/constants';
import { countries, ModeType } from '@/data/enum';
import { toast } from '@/hooks/use-toast';
import { vatFormSchema } from '@/lib/utils'; // Import the new vatFormSchema
import { addVat, updateVat } from '@/service/configuration.service';

import { zodResolver } from '@hookform/resolvers/zod';
import { formatDate } from 'date-fns';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const VatForm = ({ type, id }: any) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof vatFormSchema>>({
        resolver: zodResolver(vatFormSchema),
        defaultValues: {
            vatCode: '',
            vatRate: 0,
            description: '',
            effectiveFrom: new Date(),
            effectiveTo: new Date(),
            countryCode: '',
            status: true,
        },
    });

    const { handleSubmit, formState, reset } = form;

    // useEffect(() => {
    //     const fetch = async () => {
    //         try {
    //             const result = await getVatById(id);
    //             if (result.status !== 200) {
    //                 console.error(result.data);
    //                 return;
    //             }
    //             reset(result.data.data);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     };

    //     if (type === ModeType.Edit) {
    //         fetch();
    //     }
    // }, [id, type, reset]);




    const onSubmit = async (data: z.infer<typeof vatFormSchema>) => {
        setIsLoading(true);
        let result: any;
        try {
            if (type === ModeType.Edit) {
                result = await updateVat(id, {
                    ...data,
                    effectiveFrom: data.effectiveFrom ? formatDate(new Date(data.effectiveFrom), 'yyyy-MM-dd') : null,
                    effectiveTo: data.effectiveTo ? formatDate(new Date(data.effectiveTo), 'yyyy-MM-dd') : null,
                });
            } else {
                result = await addVat({
                    ...data,
                    effectiveFrom: data.effectiveFrom ? formatDate(new Date(data.effectiveFrom), 'yyyy-MM-dd') : null,
                    effectiveTo: data.effectiveTo ? formatDate(new Date(data.effectiveTo), 'yyyy-MM-dd') : null,
                });
            }

            if (result.status === 201 || result.status === 200) {
                toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800 });
            } else {
                toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800 });
            }
            setTimeout(() => { setIsLoading(false); navigate(`/vat/vat-overview`); }, 2000); // Navigate to VAT list
        } catch (e: any) {
            toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800 });
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
                            <InputField control={form.control} label="VAT Code" name="vatCode" type="text" placeholder='Enter VAT code' />
                            <InputField control={form.control} label="VAT Rate (%)" name="vatRate" type="number" placeholder='Enter VAT rate' />
                            <InputField control={form.control} label="Description" name="description" type="text" placeholder='Enter description' />
                            <CalendarInput control={form.control} label="Effective From" name="effectiveFrom" />
                            <CalendarInput control={form.control} label="Effective To" name="effectiveTo" />
                            <SelectField control={form.control} label="Country" name="country" options={countries} />
                            <SelectField control={form.control} label="Status" name="status" options={status} />
                        </div>

                        <div className="flex justify-end space-x-4 mt-2 pr-4">
                            <button type="button" onClick={() => navigate(-1)} className="btn-zinc">
                                Cancel
                            </button>
                            <Button type="submit" disabled={isLoading} className='btn-cyan'>
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                                    </>
                                ) : "Submit"}
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Form>
        </div>
    );
}

export default VatForm;
