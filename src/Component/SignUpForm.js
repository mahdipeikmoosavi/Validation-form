import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Input from "../Component/comon/input";
import RadioInput from "./comon/radioInput";
import SelectComponent from "./comon/selectComponent";
import CheckBox from "./comon/inputCheckbox";
import Loader from "./dissine/Loader";
const genderOptions = [
  { label: "مرد", value: "0" },
  { label: "زن", value: "1" },
];

const selectedOption = [
  { label: "Select nationality", value: "" },
  { label: "INAN", value: "IR" },
  { label: "GERMANY", value: "GER" },
  { label: "USA", value: "US" },
];

const checkOptions = [
  { label: "react.js", value: "REACT" },
  { label: "vue.js", value: "VUE" },
];

const initialValues = {
  name: "",
  email: "",
  phonenumber: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  intrests: [],
  terms: false,
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("نام را وارد کنید")
    .min(5, "حداقل 5 کاراکتر وارد کنید"),
  email: Yup.string()
    .email("این فرمت با فرمت ایمیل یکسان نیست")
    .required("ایمیل را وارد کنید"),
  password: Yup.string()
    .required("پسورد را وارد کنید")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#\$%\^&\*a-zA-Z]).{8,}$/,
      "پسورد باید حداقل 8 کاراکتر شامل حداقل یک عدد و یک حرف ویژه باشد"
    ),
  phonenumber: Yup.string()
    .required("َشماره تلفن همراه خود را وارد کنید")
    .matches(/^[0-9]{11}$/, "شماره وارد شده صحیح نمیباشد")
    .nullable(),
  passwordConfirm: Yup.string()
    .required("پسورد را تکرار کنید")
    .oneOf([Yup.ref("password"), null], "پسورد ها با هم تطابق ندارند"),
  gender: Yup.string().required("Gender is required"),
  nationality: Yup.string().required("select a Country"),
  intrests: Yup.array().min(1).required("حداقل یکی رو انتخاب کنید"),
  terms: Yup.boolean()
    .required("باید با قوانین سایت موافقت کنی")
    .oneOf([true], "باید با قوانین سایت موافقت کنی"),
});

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const formik = useFormik({
    initialValues: formValues || initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      axios
        .post("http://localhost:7000/users", values)
        .then((res) => {
          // در صورت موفقیت ارسال فرم، می‌توانید کارهای مورد نیاز را انجام دهید
          console.log(res.data);
        })
        .catch((error) => {
          // در صورت بروز خطا در ارسال فرم، می‌توانید کارهای مورد نیاز را انجام دهید
          console.log(error);
        });
    },
    validationSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    axios
      .get("http://localhost:7000/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* <div className="formControl">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            //حط پایین همون کار onChenge , onblur,value رو که توی nameهست رو انجام میده فقط ساده تر و ux بهتری به کاربر میده
            //  value={formik.values.name}
            //onChange={formik.handleChange}
            {...formik.getFieldProps("name")}
            name="name"
          />
          {formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
        </div> */}
        <Loader />
        <h2>فرم</h2>
        <hr />
        <h4>اعتبار سنجی</h4>

        <Input formik={formik} name="name" label="Name" />
        <Input formik={formik} name="email" label="Email" />
        <Input formik={formik} name="phonenumber" label="Phone Number" />
        <Input
          formik={formik}
          name="password"
          label="Password"
          type="password"
        />
        <Input
          formik={formik}
          name="passwordConfirm"
          label="Password Confirmation"
          type="password"
        />

        <RadioInput
          name="gender"
          radioOptions={genderOptions}
          formik={formik}
        />
        <SelectComponent
          selectedOption={selectedOption}
          name="nationality"
          formik={formik}
        />
        <CheckBox formik={formik} name="intrests" checkOptions={checkOptions} />

        <input
          type="checkbox"
          id="terms"
          name="terms"
          value={true}
          onChange={formik.handleChange}
          checked={formik.values.terms}
        />
        <label htmlFor="terms">
          <h2>موافقت با قوانین سایت</h2>
        </label>

        {formik.errors.terms && (
          <div className="error">{formik.errors.terms}</div>
        )}

        {/* <button type="submit" disabled={!formik.isValid}>
          Submit
        </button> */}
        {/* stert */}

        <button className="btn" type="submit" disabled={!formik.isValid}>
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
          <span class="circle5"></span>
          <span class="text">Submit</span>
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
