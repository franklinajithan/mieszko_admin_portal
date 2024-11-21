import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { userLogin } from "@/service/auth.service";
import { getUserById } from "@/service/user.service";
import { login } from "@/store/slices/authSlice";
import { addNotification } from "@/store/slices/notificationSlice";
import { authFormSchema } from "@/lib/utils";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/elements/InputField";
import { Loader2 } from "lucide-react";

const Signin2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);




  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    //defaultValues: { email: "", password: "" },
    defaultValues: { email: "superadmin@mieszko.uk", password: "123456" },
  });
  //console.log(form.formState.errors);
  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    setIsLoading(true);
    try {
      
      let LoggedUser = { email: "superadmin@mieszko.uk", password: "123456" };
      const loginResult = await userLogin(data);

      if (loginResult.status !== 200) {
        console.error("Login failed:", loginResult.data);
        return;
      }

      const { token, user: userData } = loginResult.data.data;

      if (!userData?.user_id) {
        console.error("User ID is missing in user data");
        return;
      }

      localStorage.setItem("user_id", userData.user_id);
      dispatch(login({ user: userData, token }));

      const userDetails = await getUserById(userData.user_id);

      if (userDetails.status !== 200) {
        console.error("Failed to fetch user details:", userDetails);
        return;
      }

      const user = userDetails.data.data;
      dispatch(login({ user, token }));
      dispatch(
        addNotification({
          id: uuidv4(),
          message: "You have successfully logged in!",
          type: "success",
          duration: 5000,
        })
      );

      navigate("/order/new-purchase-planning");
    } catch (error) {
      console.error("An error occurred:", error);
      localStorage.removeItem("token");
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
              <Card.Text>
                <span data-testid="signIn-text">Welcome back! Please sign in to continue.</span>
              </Card.Text>
            </Card.Header>
            <Card.Body>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <InputField control={form.control} name="email"  label="Email"  placeholder="Enter your email" type="email" errorId="email-error"/>
                  <InputField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password" showPasswordToggle errorId="password-error"/>
                  <Button type="submit" disabled={isLoading} className="btn-cyan">
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
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
};

export default Signin2;
