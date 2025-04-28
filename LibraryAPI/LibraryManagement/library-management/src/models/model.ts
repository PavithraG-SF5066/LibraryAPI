export const bookStatus: string[] = ["Borrowed", "Returned"];
export const gender: string[] = ["Male", "Female", "Others"];
export const department: string[] = ["ECE", "EEE", "CSE"];
export const availability: string[] = ["Issued", "Available", "Damaged"];

export interface User {
    userID: number;
    name: string;
    gender: string;
    department: string;
    email: string;
    password: string;
    userPhoneNumber: string;
    amount: number;
}

export interface BookDetails {
    bookID: number;
    bookName: string;
    authorName: string;
    bookAvailability: string;
}

export  interface BorrowDetails {
    borrowID: number;
    bookID: number;
    bookName: string;
    userID: number;
    borrowedDate: Date;
    bookStatus: string;
    paidFineAmount: number;
}