import React from "react";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface GenresTableProps {
    genres: Genre[];
    onEdit: (genre: Genre) => void;
}

const GenresTable: React.FC<GenresTableProps> = ({ genres, onEdit }) => {
    return (
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
                    {genres.map((genre) => (
                        <TableRow key={genre.id}>
                            <TableCell>{genre.name}</TableCell>
                            <TableCell>{genre.description}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(genre)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GenresTable;
