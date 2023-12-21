import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../componentsJsx/Header";

const UserRoles = () => {
  const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const columns = [
  //   { field: "id", headerName: "ID" },
  //   {
  //     field: "username",
  //     headerName: "UserName",
  //     flex: 1,
  //     cellClassName: "name-column--cell",
  //   },
  //   {
  //     field: "tcNo",
  //     headerName: "TC No",
  //     headerAlign: "left",
  //     align: "left",
  //   },
  //   {
  //     field: "phone",
  //     headerName: "Phone Number",
  //     flex: 1,
  //   },
  //   {
  //     field: "email",
  //     headerName: "Email",
  //     flex: 1,
  //   },
  //   // {
  //   //   field: "accessLevel",
  //   //   headerName: "Access Level",
  //   //   flex: 1,
  //   //   renderCell: ({ row: { access } }) => {
  //   //     return (
  //   //       <Box
  //   //         width="60%"
  //   //         m="0 auto"
  //   //         p="5px"
  //   //         display="flex"
  //   //         justifyContent="center"
  //   //         backgroundColor={
  //   //           access === "admin"
  //   //             ? colors.greenAccent[600]
  //   //             : access === "manager"
  //   //             ? colors.greenAccent[700]
  //   //             : colors.greenAccent[700]
  //   //         }
  //   //         borderRadius="4px"
  //   //       >
  //   //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
  //   //         {access === "manager" && <SecurityOutlinedIcon />}
  //   //         {access === "user" && <LockOpenOutlinedIcon />}
  //   //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
  //   //           {access}
  //   //         </Typography>
  //   //       </Box>
  //   //     );
  //   //   },
  //   // },
  // ];
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'tC_No', headerName: 'TC No', width: 150 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'directorateID', headerName: 'Directorate ID', width: 150 },
  ];
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log("++++++++++++++++++++++"+response.data.items);
                console.table(response.data.items);
                console.table(mockDataTeam);
                const userNames = response.data.items.map(user=>user.username)
                isMounted && setUsers(response.data.items);
                if (isMounted) {
                  setUsers(response.data.items);
                }
            } catch (err) {
                if (err.name === 'CanceledError') {
                    // İstek iptal edildiğinde yapılacak işlemler
                    console.log('İstek iptal edildi:', err);
                } else {
                    // Diğer hataların işlenmesi
                    console.error(err);
                     navigate('/login', { state: { from: location }, replace: true });
                }
            }
        }

         getUsers();

        return () => {
            isMounted = false;
            setLoading(false); 
            controller.abort();
           
        }
    }, [])

    return (
        // <article>
        //     <h2>Users List</h2>
        //     {users?.length
        //         ? (
        //             <ul>
        //                 {users.map((user, i) => <li key={i}>{user}</li>)}
        //             </ul>
        //         ) : <p>No users to display</p>
        //     }
        // </article>

<Box m="20px">
<Header title="Kullanıcılar" subtitle="Kullanıcı ve Rol Yönetimi" />
<Box
  m="40px 0 0 0"
  height="75vh"
  sx={{
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .name-column--cell": {
      color: colors.greenAccent[300],
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: colors.blueAccent[700],
      borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: colors.primary[400],
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "none",
      backgroundColor: colors.blueAccent[700],
    },
    "& .MuiCheckbox-root": {
      color: `${colors.greenAccent[200]} !important`,
    },
  }}
>

        {loading ? ( // Yükleme durumu kontrolü
            <p>Loading...</p>
        ) : users && users.length > 0 ? (
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
            />
        ) : (
            <p>Veri bulunamadı</p>
        )}
    
</Box>
</Box>
    );
};

export default UserRoles