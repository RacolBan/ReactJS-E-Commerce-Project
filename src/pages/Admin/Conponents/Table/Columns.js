import style from "../List/List.module.css";
export const columnsUsers = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "firstName", headerName: "First name", width: 120 },
  { field: "lastName", headerName: "Last name", width: 120 },
  {
    field: "address",
    headerName: "Address",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },
  {
    field: "role",
    headerName: "Role",
    width: 90,
  },
  {
    field: "username",
    headerName: "Username",
    width: 120,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 120,
    renderCell: (params) => {
      return (
        <div className={style.cellWithImg}>
          <img
            className={style.cellImg}
            src={
              params.row.avatar === null
                ? "../../../../images/Avatar/avatar.jpg"
                : `${process.env.REACT_APP_SERVER_URL}/${params.row.avatar}`
            }
            alt="avatar"
          />
        </div>
      );
    },
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
];

export const columnsProducts = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={style.cellWithImg}>
          <img
            className={style.cellImg}
            src={
              params.row.image === null
                ? "../../../../images/Avatar/avatar.jpg"
                : `${process.env.REACT_APP_SERVER_URL}/assets/${params.row.image}`
            }
            alt="imagess"
          />
        </div>
      );
    },
  },
  {
    field: "nameCategory",
    headerName: "Name Category",
    width: 150,
  },
  {
    field: "nameManufacture",
    headerName: "Name Manufacture",
    width: 150,
  },
];

export const columnsCategory = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
];

export const columnsManufacture = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "nameCategory", headerName: "Name Category", width: 150 }
];
export const columnsOrder = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "createdAt", headerName: "CreatedAt", width: 180 },
  { field: "updatedAt", headerName: "UpdatedAt", width: 180 },
];
