import { ChangeEvent, useState } from "react";
import { Input } from "../../components/Input/Index";
import Style from "./UserFormStyle.module.css";

const UserForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [street, setStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  return (
    <div className={Style.container}>
      <form className={Style.form}>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          value={email}
          label="Email"
          type="email"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUserName(e.target.value);
          }}
          value={userName}
          label="Username"
          type="text"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          value={password}
          label="Password"
          type="password"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword2(e.target.value);
          }}
          value={password2}
          label="Confirm your Password"
          type="password"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
          label="First name"
          type="text"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLastName(e.target.value);
          }}
          value={lastName}
          label="Last name"
          type="text"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPhone(e.target.value);
          }}
          value={phone}
          label="Phone"
          type="text"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setZipcode(e.target.value);
          }}
          value={zipcode}
          label="Zipcode"
          type="text"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setStreet(e.target.value);
          }}
          value={street}
          label="Street"
          type="text"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDistrict(e.target.value);
          }}
          value={district}
          label="District"
          type="text"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCity(e.target.value);
          }}
          value={city}
          label="City"
          type="text"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setState(e.target.value);
          }}
          value={state}
          label="State"
          type="text"
        />
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCountry(e.target.value);
          }}
          value={country}
          label="Country"
          type="text"
        />

        <div>
          <input type="submit" value="Register User" />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
