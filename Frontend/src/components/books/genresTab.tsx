import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addGenreRequest,
  fetchGenresRequest,
  updateGenreRequest,
} from "@/redux/genre/genreSlice";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

const GenresTab = () => {
  const [form, setForm] = useState<Omit<Genre, "id">>({
    name: "",
    description: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [authSnackbarOpen, setAuthSnackbarOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { genres, status, error, totalGenres } = useAppSelector((state) => state.genres);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(totalGenres / pageSize);

  useEffect(() => {
    dispatch(fetchGenresRequest({pageSize: pageSize, pageNumber:currentPage}));
  }, [dispatch, currentPage]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedForm = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
    };

    if (editId) {
      dispatch(updateGenreRequest({ id: editId, genre: trimmedForm }));
    } else {
      dispatch(addGenreRequest(trimmedForm));
    }

    resetForm();
    setOpenDialog(false);
  };

  const handleAddGenre = () => {
    if (!isAuthenticated) {
      setAuthSnackbarOpen(true);
      return;
    }
    resetForm();
    setOpenDialog(true);
  };

  const handleEdit = (genre: Genre) => {
    if (!isAuthenticated) {
      setAuthSnackbarOpen(true);
      return;
    }
    setForm({
      name: genre.name,
      description: genre.description,
    });
    setEditId(genre.id);
    setOpenDialog(true);
  };

  const resetForm = () => {
    setForm({ name: "", description: "" });
    setEditId(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAuthSnackbarClose = () => {
    setAuthSnackbarOpen(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box p={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddGenre}>
          Add Genre
        </Button>
      </Box>

      {status === "failed" && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genres.map((genre: Genre) => (
              <TableRow key={genre.id}>
                <TableCell>{genre.name}</TableCell>
                <TableCell>{genre.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(genre)}>
                    <EditIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mt: 2 }}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editId ? "Edit Genre" : "Add Genre"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Genre Name"
              value={form.name}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Description"
              value={form.description}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                {editId ? "Update Genre" : "Add Genre"}
              </Button>
              <Button onClick={() => setOpenDialog(false)} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Genre saved successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={authSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleAuthSnackbarClose}
      >
        <Alert onClose={handleAuthSnackbarClose} severity="error">
          Please log in to edit or add Genre details.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GenresTab;
