import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    addAuthorRequest,
    fetchAuthorsRequest,
    updateAuthorRequest,
} from "@/redux/author/authorSlice";
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

const AuthorsTab = () => {
    const [form, setForm] = useState<Omit<Author, "id">>({
        name: "",
        biography: "",
        birthDate: "",
    });
    const [editId, setEditId] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({
        name: "",
        biography: "",
        birthDate: "",
    });

    const dispatch = useAppDispatch();
    const { authors,totalAuthors, status, error } = useAppSelector((state) => state.authors);
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const totalPages = Math.ceil(totalAuthors / pageSize);

    useEffect(() => {
        dispatch(fetchAuthorsRequest({pageNumber: currentPage, pageSize: pageSize}));
    }, [dispatch, currentPage]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors: any = {};
        const currentDate = new Date();
        const selectedDate = new Date(form.birthDate);

        if (!form.name.trim()) errors.name = "Name is required.";
        if (!form.biography.trim()) errors.biography = "Biography is required.";
        if (!form.birthDate) {
            errors.birthDate = "Birth date is required.";
        } else if (selectedDate >= currentDate) {
            errors.birthDate = "Birth date must be in the past.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const trimmedForm = {
            ...form,
            name: form.name.trim(),
            biography: form.biography.trim(),
            birthDate: form.birthDate.trim(),
        };

        if (editId) {
            dispatch(updateAuthorRequest({ id: editId, author: trimmedForm }));
        } else {
            dispatch(addAuthorRequest(trimmedForm));
        }

        resetForm();
        setOpenDialog(false);
    };

    const handleAddAuthor = () => {
        if (!isAuthenticated) {
            setErrorSnackbarOpen(true);
            return;
        }
        resetForm();
        setOpenDialog(true);
    };

    const handleEdit = (author: Author) => {
        if (!isAuthenticated) {
            setErrorSnackbarOpen(true);
            return;
        }
        const formattedBirthDate = new Date(author.birthDate).toISOString().split('T')[0];
        setForm({
            name: author.name,
            biography: author.biography,
            birthDate: formattedBirthDate,
        });
        setEditId(author.id);
        setOpenDialog(true);
    };

    const resetForm = () => {
        setForm({ name: "", biography: "", birthDate: "" });
        setEditId(null);
        setFormErrors({ name: "", biography: "", birthDate: "" });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setErrorSnackbarOpen(false);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Box p={3}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddAuthor}>
                    Add Author
                </Button>
            </Box>

            {status === "failed" && <Typography color="error">{error}</Typography>}

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Biography</TableCell>
                            <TableCell>Birth Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authors.map((author: Author) => (
                            <TableRow key={author.id}>
                                <TableCell>{author.name}</TableCell>
                                <TableCell>{author.biography}</TableCell>
                                <TableCell>{formatDate(author.birthDate)}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(author)}>
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
                <DialogTitle>{editId ? "Edit Author" : "Add Author"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="name"
                            label="Author Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                        />
                        <TextField
                            name="biography"
                            label="Biography"
                            value={form.biography}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            error={!!formErrors.biography}
                            helperText={formErrors.biography}
                        />
                        <TextField
                            name="birthDate"
                            label="Birth Date"
                            type="date"
                            value={form.birthDate}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!formErrors.birthDate}
                            helperText={formErrors.birthDate}
                        />
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary">
                                {editId ? "Update Author" : "Add Author"}
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
                    Author deleted successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    Please log in to edit the details.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AuthorsTab;
