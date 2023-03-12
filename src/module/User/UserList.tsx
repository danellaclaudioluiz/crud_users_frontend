import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IUser } from "./User.type";
import { MutatingDots } from "react-loader-spinner";
import { useEffect } from 'react';
import { getUserListAction } from './UserSlice';

const UserList = () => {
  const { list, listStatus } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserListAction())
  }, [])

  if (listStatus === ApiStatus.loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100
      }}>
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor='#4fa94d'
          radius='12.5'
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    )
  }

  if (listStatus === ApiStatus.error) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100
      }}>
        Error while loading list.
      </div>
    )
  }

  return (
    <table>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Full Name</th>
        <th>Phone</th>
        <th>Menu</th>
      </tr>
      {
        listStatus === ApiStatus.ideal &&
        list.map((user: IUser, index: number) => {
          return (
            <tr>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.name.firstname + " " + user.name.lastname}</td>
              <td>{user.phone}</td>
            </tr>
          );
        })
      }
    </table >
  );
};

export default UserList;
