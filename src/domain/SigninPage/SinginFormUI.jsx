/* eslint-disable indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import imagePath from "../../assets/images/logo192.png";
import { Layout } from "../Layout";
import * as actions from "../../actions";

const SigninFormUI = ({ error, signin, history }) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address"),
      // .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(2, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values, { setStatus, resetForm }) => {
      signin(values, () => {
        history.push("/");
      });
      resetForm({});
      setStatus({ success: true });
    },
  });
  return (
    <Layout>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src={imagePath} alt="No logo image" />
            Log-in to your account
          </Header>
          <Form onSubmit={formik.handleSubmit} size="large">
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={
                  formik.touched.email && formik.errors.email
                    ? {
                        content: formik.errors.email,
                        pointing: "below",
                      }
                    : null
                }
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.touched.password && formik.errors.password
                    ? {
                        content: formik.errors.password,
                        pointing: "below",
                      }
                    : null
                }
              />

              <Button color="red" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/signup">Sign Up</Link>
          </Message>
          {error || "No errors yet"}
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

SigninFormUI.propTypes = {
  error: PropTypes.string,
  signin: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

SigninFormUI.defaultProps = {
  error: "",
  signin: () => {},
};

export default connect(
  ({ auth }) => ({
    error: auth.errorMessage,
  }),
  actions
)(SigninFormUI);
