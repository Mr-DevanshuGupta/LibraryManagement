import React, { useEffect, useState } from "react";
import { Box, Container, Tab, Tabs, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import AuthorsTab from "@/components/author/authorsTab";
import BooksTab from "@/components/books/booksTab";
import GenresTab from "@/components/genres/genresTab";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getUserRequest } from "@/redux/user/userSlice";
import { logoutRequest } from "@/redux/auth/authSlice";

const BooksPage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { user } = useAppSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
  };

  useEffect(() => {
    if (isAuthenticated) {
      const userId = Number(localStorage.getItem("Id"));
      dispatch(getUserRequest());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <Container sx={{ minHeight: "90vh", overflowY: "auto" }}>
      <Box
        sx={{
          padding: "10px",
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">Library Management</Typography>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{ display: "flex", gap: 2, marginLeft: "auto" }}
          >
            <Tab label="Books" />
            <Tab label="Authors" />
            <Tab label="Genres" />
          </Tabs>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {!isAuthenticated ? (
            <Box>
              <Button
                onClick={() => router.push("/login")}
                variant="contained"
                color="primary"
                sx={{ marginRight: 2 }}
              >
                Login
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" sx={{ marginRight: 2 }}>
                Hi, {user?.firstName}
              </Typography>
              <Button
                onClick={handleLogout}
                variant="contained"
                color="error"
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ marginTop: 2 }}>
        {tabIndex === 0 && <BooksTab />}
        {tabIndex === 1 && <AuthorsTab />}
        {tabIndex === 2 && <GenresTab />}
      </Box>
    </Container>
  );
};

export default BooksPage;
