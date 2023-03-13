import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { Input } from "../../components/Input/Index";
import { ApiStatus, IUpdateUserActionProps, IUser, IUserForm } from './User.type';
import Style from "./UserFormStyle.module.css";
import { registerUserAction, resetCreateListStatus, updateUserAction } from './UserSlice';
import { useNavigate, useParams } from 'react-router-dom'

interface IProps {
  isEditForm?: boolean;
}

const UserForm = (props: IProps) => {
  const { isEditForm } = props

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const params = useParams()
  const userId = useRef(parseInt(params.id || ""))

  const { list } = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    if (isEditForm && userId.current) {
      const userData = list.filter(x => x.id === userId.current)

      if (userData.length) {
        setUserName(userData[0].username)
        setEmail(userData[0].email)
        setFirstName(userData[0].name.firstname)
        setLastName(userData[0].name.lastname)
        setPhone(userData[0].phone)
        setZipcode(userData[0].address.zipcode)
        setStreet(userData[0].address.street)
        setStreetNumber(userData[0].address.number)
        setDistrict(userData[0].address.district)
        setCity(userData[0].address.city)
        setState(userData[0].address.estate)
        setCountry(userData[0].address.country)
      }
    }
  }, [isEditForm])

  const { createUserFormStatus, updateUserFormStatus } = useAppSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const data: IUserForm = {
      email,
      username: userName,
      password: "01234567",
      name: {
        firstname: firstName,
        lastname: lastName,
      },
      address: {
        city,
        estate: state,
        district,
        country,
        street,
        number: streetNumber,
        zipcode,
        geolocation: {
          lat: "0",
          long: "0"
        }
      },
      phone,
    }

    if (isEditForm) {
      const dirtyFormData: IUpdateUserActionProps = { id: userId.current, data }
      dispatch(updateUserAction(dirtyFormData))
      navigate("/")
    } else {
      const data: IUserForm = {
        email,
        username: userName,
        password,
        name: {
          firstname: firstName,
          lastname: lastName,
        },
        address: {
          city,
          estate: state,
          district,
          country,
          street,
          number: streetNumber,
          zipcode,
          geolocation: {
            lat: "0",
            long: "0"
          }
        },
        phone
      }
      dispatch(registerUserAction(data))
      navigate("/")
    }

  }

  useEffect(() => {
    if (createUserFormStatus === ApiStatus.success) {
      setUserName("")
      setEmail("")
      setPassword("")
      setPassword2("")
      setFirstName("")
      setLastName("")
      setPhone("")
      setZipcode("")
      setStreet("")
      setStreetNumber("")
      setDistrict("")
      setCity("")
      setState("")
      setCountry("")

      dispatch(resetCreateListStatus())
    }

  }, [createUserFormStatus])

  return (
    <div className={Style.container}>
      <form className={Style.form} onSubmit={onSubmitForm}>
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
            setEmail(e.target.value);
          }}
          value={email}
          label="Email"
          type="email"
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
            setStreetNumber(e.target.value);
          }}
          value={streetNumber}
          label="Number"
          type="number"
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
          <input type="submit" value={isEditForm ? "Update User" : "Register User"}
            disabled={createUserFormStatus === ApiStatus.loading || updateUserFormStatus === ApiStatus.loading}
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
