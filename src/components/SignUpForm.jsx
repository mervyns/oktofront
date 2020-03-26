import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";
import { Formik } from "formik";
import { toggleModal } from "../redux/modules/userSlice";
import { Form, Input, Modal } from "antd";
import yup from "../utils/validator";

const FormItem = Form.Item;

const initialValues = {
  username: "",
  password: "",
  phone_number: "",
  confirmPassword: ""
};
const mapDispatchToProps = { toggleModal };

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .min(6, "Length of password should be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required()
});

class SignUpForm extends React.Component {
  render() {
    const onSubmit = async (values, actions) => {
      const { username, password, email } = values;
      axios
        .post(`${process.env.REACT_APP_API_PATH}/auth/register`, {
          username,
          email,
          password,
          role: 1
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.props.toggleModal(false);
        });
    };
    const closeModal = () => {
      this.props.toggleModal(false);
    };

    return (
      <Formik
        enableReinitialize={true}
        initialValues={{ ...initialValues }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        render={({
          errors,
          touched,
          handleChange,
          handleBlur,
          submitForm,
          isValid,
          isSubmitting
        }) => {
          const validateStatus = field => {
            if (touched[field]) {
              if (errors[field]) {
                return "error";
              } else {
                return "success";
              }
            }
            return undefined;
          };

          const restProps = {
            onChange: handleChange,
            onBlur: handleBlur,
            onPressEnter: submitForm
          };

          return (
            <Modal
              onOk={submitForm}
              onCancel={closeModal}
              visible={this.props.showUserModal}
            >
              <Container>
                <h1>Register</h1>
                <FormItem
                  hasFeedback
                  help={!!validateStatus("username") && errors.username}
                  validateStatus={validateStatus("username")}
                >
                  <Input
                    name="username"
                    placeholder="Your desired username"
                    size="large"
                    {...restProps}
                  />
                </FormItem>
                <FormItem
                  hasFeedback
                  help={!!validateStatus("email") && errors.email}
                  validateStatus={validateStatus("email")}
                >
                  <Input
                    name="email"
                    placeholder="Your e-mail address"
                    size="large"
                    {...restProps}
                  />
                </FormItem>
                <FormItem
                  hasFeedback
                  help={!!validateStatus("password") && errors.password}
                  validateStatus={validateStatus("password")}
                >
                  <Input
                    name="password"
                    placeholder="Password"
                    size="large"
                    {...restProps}
                  />
                </FormItem>
                <FormItem
                  hasFeedback
                  help={
                    !!validateStatus("confirmPassword") &&
                    errors.confirmPassword
                  }
                  validateStatus={validateStatus("confirmPassword")}
                >
                  <Input
                    name="confirmPassword"
                    placeholder="Please confirm your password"
                    size="large"
                    {...restProps}
                  />
                </FormItem>
              </Container>
            </Modal>
          );
        }}
      />
    );
  }
}

const Container = styled.div`
  margin-top: 3vh;
  h1 {
    font-weight: bold;
  }
  h3 {
    color: #000;
  }
  .ant-card-head {
    background: #999;
  }
  .ant-card-head-title {
    white-space: normal;
    text-align: center;
  }
  .ant-input-lg {
    font-size: 14px;
  }
  .ant-form-explain {
    font-size: 12px;
    margin-bottom: 15px;
    margin-top: 5px;
  }
`;

export default connect(null, mapDispatchToProps)(SignUpForm);
