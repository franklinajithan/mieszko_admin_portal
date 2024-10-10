import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import bg1 from "../assets/img/bg1.jpg";
import { userLogin } from "@/service/auth.service";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons from FontAwesome
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/elements/InputField";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Signin2() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    setIsLoading(true);
    try {

      // let user = { email: data.email, password: data.password }
      let user = { email: "admin@mieszko.uk", password: "123456" }
      const result = await userLogin(user);

      if (result.status !== 200) {
        console.error(result.data);
        return;
      }

      const { token } = result.data.data;
      localStorage.setItem('token', token);
      // localStorage.setItem('refreshToken', refreshToken);
      // localStorage.setItem('tokenLifeInSeconds', tokenLifeInSeconds);


      navigate('/order/new-purchase-planning');
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="page-sign d-block py-0">
      <Row className="g-0">
        <Col md="7" lg="5" xl="4" className="col-wrapper">
          <Card className="card-sign">
            <Card.Header>
              <Link to="/" className="header-logo mb-5">Mieszko</Link>
              <Card.Title>Sign In</Card.Title>
              <Card.Text>Welcome back! Please sign in to continue.</Card.Text>
            </Card.Header>
            <Card.Body>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <InputField
                    control={form.control}
                    name="email"
                    label="Username"
                    placeholder="Enter your email"
                    type={"email"}
                  />

                  <div className="relative">
                    <InputField
                      control={form.control}
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      showPasswordToggle={true}
                      type={"password"}
                    />

                  </div>

                  <div className="flex flex-col gap-4">
                    <Button type="submit" disabled={isLoading} className='btn-cyan'>
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </Card.Body>
            <Card.Footer>
              Don't have an account? <Link to="/pages/signup2">Create an Account</Link>
            </Card.Footer>
          </Card>
        </Col>
        <Col className="d-none d-lg-block">
          {/* <div className="w-[1400px] h-[1000px] bg-gradient-to-r from-cyan-100 via-cyan-500 to-cyan-100 p-1">
            <img src={bg1} className="auth-img w-full h-full object-cover" alt="Background" />
          </div> */}
        </Col>
      </Row>
    </div>
  );
}
