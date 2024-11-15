interface Author {
    id: number;
    name: string;
    biography: string;
    birthDate: string;
}

interface AuthorState {
    authors: Author[];
    totalAuthors: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

interface addAuthorRequest {
    name: string;
    biography: string;
    birthDate: string;
}

interface AuthorResponse {
    authors: Author[];
    totalAuthors: number;
}

interface Genre {
    id: number;
    name: string;
    description: string;
}

interface GenreState {
    genres: Genre[];
    totalGenres: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

interface GenresResponse {
    genres: Genre[];
    totalGenres: number;
}

interface AddGenreRequest {
    name: string;
    description: string;
}

interface Book {
    id: number;
    bookName: string;
    publicationDate: string;
    summary: string;
    author: Author;
    genres: Genre[];
    price: number;
}

interface BookState {
    books: Book[];
    totalBooks: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

interface addBookRequest {
    bookName: string;
    summary: string;
    publicationDate: string;
    price: number;
    authorID: number;
    genreID: number[];
    file: File | null;
}

interface BookDTO{
    books : Book[];
    author: Author;
    genres : Genre[];
}

interface BooksResponse {
    books: Book[];
    totalBooks: number;
}

interface BookWithImage extends Book {
    imageUrl: string | null;
}

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
}

interface LoginResponse {
    token: string;
    id: string;
}

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

interface SearchState {
    searchTerm: string;
}