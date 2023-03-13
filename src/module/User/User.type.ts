export interface IUser{
  id: number,
  email: string,
  username: string,
  password: string,
  name: {
    firstname: string,
    lastname: string,
  },
  address: {
    country: string,
    estate: string,
    district: string,
    city: string,
    street:string,
    number: string,
    zipcode: string,
    geolocation:{
        lat: string,
        long: string
    }
},
  phone: string,
}

export interface IUserForm{
  email: string,
  username: string,
  password: string,
  name: {
    firstname: string,
    lastname: string,
  },
  address: {
    country: string,
    district: string,
    city: string,
    street:string,
    estate: string,
    number: string,
    zipcode: string,
    geolocation:{
        lat: string,
        long: string
    }
},
  phone: string,
}

export enum ApiStatus {
  "loading",
  "ideal", 
  "error",
  "success"
}

export interface IUserState {
  list: IUser[],
  listStatus: ApiStatus,
  createUserFormStatus: ApiStatus,
  updateUserFormStatus: ApiStatus
}

export interface IUpdateUserActionProps {
  id: number,
  data: IUserForm,
}