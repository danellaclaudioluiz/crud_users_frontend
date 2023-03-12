export interface IUser{
  id: number,
  email: string,
  username: string,
  name: {
    firstname: string,
    lastname: string,
  },
  address: {
    city: string,
    street:string,
    number: number,
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
  "error"
}

export interface IUserState {
  list: IUser[],
  listStatus: ApiStatus
}

export const defaultList: IUser[] = [ {
  id:1,
  email:'John@gmail.com',
  username:'johnd',
  name:{
      firstname:'John',
      lastname:'Doe'
  },
  address:{
      city:'kilcoole',
      street:'7835 new road',
      number:3,
      zipcode:'12926-3874',
      geolocation:{
          lat:'-37.3159',
          long:'81.1496'
      }
  },
  phone:'1-570-236-7033'
}]