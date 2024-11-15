import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, SelectChangeEvent } from "@mui/material";

interface BookFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    authors: { id: number; name: string }[];
    genres: { id: number; name: string }[];
    editId: number | null;
}

const BookFormDialog: React.FC<BookFormDialogProps> = ({
    open,
    onClose,
    onSubmit,
    formData,
    onChange,
    onFileChange,
    authors,
    genres,
    editId,
}) => {
    const [errors, setErrors] = useState<{ price?: string; publicationDate?: string }>({});

    const handleSelectChange = (e: SelectChangeEvent<any>) => {
        const { name, value } = e.target;
        onChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
    };

    const validateForm = () => {
        const newErrors: { price?: string; publicationDate?: string } = {};

        if (formData.price <= 0) {
            newErrors.price = "Price must be greater than 0";
        }

        const currentDate = new Date().toISOString().split("T")[0];
        if (formData.publicationDate >= currentDate) {
            newErrors.publicationDate = "Publication date must be before today's date";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(e);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{formData.id ? "Edit Book" : "Add Book"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="bookName"
                        label="Book Name"
                        value={formData.bookName}
                        onChange={onChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="summary"
                        label="Summary"
                        value={formData.summary}
                        onChange={onChange}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="publicationDate"
                        label="Publication Date"
                        type="date"
                        value={formData.publicationDate}
                        onChange={onChange}
                        required
                        fullWidth
                        margin="normal"
                        error={!!errors.publicationDate}
                        helperText={errors.publicationDate}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        name="price"
                        label="Price"
                        value={formData.price}
                        onChange={onChange}
                        required
                        fullWidth
                        margin="normal"
                        type="number"
                        error={!!errors.price}
                        helperText={errors.price}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Author</InputLabel>
                        <Select
                            name="authorID"
                            value={formData.authorID}
                            onChange={handleSelectChange}
                            label="Author"
                            required
                        >
                            {authors.map((author) => (
                                <MenuItem key={author.id} value={author.id}>
                                    {author.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Genres</InputLabel>
                        <Select
                            name="genreID"
                            multiple
                            value={formData.genreID}
                            label="Genres"
                            onChange={handleSelectChange}
                            renderValue={(selected) => selected.map((id: number) => genres.find((genre) => genre.id === id)?.name).join(", ")}
                        >
                            {genres.map((genre) => (
                                <MenuItem key={genre.id} value={genre.id}>
                                    <Checkbox checked={formData.genreID.indexOf(genre.id) > -1} />
                                    <ListItemText primary={genre.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <input type="file" onChange={onFileChange} accept="image/*" />

                    <DialogActions>
                        <Button type="submit" variant="contained" color="primary">
                            {editId ? "Update Book" : "Add Book"}
                        </Button>
                        <Button onClick={onClose} color="secondary">
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookFormDialog;
