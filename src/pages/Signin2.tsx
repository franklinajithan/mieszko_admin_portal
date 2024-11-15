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
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import { getUserById } from "@/service/user.service";
import { addNotification } from "@/store/slices/notificationSlice";
import { v4 as uuidv4 } from 'uuid';
export default function Signin2() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get the dispatch function
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
      // Example credentials
      let LoggedUser = { email: "superadmin@mieszko.uk", password: "123456" };
      const loginResult = await userLogin(LoggedUser);

      // Check if login was successful
      if (loginResult.status !== 200) {
        console.error("Login failed:", loginResult.data);
        return;
      }

      const { token, user: userData } = loginResult.data.data;

      // Validate user data and user_id
      if (!userData || !userData.user_id) {
        console.error("user_id is missing in userData");
        return;
      }
      //Temporary solution
      localStorage.setItem('user_id', userData.user_id);  

      dispatch(login({ user: userData, token }));
      // Fetch user details
      const userDetails = await getUserById(userData.user_id);

      // Validate userDetails response
      if (!userDetails || userDetails.status !== 200) {
        console.error("Failed to fetch user details:", userDetails);
        return;
      }

      const user = userDetails.data.data;
      dispatch(login({ user, token }));
      dispatch(addNotification({ id: uuidv4(),  message: 'You have successfully logged in!', type: 'success',  duration: 5000, }));
      if (user) {
        navigate('/order/new-purchase-planning');

      }

    } catch (error) {
      console.error("An error occurred:", error);
      // Optionally handle token expiration or other errors here
      localStorage.removeItem('token');
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
          {/* Background image */}
        </Col>
      </Row>
    </div>
  );
}
