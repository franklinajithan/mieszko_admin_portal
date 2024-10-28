import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import { useTranslation } from "react-i18next";
import { FiPlusCircle, FiShoppingCart } from "react-icons/fi";

import HeaderComponents from "@/components/elements/HeaderSection";
import SelectField from "@/components/elements/SelectField";
import InputField from "@/components/elements/InputField";
import MultiDateField from "@/components/elements/MultiDateField";
import CardTitle from "@/components/elements/CardTitle";
import { Card, Nav } from "react-bootstrap";
import { CardContent } from "@/components/ui/card";
import { newBrandFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Loader2 } from 'lucide-react';
import { sample, status } from "@/data/constants";
import defaultProductImage from '../../assets/img/default-product-image.png';
import { addBrand } from "@/service/brand.service";
import ImageUploader from "@/components/elements/ImageUploader";


const BrandNewPage = ({ title, icon }: any) => {
  const { t } = useTranslation("global");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [skin, setSkin] = useState(localStorage.getItem('skin-mode') ? 'dark' : '');

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image URL

  const handleImageClick = () => {

    setSelectedImage(imagePreview || defaultProductImage);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const form = useForm<z.infer<typeof newBrandFormSchema>>({
    resolver: zodResolver(newBrandFormSchema),
    defaultValues: {
      brandName: '',
      description: '',
      website: '',

      status: true,
    },
  });

  interface ImagePopupProps {
    src: string;        // The URL or path to the image
    onClose: () => void; // Callback function to close the popup
  }
  const ImagePopup = ({ src, onClose }: ImagePopupProps) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="relative bg-white p-4 rounded-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black rounded-full p-1"
        >
          &times;
        </button>
        <img src={src} alt="Product" className="max-w-full max-h-screen" />
      </div>
    </div>
  );

  useEffect(() => {


  }, [])


  function onSubmit(values: z.infer<typeof newBrandFormSchema>) {

    setIsLoading(true);
    const fetchUser = async () => {
      let result: any
      setIsLoading(true);

      try {
        let data = {
          brandName: values.brandName,
          description: values.description,
          website: values.website,
          status: values.status
        }

        result = await addBrand(data);
        if (result.status == 201) {
          toast({ variant: "success", title: result.data.status, description: result.data.message, duration: 800, })
        } else {
          toast({ variant: "destructive", title: result.data.status, description: result.data.message, duration: 800, })
        }
      } catch (e: any) {
        toast({ variant: "destructive", title: e.response.status, description: e.response.data.message, duration: 800, })
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchUser();

  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file: any = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };
  return (
    <React.Fragment>

      <div className="main main-app p-lg-1">
        <div className="min-h-screen bg-zinc-50">
          <HeaderComponents icon={icon} title={title} />

          <Card className="card-one mt-2">
            <CardTitle title="New Brand" />
            <Card.Body>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="flex grid grid-cols-5 gap-4 mb-6">



                    <></> <ImageUploader imagePreview={imagePreview} onImageChange={handleImageChange} onImageClick={handleImageClick} isPopupOpen={isPopupOpen} onClosePopup={handleClosePopup} selectedImage={selectedImage} />

                    <InputField control={form.control} label="Brand name" type="text" name="brandName" />
                    <InputField control={form.control} label="Description" type="text" name="description" />
                    <InputField control={form.control} label="website" type="text" name="website" />
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
                </form>
              </Form>

            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BrandNewPage;
