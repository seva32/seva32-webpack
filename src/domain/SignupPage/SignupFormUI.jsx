/* eslint-disable indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
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
import { omit } from "lodash";
import PropTypes from "prop-types";
import imagePath from "../../assets/images/logo192.png";
import { Layout } from "../Layout";
import { GoogleLogin } from "../../components/GoogleButton";
import * as actions from "../../actions";

const SignupFormUI = ({ error, signup, history }) => {
  // eslint-disable-next-line no-unused-vars
  const [showButton, toggleShow] = useState(true);

  const renderGoogleAuth = () => (
      ((showButton || error) && (
        <GoogleLogin
          onSuccess={(res) => {
            if (res.Qt.Au && res.googleId) {
              toggleShow(false);
              signup(
                {
                  email: res.Qt.Au,
                  password: res.googleId,
                },
                () => {
                  history.push("/");
                }
              );
            }
          }}
          onFailure={(_res) => (
            <Message negative>
              <Message.Header>
                There was a problem trying to signup with Google
              </Message.Header>
              <p>Try again or use another method</p>
            </Message>
            )}
          // eslint-disable-next-line max-len
          clientId="337014600692-84c6cvbn4370f08b6cdp8jkc2ndjln84.apps.googleusercontent.com"
        >
          Singup
        </GoogleLogin>
      )) || null);
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatpassword: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address"),
      // .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(2, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      repeatpassword: Yup.string().when("password", {
        is: (val) => val && val.length > 0,
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      }),
    }),
    onSubmit: (values, { setStatus, resetForm }) => {
      signup(omit(values, ["repeatpassword"]), () => {
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
            Signup for a new account
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
              <Form.Input
                fluid
                icon="repeat"
                iconPosition="left"
                placeholder="Repeat Password"
                type="password"
                id="repeatpassword"
                name="repeatpassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.repeatpassword}
                error={
                  formik.touched.repeatpassword && formik.errors.repeatpassword
                    ? {
                        content: formik.errors.repeatpassword,
                        pointing: "below",
                      }
                    : null
                }
              />

              <Button color="red" fluid size="large" type="submit">
                Signup
              </Button>
            </Segment>
          </Form>

          <Message>Singup with Google {renderGoogleAuth()}</Message>

          {error && (
            <Message negative>
              <Message.Header>{`You couldnt signup: ${error}`}</Message.Header>
              <p>Try again</p>
            </Message>
          )}

          <Message>
            Already have an account? <Link to="/signin">Signin</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

SignupFormUI.propTypes = {
  error: PropTypes.string,
  signup: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

SignupFormUI.defaultProps = {
  error: "",
  signup: () => {},
};

export default connect(
  ({ auth }) => ({
    error: auth.errorMessageSignUp,
  }),
  actions
)(SignupFormUI);
