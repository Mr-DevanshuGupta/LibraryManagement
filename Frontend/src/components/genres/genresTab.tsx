import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addGenreRequest,
  fetchGenresRequest,
  updateGenreRequest,
} from "@/redux/genre/genreSlice";
import { Button, Box, Snackbar, Typography, Alert, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import GenresTable from "./genresTable";

const GenresTab = () => {
  const [form, setForm] = useState<Omit<Genre, "id">>({
    name: "",
    description: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [authSnackbarOpen, setAuthSnackbarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { genres, status, error, totalGenres } = useAppSelector((state) => state.genres);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(totalGenres / pageSize);

  useEffect(() => {
    dispatch(fetchGenresRequest({ pageSize, pageNumber: currentPage }));
  }, [dispatch, currentPage]);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
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

  const handleSnackbarClose = () => {
    setAuthSnackbarOpen(false);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
    });
    setEditId(null);
  };

  return (
    <Box p={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddGenre}>
          Add Genre
        </Button>
      </Box>

      {status === "failed" && <Typography color="error">{error}</Typography>}

      <GenresTable genres={genres} onEdit={handleEdit} />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editId ? "Edit Genre" : "Add Genre"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Genre Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              required
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
        open={authSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          Please log in to edit or add genre details.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GenresTab;
