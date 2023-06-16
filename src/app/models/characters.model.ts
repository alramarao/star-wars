export type CharactersTableList = PaginatedResponse<Character>;

export interface Character {
    uid: string;
    name: string;
    url: string;
}

export interface PaginatedResponse<T> {
	results: T[];
	message: string;
    total_records: number;
    total_pages: number;
    previous: string;
    next: string;
    pageNo: number;
}