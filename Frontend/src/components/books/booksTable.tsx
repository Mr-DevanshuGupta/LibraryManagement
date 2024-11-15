import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


interface BooksTableProps {
    booksWithImages: BookWithImage[];
    onEdit: (book: BookWithImage) => void;
    onDelete: (id: number) => void;
}

const BooksTable: React.FC<BooksTableProps> = ({ booksWithImages, onEdit, onDelete }) => {
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    };
    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell >Book Name</TableCell>
                        <TableCell>Summary</TableCell>
                        <TableCell>Publication Date</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {booksWithImages.map((book: BookWithImage) => (
                        <TableRow key={book.id}>
                            <TableCell sx={{
                                maxWidth: 150,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}> <Tooltip title={book.bookName} placement="bottom-start">
                                    <span>{book.bookName}</span>
                                </Tooltip>
                            </TableCell>
                            <TableCell sx={{
                                maxWidth: 200,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}><Tooltip title={book.summary} placement="bottom-start">
                                    <span>{book.summary}</span>
                                </Tooltip></TableCell>
                            <TableCell>{formatDate(book.publicationDate)}</TableCell>
                            <TableCell>{book.price}</TableCell>
                            <TableCell>
                                {book.imageUrl ? (
                                    <img src={book.imageUrl} alt={book.bookName} width={50} height={75} />
                                ) : (
                                    <p>No Image</p>
                                )}
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(book)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => onDelete(book.id)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BooksTable;
