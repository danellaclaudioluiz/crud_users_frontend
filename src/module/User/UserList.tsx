import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { ApiStatus, IUser } from "./User.type";
import { MutatingDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { deleteUserAction, getUserListAction } from "./UserSlice";
import { Modal } from "../../components/Modal";
import Style from "./UserListStyle.module.css";

const UserList = () => {
  const [userDataToView, setUserDataToView] = useState<IUser | null>(null);
  const { list, listStatus } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  if (listStatus === ApiStatus.loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (listStatus === ApiStatus.error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 100,
        }}
      >
        Error while loading list.
      </div>
    );
  }

  return (
    <>
      <table>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Full Name</th>
          <th>Phone</th>
          <th>Menu</th>
        </tr>
        {listStatus === ApiStatus.ideal &&
          list.map((user: IUser, index: number) => {
            return (
              <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.name.firstname + " " + user.name.lastname}</td>
                <td>{user.phone}</td>
                <td>
                  <div>
                    <button
                      className={Style.menu}
                      onClick={() => {
                        setUserDataToView(user);
                      }}
                    >
                      View
                    </button>
                    <button className={Style.menu} onClick={() => { }}>
                      Edit
                    </button>
                    <button
                      className={Style.menu}
                      onClick={() => {
                        dispatch(deleteUserAction(user.id));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
      </table>
      {userDataToView && (
        <Modal
          onClose={() => {
            setUserDataToView(null);
          }}
          title="User Details"
        >
          <div>
            <div>
              <label>Username: {userDataToView.username}</label>
            </div>
            <div>
              <label>Email: {userDataToView.email}</label>
            </div>

            <div>
              <label>
                Fullname:{" "}
                {userDataToView.name.firstname +
                  " " +
                  userDataToView.name.lastname}
              </label>
            </div>

            <div>
              <label>Phone: {userDataToView.phone}</label>
            </div>

            <div>
              <label>
                Adress:{" "}
                {userDataToView.address.street +
                  " " +
                  userDataToView.address.number +
                  " " +
                  userDataToView.address.city}
              </label>
            </div>

            <div>Zipcode: {userDataToView.address.zipcode}</div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserList;
