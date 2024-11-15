import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    addBookRequest,
    fetchBooksRequest,
    updateBookRequest,
    deleteBookRequest,
} from "@/redux/book/bookSlice";
import { setSearchTerm } from "@/redux/search/searchSlice";
import { Button, Box, Snackbar, Typography, Alert, Pagination, TextField } from "@mui/material";
import axios from "axios";
import BooksTable from "./booksTable";
import BookFormDialog from "./bookFormDialog";
import { fetchGenresRequest } from "@/redux/genre/genreSlice";
import { fetchAuthorsRequest } from "@/redux/author/authorSlice";

const BooksTab = () => {
    const [form, setForm] = useState<addBookRequest & { file: File | null }>({
        bookName: "",
        publicationDate: "",
        summary: "",
        price: 0,
        authorID: 0,
        genreID: [],
        file: null
    });
    const [editId, setEditId] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [authSnackbarOpen, setAuthSnackbarOpen] = useState(false);
    const [booksWithImages, setBooksWithImages] = useState<BookWithImage[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [searchInput, setSearchInput] = useState("");

    const dispatch = useAppDispatch();
    const { books, totalBooks, status, error } = useAppSelector((state) => state.books);
    const { authors } = useAppSelector((state) => state.authors);
    const { genres } = useAppSelector((state) => state.genres);
    const { searchTerm } = useAppSelector((state) => state.search);
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    const totalPages = Math.ceil(totalBooks / pageSize);

    useEffect(() => {
        dispatch(fetchBooksRequest({ pageNumber: currentPage, pageSize: pageSize, searchTerm }));
        dispatch(fetchGenresRequest({ pageNumber: 1, pageSize: 10 }));
        dispatch(fetchAuthorsRequest({ pageNumber: 1, pageSize: 10 }));
    }, [dispatch, currentPage, searchTerm]);

    useEffect(() => {
        if (books.length > 0) {
            const fetchImages = async () => {
                const booksWithImages = await Promise.all(
                    books.map(async (book) => {
                        try {
                            const imageResponse = await axios.get(
                                `http://localhost:8080/books/image/${book.id}`,
                                { responseType: "arraybuffer" }
                            );
                            const imageBlob = new Blob([imageResponse.data], { type: "image/jpeg" });
                            const imageUrl = URL.createObjectURL(imageBlob);
                            return { ...book, imageUrl };
                        } catch (error) {
                            return { ...book, imageUrl: null };
                        }
                    })
                );
                setBooksWithImages(booksWithImages);
            };
            fetchImages();
        }
    }, [books]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = event.target.value;
        setSearchInput(newSearchTerm);
        dispatch(setSearchTerm(newSearchTerm));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>
    ) => {
        const { name, value } = e.target;
        if (!name) return;

        if (name === "genreID" && typeof value === "string") {
            setForm({ ...form, genreID: value.split(",").map(Number) });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setForm({ ...form, file: e.target.files[0] });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedForm = {
            ...form,
            bookName: form.bookName.trim(),
            summary: form.summary.trim(),
            publicationDate: form.publicationDate.trim(),
        };

        if (editId) {
            dispatch(updateBookRequest({ id: editId, book: trimmedForm }));
        } else {
            dispatch(addBookRequest(trimmedForm));
        }

        resetForm();
        setOpenDialog(false);
    };

    const handleAddBook = () => {
        if (!isAuthenticated) {
            setAuthSnackbarOpen(true);
            return;
        }
        resetForm();
        setOpenDialog(true);
    };

    const handleEdit = (book: BookWithImage) => {
        if (!isAuthenticated) {
            setAuthSnackbarOpen(true);
            return;
        }

        const formattedBirthDate = new Date(book.publicationDate).toISOString().split("T")[0];
        setForm({
            bookName: book.bookName,
            summary: book.summary,
            publicationDate: formattedBirthDate,
            price: book.price,
            authorID: book.author.id,
            genreID: book.genres.map((genre) => genre.id),
            file: null,
        });
        setEditId(book.id);
        setOpenDialog(true);
    };

    const handleDelete = (id: number) => {
        if (!isAuthenticated) {
            setAuthSnackbarOpen(true);
            return;
        }
        dispatch(deleteBookRequest(id));
        setSnackbarOpen(true);
    };

    const resetForm = () => {
        setForm({
            bookName: "",
            summary: "",
            publicationDate: "",
            price: 0,
            authorID: 0,
            genreID: [],
            file: null,
        });
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
                <Button variant="contained" color="primary" onClick={handleAddBook}>
                    Add Book
                </Button>
                <TextField
                    label="Search Books"
                    variant="outlined"
                    value={searchInput}
                    onChange={handleSearchChange}
                    sx={{ width: "30%" }}
                />
            </Box>

            {status === "failed" && <Typography color="error">{error}</Typography>}

            <BooksTable booksWithImages={booksWithImages} onEdit={handleEdit} onDelete={handleDelete} />

            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{ mt: 2 }}
            />

            <BookFormDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSubmit={handleSubmit}
                formData={form}
                onChange={handleChange}
                onFileChange={handleFileChange}
                authors={authors}
                genres={genres}
                editId={editId}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Book deleted successfully"
            />

            <Snackbar
                open={authSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleAuthSnackbarClose}
            >
                <Alert onClose={handleAuthSnackbarClose} severity="error">
                    Please log in to edit or add book details.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default BooksTab;
